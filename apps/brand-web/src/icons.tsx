import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const paths: Record<string, string> = {
  ArrowDownUp: 'M8 3 4 7l4 4M4 7h12M16 21l4-4-4-4m4 4H8', ArrowRight: 'M5 12h14m-7-7 7 7-7 7',
  Bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4', Bookmark: 'M6 4h12v17l-6-4-6 4z',
  BriefcaseBusiness: 'M3 8h18v13H3zM8 8V5h8v3M3 13h18M10 13v2h4v-2', Check: 'm5 12 4 4L19 6',
  ChevronDown: 'm6 9 6 6 6-6', CircleHelp: 'M12 18h.01M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  Command: 'M9 9h6v6H9zM9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m12 0h3M3 15h3m12 0h3', Compass: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm4-14-2 6-6 2 2-6 6-2Z',
  Filter: 'M4 6h16M7 12h10m-7 6h4', LayoutDashboard: 'M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z',
  LogOut: 'M10 17l5-5-5-5m5 5H3m9-9h8v18h-8', Menu: 'M4 6h16M4 12h16M4 18h16',
  MessageSquareText: 'M21 11.5a8.5 8.5 0 0 1-12.9 7.3L3 20l1.2-4.1A8.5 8.5 0 1 1 21 11.5ZM8 10h8m-8 4h5',
  Plus: 'M12 5v14M5 12h14', Search: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm6-2 4 4',
  Settings2: 'M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 6h4',
  ShieldCheck: 'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Zm-4-11 3 3 5-5', Sparkles: 'm12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 11 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z',
  Users: 'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6-7a4 4 0 0 1 0 8m2 3a4 4 0 0 1 3 4v2',
  X: 'M18 6 6 18M6 6l12 12',
};
function icon(name: string) { return function Icon({ size = 20, ...props }: IconProps) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>; }; }
export const ArrowDownUp=icon('ArrowDownUp'), ArrowRight=icon('ArrowRight'), Bell=icon('Bell'), Bookmark=icon('Bookmark'), BriefcaseBusiness=icon('BriefcaseBusiness'), Check=icon('Check'), ChevronDown=icon('ChevronDown'), CircleHelp=icon('CircleHelp'), Command=icon('Command'), Compass=icon('Compass'), Filter=icon('Filter'), LayoutDashboard=icon('LayoutDashboard'), LogOut=icon('LogOut'), Menu=icon('Menu'), MessageSquareText=icon('MessageSquareText'), Plus=icon('Plus'), Search=icon('Search'), Settings2=icon('Settings2'), ShieldCheck=icon('ShieldCheck'), Sparkles=icon('Sparkles'), Users=icon('Users'), X=icon('X');
