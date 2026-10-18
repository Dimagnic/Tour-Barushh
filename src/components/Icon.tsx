import type { IconName } from '@/data/content';

const heart = 'M24 31s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 32 20c0 6-8 11-8 11z';
const p: Record<IconName, React.ReactNode> = {
  person: <><circle cx="24" cy="14" r="7" /><path d="M9 42c0-9 6-15 15-15s15 6 15 15z" /><path d="M19 33h10v6H19z" /></>,
  seal: <><path d="M24 5l4 3 5-.5 2 4.500 4.500 2-.5 5 3 4-3 4 .5 5-4.500 2-2 4.500-5-.5-4 3-4-3-5 .5-2-4.500-4.500-2 .5-5-3-4 3-4-.5-5 4.500-2 2-4.500 5 .5z" /><path d={heart} /></>,
  group: <><circle cx="24" cy="15" r="5.500" /><path d="M13 36c0-7 5-11 11-11s11 4 11 11" /><circle cx="10" cy="20" r="4" /><path d="M3 35c0-5 3-8 7-8" /><circle cx="38" cy="20" r="4" /><path d="M45 35c0-5-3-8-7-8" /></>,
  truck: <><path d="M4 12h24v21H4zM28 18h9l7 8v7H28z" /><circle cx="14" cy="35" r="4" /><circle cx="36" cy="35" r="4" /><path d="M9 18h14M9 23h10" /></>,
  shield: <><path d="M24 4l16 6v12c0 10-7 17-16 21-9-4-16-11-16-21V10z" /><path d="M24 31s-7-4.500-7-9.500a4 4 0 0 1 7-2.500 4 4 0 0 1 7 2.500c0 5-7 9.500-7 9.500z" /></>,
  culture: <><circle cx="24" cy="24" r="19" /><path d="M17 15h14M19 15c0 4-4 6-4 11 0 5 3 8 9 8s9-3 9-8c0-5-4-7-4-11" /></>,
  mountain: <><path d="M5 38l13-21 8 12 5-7 12 16z" /><path d="M14 22l4 4 4-5M10 12h6M34 14h8" /></>,
  food: <><circle cx="24" cy="24" r="19" /><path d="M16 12v10a3 3 0 0 0 3 3v11M22 12v10M19 12v10M32 12c-3 3-4 7-4 12h4v12" /></>,
  flower: <><circle cx="24" cy="24" r="6" /><path d="M24 4c5 5 5 11 0 14-5-3-5-9 0-14zM44 24c-5 5-11 5-14 0 3-5 9-5 14 0zM24 44c-5-5-5-11 0-14 5 3 5 9 0 14zM4 24c5-5 11-5 14 0-3 5-9 5-14 0z" /></>,
  route: <><circle cx="24" cy="24" r="19" /><path d="M24 12a6 6 0 0 1 6 6c0 5-6 11-6 11s-6-6-6-11a6 6 0 0 1 6-6z" /><circle cx="24" cy="18" r="2" /><path d="M14 36h20" /></>,
  whatsapp: <><path d="M24 5a19 19 0 0 0-16.500 28.500L5 43l9.800-2.400A19 19 0 1 0 24 5z" /><path d="M17 16c-1 4 3 11 10 14 2 1 4 0 4-2l-3-2-2 1c-2-1-4-3-5-5l1-2-2-4z" /></>,
  pin: <><path d="M24 43s14-12 14-23a14 14 0 1 0-28 0c0 11 14 23 14 23z" /><circle cx="24" cy="20" r="5" /></>,
  play: <path d="M18 12l20 12-20 12z" fill="currentColor" />,
};

export function Icon({ name, className = 'size-11' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{p[name]}</svg>
  );
}
