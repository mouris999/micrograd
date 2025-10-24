import { Sparkles, Download, Upload, Code2, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { useAppStore } from '../lib/store';
import { toast } from 'sonner@2.0.3';

export function TopNav() {
  const { files, clearProject, showCodeEditor, toggleCodeEditor } = useAppStore();

  const handleExport = () => {
    // Create a simple export of all files
    const exportData = files.map((file) => ({
      name: file.name,
      content: file.content,
    }));
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-export.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Project exported successfully!');
  };

  const handleNewProject = () => {
    if (confirm('Are you sure you want to start a new project? This will clear all current work.')) {
      clearProject();
      toast.success('New project created!');
    }
  };

  return (
    <nav className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          <div className="absolute inset-0 blur-xl bg-cyan-400/30" />
        </div>
        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Builder Studio
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleCodeEditor}
          className={`${
            showCodeEditor 
              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' 
              : 'bg-white/5 border-white/10'
          } hover:bg-cyan-500/30`}
        >
          {showCodeEditor ? (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Hide Code
            </>
          ) : (
            <>
              <Code2 className="w-4 h-4 mr-2" />
              Show Code
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNewProject}
          className="bg-white/5 border-white/10 hover:bg-white/10"
        >
          <Upload className="w-4 h-4 mr-2" />
          New Project
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="bg-white/5 border-white/10 hover:bg-white/10"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </nav>
  );
}
