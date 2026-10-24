import { useMediaQuery } from 'react-responsive';
import { useI18n } from '@/locale';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { glass } from '@/lib/glass';
import { cn } from '@/lib/utils';

interface Props {
  onChange?: () => void;
}

const jumpToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
  });
};

const isSupportedLocale = (value: string): value is 'en' | 'zh' => value === 'en' || value === 'zh';

const Header = (props: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const { t, locale, setLocale } = useI18n();

  return (
    <header className="fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-5 py-2.5">
      <div className="flex items-center gap-2 text-2xl">
        🍊
        <Switch
          className="mx-1 shadow-[0_2px_2px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]"
          defaultChecked={true}
          onCheckedChange={props.onChange}
          aria-label={t('theme.dark')}
        />
        <Select value={locale} onValueChange={(val) => isSupportedLocale(val) && setLocale(val)}>
          <SelectTrigger className="h-8 w-[112px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" align="end" sideOffset={6}>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!isMobile && (
        <nav className={cn(glass, 'flex items-center rounded-2xl p-1')}>
          <Button variant="ghost" onClick={() => jumpToSection('aboutme')}>
            {t('nav.about')}
          </Button>
          <Button variant="ghost" onClick={() => jumpToSection('skills')}>
            {t('nav.skills')}
          </Button>
          <Button variant="ghost" onClick={() => jumpToSection('experience')}>
            {t('nav.experience')}
          </Button>
          <Button variant="ghost" onClick={() => jumpToSection('projects')}>
            {t('nav.projects')}
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
