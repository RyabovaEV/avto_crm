export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const NAV_ITEM: NavItem[] = [
  {
    label: 'Новости',
    href: '/dashboard/news',
  },
  {
    label: 'Расписание',
    href: '/dashboard/schedule',
  },
  {
    label: 'Автошкола',
    href: '/dashboard/driving-school',
  },
  {
    label: 'Вакансии',
    href: '/dashboard/vacancies',
  },
];
