import React from 'react';
import { Button } from '../ui/button';
import { Play, Monitor, Smartphone, Zap } from 'lucide-react';

const DemoSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                See Quilt in action
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Watch how businesses like yours use Quilt to streamline operations, 
                manage clients, and grow their revenue — all from one intuitive platform.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-6 w-6 text-quilt-turquoise" />
                  <span className="text-foreground">Web-based platform accessible anywhere</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-6 w-6 text-quilt-green" />
                  <span className="text-foreground">Mobile-friendly for on-the-go management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-quilt-orange" />
                  <span className="text-foreground">Quick setup — get started in minutes</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo Video
                </Button>
                <Button variant="outline" size="lg">
                  Try Interactive Demo
                </Button>
              </div>
            </div>
            
            {/* Right Content - Demo Placeholder */}
            <div className="relative">
              <div className="bg-card rounded-xl shadow-large p-1 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-hero rounded-lg p-8 text-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Quilt Dashboard</h3>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-xs opacity-80">Active Clients</div>
                        <div className="text-2xl font-bold">127</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-xs opacity-80">Open Projects</div>
                        <div className="text-2xl font-bold">43</div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-3">
                        <div className="text-xs opacity-80">Revenue</div>
                        <div className="text-2xl font-bold">$24k</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-sm opacity-80 mb-2">Recent Activity</div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">New invoice generated</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm">Client meeting scheduled</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-sm">Payment received</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-quilt-orange text-white p-3 rounded-lg shadow-lg animate-quilt-float">
                <span className="text-sm font-semibold">Real-time Updates</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-quilt-green text-white p-3 rounded-lg shadow-lg animate-quilt-float" style={{ animationDelay: '1s' }}>
                <span className="text-sm font-semibold">Mobile Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;