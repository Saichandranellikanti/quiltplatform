import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import IntroSection from '../components/home/IntroSection';
import FeaturesPreview from '../components/home/FeaturesPreview';
import DemoSection from '../components/home/DemoSection';
import CtaSection from '../components/home/CtaSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <FeaturesPreview />
        <DemoSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;