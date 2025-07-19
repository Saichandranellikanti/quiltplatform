import React from 'react';
import { Button } from '../ui/button';
import QuiltLogo from '../QuiltLogo';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <QuiltLogo className="justify-center" size="lg" />
          </div>
          
          {/* Tagline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Every piece of your business,{' '}
            <span className="text-yellow-200">stitched together</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-slide-up">
            The all-in-one ERP-CRM platform that brings your clients, operations, 
            documents, and payments into one seamless workspace.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-white text-quilt-navy hover:bg-white/90 shadow-large"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 text-white/70 text-sm animate-fade-in">
            <p>Trusted by 500+ small businesses • Free plan available • No credit card required</p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-lg rotate-12 animate-quilt-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-lg -rotate-12 animate-quilt-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-lg rotate-45 animate-quilt-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;