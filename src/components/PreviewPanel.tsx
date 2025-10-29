import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from '../lib/store';
import { RefreshCw, Smartphone, Monitor, Layers, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { EmulatorView } from './EmulatorView';

export function PreviewPanel() {
  const { files, previewKey, refreshPreview } = useAppStore();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'emulator'>('desktop');
  const [emulatorPlatform, setEmulatorPlatform] = useState<'web' | 'android' | 'ios'>('web');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generateHTML = () => {
    const htmlFile = files.find((f) => f.language === 'html');
    const cssFile = files.find((f) => f.language === 'css');
    const jsFile = files.find((f) => f.language === 'javascript');

    if (!htmlFile) {
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Builder</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-center;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .container {
              text-align: center;
              color: white;
              padding: 2rem;
            }
            .icon {
              font-size: 4rem;
              margin-bottom: 1rem;
              animation: float 3s ease-in-out infinite;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            h1 {
              font-size: 2.5rem;
              margin: 0 0 1rem 0;
              font-weight: 600;
            }
            p {
              font-size: 1.1rem;
              opacity: 0.9;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">✨</div>
            <h1>AI Builder</h1>
            <p>Start chatting to generate your app!</p>
          </div>
        </body>
        </html>
      `;
    }

    let html = htmlFile.content;

    if (cssFile && !html.includes('<style>') && !html.includes('</style>')) {
      html = html.replace('</head>', `<style>${cssFile.content}</style></head>`);
    }

    if (jsFile && !html.includes('<script>') && !html.includes('</script>')) {
      html = html.replace('</body>', `<script>${jsFile.content}</script></body>`);
    }

    return html;
  };

  useEffect(() => {
    if (iframeRef.current && viewMode !== 'emulator') {
      const html = generateHTML();
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
      }
    }
  }, [files, previewKey, viewMode]);

  return (
    <div className="h-full flex flex-col bg-[#1a1a1f]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 bg-[#0f0f14] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm text-white/90">Live Preview</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Buttons */}
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('desktop')}
              className={`h-7 px-2 ${
                viewMode === 'desktop' ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('mobile')}
              className={`h-7 px-2 ${
                viewMode === 'mobile' ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setViewMode('emulator');
                setEmulatorPlatform('android');
              }}
              className={`h-7 px-2 ${
                viewMode === 'emulator' ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
              title="Emulator View"
            >
              <Layers className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={refreshPreview}
            className="h-7 px-2 hover:bg-white/5"
            title="Refresh Preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 flex items-center justify-center overflow-auto bg-[#0a0a0f]">
        {viewMode === 'emulator' ? (
          <div className="w-full h-full">
            {/* Emulator platform selector */}
            <div className="flex gap-2 justify-center mb-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEmulatorPlatform('web')}
                className={`h-8 ${
                  emulatorPlatform === 'web'
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                }`}
              >
                Web
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEmulatorPlatform('android')}
                className={`h-8 ${
                  emulatorPlatform === 'android'
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                }`}
              >
                Android
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEmulatorPlatform('ios')}
                className={`h-8 ${
                  emulatorPlatform === 'ios'
                    ? 'bg-gray-500/20 border-gray-500/50 text-gray-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                }`}
              >
                iOS
              </Button>
            </div>
            <EmulatorView platform={emulatorPlatform} htmlContent={generateHTML()} />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
