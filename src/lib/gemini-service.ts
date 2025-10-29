import { FileData } from './store';

const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || 'AIzaSyDl_9Yo7axD3E4VLCn5nLp20kfvM0WalJg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';


export interface GeminiResponse {
  message: string;
  files?: FileData[];
  thinking?: string;
  reasoning?: string;
}

const CLAUDE_STYLE_SYSTEM_PROMPT = `You are an elite AI coding assistant operating at the highest tier of intelligence. You think deeply, reason step-by-step, and generate production-ready code.

## MANDATORY THINKING PROTOCOL

Before generating ANY code, engage in extended reasoning:

**COMPREHENSION PHASE:**
- Understand the user's explicit and implicit requirements
- Identify the complexity level and scope
- Determine what technologies and patterns are needed

**ARCHITECTURAL PLANNING:**
- Design the optimal technical approach
- Plan all necessary files and their relationships
- Map dependencies and generation order
- Consider scalability and maintainability

**RISK ANALYSIS:**
- Identify potential errors and edge cases
- Consider security vulnerabilities
- Anticipate performance bottlenecks
- Plan error handling strategies

**QUALITY ASSURANCE:**
- Ensure complete implementation (NO placeholders)
- Verify all imports and dependencies
- Add proper error handling everywhere
- Include accessibility features
- Optimize for performance

## CODE GENERATION RULES

**ABSOLUTE REQUIREMENTS:**
1. Generate COMPLETE, working code - zero TODO comments
2. Include comprehensive error handling with try-catch
3. Add input validation and sanitization
4. Use semantic HTML and proper accessibility (ARIA labels)
5. Implement responsive design with Tailwind CSS
6. Add loading states and user feedback
7. Include smooth animations and transitions
8. Optimize performance (debouncing, lazy loading, memoization)
9. Write clean, maintainable code with clear comments
10. Test edge cases mentally before generating

**FILE FORMAT:**
Always wrap each file with markers:

### FILE: filename.ext
\`\`\`language
[complete production-ready code]
\`\`\`

**STANDARD WEB APP STRUCTURE:**
- index.html (with Tailwind CDN, proper meta tags, semantic structure)
- script.js (clean, modular, well-commented JavaScript)
- styles.css (custom styles if needed beyond Tailwind)

**ENHANCED FEATURES TO INCLUDE:**
- Smooth animations and micro-interactions
- Loading skeletons and progress indicators
- Toast notifications for user feedback
- Keyboard shortcuts for power users
- Dark mode support where appropriate
- Mobile-first responsive design
- Accessibility (screen reader support, keyboard navigation)
- Error boundaries and graceful degradation
- Performance optimizations (lazy loading, debouncing)
- Local storage for persistence where relevant

**SECURITY BEST PRACTICES:**
- Input sanitization to prevent XSS
- Validate all user inputs
- Escape output properly
- Use secure random generation
- Implement rate limiting logic
- No hardcoded sensitive data

**CODE QUALITY:**
- Descriptive variable and function names
- Single responsibility principle
- DRY (Don't Repeat Yourself)
- Proper indentation and formatting
- Meaningful comments explaining WHY not just WHAT
- Consistent coding style throughout

Now respond to the user's request with deep thinking and complete, production-ready code.`;

const EXTRA_THINK_PROMPT = `## EXTRA THINKING MODE ACTIVATED

Engage MAXIMUM reasoning depth:

**DEEP ANALYSIS:**
1. Break down the request into atomic requirements
2. Research best practices for each requirement
3. Consider multiple implementation approaches
4. Evaluate trade-offs of each approach
5. Select optimal solution with justification

**COMPREHENSIVE PLANNING:**
1. Design complete system architecture
2. Plan data flow and state management
3. Identify all edge cases and error scenarios
4. Design user interaction patterns
5. Plan performance optimization strategy

**QUALITY MAXIMIZATION:**
1. Add professional polish beyond requirements
2. Implement accessibility best practices
3. Include delightful UX details
4. Optimize for production deployment
5. Add comprehensive error handling

**PROACTIVE ENHANCEMENTS:**
1. Anticipate user's next needs
2. Add helpful features they haven't requested
3. Implement best-in-class patterns
4. Include thoughtful documentation
5. Provide usage examples

Take your time. Think deeply. Generate the absolute best solution possible.`;

export async function generateWithGemini(
  userPrompt: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  extraThink: boolean = false
): Promise<GeminiResponse> {
  try {
    // Build conversation context (last 8 messages for better context)
    const messages = conversationHistory.slice(-8);
    const conversationContext = messages.length > 0
      ? `\n\nPrevious conversation:\n${messages.map((m) => `${m.role}: ${m.content}`).join('\n')}\n\n`
      : '';

    const thinkingMode = extraThink ? EXTRA_THINK_PROMPT : '';
    
    const fullPrompt = `${CLAUDE_STYLE_SYSTEM_PROMPT}\n\n${thinkingMode}${conversationContext}User Request: ${userPrompt}\n\nAssistant Response:`;

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
          temperature: extraThink ? 0.8 : 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          candidateCount: 1,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Gemini Response:', data);

    // Check for blocked content
    if (data.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new Error('Response blocked by safety filters. Try rephrasing your request.');
    }
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!generatedText) {
      throw new Error('No response generated from Gemini API');
    }

    // Extract thinking/reasoning if present
    const reasoning = extractReasoning(generatedText);

    // Parse the response to extract files
    const files = parseFilesFromResponse(generatedText);
    const message = extractMessageFromResponse(generatedText);

    return {
      message,
      files: files.length > 0 ? files : undefined,
      reasoning,
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      message: `I encountered an error: ${error.message}. Please try again or rephrase your request.`,
      files: [],
    };
  }
}

