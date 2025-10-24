import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Sparkles, Code2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useAppStore } from '../lib/store';
import { ScrollArea } from './ui/scroll-area';
import { generateWithGemini } from '../lib/gemini-service';
import { Badge } from './ui/badge';

export function ChatPanel() {
  const [input, setInput] = useState('');
  const { 
    messages, 
    addMessage, 
    isGenerating, 
    setIsGenerating, 
    setFiles,
    getConversationHistory 
  } = useAppStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, 'user');
    setIsGenerating(true);

    try {
      // Get conversation history for context
      const history = getConversationHistory();
      
      // Generate with Gemini AI
      const result = await generateWithGemini(userMessage, history);
      
      // Add AI response
      addMessage(result.message, 'assistant', result.files);
      
      // Update files if generated
      if (result.files && result.files.length > 0) {
        setFiles(result.files);
      }
    } catch (error) {
      addMessage(
        `I apologize, but I encountered an error: ${error.message}. Please try again.`,
        'assistant'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-sm">
      <div className="p-4 border-b border-white/10">
        <h2 className="flex items-center gap-2 text-white/90">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          AI Assistant
        </h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div ref={scrollRef} className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-white/40 py-12">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="mb-2">Start a conversation</p>
              <p className="text-sm">Try: "Build a todo app with React"</p>
            </div>
          )}
          
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-white/10 text-white/90 border border-white/10'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  
                  {message.files && message.files.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-white/60">Generated files:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {message.files.map((file) => (
                          <Badge
                            key={file.name}
                            variant="outline"
                            className="bg-cyan-500/10 border-cyan-500/30 text-cyan-300 text-xs"
                          >
                            {file.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3 bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <Loader2 className="w-5 h-5 animate-spin text-cyan-400 mt-0.5" />
              <div>
                <p className="text-white/90 text-sm mb-1">Thinking and generating code...</p>
                <p className="text-white/50 text-xs">This may take a few seconds</p>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Describe what you want to build..."
            className="min-h-[60px] bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
            disabled={isGenerating}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isGenerating}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 h-[60px] w-[60px] shrink-0"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
