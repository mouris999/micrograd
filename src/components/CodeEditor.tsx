import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../lib/store';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Code2, FileCode, FileJson, FolderOpen, Plus, X } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function CodeEditor() {
  const { files, activeFile, setActiveFile, updateFile, createNewFile } = useAppStore();
  const editorRef = useRef<any>(null);
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState<'html' | 'javascript' | 'css' | 'json'>('html');

  const currentFile = files.find((f) => f.name === activeFile);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && currentFile) {
      updateFile(currentFile.name, value);
    }
  };

  const getIcon = (fileName: string) => {
    if (fileName.endsWith('.html')) return <Code2 className="w-4 h-4" />;
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) return <FileCode className="w-4 h-4" />;
    if (fileName.endsWith('.json')) return <FileJson className="w-4 h-4" />;
    return <FileCode className="w-4 h-4" />;
  };

  const handleCreateNewFile = () => {
    if (!newFileName.trim()) return;

    const extension = newFileType === 'javascript' ? 'js' : newFileType;
    const fileName = newFileName.includes('.') ? newFileName : `${newFileName}.${extension}`;
    
    const templates: Record<string, string> = {
      html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>',
      javascript: '// Add your JavaScript code here\n',
      css: '/* Add your CSS styles here */\n',
      json: '{\n  \n}',
    };

    createNewFile({
      name: fileName,
      language: newFileType === 'javascript' ? 'javascript' : newFileType,
      content: templates[newFileType] || '',
    });

    setNewFileName('');
    setIsNewFileDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-sm">
      <Tabs value={activeFile} onValueChange={setActiveFile} className="w-full">
        <div className="border-b border-white/10 px-4 pt-2 flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <FolderOpen className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-gray-900 border-white/10">
              <DropdownMenuLabel className="text-white/90">Files</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {files.map((file) => (
                <DropdownMenuItem
                  key={file.name}
                  onClick={() => setActiveFile(file.name)}
                  className="text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <span className="mr-2">{getIcon(file.name)}</span>
                  {file.name}
                  {file.name === activeFile && (
                    <span className="ml-auto text-cyan-400">●</span>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => setIsNewFileDialogOpen(true)}
                className="text-cyan-400 hover:text-cyan-300 hover:bg-white/10 cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                New File
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TabsList className="bg-white/5 border border-white/10 flex-1">
            {files.map((file) => (
              <TabsTrigger
                key={file.name}
                value={file.name}
                className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white"
              >
                <span className="mr-2">{getIcon(file.name)}</span>
                {file.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      <div className="flex-1 overflow-hidden">
        {currentFile && (
          <Editor
            height="100%"
            language={currentFile.language}
            value={currentFile.content}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
            }}
          />
        )}
      </div>

      {/* New File Dialog */}
      <Dialog open={isNewFileDialogOpen} onOpenChange={setIsNewFileDialogOpen}>
        <DialogContent className="bg-gray-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription className="text-white/60">
              Add a new file to your project
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filename">File Name</Label>
              <Input
                id="filename"
                placeholder="e.g., main.js or about.html"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateNewFile();
                }}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filetype">File Type</Label>
              <Select value={newFileType} onValueChange={(value: any) => setNewFileType(value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  <SelectItem value="html" className="text-white">HTML</SelectItem>
                  <SelectItem value="javascript" className="text-white">JavaScript</SelectItem>
                  <SelectItem value="css" className="text-white">CSS</SelectItem>
                  <SelectItem value="json" className="text-white">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewFileDialogOpen(false)}
              className="bg-white/5 border-white/10 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateNewFile}
              disabled={!newFileName.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
