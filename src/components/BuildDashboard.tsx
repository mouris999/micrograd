import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { AIKey, BuildProgress } from '../lib/ai-orchestrator';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';

interface BuildDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  progress: BuildProgress;
  aiStatus: AIKey[];
}

export function BuildDashboard({ isOpen, onClose, progress, aiStatus }: BuildDashboardProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Dashboard Panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-x-4 bottom-4 top-20 md:inset-x-auto md:right-4 md:left-auto md:w-[600px] bg-gradient-to-br from-gray-900 to-gray-950 border border-white/20 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-lg text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  AI Build Dashboard
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  {progress.completedTasks} / {progress.totalTasks} tasks completed • {progress.activeAIs} AIs active
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Progress */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/90">{progress.stage}</span>
                <span className="text-sm text-cyan-400">{progress.progress}%</span>
              </div>
              <Progress value={progress.progress} className="h-2" />
            </div>

            {/* AI Status Grid */}
            <div className="p-4 border-b border-white/10">
              <h3 className="text-sm text-white/90 mb-3">AI Team Status</h3>
              <div className="grid grid-cols-5 gap-2">
                {aiStatus.map((ai) => (
                  <div
                    key={ai.id}
                    className={`relative p-2 rounded-lg border transition-all ${
                      ai.status === 'working'
                        ? 'bg-cyan-500/20 border-cyan-500/50'
                        : ai.status === 'completed'
                        ? 'bg-green-500/20 border-green-500/50'
                        : ai.status === 'error'
                        ? 'bg-red-500/20 border-red-500/50'
                        : 'bg-white/5 border-white/10'
                    }`}
                    title={`${ai.role}\n${ai.currentTask || 'Idle'}`}
                  >
                    <div className="text-center">
                      <div className="text-xs text-white/90 mb-1">AI {ai.id}</div>
                      {ai.status === 'working' && (
                        <Loader2 className="w-3 h-3 animate-spin text-cyan-400 mx-auto" />
                      )}
                      {ai.status === 'completed' && (
                        <CheckCircle2 className="w-3 h-3 text-green-400 mx-auto" />
                      )}
                      {ai.status === 'error' && (
                        <AlertCircle className="w-3 h-3 text-red-400 mx-auto" />
                      )}
                      {ai.status === 'idle' && (
                        <div className="w-3 h-3 rounded-full bg-white/20 mx-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Build Logs */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-4 pb-2">
                <h3 className="text-sm text-white/90">Build Logs</h3>
              </div>
              <ScrollArea className="flex-1 px-4 pb-4">
                <div className="space-y-1 font-mono text-xs">
                  {progress.logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-2 rounded ${
                        log.includes('✓') || log.includes('✅')
                          ? 'text-green-400 bg-green-500/10'
                          : log.includes('✗') || log.includes('❌')
                          ? 'text-red-400 bg-red-500/10'
                          : log.includes('⚠️')
                          ? 'text-yellow-400 bg-yellow-500/10'
                          : 'text-white/70'
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
