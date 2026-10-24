import { useI18n } from '@/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'motion/react';

export default function AboutMe() {
  const { t } = useI18n();

  return (
    <div className="scroll-mt-20 px-[clamp(16px,4vw,32px)] py-[clamp(56px,8vw,128px)]" id="aboutme">
      <h3 className="mb-[clamp(20px,4vw,48px)] text-center text-2xl font-semibold">
        {t('about.title')}
      </h3>
      <div className="flex items-stretch justify-center">
        <div className="grid w-full max-w-[980px] grid-cols-1 gap-4 md:grid-cols-12 md:items-stretch">
          <motion.div
            className="hidden h-full md:col-span-3 md:block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full p-0">
              <CardContent className="flex h-full flex-col p-0">
                <img
                  className="min-h-[220px] w-full flex-1 rounded-t-lg object-cover"
                  src="/logos/profile.jpeg"
                  alt={t('about.name')}
                />
                <div className="p-4">
                  <p className="font-semibold">{t('about.name')}</p>
                  <p className="text-sm text-muted-foreground">{t('about.position')}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="h-full md:col-span-9"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{t('about.intro.title')}</CardTitle>
              </CardHeader>
              <CardContent className="text-[15px] leading-7">
                <p>{t('about.intro.message')}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
