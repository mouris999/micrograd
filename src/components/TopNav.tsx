import { Sparkles, Code2, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { useAppStore } from '../lib/store';
import { Badge } from './ui/badge';

export function TopNav() {
  const { showCodeEditor, toggleCodeEditor } = useAppStore();

  return (
    <div className="h-14 border-b border-white/5 bg-[#0f0f14] flex items-center justify-between px-4">
      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="text-white">AI Builder Studio</span>
        </div>
        <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5">
          Powered by 20 AI Agents
        </Badge>
        <Badge variant="outline" className="bg-green-500/20 border-green-500/50 text-green-300 text-[10px] px-2 py-0.5">
          READY
        </Badge>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCodeEditor}
          className={`h-8 ${
            showCodeEditor 
              ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          {showCodeEditor ? (
            <>
              <EyeOff className="w-4 h-4 mr-1.5" />
              Hide Code
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-1.5" />
              Show Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
