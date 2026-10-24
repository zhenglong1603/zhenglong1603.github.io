import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useI18n } from '@/locale';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  const { t } = useI18n();

  return (
    <div
      className="relative flex min-h-[100svh] max-w-[100vw] flex-col items-center justify-center gap-3 px-[clamp(16px,4vw,32px)] pt-[clamp(88px,10vw,120px)] pb-[clamp(56px,8vw,96px)] text-center"
      id="hero"
    >
      <motion.h1
        className="text-4xl font-bold sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <TypeAnimation
          sequence={['Sue Zheng Long', 2000, '许正龙', 1500, 'Zheng Long', 1500, '正龙', 1500]}
          speed={20}
          repeat={Infinity}
        />
      </motion.h1>
      <motion.p
        className="mt-4 text-muted-foreground"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {t('hero.subtitle')}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Button
          className="mt-3"
          onClick={() =>
            document.getElementById('footer')?.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            })
          }
        >
          {t('hero.contact')}
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
