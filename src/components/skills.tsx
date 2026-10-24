import React, { useMemo } from 'react';
import { useI18n } from '@/locale';
import { skillsData, type Skill } from '@/data/skills';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SkillCategory = NonNullable<Skill['category']>;
const SKILL_GROUP_ORDER: SkillCategory[] = [
  'languages',
  'frontend',
  'backend',
  'mobile',
  'cloudDevOps',
  'monitoring',
  'others',
];

const Skills: React.FC = () => {
  const { t } = useI18n();
  const groupLabels: Record<SkillCategory, string> = {
    backend: t('skills.backend'),
    cloudDevOps: t('skills.cloudDevOps'),
    frontend: t('skills.frontend'),
    languages: t('skills.languages'),
    mobile: t('skills.mobile'),
    monitoring: t('skills.monitoring'),
    others: t('skills.others'),
  };

  const groupedSkills = useMemo(() => {
    const groups: Record<SkillCategory, Skill[]> = {
      backend: [],
      cloudDevOps: [],
      frontend: [],
      languages: [],
      mobile: [],
      monitoring: [],
      others: [],
    };
    const validGroups = new Set<SkillCategory>(SKILL_GROUP_ORDER);

    skillsData.forEach((skill) => {
      if (skill.category && validGroups.has(skill.category)) {
        groups[skill.category].push(skill);
      }
    });

    return SKILL_GROUP_ORDER.map((key) => ({
      items: groups[key],
      key,
      label: groupLabels[key],
    })).filter((group) => group.items.length > 0);
  }, [groupLabels, skillsData]);

  return (
    <div
      className="flex scroll-mt-20 flex-col items-center px-[clamp(16px,4vw,32px)] py-[clamp(56px,8vw,128px)]"
      id="skills"
    >
      <motion.h3
        className="mb-[clamp(20px,4vw,48px)] text-center text-2xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {t('skills.title')}
      </motion.h3>
      <div className="mx-auto grid w-full max-w-[980px] grid-cols-1 gap-[clamp(12px,2.5vw,24px)] md:grid-cols-2 min-[1200px]:grid-cols-4">
        {groupedSkills.map((group, groupIndex) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.08, duration: 0.5 }}
            viewport={{ amount: 0.2, once: false }}
            whileHover={{ scale: 1.01, y: -4 }}
          >
            <Card className="h-full border-2 transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-5">
                <h4 className="mb-4 text-left text-base font-semibold">{group.label}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) =>
                    skill.jumpUrl ? (
                      <a
                        key={`${group.key}-${skill.title}`}
                        href={skill.jumpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={skill.proficiency}
                      >
                        <Badge variant="secondary" className="underline">
                          {skill.title}
                        </Badge>
                      </a>
                    ) : (
                      <Badge
                        key={`${group.key}-${skill.title}`}
                        variant="secondary"
                        title={skill.proficiency}
                      >
                        {skill.title}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default Skills;
