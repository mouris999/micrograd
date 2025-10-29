import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Brain, Layers, Globe, Smartphone, Apple } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useAppStore } from '../lib/store';
import { ScrollArea } from './ui/scroll-area';
import { generateWithGemini } from '../lib/gemini-service';
import { toast } from 'sonner@2.0.3';
import { BuildDashboard } from './BuildDashboard';
import { AIOrchestrator, BuildProgress, AIKey } from '../lib/ai-orchestrator';

const TEMPLATES = [
  { id: 'todo', name: 'Todo App', icon: '📝', gradient: 'from-cyan-500 to-blue-500' },
  { id: 'calculator', name: 'Calculator', icon: '🔢', gradient: 'from-pink-500 to-purple-500' },
  { id: 'game', name: 'Game', icon: '🎮', gradient: 'from-green-500 to-emerald-500' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛍️', gradient: 'from-orange-500 to-red-500' },
  { id: 'music', name: 'Music Player', icon: '🎵', gradient: 'from-purple-500 to-indigo-500' },
  { id: 'gallery', name: 'Gallery', icon: '🖼️', gradient: 'from-pink-500 to-rose-500' },
  { id: 'dashboard', name: 'Dashboard', icon: '📊', gradient: 'from-cyan-500 to-teal-500' },
  { id: 'portfolio', name: 'Portfolio', icon: '💼', gradient: 'from-amber-500 to-orange-500' },
];

const PLATFORMS = [
  { id: 'web', name: 'Web', icon: Globe, color: 'cyan' },
  { id: 'android', name: 'Android', icon: Smartphone, color: 'green' },
  { id: 'ios', name: 'iOS', icon: Apple, color: 'gray' },
  { id: 'all', name: 'All', icon: Layers, color: 'purple' },
];

export function ChatPanel() {
  const [input, setInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'web' | 'android' | 'ios' | 'all'>('web');
  const [showBuildDashboard, setShowBuildDashboard] = useState(false);
  const [buildProgress, setBuildProgress] = useState<BuildProgress>({
    stage: 'Initializing',
    progress: 0,
    logs: [],
    activeAIs: 0,
    completedTasks: 0,
    totalTasks: 0,
  });
  const [aiStatus, setAIStatus] = useState<AIKey[]>([]);
  const [useOrchestrator, setUseOrchestrator] = useState(false);
  
  const { 
    messages, 
    addMessage, 
    isGenerating, 
    setIsGenerating, 
    setFiles,
    getConversationHistory,
    extraThinkMode,
    setExtraThinkMode
  } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const orchestratorRef = useRef<AIOrchestrator | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTemplateClick = (templateId: string) => {
    const prompts: Record<string, string> = {
      todo: 'Create a modern todo app with add, edit, delete, and mark as complete features',
      calculator: 'Build a calculator with basic operations and a clean UI',
      game: 'Create a simple memory matching game with cards',
      ecommerce: 'Build an e-commerce product page with cart functionality',
      music: 'Create a music player with playlist and controls',
      gallery: 'Build a photo gallery with lightbox and filters',
      dashboard: 'Create an analytics dashboard with charts and metrics',
      portfolio: 'Build a personal portfolio website with projects showcase',
    };
    setInput(prompts[templateId] || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage = input.trim();
    
    setInput('');
    addMessage(userMessage, 'user');
    setIsGenerating(true);

    // Use AI Orchestrator for multi-platform builds
    if (useOrchestrator) {
      setShowBuildDashboard(true);
      toast.info(`🚀 Activating 20 AI Team for ${selectedPlatform} build...`, {
        duration: 3000,
      });

      try {
        orchestratorRef.current = new AIOrchestrator((progress) => {
          setBuildProgress(progress);
          setAIStatus(orchestratorRef.current?.getAIStatus() || []);
        });

        const outputs = await orchestratorRef.current.buildApp(userMessage, selectedPlatform);
        
        if (outputs.length > 0) {
          const webOutput = outputs.find(o => o.platform === 'web');
          if (webOutput) {
            const files = Object.entries(webOutput.files).map(([name, content]) => ({
              name,
              content,
              language: name.endsWith('.html') ? 'html' : name.endsWith('.css') ? 'css' : 'javascript',
            }));
            
            setFiles(files);
            addMessage(
              `✅ Successfully built ${selectedPlatform} app with 20 AI collaboration!\n\n${buildProgress.logs.slice(-3).join('\n')}`,
              'assistant',
              files
            );
            toast.success('🎉 Build completed successfully!');
          }
        }
      } catch (error) {
        addMessage(
          `Build failed: ${error.message}. Switching to single AI mode...`,
          'assistant'
        );
        toast.error('Build failed, try single AI mode');
      } finally {
        setIsGenerating(false);
      }
      return;
    }

    // Standard single AI generation
    if (extraThinkMode) {
      toast.info('🧠 Extra Think Mode: Engaging deep reasoning...', {
        duration: 3000,
      });
    }

    try {
      const history = getConversationHistory();
      const result = await generateWithGemini(userMessage, history, extraThinkMode);
      
      let responseMessage = result.message;
      if (result.reasoning) {
        responseMessage = `🧠 **Deep Reasoning:**\n${result.reasoning}\n\n---\n\n${result.message}`;
      }
      
      addMessage(responseMessage, 'assistant', result.files);
      
      if (result.files && result.files.length > 0) {
        setFiles(result.files);
        toast.success(`Generated ${result.files.length} file(s) successfully!`);
      }
    } catch (error) {
      addMessage(
        `I apologize, but I encountered an error: ${error.message}. Please try again.`,
        'assistant'
      );
      toast.error('Failed to generate response');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0f0f14] border-r border-white/5">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm text-white/90">AI Assistant</h2>
        </div>
      </div>

      {/* Messages or Empty State */}
      {messages.length === 0 ? (
        <div className="flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white/20" />
            </div>
            <h3 className="text-white/90 text-center mb-2">AI Builder Studio</h3>
            <p className="text-sm text-white/40 text-center max-w-[240px]">
              Choose a template or describe what you want to build
            </p>
          </div>

          {/* Quick Start Templates */}
          <div className="px-4 pb-4">
            <h3 className="text-xs text-white/40 mb-3 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Quick Start Templates
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateClick(template.id)}
                  className={`p-3 rounded-lg bg-gradient-to-br ${template.gradient} bg-opacity-10 border border-white/10 hover:border-white/20 transition-all group`}
                >
                  <div className="text-2xl mb-1">{template.icon}</div>
                  <div className="text-xs text-white/90 group-hover:text-white">{template.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Platform Selection */}
          <div className="px-4 pb-4">
            <h3 className="text-xs text-white/40 mb-3">Select Platform:</h3>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatform === platform.id;
                
                let selectedClass = 'bg-white/5 border-white/10 text-white/60 hover:border-white/20';
                if (isSelected) {
                  if (platform.color === 'cyan') selectedClass = 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400';
                  else if (platform.color === 'green') selectedClass = 'bg-green-500/20 border-green-500/50 text-green-400';
                  else if (platform.color === 'gray') selectedClass = 'bg-gray-500/20 border-gray-500/50 text-gray-400';
                  else if (platform.color === 'purple') selectedClass = 'bg-purple-500/20 border-purple-500/50 text-purple-400';
                }
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id as any)}
                    className={`p-2.5 rounded-lg border transition-all ${selectedClass}`}
                  >
                    <Icon className="w-4 h-4 mb-1 mx-auto" />
                    <div className="text-xs">{platform.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 ${
                    message.role === 'user'
                      ? 'bg-cyan-500/20 text-white border border-cyan-500/30'
                      : 'bg-white/5 text-white/90 border border-white/10'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-white/60">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-white/5">
        {/* Mode Toggles */}
        <div className="flex items-center gap-2 mb-3">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setExtraThinkMode(!extraThinkMode)}
            className={`h-7 text-xs ${
              extraThinkMode
                ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            <Brain className="w-3 h-3 mr-1.5" />
            Extra Think {extraThinkMode && '✓'}
          </Button>

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setUseOrchestrator(!useOrchestrator)}
            className={`h-7 text-xs ${
              useOrchestrator
                ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
                : 'text-white/40 hover:text-white/60 hover:bg-white/5'
            }`}
          >
            <Layers className="w-3 h-3 mr-1.5" />
            20 AI Team {useOrchestrator && '✓'}
          </Button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build..."
            className="flex-1 min-h-[80px] max-h-[120px] resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        <div className="mt-2 text-xs text-white/30">
          💡 Tip: Enable "20 AI Team" for production apps
        </div>
      </div>

      {/* Build Dashboard */}
      <BuildDashboard
        isOpen={showBuildDashboard}
        onClose={() => setShowBuildDashboard(false)}
        progress={buildProgress}
        aiStatus={aiStatus}
      />
    </div>
  );
}
