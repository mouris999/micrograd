import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../lib/store';
import { RefreshCw, Smartphone, Monitor, AlertCircle, Wrench } from 'lucide-react';
import { Button } from './ui/button';
import { fixCodeErrors } from '../lib/gemini-service';
import { toast } from 'sonner@2.0.3';

export function PreviewPanel() {
  const { 
    files, 
    previewKey, 
    lastError, 
    setLastError, 
    setFiles,
    setIsGenerating,
    addMessage,
    getConversationHistory 
  } = useAppStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFixing, setIsFixing] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;

    const htmlFile = files.find((f) => f.name === 'index.html');
    const jsFile = files.find((f) => f.name === 'script.js');
    const cssFile = files.find((f) => f.name === 'styles.css');

    if (!htmlFile) return;

    let htmlContent = htmlFile.content;

    // Inject CSS if exists
    if (cssFile) {
      const cssTag = `<style>${cssFile.content}</style>`;
      htmlContent = htmlContent.replace('</head>', `${cssTag}</head>`);
    }

    // Inject JS with error handling
    if (jsFile) {
      const wrappedJs = `
        window.addEventListener('error', function(e) {
          window.parent.postMessage({ type: 'error', message: e.message, stack: e.error?.stack }, '*');
        });
        
        window.addEventListener('unhandledrejection', function(e) {
          window.parent.postMessage({ type: 'error', message: e.reason }, '*');
        });
        
        try {
          ${jsFile.content}
        } catch(e) {
          window.parent.postMessage({ type: 'error', message: e.message, stack: e.stack }, '*');
        }
      `;
      const jsTag = `<script>${wrappedJs}</script>`;
      htmlContent = htmlContent.replace('</body>', `${jsTag}</body>`);
    }

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
    }

    // Clear previous errors
    setLastError(null);
  }, [files, previewKey]);

  // Listen for errors from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'error') {
        const errorMsg = `${event.data.message}\n${event.data.stack || ''}`;
        setLastError(errorMsg);
        console.error('Preview Error:', errorMsg);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setLastError]);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    setLastError(null);
  };

  const handleAutoFix = async () => {
    if (!lastError || isFixing) return;

    setIsFixing(true);
    toast.info('AI is analyzing and fixing the error...');

    try {
      const history = getConversationHistory();
      const result = await fixCodeErrors(lastError, files, history);

      if (result.files && result.files.length > 0) {
        setFiles(result.files);
        addMessage(`Fixed the error: ${result.message}`, 'assistant', result.files);
        toast.success('Code fixed successfully!');
        setLastError(null);
      } else {
        toast.error('Could not automatically fix the error');
      }
    } catch (error) {
      toast.error('Failed to fix error automatically');
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-sm">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-white/90">Live Preview</h2>
        
        <div className="flex items-center gap-2">
          {lastError && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAutoFix}
              disabled={isFixing}
              className="bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30"
            >
              {isFixing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Fixing...
                </>
              ) : (
                <>
                  <Wrench className="w-4 h-4 mr-2" />
                  Auto Fix Error
                </>
              )}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('desktop')}
            className={viewMode === 'desktop' ? 'bg-white/10' : ''}
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('mobile')}
            className={viewMode === 'mobile' ? 'bg-white/10' : ''}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {lastError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-red-300 mb-1">Error in Preview:</p>
              <pre className="text-xs text-red-200/80 overflow-auto max-h-20 font-mono">
                {lastError}
              </pre>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex-1 p-4 flex items-center justify-center">
        <motion.div
          key={viewMode}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={`bg-white rounded-lg shadow-2xl overflow-hidden ${
            viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full'
          }`}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            title="preview"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </motion.div>
      </div>
    </div>
  );
}
