# 📖 AI Builder Studio - Usage Guide

## 🚀 Getting Started

### First Time Usage

1. **Open the Application**
   - The interface has 3 panels: Chat (left), Code Editor (center), Preview (right)
   - Start with the Quick Start templates or type your own request

2. **Choose a Template** (Optional)
   - Click any template card for instant project generation
   - Templates include: Todo, Calculator, Games, E-commerce, etc.

3. **Or Describe Your Project**
   - Type what you want to build in natural language
   - Be as detailed or as vague as you like
   - The AI will ask for clarification if needed

## 💡 Writing Effective Prompts

### Beginner Level

**Simple and Clear:**
```
Create a counter with buttons to increment and decrement
```

**What You Get:**
- Complete HTML structure
- Working JavaScript
- Styled with Tailwind CSS
- Accessible buttons
- Visual feedback

### Intermediate Level

**More Specific:**
```
Build a todo list app with:
- Add and delete tasks
- Mark tasks as complete
- Filter by status (all, active, completed)
- Save to local storage
- Dark mode design
```

**What You Get:**
- Multi-file project
- State management
- Local storage persistence
- Responsive design
- Smooth animations

### Advanced Level

**Very Detailed:**
```
Create an e-commerce product page with:
- Product image gallery with zoom
- Size and color selection
- Add to cart with quantity
- Related products section
- Customer reviews with ratings
- Responsive design for mobile
- Shopping cart sidebar
- Checkout modal
```

**What You Get:**
- Professional-grade code
- Complex interactions
- Advanced UI patterns
- Performance optimized
- Production-ready

## 🧠 Using Extra Think Mode

### When to Use Extra Think

✅ **Use for:**
- Complex multi-feature applications
- Novel or unusual requirements
- Performance-critical projects
- Accessibility-focused builds
- Production applications
- Learning best practices

❌ **Skip for:**
- Simple single-feature apps
- Quick prototypes
- Minor modifications
- Template-based projects

### How to Activate

1. Click the "Extra Think" button below the chat
2. It will highlight in purple when active
3. Type your request
4. AI will engage deep reasoning mode
5. Wait for comprehensive analysis

### What Extra Think Does

- **Extended Analysis** (200+ tokens of thinking)
- **Multiple Approaches** considered
- **Trade-off Evaluation** for each solution
- **Best Practices** research
- **Future-Proofing** considerations
- **Edge Cases** identification
- **Security Review** included

## 📝 Example Prompts by Category

### 🎮 Games

**Simple:**
```
Make a rock paper scissors game
```

**Medium:**
```
Create a memory card matching game with difficulty levels
```

**Complex:**
```
Build a Snake game with high scores, levels, and power-ups
```

### 📊 Data & Charts

**Simple:**
```
Create a bar chart showing monthly sales
```

**Medium:**
```
Build a dashboard with pie charts, line graphs, and metrics cards
```

**Complex:**
```
Make an analytics dashboard with real-time data visualization, filters, and export functionality
```

### 🛒 E-Commerce

**Simple:**
```
Product card with image, price, and add to cart button
```

**Medium:**
```
Shopping cart with item management and total calculation
```

**Complex:**
```
Full product listing page with filters, sorting, pagination, cart, and checkout flow
```

### 📱 Apps

**Simple:**
```
Weather display showing temperature and conditions
```

**Medium:**
```
Note-taking app with categories and search
```

**Complex:**
```
Project management tool with tasks, deadlines, team members, and progress tracking
```

### 🎨 Creative

**Simple:**
```
Color picker tool
```

**Medium:**
```
Image gallery with lightbox and filtering
```

**Complex:**
```
Photo editor with filters, cropping, text overlay, and export
```

## 🔧 Working with Generated Code

### Viewing Code

1. **File Explorer** - Click dropdown in code editor
2. **Switch Files** - Click any file name to view
3. **Syntax Highlighting** - Automatic based on file type

### Editing Code

1. **Direct Editing** - Click in editor and type
2. **Auto-Save** - Changes apply immediately to preview
3. **Undo/Redo** - Ctrl+Z / Ctrl+Y (Cmd on Mac)

### Managing Files

**View Files:**
- Click the folder icon in editor toolbar
- See all generated files
- Switch between them

**Edit Files:**
- Make changes directly in Monaco editor
- Preview updates in real-time
- No save button needed

## 🔄 Iterative Development

### Building on Previous Code

**Request modifications:**
```
Add a search feature to the todo app
```

**The AI:**
- Remembers existing code
- Adds new features
- Maintains consistency
- Preserves your edits

### Making Improvements

**Ask for enhancements:**
```
Make it more colorful and add animations
```

**Ask for fixes:**
```
The mobile layout looks broken, can you fix it?
```

**Ask for features:**
```
Add dark mode toggle
```

## 🐛 Handling Errors

### When Errors Occur

**You'll See:**
- Red error banner in preview
- Error message and stack trace
- "Auto Fix Error" button appears

**What to Do:**
1. **Read the Error** - Understand what's wrong
2. **Click Auto Fix** - Let AI fix it automatically
3. **Or Describe Issue** - Tell AI what's not working

