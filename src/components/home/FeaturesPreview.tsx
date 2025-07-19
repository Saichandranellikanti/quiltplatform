import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Users, Briefcase, FileText, CreditCard, BarChart } from 'lucide-react';

const FeaturesPreview: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'CRM Module',
      description: 'Track leads, manage relationships, never miss a follow-up. Your complete customer journey in one place.',
      color: 'bg-quilt-turquoise',
      benefits: ['Lead tracking', 'Contact management', 'Sales pipeline', 'Communication history']
    },
    {
      icon: Briefcase,
      title: 'ERP Module',
      description: 'Handle orders, internal processes, inventory and more. Streamline your entire operation.',
      color: 'bg-quilt-green',
      benefits: ['Order management', 'Process automation', 'Inventory tracking', 'Workflow optimization']
    },
    {
      icon: CreditCard,
      title: 'Billing & Payments',
      description: 'Create, send, and track invoices. Accept payments via Stripe, PayPal, and other providers.',
      color: 'bg-quilt-orange',
      benefits: ['Invoice automation', 'Payment processing', 'Financial tracking', 'Multi-gateway support']
    },
    {
      icon: FileText,
      title: 'Document Automation',
      description: 'Auto-generate permits, certificates, invoices with PDF workflows. Save hours of manual work.',
      color: 'bg-quilt-navy',
      benefits: ['Template creation', 'Auto-generation', 'PDF workflows', 'Document storage']
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Visual overview of your business health: bookings, clients, tasks, payments at a glance.',
      color: 'bg-gradient-hero',
      benefits: ['Real-time metrics', 'Custom reports', 'Performance insights', 'Data visualization']
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Powerful modules that work together
          </h2>
          <p className="text-xl text-muted-foreground">
            Each module is designed to integrate seamlessly, creating a unified workspace that grows with your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card p-8 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 border border-border"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-quilt-turquoise rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button variant="hero" size="lg">
            Explore All Features
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreview;