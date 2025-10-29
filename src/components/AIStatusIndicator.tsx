import { motion, AnimatePresence } from 'motion/react';
import { Brain, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface AIStatusIndicatorProps {
  isGenerating: boolean;
  extraThinkMode: boolean;
}

export function AIStatusIndicator({ isGenerating, extraThinkMode }: AIStatusIndicatorProps) {
  if (!isGenerating && !extraThinkMode) return null;

  return (
    <AnimatePresence>
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-purple-500/30 rounded-full px-6 py-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                {extraThinkMode ? (
                  <Brain className="w-5 h-5 text-purple-400" />
                ) : (
                  <Cpu className="w-5 h-5 text-cyan-400" />
                )}
              </motion.div>
              
              <div className="flex flex-col">
                <span className="text-sm text-white">
                  {extraThinkMode ? 'Deep Thinking...' : 'Generating Code...'}
                </span>
                <div className="flex gap-1 mt-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-1.5 h-1.5 rounded-full bg-purple-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  />
                </div>
              </div>
              
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
      
      {extraThinkMode && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="bg-purple-500/20 backdrop-blur-xl border border-purple-500/50 rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-xs text-purple-300">Extra Think Active</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