function extractReasoning(text: string): string | undefined {
  // Look for reasoning sections
  const reasoningPatterns = [
    /\*\*COMPREHENSION PHASE:\*\*([\s\S]*?)(?=\*\*|###|$)/i,
    /\*\*THINKING:\*\*([\s\S]*?)(?=\*\*|###|$)/i,
    /\*\*REASONING:\*\*([\s\S]*?)(?=\*\*|###|$)/i,
    /\*\*ANALYSIS:\*\*([\s\S]*?)(?=\*\*|###|$)/i,
  ];

  for (const pattern of reasoningPatterns) {
    const match = text.match(pattern);
    if (match && match[1].trim().length > 50) {
      return match[1].trim();
    }
  }

  return undefined;
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

    // Auto-assign filenames based on language and content
    codeBlocks.forEach((block, index) => {
      let fileName = 'index.html';
      let language = block.lang;

      if (block.lang === 'html') {
        fileName = 'index.html';
      } else if (block.lang === 'javascript' || block.lang === 'js') {
        fileName = codeBlocks.length > 2 ? 'script.js' : 'index.html';
        language = 'javascript';
      } else if (block.lang === 'css') {
        fileName = 'styles.css';
      } else if (block.lang === 'json') {
        fileName = 'data.json';
      } else if (block.lang === 'typescript' || block.lang === 'ts') {
        fileName = 'script.ts';
        language = 'typescript';
      }

      // If HTML block, make it index.html
      if (block.code.includes('<!DOCTYPE html>') || block.code.includes('<html')) {
        fileName = 'index.html';
        language = 'html';
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
  
  // Remove reasoning sections
  message = message.replace(/\*\*COMPREHENSION PHASE:\*\*[\s\S]*?(?=\*\*[A-Z]|\n\n|$)/gi, '');
  message = message.replace(/\*\*ARCHITECTURAL PLANNING:\*\*[\s\S]*?(?=\*\*[A-Z]|\n\n|$)/gi, '');
  message = message.replace(/\*\*THINKING:\*\*[\s\S]*?(?=\*\*[A-Z]|\n\n|$)/gi, '');
  message = message.replace(/\*\*ANALYSIS:\*\*[\s\S]*?(?=\*\*[A-Z]|\n\n|$)/gi, '');
  
  // Clean up extra newlines
  message = message.replace(/\n{3,}/g, '\n\n');
  
  return message.trim() || "I've generated the code for you!";
}

export async function fixCodeErrors(
  errorMessage: string,
  files: FileData[],
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<GeminiResponse> {
  const filesContext = files
    .map((f) => `### FILE: ${f.name}\n\`\`\`${f.language}\n${f.content}\n\`\`\``)
    .join('\n\n');

  const fixPrompt = `## AUTO-FIX MODE ACTIVATED

**TASK:** Debug and fix the error in the code.

**ERROR DETECTED:**
\`\`\`
${errorMessage}
\`\`\`

**CURRENT CODE:**
${filesContext}

**FIXING PROTOCOL:**
1. Analyze the error message carefully
2. Identify the root cause (not just symptoms)
3. Determine which file(s) need changes
4. Fix the issue completely
5. Verify no new issues are introduced
6. Test edge cases mentally

**REQUIREMENTS:**
- Provide COMPLETE fixed code for all affected files
- Use the ### FILE: format for each file
- Ensure all imports and references are correct
- Add any missing error handling
- Verify the fix resolves the issue completely
- Do not break any working functionality

Generate the corrected files now:`;

  return generateWithGemini(fixPrompt, conversationHistory, false);
}

export async function analyzeAndEnhance(
  files: FileData[],
  enhancementRequest: string
): Promise<GeminiResponse> {
  const filesContext = files
    .map((f) => `### FILE: ${f.name}\n\`\`\`${f.language}\n${f.content}\n\`\`\``)
    .join('\n\n');

  const enhancePrompt = `## CODE ENHANCEMENT MODE

**CURRENT PROJECT:**
${filesContext}

**ENHANCEMENT REQUEST:**
${enhancementRequest}

**TASK:**
Analyze the existing code and enhance it according to the request. Provide complete updated files with:
- The requested enhancements
- Improved code quality
- Better error handling
- Performance optimizations
- Accessibility improvements
- Enhanced UX details

Use the ### FILE: format for all updated files.`;

  return generateWithGemini(enhancePrompt, [], true);
}
