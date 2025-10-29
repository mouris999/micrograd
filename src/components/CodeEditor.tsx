import { useEffect, useRef } from 'react';
import { useAppStore } from '../lib/store';
import { Code2 } from 'lucide-react';
import Editor from '@monaco-editor/react';

export function CodeEditor() {
  const { files, activeFile, setActiveFile, updateFile } = useAppStore();
  const editorRef = useRef<any>(null);

  const currentFile = files.find((f) => f.name === activeFile) || files[0];

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && currentFile) {
      updateFile(currentFile.name, value);
    }
  };

  useEffect(() => {
    if (files.length > 0 && !activeFile) {
      setActiveFile(files[0].name);
    }
  }, [files, activeFile, setActiveFile]);

  return (
    <div className="flex flex-col h-full bg-[#1a1a1f]">
      {/* Header with File Tabs */}
      <div className="px-3 py-2 border-b border-white/5 bg-[#0f0f14]">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-white/60">
            {currentFile?.name || 'index.html'}
          </span>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {files.map((file) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file.name)}
              className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-all ${
                activeFile === file.name
                  ? 'bg-[#2a2a2f] text-white border border-white/10'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/70'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        {currentFile ? (
          <Editor
            height="100%"
            language={currentFile.language}
            value={currentFile.content}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              padding: { top: 16 },
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/40 text-sm">
            No files to display
          </div>
        )}
      </div>
    </div>
  );
}
