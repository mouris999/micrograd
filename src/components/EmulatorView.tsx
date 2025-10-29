import { motion } from 'motion/react';
import { Smartphone, Monitor, Maximize2 } from 'lucide-react';
import { useState } from 'react';

interface EmulatorViewProps {
  platform: 'web' | 'android' | 'ios';
  htmlContent: string;
}

export function EmulatorView({ platform, htmlContent }: EmulatorViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getDeviceFrame = () => {
    if (platform === 'android') {
      return {
        width: 360,
        height: 640,
        name: 'Android Device',
        notchHeight: 24,
        borderRadius: 32,
      };
    } else if (platform === 'ios') {
      return {
        width: 390,
        height: 844,
        name: 'iPhone 14',
        notchHeight: 44,
        borderRadius: 40,
      };
    } else {
      return {
        width: '100%',
        height: '100%',
        name: 'Web Browser',
        notchHeight: 0,
        borderRadius: 8,
      };
    }
  };

  const device = getDeviceFrame();
  const isMobile = platform === 'android' || platform === 'ios';

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Device Info */}
      <div className="flex items-center gap-2 mb-4">
        {isMobile ? (
          <Smartphone className="w-4 h-4 text-white/60" />
        ) : (
          <Monitor className="w-4 h-4 text-white/60" />
        )}
        <span className="text-sm text-white/60">{device.name}</span>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="ml-auto p-1 hover:bg-white/10 rounded transition-colors"
        >
          <Maximize2 className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Device Frame */}
      <motion.div
        layout
        className={`relative bg-gray-900 shadow-2xl ${isFullscreen ? 'w-full h-full' : ''}`}
        style={{
          width: isFullscreen ? '100%' : isMobile ? device.width : '100%',
          height: isFullscreen ? '100%' : isMobile ? device.height : '100%',
          borderRadius: device.borderRadius,
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        {/* Device Notch (for mobile) */}
        {isMobile && device.notchHeight > 0 && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-2xl z-10"
            style={{
              width: platform === 'ios' ? '150px' : '200px',
              height: device.notchHeight,
            }}
          >
            {platform === 'ios' && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-950 rounded-full" />
            )}
          </div>
        )}

        {/* Screen */}
        <div
          className="w-full h-full overflow-hidden"
          style={{
            borderRadius: device.borderRadius,
            paddingTop: isMobile ? device.notchHeight : 0,
          }}
        >
          <iframe
            srcDoc={htmlContent}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin"
            title={`${platform} preview`}
          />
        </div>

        {/* Home Indicator (iOS) */}
        {platform === 'ios' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
        )}

        {/* Navigation Buttons (Android) */}
        {platform === 'android' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-8">
            <div className="w-8 h-8 rounded-full bg-white/20" />
            <div className="w-8 h-8 rounded-full bg-white/20" />
            <div className="w-8 h-8 rounded-full bg-white/20" />
          </div>
        )}
      </motion.div>

      {/* Device Info Footer */}
      <div className="mt-4 text-xs text-white/40">
        {isMobile ? (
          <span>
            {device.width} × {device.height} • Mobile Emulator
          </span>
        ) : (
          <span>Responsive Web Preview</span>
        )}
      </div>
    </div>
  );
}
