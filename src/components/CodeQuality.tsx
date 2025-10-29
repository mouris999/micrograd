import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, Zap } from 'lucide-react';
import { FileData } from '../lib/store';

interface CodeQualityProps {
  files: FileData[];
}

interface QualityCheck {
  type: 'success' | 'warning' | 'info';
  message: string;
}

export function CodeQuality({ files }: CodeQualityProps) {
  const checks: QualityCheck[] = [];

  // Analyze files
  const htmlFile = files.find(f => f.name.endsWith('.html'));
  const jsFile = files.find(f => f.name.endsWith('.js'));
  const cssFile = files.find(f => f.name.endsWith('.css'));

  // Check for Tailwind CSS
  if (htmlFile?.content.includes('tailwindcss.com')) {
    checks.push({ type: 'success', message: 'Using Tailwind CSS for styling' });
  }

  // Check for accessibility
  if (htmlFile?.content.includes('aria-') || htmlFile?.content.includes('role=')) {
    checks.push({ type: 'success', message: 'Accessibility attributes found' });
  } else if (htmlFile) {
    checks.push({ type: 'warning', message: 'Consider adding ARIA labels for accessibility' });
  }

  // Check for error handling
  if (jsFile?.content.includes('try') && jsFile?.content.includes('catch')) {
    checks.push({ type: 'success', message: 'Error handling implemented' });
  } else if (jsFile) {
    checks.push({ type: 'info', message: 'Consider adding error handling with try-catch' });
  }

  // Check for responsive design
  if (htmlFile?.content.includes('viewport') || htmlFile?.content.includes('responsive')) {
    checks.push({ type: 'success', message: 'Responsive design meta tag found' });
  }

  // Check for semantic HTML
  const semanticTags = ['header', 'nav', 'main', 'section', 'article', 'footer'];
  const hasSemanticHTML = semanticTags.some(tag => htmlFile?.content.includes(`<${tag}`));
  if (hasSemanticHTML) {
    checks.push({ type: 'success', message: 'Using semantic HTML elements' });
  }

  // Performance checks
  if (jsFile?.content.includes('debounce') || jsFile?.content.includes('throttle')) {
    checks.push({ type: 'success', message: 'Performance optimization detected' });
  }

  if (checks.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mt-4 p-3 bg-white/5 border border-white/10 rounded-lg"
    >
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-cyan-400" />
        <span className="text-sm text-white/90">Code Quality Analysis</span>
      </div>
      
      <div className="space-y-2">
        {checks.map((check, index) => (
          <div key={index} className="flex items-start gap-2">
            {check.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
            )}
            {check.type === 'warning' && (
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
            )}
            {check.type === 'info' && (
              <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            )}
            <span className="text-xs text-white/70">{check.message}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
