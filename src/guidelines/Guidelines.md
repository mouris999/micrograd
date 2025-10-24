# Advanced Gemini 2.5 Flash Coding System

## Overview
This application now uses an advanced AI coding system powered by Gemini 2.5 Flash with intelligent task detection and optimized token allocation.

## Features

### <� Automatic Task Mode Detection
The system automatically detects what type of task you're requesting:

1. **CODING MODE** (200,000 tokens)
   - Triggered by: "build", "create", "code", "implement", "develop", "fix", "debug"
   - Generates complete, production-ready code
   - No placeholders or TODOs
   - Full error handling and validation

2. **REASONING MODE** (100,000 tokens)
   - Triggered by: "how to", "explain", "analyze", "optimize", "design pattern"
   - Provides detailed technical explanations
   - System architecture analysis
   - Performance optimization strategies

3. **CHAT MODE** (50,000 tokens)
   - General conversation and simple questions
   - Quick clarifications
   - Non-technical discussions

###  Code Quality Standards

Every generated code includes:
- Complete, production-ready implementation (no placeholders)
- Comprehensive error handling
- Input validation for all user inputs
- Security best practices (XSS protection, sanitization)
- Performance optimization
- Responsive design with Tailwind CSS
- Accessibility features (ARIA labels, keyboard navigation)
- Clear comments explaining complex logic

### <� Design Principles

All generated applications feature:
- Modern, clean, and professional aesthetics
- Gradient backgrounds with backdrop blur effects
- Smooth transitions and hover states
- Mobile-first responsive design
- Proper contrast and readability
- Loading states and error messages

### = Security

Built-in security measures:
- Input sanitization
- XSS protection
- No hardcoded sensitive data
- Secure API patterns

## API Configuration

The Gemini API key is configured in `.env`:
```
VITE_GEMINI_API_KEY=AIzaSyBrpOUatVTrYUbzqnPE7gfg3w5HaVjaTQg
```

## Usage Examples

### Building an Application
```
"Build a todo app with local storage"
"Create a calculator with scientific functions"
"Make a weather dashboard"
```

### Getting Explanations
```
"Explain how React hooks work"
"What's the best approach for state management?"
"Analyze this code's performance"
```

### General Chat
```
"What can you help me with?"
"How do I use this tool?"
```

## File Output Format

The AI generates files using this format:
```
### FILE: filename.ext
\`\`\`language
[complete code here]
\`\`\`
```

All generated files appear automatically in the code editor and preview panel.

## Advanced Features

- **Conversation History**: Maintains context across messages
- **Error Recovery**: Automatic error detection and fixing
- **Code Parsing**: Intelligent file extraction from responses
- **Multiple File Support**: Generate complete multi-file projects
- **Token Optimization**: Allocates tokens based on task complexity

## Technical Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Gemini 2.5 Flash (gemini-2.0-flash-exp model)
- **Code Editor**: Monaco Editor
- **UI Components**: Radix UI + shadcn/ui

## Best Practices

1. Be specific in your requests
2. Provide context when asking follow-up questions
3. Test generated code in the preview panel
4. Report errors for automatic fixing
5. Request modifications incrementally

## Limitations

- Maximum output tokens: 200,000 (coding mode)
- API rate limits apply
- Complex applications may require multiple iterations
- Internet connection required for AI generation

## Troubleshooting

If you encounter issues:
1. Check the browser console for error messages
2. Verify the API key is correctly configured
3. Ensure you have a stable internet connection
4. Try rephrasing your request if the output isn't what you expected
5. Use the error fixing feature by describing the issue

## Future Enhancements

Planned improvements:
- Database integration with Supabase
- Authentication system
- Export projects as ZIP files
- Template library
- Code collaboration features
- Version history
