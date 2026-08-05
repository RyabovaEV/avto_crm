export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const NAV_ITEM: NavItem[] = [
  {
    label: 'Настройки',
    href: '/settings',
  },
  {
    label: 'Новости',
    href: '/news',
  },
  {
    label: 'Расписание',
    href: '/schedule',
  },
];
