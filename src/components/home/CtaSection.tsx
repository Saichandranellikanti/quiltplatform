import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Users, Shield, Zap } from 'lucide-react';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-quilt-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to stitch your business together?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Join hundreds of small businesses who have transformed their operations with Quilt. 
            Start your free trial today — no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-quilt-navy hover:bg-white/90 shadow-large"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Schedule a Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-quilt-turquoise" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free for Small Teams</h3>
              <p className="text-white/80 text-sm">Up to 3 users, forever free</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-quilt-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Setup</h3>
              <p className="text-white/80 text-sm">Get started in under 10 minutes</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-quilt-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-white/80 text-sm">Enterprise-grade security</p>
            </div>
          </div>
          
          <div className="mt-12 text-white/60 text-sm">
            <p>✓ No setup fees ✓ Cancel anytime ✓ 30-day money-back guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;