import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Experience from '@/components/experience';
import AboutMe from '@/components/about-me';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import BackgroundGradient from '@/components/background-gradient';
import { ThemeContext } from '@/context';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { glass } from '@/lib/glass';
import { cn } from '@/lib/utils';

const HomePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <ThemeContext.Provider value={darkMode ? 'dark' : 'light'}>
      <div className={darkMode ? 'dark' : ''}>
        <BackgroundGradient />
        <main className="relative min-h-screen text-foreground">
          <Header onChange={() => setDarkMode(!darkMode)} />
          <Hero />
          <Separator />
          <AboutMe />
          <Separator />
          <Skills />
          <Separator />
          <Experience />
          <Separator />
          <Projects />
          <Separator />
          <Footer />
          <Button
            size="icon"
            className={cn(
              glass,
              'fixed right-8 bottom-8 z-50 rounded-full border-0 bg-transparent shadow-none',
            )}
            onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <ArrowUp />
          </Button>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default HomePage;
