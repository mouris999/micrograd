import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface FileData {
  name: string;
  content: string;
  language: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  files?: FileData[];
}

interface AppState {
  messages: Message[];
  files: FileData[];
  activeFile: string;
  isGenerating: boolean;
  previewKey: number;
  showCodeEditor: boolean;
  lastError: string | null;
  extraThinkMode: boolean;
}

interface AppContextType extends AppState {
  addMessage: (content: string, role: 'user' | 'assistant', files?: FileData[]) => void;
  updateFile: (fileName: string, content: string) => void;
  setActiveFile: (fileName: string) => void;
  createNewFile: (file: FileData) => void;
  setFiles: (files: FileData[]) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  refreshPreview: () => void;
  clearProject: () => void;
  toggleCodeEditor: () => void;
  setLastError: (error: string | null) => void;
  getConversationHistory: () => Array<{ role: string; content: string }>;
  setExtraThinkMode: (mode: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultFiles: FileData[] = [
  {
    name: 'index.html',
    language: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center">
  <div class="text-center text-white">
    <h1 class="text-6xl font-bold mb-4 animate-pulse">✨ AI Builder</h1>
    <p class="text-xl opacity-80">Start chatting to generate your app!</p>
  </div>
</body>
</html>`,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    messages: [],
    files: defaultFiles,
    activeFile: 'index.html',
    isGenerating: false,
    previewKey: 0,
    showCodeEditor: true,
    lastError: null,
    extraThinkMode: false,
  });

  const addMessage = useCallback((content: string, role: 'user' | 'assistant', files?: FileData[]) => {
    const message: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: Date.now(),
      files,
    };
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  }, []);

  const updateFile = useCallback((fileName: string, content: string) => {
    setState((prev) => ({
      ...prev,
      files: prev.files.map((f) => (f.name === fileName ? { ...f, content } : f)),
      previewKey: prev.previewKey + 1,
    }));
  }, []);

  const setActiveFile = useCallback((fileName: string) => {
    setState((prev) => ({ ...prev, activeFile: fileName }));
  }, []);

  const createNewFile = useCallback((file: FileData) => {
    setState((prev) => ({
      ...prev,
      files: [...prev.files.filter((f) => f.name !== file.name), file],
      activeFile: file.name,
      previewKey: prev.previewKey + 1,
    }));
  }, []);

  const setFiles = useCallback((files: FileData[]) => {
    setState((prev) => ({
      ...prev,
      files,
      previewKey: prev.previewKey + 1,
    }));
  }, []);

  const setIsGenerating = useCallback((isGenerating: boolean) => {
    setState((prev) => ({ ...prev, isGenerating }));
  }, []);

  const refreshPreview = useCallback(() => {
    setState((prev) => ({ ...prev, previewKey: prev.previewKey + 1 }));
  }, []);

  const clearProject = useCallback(() => {
    setState({
      messages: [],
      files: defaultFiles,
      activeFile: 'index.html',
      isGenerating: false,
      previewKey: 0,
      showCodeEditor: true,
      lastError: null,
      extraThinkMode: false,
    });
  }, []);

  const toggleCodeEditor = useCallback(() => {
    setState((prev) => ({ ...prev, showCodeEditor: !prev.showCodeEditor }));
  }, []);

  const setLastError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, lastError: error }));
  }, []);

  const getConversationHistory = useCallback(() => {
    return state.messages.map((m) => ({
      role: m.role === 'user' ? 'User' : 'Assistant',
      content: m.content,
    }));
  }, [state.messages]);

  const setExtraThinkMode = useCallback((mode: boolean) => {
    setState((prev) => ({ ...prev, extraThinkMode: mode }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        addMessage,
        updateFile,
        setActiveFile,
        createNewFile,
        setFiles,
        setIsGenerating,
        refreshPreview,
        clearProject,
        toggleCodeEditor,
        setLastError,
        getConversationHistory,
        setExtraThinkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within AppProvider');
  }
  return context;
}
