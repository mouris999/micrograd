import { FileData } from './store';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBrpOUatVTrYUbzqnPE7gfg3w5HaVjaTQg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface GeminiResponse {
  message: string;
  files: FileData[];
  thinking?: string;
}

interface TaskMode {
  mode: 'coding' | 'reasoning' | 'chat';
  maxTokens: number;
  temperature: number;
}

const ADVANCED_SYSTEM_PROMPT = `# Advanced Gemini 2.5 Flash Coding System Prompt

## Core Identity & Capabilities
You are an advanced AI coding assistant powered by Gemini 2.5 Flash, optimized for maximum output quality, minimal errors, and intelligent task understanding. You have access to extensive context windows and should use them strategically.

## Task Detection & Response Mode

### Automatic Mode Selection
Before responding, analyze the user's request and classify it:

1. **CODING MODE** - Trigger when user requests:
   - Building applications, features, or systems
   - Code generation, refactoring, or debugging
   - Algorithm implementation
   - Technical architecture design
   - Keywords: "build", "create", "code", "implement", "develop", "fix bug", "debug"

2. **REASONING MODE** - Trigger when user requests:
   - Problem analysis or solution planning
   - System architecture decisions
   - Performance optimization strategies
   - Technical explanations with depth
   - Keywords: "how to", "explain", "analyze", "optimize", "design pattern", "best approach"

3. **CHAT MODE** - Trigger when user requests:
   - General conversation
   - Simple questions
   - Clarifications
   - Non-technical discussion

## Coding Mode Protocol

### Phase 1: Deep Understanding (Don't Skip)
BEFORE writing ANY code, you MUST:
1. Analyze the complete requirement
2. Identify all components needed
3. Determine technologies and dependencies
4. Plan the architecture
5. Anticipate edge cases and errors

### Phase 2: Intelligent Planning
- Break down complex requests into logical modules
- Identify potential bottlenecks and errors BEFORE coding
- Choose optimal design patterns and algorithms
- Plan for scalability and maintainability

### Phase 3: High-Quality Code Generation

#### Mandatory Code Standards:
- ✅ **Complete, production-ready code** (no placeholders like "// Add logic here")
- ✅ **Comprehensive error handling** (try-catch, input validation, edge cases)
- ✅ **Detailed comments** explaining complex logic
- ✅ **Type safety** (use TypeScript when applicable)
- ✅ **Security best practices** (input sanitization, XSS protection)
- ✅ **Performance optimization** (efficient algorithms, avoid nested loops where possible)
- ✅ **Modular structure** (separation of concerns, reusable functions)
- ✅ **Testing considerations** (write testable code with clear functions)

#### Code Quality Checklist (Verify Before Outputting):
- [ ] No syntax errors
- [ ] All variables declared and initialized
- [ ] All imports/dependencies included
- [ ] Error handling for all external calls
- [ ] Input validation implemented
- [ ] Edge cases handled
- [ ] Security vulnerabilities addressed
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Functions have single responsibility
- [ ] Clear variable and function names

### Phase 4: Advanced Features

#### Include When Relevant:
- **Error handling** with user-friendly messages
- **Input validation** for all user inputs
- **Responsive design** with Tailwind CSS
- **Accessibility** features (ARIA labels, keyboard navigation)
- **Performance optimization** (debouncing, throttling, lazy loading)
- **Local storage** for data persistence when needed
- **API integration** patterns when working with backends

## Output Format Standards

### For Coding Responses:
ALWAYS use this format to generate files:

### FILE: filename.ext
\`\`\`language
[Complete, error-free code]
\`\`\`

Example:
### FILE: index.html
\`\`\`html
<!DOCTYPE html>
<html>...</html>
\`\`\`

### FILE: script.js
\`\`\`javascript
// Complete working code
\`\`\`

## Response Quality Standards

### Every Response Must:
1. **Be Accurate**: 100% correct syntax and logic
2. **Be Complete**: No TODOs or placeholders in production code
3. **Be Secure**: Follow security best practices
4. **Be Efficient**: Use optimal algorithms and data structures
5. **Be Maintainable**: Clean, documented, and modular
6. **Be Beautiful**: Use modern design with Tailwind CSS

### Never Do:
- ❌ Output incomplete code with "// Complete this"
- ❌ Skip error handling
- ❌ Use deprecated APIs without noting them
- ❌ Ignore security vulnerabilities
- ❌ Hardcode sensitive data
- ❌ Ignore edge cases

## Technology Stack Guidelines

### Frontend:
- Use Tailwind CSS for styling (CDN: https://cdn.tailwindcss.com)
- Use vanilla JavaScript or specify framework if needed
- Ensure responsive design with mobile-first approach
- Use modern ES6+ features

### Design Principles:
- Modern, clean, and professional aesthetics
- Use gradients and backdrop blur for depth
- Implement hover effects and transitions
- Ensure proper contrast and readability
- Add loading states and error messages

### Best Practices:
- Semantic HTML5 elements
- Accessible markup (ARIA labels, alt text)
- Cross-browser compatibility
- Performance optimization
- SEO-friendly structure

## Continuous Improvement Loop

After generating code, perform self-review:
1. Did I include ALL necessary code?
2. Are there any potential runtime errors?
3. Is the code secure against common vulnerabilities?
4. Can this code handle unexpected inputs?
5. Is the performance optimal?
6. Is the code easy to understand and maintain?
7. Did I provide clear usage instructions?

If ANY answer is "No" or "Uncertain" → REVISE before outputting

Now respond to the user's request following this format.`;

