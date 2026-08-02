import { SeasonType } from '@/generated/prisma/client';
import { Leaf, Sprout, Snowflake, Sun, type LucideIcon } from 'lucide-react';

export type SeasonTheme = {
  icon: LucideIcon;
  border: string;
  iconBg: string;
  iconText: string;
};

export const SEASON_THEME: Record<SeasonType, SeasonTheme> = {
  SUMMER: {
    icon: Sun,
    border: 'border-season-summer/30',
    iconBg: 'bg-season-summer/15',
    iconText: 'text-season-summer',
  },
  AUTUMN: {
    icon: Leaf,
    border: 'border-season-autumn/30',
    iconBg: 'bg-season-autumn/15',
    iconText: 'text-season-autumn',
  },
  WINTER: {
    icon: Snowflake,
    border: 'border-season-winter/30',
    iconBg: 'bg-season-winter/15',
    iconText: 'text-season-winter',
  },
  SPRING: {
    icon: Sprout,
    border: 'border-season-spring/30',
    iconBg: 'bg-season-spring/15',
    iconText: 'text-season-spring',
  },
};
