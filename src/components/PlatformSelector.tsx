import { motion } from 'motion/react';
import { Globe, Smartphone, Apple, Layers } from 'lucide-react';
import { Button } from './ui/button';

interface PlatformSelectorProps {
  selected: 'web' | 'android' | 'ios' | 'all';
  onSelect: (platform: 'web' | 'android' | 'ios' | 'all') => void;
}

const platforms = [
  {
    id: 'web' as const,
    name: 'Web App',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    description: 'Browser-based application',
  },
  {
    id: 'android' as const,
    name: 'Android',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-500',
    description: 'Android mobile app',
  },
  {
    id: 'ios' as const,
    name: 'iOS',
    icon: Apple,
    color: 'from-gray-500 to-slate-500',
    description: 'iPhone/iPad app',
  },
  {
    id: 'all' as const,
    name: 'All Platforms',
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    description: 'Universal build',
  },
];

export function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        const isSelected = selected === platform.id;
        
        return (
          <motion.button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              isSelected
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${platform.color} mb-3`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-sm font-medium text-white mb-1">{platform.name}</h3>
            <p className="text-xs text-white/60">{platform.description}</p>
            
            {isSelected && (
              <motion.div
                layoutId="selected-platform"
                className="absolute inset-0 border-2 border-cyan-500 rounded-xl"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
