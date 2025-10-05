import {
  Award,
  BookOpen,
  Brain,
  Calendar,
  Code,
  Globe,
  GraduationCap,
  Heart,
  Laptop,
  Layers,
  Lightbulb,
  MessageCircle,
  Monitor,
  PenTool,
  Puzzle,
  Rocket,
  Server,
  Shield,
  Star,
  Terminal,
  Users,
} from 'lucide-react';
import { FC } from 'react';

const ICONS_MAP = {
  BookOpen: BookOpen,
  Code: Code,
  Users: Users,
  Calendar: Calendar,
  Award: Award,
  GraduationCap: GraduationCap,
  Laptop: Laptop,
  Lightbulb: Lightbulb,
  Globe: Globe,
  Star: Star,
  Rocket: Rocket,
  Puzzle: Puzzle,
  Brain: Brain,
  Server: Server,
  Terminal: Terminal,
  Layers: Layers,
  Shield: Shield,
  Heart: Heart,
  MessageCircle: MessageCircle,
  Monitor: Monitor,
  PenTool: PenTool,
};

export interface IconProps {
  iconName?: string;
  className?: string;
}

export const Icon: FC<IconProps> = ({ iconName, className }) => {
  if (!iconName) return null;

  const IconComponent = ICONS_MAP[iconName as keyof typeof ICONS_MAP];
  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};
