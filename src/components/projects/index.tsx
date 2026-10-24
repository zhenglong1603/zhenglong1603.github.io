import React from 'react';
import { ProjectCard } from './project-card';
import { useI18n } from '@/locale';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';

const Projects: React.FC = () => {
  const { t } = useI18n();

  return (
    <div
      className="flex scroll-mt-20 flex-col items-center px-[clamp(16px,4vw,32px)] py-[clamp(56px,8vw,128px)]"
      id="projects"
    >
      <motion.h3
        className="mb-[clamp(20px,4vw,48px)] text-center text-2xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {t('projects.title')}
      </motion.h3>

      <div className="flex w-full max-w-[1080px] flex-wrap items-stretch justify-center gap-[clamp(12px,2.5vw,24px)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.2, once: false }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <ProjectCard
            imgUrl="/projects/splitbee.png"
            title={t('projects.splitbee.title')}
            description={t('projects.splitbee.desc')}
            badges={
              <>
                <Badge variant="secondary">Flutter</Badge>
                <Badge variant="secondary">Firebase</Badge>
                <Badge variant="secondary">Figma</Badge>
              </>
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          viewport={{ amount: 0.2, once: false }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <ProjectCard
            imgUrl="/projects/geoNUS.png"
            title={t('projects.geonus.title')}
            description={t('projects.geonus.desc')}
            badges={
              <>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">PostgreSQL</Badge>
                <Badge variant="secondary">Google Maps API</Badge>
                <Badge variant="secondary">Vercel Blob Storage</Badge>
              </>
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ amount: 0.2, once: false }}
          whileHover={{ scale: 1.02, y: -8 }}
        >
          <ProjectCard
            imgUrl="/projects/klinix.png"
            title={t('projects.klinix.title')}
            description={t('projects.klinix.desc')}
            badges={
              <>
                <Badge variant="secondary">JavaFX</Badge>
                <Badge variant="secondary">JUnit</Badge>
                <Badge variant="secondary">Jackson</Badge>
              </>
            }
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;