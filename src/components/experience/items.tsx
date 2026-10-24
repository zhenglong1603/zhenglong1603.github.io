export interface ExperienceItem {
  logo: string;
  logoAlt: string;
  title: string;
  role?: string;
  details?: string[];
  date: string;
  badges?: { label: string; href?: string }[];
}

export const createTimelineItems = (t: (key: string) => string): ExperienceItem[] => [
  //TODO: Add in the photo logos for each experience item
  {
    date: t('experience.postech.date'),
    logo: '/logos/postechLogo.png',
    logoAlt: 'POSTECH',
    title: t('experience.postech.title'),
  },
  {
    date: t('experience.nus.date'),
    logo: '/logos/nusLogo.png',
    logoAlt: 'NUS',
    role: `${t('experience.nus.degree')} - ${t('experience.nus.honours')}`,
    title: t('experience.nus.title'),
  },
  {
    badges: [{ label: 'QGIS' }, { label: 'Python' }, { label: 'PostgreSQL' }],
    date: t('experience.sla.date'),
    details: [t('experience.sla.b1')],
    logo: '/logos/slaLogo.jpg',
    logoAlt: 'SLA',
    role: t('experience.sla.role'),
    title: t('experience.sla.company'),
  },
  {
    badges: [
      { label: 'Python' },
      { label: 'ArcGIS Pro' },
      { label: 'Workflow Manager' },
      { label: 'FME' },
    ],
    date: t('experience.ura.date'),
    details: [t('experience.ura.b1')],
    logo: '/logos/uraLogo.jpg',
    logoAlt: 'URA',
    role: t('experience.ura.role'),
    title: t('experience.ura.company'),
  },
];
