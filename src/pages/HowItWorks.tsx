import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground">Coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;