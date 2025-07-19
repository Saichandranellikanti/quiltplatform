import React from 'react';
import { Users, BarChart3, FileText, CreditCard, Settings } from 'lucide-react';

const IntroSection: React.FC = () => {
  const highlights = [
    {
      icon: Users,
      title: 'Client Management',
      description: 'Never lose track of leads or customer relationships'
    },
    {
      icon: BarChart3,
      title: 'Business Operations',
      description: 'Handle orders, processes, and inventory seamlessly'
    },
    {
      icon: FileText,
      title: 'Document Automation',
      description: 'Generate permits, certificates, and invoices automatically'
    },
    {
      icon: CreditCard,
      title: 'Payment Processing',
      description: 'Accept payments via Stripe, PayPal, and more'
    },
    {
      icon: Settings,
      title: 'One Dashboard',
      description: 'Visual overview of your entire business health'
    }
  ];

  return (
    <section className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Built for small businesses that think big
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Quilt brings your clients, operations, documents, and payments into one seamless platform. 
            Stop juggling multiple tools and start managing everything from one beautiful workspace.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="bg-card p-6 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300 text-center group hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-hero rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;