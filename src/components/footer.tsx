import React, { useState } from 'react';
import { useI18n } from '@/locale';
import { Mail, MessageCircle } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Footer: React.FC = () => {
  const [wechatOpen, setWechatOpen] = useState(false);
  const { t } = useI18n();

  return (
    <footer
      className="scroll-mt-20 px-[clamp(16px,4vw,32px)] py-[clamp(40px,6vw,96px)] text-center"
      id="footer"
    >
      <motion.div
        className="flex flex-row items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex flex-col max-[600px]:flex-row"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            className="flex flex-row items-center gap-2 text-foreground"
            href="mailto:zhenglongsue@gmail.com"
          >
            <Mail className="size-7 text-primary" />
            <p className="max-[600px]:hidden">zhenglongsue@gmail.com</p>
          </a>
        </motion.div>
        <div className="mx-4 h-16 w-px bg-border max-[600px]:hidden" />
        <motion.div
          className="flex flex-row"
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            className="mx-1.5"
            href="https://github.com/zhenglong1603"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-[28px] text-primary" />
          </a>
          <a
            className="mx-1.5"
            href="https://www.instagram.com/zhenglong___/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-[28px] text-primary" />
          </a>
          <a
            className="mx-1.5"
            href="https://www.linkedin.com/in/suezhenglong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-[28px] text-primary" />
          </a>
          <button
            aria-label="Wechat contact"
            className="mx-1.5 cursor-pointer border-0 bg-transparent p-0"
            onClick={() => setWechatOpen(true)}
          >
            <MessageCircle className="size-7 text-primary" />
          </button>
        </motion.div>
      </motion.div>
      <motion.div
        className="pt-[clamp(20px,3vw,32px)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p>{t('footer.copyright')}</p>
      </motion.div>
      <Dialog open={wechatOpen} onOpenChange={setWechatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('footer.wechat.title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{t('footer.wechat.desc')}</DialogDescription>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
