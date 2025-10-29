import { motion } from 'motion/react';
import { Sparkles, Calendar, Calculator, Gamepad2, ShoppingCart, Music, Camera, FileText } from 'lucide-react';

interface QuickActionsProps {
  onSelectAction: (prompt: string) => void;
}

const quickActions = [
  {
    icon: Calendar,
    label: 'Todo App',
    prompt: 'Build a beautiful todo app with drag and drop, categories, and dark mode',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Calculator,
    label: 'Calculator',
    prompt: 'Create a scientific calculator with advanced functions and beautiful UI',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Gamepad2,
    label: 'Game',
    prompt: 'Build an interactive tic-tac-toe game with score tracking and smooth animations',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: ShoppingCart,
    label: 'E-commerce',
    prompt: 'Create a product showcase page with cart, filters, and checkout flow',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Music,
    label: 'Music Player',
    prompt: 'Build a music player interface with playlist, controls, and visualizer',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Camera,
    label: 'Gallery',
    prompt: 'Create a photo gallery with masonry layout, lightbox, and filters',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: FileText,
    label: 'Dashboard',
    prompt: 'Build an analytics dashboard with charts, metrics cards, and data tables',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    label: 'Portfolio',
    prompt: 'Create a stunning portfolio website with projects showcase and contact form',
    color: 'from-yellow-500 to-orange-500',
  },
];

export function QuickActions({ onSelectAction }: QuickActionsProps) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2 text-white/60 text-sm">
        <Sparkles className="w-4 h-4" />
        <span>Quick Start Templates</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectAction(action.prompt)}
              className="group relative p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left"
            >
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${action.color} mb-2`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm text-white/90 group-hover:text-white transition-colors">
                {action.label}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