### Error Fix Process

1. **Click "Auto Fix Error"**
2. **AI Analyzes:**
   - Error message
   - Code context
   - Root cause
3. **AI Fixes:**
   - Updates affected files
   - Tests mentally
   - Applies changes
4. **Preview Updates:**
   - Error disappears
   - App works correctly

### Manual Debugging

**Describe the problem:**
```
The submit button doesn't work when I click it
```

**AI will:**
- Examine the code
- Identify the issue
- Fix and explain
- Update preview

## 🎯 Best Practices

### Writing Prompts

✅ **Do:**
- Be specific about features
- Mention preferred technologies
- Describe the user experience
- Specify design preferences
- Request accessibility features

❌ **Don't:**
- Use overly technical jargon unnecessarily
- Expect mind-reading (be clear)
- Request impossible features
- Skip important requirements

### Using the Tool

✅ **Do:**
- Review generated code
- Test all features
- Request improvements
- Save your work (Export)
- Learn from the code

❌ **Don't:**
- Blindly copy without understanding
- Ignore error messages
- Skip testing edge cases
- Forget to export important projects

## 💾 Saving Your Work

### Export Project

1. **Click Export** in top navigation
2. **Downloads JSON file** with all code
3. **Contains:**
   - All file contents
   - File names and types
   - Complete project structure

### Starting Fresh

1. **Click "New Project"** in top nav
2. **Confirms** before clearing
3. **Resets** to welcome screen
4. **Previous work** is lost (export first!)

## 🎨 Customizing Design

### Request Specific Styles

**Color Schemes:**
```
Use a blue and green color palette
```

**Layouts:**
```
Make it a single-page layout with sections
```

**Frameworks:**
```
Use Tailwind CSS for styling
```

### Design Modifications

**Change existing design:**
```
Make the buttons bigger and more rounded
```

```
Add a gradient background
```

```
Use a card-based layout instead
```

## 📱 Responsive Design

### Request Mobile-Friendly

```
Make it fully responsive for mobile devices
```

**AI will:**
- Add viewport meta tag
- Use responsive Tailwind classes
- Test breakpoints
- Ensure touch-friendly

### Testing Responsiveness

1. **Click Mobile Icon** in preview toolbar
2. **View** 375px mobile layout
3. **Click Desktop Icon** to return
4. **Request fixes** if layout breaks

## 🚀 Advanced Usage

### Multi-Step Projects

**Step 1:**
```
Create a blog post card component
```

**Step 2:**
```
Now create a grid of these cards
```

**Step 3:**
```
Add pagination and search to the blog grid
```

**Step 4:**
```
Create a detailed post view when clicking a card
```

### Complex Requirements

**Use Extra Think for:**
```
Build a social media dashboard with:
- User authentication UI
- Post creation and editing
- Comment system with threading
- Like and share functionality
- Notification center
- User profile pages
- Dark/light theme toggle
- Responsive for all devices
- Performance optimized
- Accessibility compliant
```

### Code Optimization

**Request improvements:**
```
Can you optimize this code for better performance?
```

```
Make this more accessible for screen readers
```

```
Refactor this to be more maintainable
```

## 📚 Learning Mode

### Understanding Generated Code

**Ask for explanations:**
```
Can you explain how the drag and drop works?
```

**Request variations:**
```
Show me another way to implement this
```

**Learn patterns:**
```
What are the best practices for form validation?
```

## 🔍 Troubleshooting

### Preview Not Updating

1. Click the refresh button
2. Check for JavaScript errors
3. Use Auto Fix if errors present

### Code Not Generated

1. Check your internet connection
2. Verify prompt is clear
3. Try rephrasing request
4. Use Extra Think for complex requests

### Errors After Editing

1. Review your changes
2. Check syntax
3. Use Auto Fix
4. Or describe the issue to AI

## 🎓 Tips for Success

### For Beginners

1. Start with templates
2. Make small modifications
3. Learn from generated code
4. Ask questions
5. Experiment freely

### For Intermediate Users

1. Be specific in prompts
2. Use iterative development
3. Review and learn patterns
4. Customize generated code
5. Build complex features step-by-step

### For Advanced Users

1. Use Extra Think for production code
2. Request specific patterns
3. Focus on architecture
4. Optimize for performance
5. Ensure accessibility and security

---

## 🎯 Quick Reference

### Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in chat
- `Ctrl/Cmd + Z` - Undo in editor
- `Ctrl/Cmd + Y` - Redo in editor

### Common Requests

- "Make it responsive"
- "Add dark mode"
- "Fix the mobile layout"
- "Add loading states"
- "Improve accessibility"
- "Optimize performance"
- "Add error handling"

### Features to Request

- Form validation
- Loading spinners
- Toast notifications
- Modal dialogs
- Dropdown menus
- Tabs and accordions
- Carousels and sliders
- Charts and graphs

---

**Happy Building! 🚀✨**

*Remember: The AI is here to help you learn and build. Don't hesitate to ask questions, request changes, or experiment with ideas!*
