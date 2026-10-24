export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'cloudDevOps'
  | 'monitoring'
  | 'others';

export interface Skill {
  category: SkillCategory;
  title: string;
  proficiency?: string;
  jumpUrl?: string;
  icon?: string;
}

export const skillsData: Skill[] = [
  { category: 'languages', title: 'Python' },
  { category: 'languages', title: 'C++' },
  { category: 'languages', title: 'JavaScript' },
  { category: 'languages', title: 'TypeScript' },
  { category: 'languages', title: 'SQL' },
  { category: 'languages', title: 'Java' },
  { category: 'languages', title: 'Dart' },

  { category: 'frontend', title: 'HTML/CSS' },
  { category: 'frontend', title: 'React.js' },
  { category: 'frontend', title: 'Next.js' },
  { category: 'frontend', title: 'Tailwind CSS' },
  { category: 'frontend', title: 'Vue' },

  { category: 'backend', title: 'Node.js' },
  { category: 'backend', title: 'Express.js' },
  { category: 'backend', title: 'Firebase' },
  { category: 'backend', title: 'PostgreSQL' },

  { category: 'cloudDevOps', title: 'Git' },
  { category: 'cloudDevOps', title: 'GitHub' },
  { category: 'cloudDevOps', title: 'Docker' },
  { category: 'cloudDevOps', title: 'Vercel' },
  { category: 'cloudDevOps', title: 'Heroku' },
  { category: 'cloudDevOps', title: 'Netlify' },

  { category: 'others', title: 'English' },
  { category: 'others', title: 'Chinese' },
  { category: 'others', title: 'Floorball' },
  { category: 'others', title: 'Trading' },
];
