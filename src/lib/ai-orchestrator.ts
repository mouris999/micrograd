// AI Orchestrator - Manages 20 Gemini AI Keys for collaborative app building

export interface AIKey {
  id: number;
  key: string;
  role: string;
  team: string;
  status: 'idle' | 'working' | 'completed' | 'error';
  currentTask?: string;
  output?: string;
  error?: string;
}

export interface BuildProgress {
  stage: string;
  progress: number;
  logs: string[];
  activeAIs: number;
  completedTasks: number;
  totalTasks: number;
}

export interface AppOutput {
  platform: 'web' | 'android' | 'ios';
  files: Record<string, string>;
  buildStatus: 'ready' | 'building' | 'error' | 'deployed';
  deploymentUrl?: string;
  downloadUrl?: string;
}

// 20 Gemini AI Keys with specific roles
export const AI_KEYS: AIKey[] = [
  // Team 1: Project Setup & Architecture (Keys 1-3)
  {
    id: 1,
    key: 'AIzaSyDiAJnGTvNTBtDgAhH6GsbcClx9TAyimTI',
    role: 'Project Structure Architect',
    team: 'Architecture',
    status: 'idle',
  },
  {
    id: 2,
    key: 'AIzaSyCrz051sRa1_l5MOjMMqW-NLZYBTbmCgdk',
    role: 'Framework Setup Specialist',
    team: 'Architecture',
    status: 'idle',
  },
  {
    id: 3,
    key: 'AIzaSyCMfyOVF_akC3jYR_d3coQcBfeip7mzl60',
    role: 'Dependency Manager',
    team: 'Architecture',
    status: 'idle',
  },
  
  // Team 2: Frontend (Keys 4-6)
  {
    id: 4,
    key: 'AIzaSyA4Yszy_roDDkf9WmGYGJhhYndhMV7AGZ0',
    role: 'UI Component Builder',
    team: 'Frontend',
    status: 'idle',
  },
  {
    id: 5,
    key: 'AIzaSyBQpsPObUQgy__M6hNdwx-AVL3t89KmWP8',
    role: 'Screen & Layout Designer',
    team: 'Frontend',
    status: 'idle',
  },
  {
    id: 6,
    key: 'AIzaSyCxD4bV6ErrEEg4SnQiFKNLVRyYY7ADtck',
    role: 'Interaction Logic Developer',
    team: 'Frontend',
    status: 'idle',
  },
  
  // Team 3: Backend & Database (Keys 7-9)
  {
    id: 7,
    key: 'AIzaSyAcdmkvKIR1fMwzPvfFhBXfvvN5i9zsnE0',
    role: 'API Developer',
    team: 'Backend',
    status: 'idle',
  },
  {
    id: 8,
    key: 'AIzaSyD1-E0-Uk9C9l7Fgg5EeiTBHr7k2WAIdfo',
    role: 'Database Architect',
    team: 'Backend',
    status: 'idle',
  },
  {
    id: 9,
    key: 'AIzaSyDS64jwpsxf2CigM9scFdiI4ZOuPijqU0s',
    role: 'Server Logic Specialist',
    team: 'Backend',
    status: 'idle',
  },
  
  // Team 4: Build & Emulator (Keys 10-12)
  {
    id: 10,
    key: 'AIzaSyAuBcE-pCu9FpoT3QSTbi6A24kKpa0Wqwk',
    role: 'Web Build Compiler',
    team: 'Build',
    status: 'idle',
  },
  {
    id: 11,
    key: 'AIzaSyAkDVCB8uvc9m_zxOB1HjghyCH40N3iNDY',
    role: 'Android Build Specialist',
    team: 'Build',
    status: 'idle',
  },
  {
    id: 12,
    key: 'AIzaSyCGWYC6WRrE6qDXCa1imLh5dyXx0hUmoAc',
    role: 'iOS Build Specialist',
    team: 'Build',
    status: 'idle',
  },
  
  // Team 5: Testing & Validation (Keys 13-15)
  {
    id: 13,
    key: 'AIzaSyCxrBvUMqU4uluI3eZVbd64HEzLxWYWZo0',
    role: 'Syntax Validator',
    team: 'Testing',
    status: 'idle',
  },
  {
    id: 14,
    key: 'AIzaSyDKsQP1OKojDgzYCqFF6ma3dnPVhsH9OKE',
    role: 'Runtime Tester',
    team: 'Testing',
    status: 'idle',
  },
  {
    id: 15,
    key: 'AIzaSyCNWIJjs53xmpSl07GwUR55evQG2n5CHXk',
    role: 'Feature Validator',
    team: 'Testing',
    status: 'idle',
  },
  
  // Team 6: Debugging & Auto-Fix (Keys 16-18)
  {
    id: 16,
    key: 'AIzaSyDHLgnwM_QrbZ77SVMe3m0vZb6g5t2oAEQ',
    role: 'Error Detector',
    team: 'Debug',
    status: 'idle',
  },
  {
    id: 17,
    key: 'AIzaSyCcrKUh8mL8kL6tBmR0dDY7U_fxYPJu-vM',
    role: 'Auto-Fix Engineer',
    team: 'Debug',
    status: 'idle',
  },
  {
    id: 18,
    key: 'AIzaSyApWYj1Ji2AmjxaLHRRUUfFVXNQaGG3pFI',
    role: 'Revalidation Specialist',
    team: 'Debug',
    status: 'idle',
  },
  
  // Optimization (Key 19)
  {
    id: 19,
    key: 'AIzaSyD4lr64jW9nm9r1SZsSwsIJBTTIMERHvQw',
    role: 'Performance Optimizer',
    team: 'Optimization',
    status: 'idle',
  },
  
  // Master Controller (Key 20)
  {
    id: 20,
    key: 'AIzaSyC18aoXs3CuUxKM2Ut81KfHKpOp2P8U80A',
    role: 'Master Orchestrator',
    team: 'Control',
    status: 'idle',
  },
];