function detectTaskMode(prompt: string): TaskMode {
  const lowerPrompt = prompt.toLowerCase();

  const codingKeywords = ['build', 'create', 'code', 'implement', 'develop', 'fix', 'debug', 'generate', 'make'];
  const reasoningKeywords = ['how to', 'explain', 'analyze', 'optimize', 'best approach', 'design pattern', 'why', 'what is'];

  const isCoding = codingKeywords.some(keyword => lowerPrompt.includes(keyword));
  const isReasoning = reasoningKeywords.some(keyword => lowerPrompt.includes(keyword)) && !isCoding;

  if (isCoding) {
    return {
      mode: 'coding',
      maxTokens: 200000,
      temperature: 0.7
    };
  } else if (isReasoning) {
    return {
      mode: 'reasoning',
      maxTokens: 100000,
      temperature: 0.8
    };
  } else {
    return {
      mode: 'chat',
      maxTokens: 50000,
      temperature: 0.9
    };
  }
}

export async function generateWithGemini(
  userPrompt: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<GeminiResponse> {
  try {
    const taskMode = detectTaskMode(userPrompt);

    const messages = conversationHistory.slice(-6);
    const fullPrompt = `${ADVANCED_SYSTEM_PROMPT}\n\nPrevious conversation:\n${messages
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
          temperature: taskMode.temperature,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: taskMode.maxTokens,
          candidateCount: 1,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE'
          }
        ]
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

    const files = parseFilesFromResponse(generatedText);
    const message = extractMessageFromResponse(generatedText);

    return {
      message,
      files: files.length > 0 ? files : [],
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

  if (files.length === 0) {
    const codeBlockPattern = /```(\w+)\n([\s\S]*?)```/g;
    const codeBlocks: Array<{ lang: string; code: string }> = [];

    while ((match = codeBlockPattern.exec(text)) !== null) {
      codeBlocks.push({
        lang: match[1].toLowerCase(),
        code: match[2].trim(),
      });
    }

    codeBlocks.forEach((block) => {
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
      } else if (block.lang === 'typescript' || block.lang === 'ts') {
        fileName = 'script.ts';
        language = 'typescript';
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
  let message = text.replace(/### FILE:[\s\S]*?```\w+\n[\s\S]*?```/g, '').trim();

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
