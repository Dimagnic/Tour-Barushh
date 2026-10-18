import type { IconName } from '@/data/content';

const p: Record<IconName, React.ReactNode> = {
  badge: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 12 0v1M17 14l1.500 1.500L21 13" /></>,
  pin: <><path d="M12 21s7-6.200 7-11a7 7 0 1 0-14 0c0 4.800 7 11 7 11z" /><circle cx="12" cy="10" r="2.500" /></>,
  group: <><circle cx="9" cy="8" r="3.500" /><path d="M2.500 20a6.500 6.500 0 0 1 13 0" /><circle cx="17" cy="9" r="2.500" /><path d="M17.500 14a5 5 0 0 1 4 5" /></>,
  van: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M3 11h18M7 20v-3M17 20v-3" /></>,
  heart: <path d="M12 20s-7-4.400-7-10a4 4 0 0 1 7-2.500A4 4 0 0 1 19 10c0 5.600-7 10-7 10z" />,
  shield: <path d="M12 3l7 3v5c0 5-3.500 8.500-7 10-3.500-1.500-7-5-7-10V6z" />,
  landmark: <path d="M3 20h18M5 20V10m14 10V10M9 20V10m6 10V10M2 10l10-6 10 6z" />,
  mountain: <path d="M3 19l6-10 4 6 3-4 5 8z" />,
  food: <path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7M8 3v7M17 3c-2 2-2.500 5-2.500 8H17v10" />,
  star: <path d="M12 3l2.600 5.600 6.100.7-4.500 4.200 1.200 6-5.400-3-5.400 3 1.200-6L3.300 9.300l6.100-.7z" />,
  route: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
};

export function Icon({ name, className = 'size-9' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.400" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{p[name]}</svg>
  );
}
