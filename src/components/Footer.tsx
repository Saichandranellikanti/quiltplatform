import React from 'react';
import { Link } from 'react-router-dom';
import QuiltLogo from './QuiltLogo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-quilt-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <QuiltLogo className="text-white" />
            </div>
            <p className="text-sm text-white/80 mb-6">
              Every piece of your business, stitched together. 
              The all-in-one ERP-CRM platform built for small businesses.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-quilt-turquoise">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-quilt-turquoise">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-quilt-turquoise">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-sm text-white/80 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/use-cases" className="text-sm text-white/80 hover:text-white transition-colors">Use Cases</Link></li>
              <li><Link to="/how-it-works" className="text-sm text-white/80 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/for-teams" className="text-sm text-white/80 hover:text-white transition-colors">For Teams</Link></li>
              <li><Link to="/pricing" className="text-sm text-white/80 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">About</Link></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm text-white/80 mb-4">
              Get the latest updates and insights about small business operations.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="turquoise" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © 2024 Quilt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;