import { FileData } from './store';

const GEMINI_API_KEY = 'AIzaSyBrpOUatVTrYUbzqnPE7gfg3w5HaVjaTQg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface GeminiResponse {
  message: string;
  files: FileData[];
  thinking?: string;
}

const SYSTEM_PROMPT = `You are an expert web developer AI assistant, similar to bolt.new. Your role is to help users build web applications by generating complete, working code.

IMPORTANT INSTRUCTIONS:
1. When generating code, ALWAYS wrap each file in special markers:
   ### FILE: filename.ext
   \`\`\`language
   [code here]
   \`\`\`

2. Generate COMPLETE, PRODUCTION-READY code - no placeholders or "// rest of code" comments
3. For web apps, always include:
   - index.html (with Tailwind CSS CDN)
   - script.js (if needed)
   - styles.css (if custom styles needed)

4. Make apps beautiful with Tailwind CSS
5. Make apps fully functional with proper JavaScript
6. Include error handling in your code
7. Test edge cases mentally before generating

EXAMPLE RESPONSE FORMAT:
I'll create a [description] for you!

### FILE: index.html
\`\`\`html
<!DOCTYPE html>
<html>
...complete code...
</html>
\`\`\`

### FILE: script.js
\`\`\`javascript
// Complete working code
\`\`\`

Now respond to the user's request following this format.`;

export async function generateWithGemini(
  userPrompt: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<GeminiResponse> {
  try {
    // Build conversation context
    const messages = conversationHistory.slice(-6); // Last 3 exchanges
    const fullPrompt = `${SYSTEM_PROMPT}\n\nPrevious conversation:\n${messages
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n')}\n\nUser: ${userPrompt}\n\nAssistant:`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Gemini Response:', data);
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!generatedText) {
      throw new Error('No response generated from Gemini API');
    }

    // Parse the response to extract files
    const files = parseFilesFromResponse(generatedText);
    const message = extractMessageFromResponse(generatedText);

    return {
      message,
      files: files.length > 0 ? files : undefined,
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      message: `I encountered an error: ${error.message}. Let me try a different approach.`,
      files: [],
    };
  }
}

function parseFilesFromResponse(text: string): FileData[] {
  const files: FileData[] = [];
  
  // Match ### FILE: filename pattern followed by code block
  const filePattern = /### FILE:\s*([^\n]+)\n```(\w+)\n([\s\S]*?)```/g;
  let match;

  while ((match = filePattern.exec(text)) !== null) {
    const fileName = match[1].trim();
    const language = match[2].toLowerCase();
    const content = match[3].trim();

    files.push({
      name: fileName,
      language: language === 'js' ? 'javascript' : language,
      content,
    });
  }

  // Fallback: try to find standalone code blocks if no FILE markers
  if (files.length === 0) {
    const codeBlockPattern = /```(\w+)\n([\s\S]*?)```/g;
    const codeBlocks: Array<{ lang: string; code: string }> = [];

    while ((match = codeBlockPattern.exec(text)) !== null) {
      codeBlocks.push({
        lang: match[1].toLowerCase(),
        code: match[2].trim(),
      });
    }

    // Auto-assign filenames based on language
    codeBlocks.forEach((block, index) => {
      let fileName = 'index.html';
      let language = block.lang;

      if (block.lang === 'html') {
        fileName = 'index.html';
      } else if (block.lang === 'javascript' || block.lang === 'js') {
        fileName = 'script.js';
        language = 'javascript';
      } else if (block.lang === 'css') {
        fileName = 'styles.css';
      } else if (block.lang === 'json') {
        fileName = 'data.json';
      }

      files.push({
        name: fileName,
        language,
        content: block.code,
      });
    });
  }

  return files;
}

function extractMessageFromResponse(text: string): string {
  // Remove file blocks from the message
  let message = text.replace(/### FILE:[\s\S]*?```\w+\n[\s\S]*?```/g, '').trim();
  
  // Clean up extra newlines
  message = message.replace(/\n{3,}/g, '\n\n');
  
  return message || "I've generated the code for you!";
}

export async function fixCodeErrors(
  errorMessage: string,
  files: FileData[],
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<GeminiResponse> {
  const filesContext = files
    .map((f) => `### FILE: ${f.name}\n\`\`\`${f.language}\n${f.content}\n\`\`\``)
    .join('\n\n');

  const fixPrompt = `There's an error in the code. Please fix it.

ERROR: ${errorMessage}

CURRENT FILES:
${filesContext}

Please provide the COMPLETE fixed code for all files that need changes. Use the same ### FILE: format.`;

  return generateWithGemini(fixPrompt, conversationHistory);
}