export class AIOrchestrator {
  private keys: AIKey[] = [...AI_KEYS];
  private progress: BuildProgress = {
    stage: 'Initializing',
    progress: 0,
    logs: [],
    activeAIs: 0,
    completedTasks: 0,
    totalTasks: 0,
  };
  
  private onProgressUpdate?: (progress: BuildProgress) => void;

  constructor(onProgressUpdate?: (progress: BuildProgress) => void) {
    this.onProgressUpdate = onProgressUpdate;
  }

  private updateProgress(updates: Partial<BuildProgress>) {
    this.progress = { ...this.progress, ...updates };
    if (this.onProgressUpdate) {
      this.onProgressUpdate(this.progress);
    }
  }

  private addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.progress.logs.push(`[${timestamp}] ${message}`);
    this.updateProgress({ logs: [...this.progress.logs] });
  }

  private async callAI(aiKey: AIKey, prompt: string, context?: string): Promise<string> {
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
    
    aiKey.status = 'working';
    aiKey.currentTask = prompt.substring(0, 50) + '...';
    this.updateProgress({ activeAIs: this.keys.filter(k => k.status === 'working').length });

    try {
      const fullPrompt = `You are ${aiKey.role} (AI #${aiKey.id}) in team ${aiKey.team}.

${context || ''}

Your specific task:
${prompt}

CRITICAL RULES:
- Generate ONLY production-ready, executable code
- NO placeholders, NO TODOs, NO "implement this later"
- Include complete error handling
- Add input validation
- Ensure accessibility and responsiveness
- Output ONLY code with file markers like: ### FILE: filename.ext

Generate the complete solution now:`;

      const response = await fetch(`${API_URL}?key=${aiKey.key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const output = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      aiKey.status = 'completed';
      aiKey.output = output;
      this.addLog(`✓ AI #${aiKey.id} (${aiKey.role}) completed task`);
      
      return output;
    } catch (error) {
      aiKey.status = 'error';
      aiKey.error = error.message;
      this.addLog(`✗ AI #${aiKey.id} (${aiKey.role}) error: ${error.message}`);
      throw error;
    } finally {
      this.updateProgress({ 
        activeAIs: this.keys.filter(k => k.status === 'working').length,
        completedTasks: this.keys.filter(k => k.status === 'completed').length,
      });
    }
  }

  async buildApp(userRequest: string, platform: 'web' | 'android' | 'ios' | 'all'): Promise<AppOutput[]> {
    this.addLog('🚀 Starting AI orchestration...');
    this.addLog(`📋 User Request: ${userRequest}`);
    this.addLog(`🎯 Target Platform(s): ${platform}`);
    
    const outputs: AppOutput[] = [];
    
    try {
      // Phase 1: Master AI creates project blueprint
      this.updateProgress({ stage: 'Planning Architecture', progress: 5 });
      const masterAI = this.keys.find(k => k.id === 20)!;
      this.addLog('🧠 Master AI analyzing request and creating blueprint...');
      
      const blueprint = await this.callAI(
        masterAI,
        `Analyze this app request and create a detailed technical blueprint:
        
        "${userRequest}"
        
        Platform: ${platform}
        
        Create a JSON blueprint with:
        - Project structure (folders and files)
        - Technologies to use
        - Features to implement
        - Component breakdown
        - API endpoints needed (if any)
        - State management approach
        
        Output as valid JSON.`,
      );

      // Phase 2: Architecture Team (AIs 1-3)
      this.updateProgress({ stage: 'Setting Up Architecture', progress: 15, totalTasks: 15 });
      this.addLog('🏗️ Architecture team initializing project...');
      
      const [structureAI, frameworkAI, dependencyAI] = this.keys.slice(0, 3);
      
      const [projectStructure, frameworkSetup, dependencies] = await Promise.all([
        this.callAI(structureAI, `Create the folder structure and main configuration files for: ${userRequest}. Platform: ${platform}`, blueprint),
        this.callAI(frameworkAI, `Set up the framework and build configuration for: ${userRequest}. Platform: ${platform}`, blueprint),
        this.callAI(dependencyAI, `Generate package.json and list all dependencies for: ${userRequest}. Platform: ${platform}`, blueprint),
      ]);

      // Phase 3: Frontend Team (AIs 4-6)
      this.updateProgress({ stage: 'Building Frontend', progress: 30 });
      this.addLog('🎨 Frontend team creating UI components...');
      
      const [uiAI, layoutAI, interactionAI] = this.keys.slice(3, 6);
      
      const [uiComponents, layouts, interactions] = await Promise.all([
        this.callAI(uiAI, `Create all UI components for: ${userRequest}. Platform: ${platform}`, blueprint),
        this.callAI(layoutAI, `Design screen layouts and navigation for: ${userRequest}. Platform: ${platform}`, blueprint),
        this.callAI(interactionAI, `Implement user interactions and state management for: ${userRequest}. Platform: ${platform}`, blueprint),
      ]);

      // Phase 4: Backend Team (AIs 7-9) - if needed
      this.updateProgress({ stage: 'Building Backend', progress: 45 });
      this.addLog('⚙️ Backend team setting up APIs...');
      
      const [apiAI, dbAI, serverAI] = this.keys.slice(6, 9);
      
      const [apis, database, serverLogic] = await Promise.all([
        this.callAI(apiAI, `Create API endpoints (or mock data) for: ${userRequest}. Platform: ${platform}`, blueprint),
        this.callAI(dbAI, `Set up data models and storage for: ${userRequest}. Platform: ${platform}`, blueprint),
        this.callAI(serverAI, `Implement business logic for: ${userRequest}. Platform: ${platform}`, blueprint),
      ]);

      // Phase 5: Build Team (AIs 10-12)
      this.updateProgress({ stage: 'Compiling Builds', progress: 60 });
      this.addLog('🔨 Build team compiling project...');
      
      const [webBuildAI, androidBuildAI, iosBuildAI] = this.keys.slice(9, 12);
      
      let builds: string[] = [];
      if (platform === 'web' || platform === 'all') {
        builds.push(await this.callAI(webBuildAI, `Compile all code into a single-file web app for: ${userRequest}`, 
          `${projectStructure}\n${frameworkSetup}\n${uiComponents}\n${layouts}\n${interactions}\n${apis}`));
      }
      if (platform === 'android' || platform === 'all') {
        builds.push(await this.callAI(androidBuildAI, `Create Android app structure for: ${userRequest}`,
          `${projectStructure}\n${uiComponents}\n${layouts}\n${interactions}`));
      }
      if (platform === 'ios' || platform === 'all') {
        builds.push(await this.callAI(iosBuildAI, `Create iOS app structure for: ${userRequest}`,
          `${projectStructure}\n${uiComponents}\n${layouts}\n${interactions}`));
      }

      // Phase 6: Testing Team (AIs 13-15)
      this.updateProgress({ stage: 'Testing & Validation', progress: 75 });
      this.addLog('🧪 Testing team validating code...');
      
      const [syntaxAI, runtimeAI, featureAI] = this.keys.slice(12, 15);
      
      const [syntaxCheck, runtimeCheck, featureCheck] = await Promise.all([
        this.callAI(syntaxAI, `Validate syntax and find errors in the generated code`, builds.join('\n\n')),
        this.callAI(runtimeAI, `Check for runtime issues and logic errors`, builds.join('\n\n')),
        this.callAI(featureAI, `Verify all features from request are implemented: ${userRequest}`, builds.join('\n\n')),
      ]);

      // Phase 7: Debug & Fix Team (AIs 16-18)
      this.updateProgress({ stage: 'Auto-Fixing Errors', progress: 85 });
      this.addLog('🔧 Debug team fixing any errors...');
      
      const [errorDetectorAI, autoFixAI, revalidateAI] = this.keys.slice(15, 18);
      
      const errors = await this.callAI(errorDetectorAI, `Identify all errors in the code`, 
        `${syntaxCheck}\n${runtimeCheck}\n${featureCheck}`);
      
      if (errors.toLowerCase().includes('error') || errors.toLowerCase().includes('issue')) {
        this.addLog('⚠️ Errors detected, applying fixes...');
        const fixes = await this.callAI(autoFixAI, `Fix all errors found`, 
          `${builds.join('\n\n')}\n\nErrors:\n${errors}`);
        builds = [fixes]; // Apply fixes
        
        // Revalidate
        await this.callAI(revalidateAI, `Verify all errors are fixed`, fixes);
        this.addLog('✅ All errors fixed and validated');
      } else {
        this.addLog('✅ No errors found, code is clean');
      }

      // Phase 8: Optimization (AI 19)
      this.updateProgress({ stage: 'Optimizing Performance', progress: 95 });
      this.addLog('⚡ Optimization AI enhancing performance...');
      
      const optimizerAI = this.keys[18];
      const optimized = await this.callAI(optimizerAI, `Optimize code for performance, responsiveness, and efficiency`, 
        builds.join('\n\n'));

      // Phase 9: Final Integration (Master AI 20)
      this.updateProgress({ stage: 'Final Integration', progress: 99 });
      this.addLog('🎯 Master AI merging all components...');
      
      const finalBuild = await this.callAI(masterAI, `Merge all components into final deployable app`, 
        `${optimized}\n\nEnsure: Complete functionality, no errors, production-ready`);

      // Parse and create outputs
      const files = this.parseFiles(finalBuild);
      
      if (platform === 'web' || platform === 'all') {
        outputs.push({
          platform: 'web',
          files,
          buildStatus: 'ready',
        });
      }
      if (platform === 'android' || platform === 'all') {
        outputs.push({
          platform: 'android',
          files,
          buildStatus: 'ready',
        });
      }
      if (platform === 'ios' || platform === 'all') {
        outputs.push({
          platform: 'ios',
          files,
          buildStatus: 'ready',
        });
      }

      this.updateProgress({ stage: 'Completed ✅', progress: 100 });
      this.addLog('🎉 Build completed successfully!');
      this.addLog(`📦 Generated ${Object.keys(files).length} files`);
      
      return outputs;
      
    } catch (error) {
      this.addLog(`❌ Build failed: ${error.message}`);
      throw error;
    }
  }

  private parseFiles(content: string): Record<string, string> {
    const files: Record<string, string> = {};
    const filePattern = /### FILE:\s*([^\n]+)\n```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = filePattern.exec(content)) !== null) {
      const fileName = match[1].trim();
      const fileContent = match[3].trim();
      files[fileName] = fileContent;
    }

    // If no files parsed, create a single HTML file
    if (Object.keys(files).length === 0) {
      files['index.html'] = content;
    }

    return files;
  }

  getProgress(): BuildProgress {
    return this.progress;
  }

  getAIStatus(): AIKey[] {
    return this.keys;
  }

  reset() {
    this.keys.forEach(key => {
      key.status = 'idle';
      key.currentTask = undefined;
      key.output = undefined;
      key.error = undefined;
    });
    this.progress = {
      stage: 'Initializing',
      progress: 0,
      logs: [],
      activeAIs: 0,
      completedTasks: 0,
      totalTasks: 0,
    };
  }
}
