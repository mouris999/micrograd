import { FileData } from './store';

interface GenerationResult {
  message: string;
  files?: FileData[];
}

export function generateCodeFromPrompt(prompt: string): GenerationResult {
  const lowerPrompt = prompt.toLowerCase();

  // Todo app
  if (lowerPrompt.includes('todo') || lowerPrompt.includes('task')) {
    return {
      message: "I've created a beautiful todo app with Tailwind CSS! You can add, complete, and delete tasks. Try it out in the preview!",
      files: [
        {
          name: 'index.html',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen p-8">
  <div class="max-w-2xl mx-auto">
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
      <h1 class="text-4xl font-bold text-white mb-8 text-center">✨ My Tasks</h1>
      
      <div class="flex gap-2 mb-6">
        <input
          type="text"
          id="todoInput"
          placeholder="What needs to be done?"
          class="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          onclick="addTodo()"
          class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition"
        >
          Add
        </button>
      </div>

      <ul id="todoList" class="space-y-3">
      </ul>
    </div>
  </div>
</body>
</html>`,
        },
        {
          name: 'script.js',
          language: 'javascript',
          content: `let todos = [];

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  
  if (text) {
    todos.push({ id: Date.now(), text, completed: false });
    input.value = '';
    renderTodos();
  }
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = todos.map(todo => \`
    <li class="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition">
      <input
        type="checkbox"
        \${todo.completed ? 'checked' : ''}
        onchange="toggleTodo(\${todo.id})"
        class="w-5 h-5 rounded border-white/20"
      />
      <span class="flex-1 text-white \${todo.completed ? 'line-through opacity-50' : ''}">
        \${todo.text}
      </span>
      <button
        onclick="deleteTodo(\${todo.id})"
        class="text-red-400 hover:text-red-300 transition"
      >
        Delete
      </button>
    </li>
  \`).join('');
}

document.getElementById('todoInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});`,
        },
      ],
    };
  }

  // Calculator
  if (lowerPrompt.includes('calculator') || lowerPrompt.includes('calc')) {
    return {
      message: "Here's a functional calculator with a modern design! It supports basic arithmetic operations.",
      files: [
        {
          name: 'index.html',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calculator</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center p-8">
  <div class="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20 w-full max-w-sm">
    <div class="mb-4">
      <div id="display" class="bg-black/30 text-white text-right text-3xl p-6 rounded-xl min-h-[80px] flex items-center justify-end">0</div>
    </div>
    
    <div class="grid grid-cols-4 gap-3">
      <button onclick="clearDisplay()" class="col-span-2 p-4 bg-red-500/80 hover:bg-red-500 text-white rounded-xl transition">Clear</button>
      <button onclick="deleteLast()" class="p-4 bg-orange-500/80 hover:bg-orange-500 text-white rounded-xl transition">Del</button>
      <button onclick="appendOperator('/')" class="p-4 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl transition">÷</button>
      
      <button onclick="appendNumber('7')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">7</button>
      <button onclick="appendNumber('8')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">8</button>
      <button onclick="appendNumber('9')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">9</button>
      <button onclick="appendOperator('*')" class="p-4 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl transition">×</button>
      
      <button onclick="appendNumber('4')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">4</button>
      <button onclick="appendNumber('5')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">5</button>
      <button onclick="appendNumber('6')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">6</button>
      <button onclick="appendOperator('-')" class="p-4 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl transition">−</button>
      
      <button onclick="appendNumber('1')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">1</button>
      <button onclick="appendNumber('2')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">2</button>
      <button onclick="appendNumber('3')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">3</button>
      <button onclick="appendOperator('+')" class="p-4 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl transition">+</button>
      
      <button onclick="appendNumber('0')" class="col-span-2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">0</button>
      <button onclick="appendNumber('.')" class="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition">.</button>
      <button onclick="calculate()" class="p-4 bg-green-500/80 hover:bg-green-500 text-white rounded-xl transition">=</button>
    </div>
  </div>
</body>
</html>`,
        },
        {
          name: 'script.js',
          language: 'javascript',
          content: `let currentValue = '0';

function updateDisplay() {
  document.getElementById('display').textContent = currentValue;
}

function appendNumber(num) {
  if (currentValue === '0') {
    currentValue = num;
  } else {
    currentValue += num;
  }
  updateDisplay();
}

function appendOperator(op) {
  currentValue += op;
  updateDisplay();
}

function clearDisplay() {
  currentValue = '0';
  updateDisplay();
}

function deleteLast() {
  currentValue = currentValue.slice(0, -1) || '0';
  updateDisplay();
}

function calculate() {
  try {
    currentValue = eval(currentValue).toString();
  } catch {
    currentValue = 'Error';
  }
  updateDisplay();
}`,
        },
      ],
    };
  }

  // Landing page
  if (lowerPrompt.includes('landing') || lowerPrompt.includes('website') || lowerPrompt.includes('homepage')) {
    return {
      message: "I've created a stunning landing page with a hero section, features, and a call-to-action. Feel free to customize it!",
      files: [
        {
          name: 'index.html',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Landing</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
  <!-- Hero Section -->
  <div class="min-h-screen flex items-center justify-center px-8">
    <div class="text-center max-w-4xl">
      <h1 class="text-7xl font-bold mb-6 animate-pulse">🚀 Launch Your Dreams</h1>
      <p class="text-2xl mb-8 text-white/80">Build amazing products with our revolutionary platform</p>
      <button class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xl hover:scale-105 transition transform">
        Get Started Free
      </button>
    </div>
  </div>

  <!-- Features Section -->
  <div class="py-20 px-8 bg-black/20">
    <h2 class="text-5xl font-bold text-center mb-16">Why Choose Us</h2>
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:scale-105 transition">
        <div class="text-4xl mb-4">⚡</div>
        <h3 class="text-2xl font-bold mb-3">Lightning Fast</h3>
        <p class="text-white/70">Experience blazing speed and performance</p>
      </div>
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:scale-105 transition">
        <div class="text-4xl mb-4">🎨</div>
        <h3 class="text-2xl font-bold mb-3">Beautiful Design</h3>
        <p class="text-white/70">Stunning interfaces that users love</p>
      </div>
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:scale-105 transition">
        <div class="text-4xl mb-4">🔒</div>
        <h3 class="text-2xl font-bold mb-3">Secure</h3>
        <p class="text-white/70">Enterprise-grade security built-in</p>
      </div>
    </div>
  </div>

  <!-- CTA Section -->
  <div class="py-20 px-8 text-center">
    <h2 class="text-5xl font-bold mb-6">Ready to Start?</h2>
    <p class="text-xl mb-8 text-white/80">Join thousands of happy customers</p>
    <button class="px-8 py-4 bg-white text-purple-900 rounded-full text-xl hover:scale-105 transition transform">
      Start Building Now
    </button>
  </div>
</body>
</html>`,
        },
      ],
    };
  }

  // Default response
  return {
    message: `I understand you want to build: "${prompt}". Let me create a custom solution for you! Here's a starting template you can modify.`,
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen p-8">
  <div class="max-w-4xl mx-auto">
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 text-center">
      <h1 class="text-5xl font-bold text-white mb-4">✨ Your Custom App</h1>
      <p class="text-xl text-white/80 mb-6">Request: ${prompt}</p>
      <p class="text-white/60">Edit the code to customize your application!</p>
      <button class="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition">
        Get Started
      </button>
    </div>
  </div>
</body>
</html>`,
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `// Add your JavaScript here
console.log('App loaded!');

// Example: Add click handlers
document.querySelector('button')?.addEventListener('click', () => {
  alert('Button clicked!');
});`,
      },
    ],
  };
}
