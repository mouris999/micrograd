import { AppProvider, useAppStore } from './lib/store';
import { TopNav } from './components/TopNav';
import { ChatPanel } from './components/ChatPanel';
import { CodeEditor } from './components/CodeEditor';
import { PreviewPanel } from './components/PreviewPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';
import { Toaster } from './components/ui/sonner';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { showCodeEditor } = useAppStore();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 text-white overflow-hidden">
      <TopNav />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Chat Panel */}
        <ResizablePanel defaultSize={showCodeEditor ? 25 : 35} minSize={20} maxSize={50}>
          <ChatPanel />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-white/10 hover:bg-cyan-500/50 transition" />

        {/* Code Editor - Conditionally rendered */}
        <AnimatePresence mode="sync">
          {showCodeEditor && (
            <>
              <ResizablePanel defaultSize={40} minSize={30} maxSize={60}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <CodeEditor />
                </motion.div>
              </ResizablePanel>

              <ResizableHandle className="w-1 bg-white/10 hover:bg-cyan-500/50 transition" />
            </>
          )}
        </AnimatePresence>

        {/* Preview Panel */}
        <ResizablePanel defaultSize={showCodeEditor ? 35 : 65} minSize={25}>
          <PreviewPanel />
        </ResizablePanel>
      </ResizablePanelGroup>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
