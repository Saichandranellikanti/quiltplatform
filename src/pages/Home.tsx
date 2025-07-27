import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import IntroSection from '../components/home/IntroSection';
import FeaturesPreview from '../components/home/FeaturesPreview';
import DemoSection from '../components/home/DemoSection';
import CtaSection from '../components/home/CtaSection';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <IntroSection />
        <FeaturesPreview />
        <DemoSection />
        <CtaSection />
        
        {!user && (
          <section className="py-16 bg-card/50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-muted-foreground mb-6">
                Sign in to access your personalized dashboard
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/auth">Sign In to Dashboard</Link>
              </Button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;