import React from 'react';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Calendar, FileText, BarChart3, Shield, Zap, Globe, Smartphone, Cloud } from 'lucide-react';

const Features: React.FC = () => {
  const featureCategories = [
    {
      title: "Core Business Management",
      description: "Everything you need to run your business efficiently",
      features: [
        {
          icon: <Users className="h-6 w-6" />,
          title: "Customer Relationship Management",
          description: "Manage customer interactions, track sales pipeline, and automate follow-ups",
          benefits: ["360° customer view", "Sales automation", "Lead scoring", "Email integration"],
          example: "Track a lead from first contact to $50K deal closure with automated nurture sequences"
        },
        {
          icon: <Calendar className="h-6 w-6" />,
          title: "Smart Booking System",
          description: "Automated scheduling with real-time availability and calendar sync",
          benefits: ["24/7 online booking", "Calendar integration", "Automated reminders", "No-show reduction"],
          example: "Spa reduces no-shows by 40% with automated SMS reminders and easy rescheduling"
        },
        {
          icon: <FileText className="h-6 w-6" />,
          title: "Document Management",
          description: "Create, store, and organize all business documents in one place",
          benefits: ["Template library", "Digital signatures", "Version control", "Secure sharing"],
          example: "Generate contracts in 30 seconds using smart templates with client data auto-fill"
        }
      ]
    },
    {
      title: "Analytics & Insights",
      description: "Data-driven decisions with powerful analytics",
      features: [
        {
          icon: <BarChart3 className="h-6 w-6" />,
          title: "Real-time Analytics",
          description: "Track KPIs, revenue trends, and business performance metrics",
          benefits: ["Live dashboards", "Custom reports", "Trend analysis", "Performance alerts"],
          example: "Restaurant owner identifies peak hours and adjusts staffing, increasing profit by 25%"
        },
        {
          icon: <Zap className="h-6 w-6" />,
          title: "AI-Powered Insights",
          description: "Get intelligent recommendations to optimize your business operations",
          benefits: ["Predictive analytics", "Smart recommendations", "Anomaly detection", "Growth opportunities"],
          example: "AI suggests optimal pricing strategy resulting in 15% revenue increase"
        }
      ]
    },
    {
      title: "Security & Reliability",
      description: "Enterprise-grade security with 99.9% uptime",
      features: [
        {
          icon: <Shield className="h-6 w-6" />,
          title: "Advanced Security",
          description: "Bank-level encryption and security protocols to protect your data",
          benefits: ["End-to-end encryption", "Role-based access", "Audit trails", "GDPR compliant"],
          example: "Healthcare clinic maintains HIPAA compliance with automated data protection"
        },
        {
          icon: <Cloud className="h-6 w-6" />,
          title: "Cloud Infrastructure",
          description: "Reliable, scalable cloud hosting with automatic backups",
          benefits: ["99.9% uptime", "Auto-scaling", "Daily backups", "Global CDN"],
          example: "E-commerce store handles Black Friday traffic spike without downtime"
        }
      ]
    }
  ];

  const integrations = [
    { name: "Google Workspace", logo: "🔗" },
    { name: "Microsoft 365", logo: "🔗" },
    { name: "Slack", logo: "🔗" },
    { name: "Stripe", logo: "🔗" },
    { name: "PayPal", logo: "🔗" },
    { name: "QuickBooks", logo: "🔗" },
    { name: "Mailchimp", logo: "🔗" },
    { name: "Zoom", logo: "🔗" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="py-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mb-20">
          <Badge variant="secondary" className="mb-4">All Features</Badge>
          <h1 className="text-5xl font-bold mb-6">Powerful Features for Modern Businesses</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to streamline operations, boost productivity, and grow your business. 
            No complex setup, no technical expertise required.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Setup in under 5 minutes</span>
            </div>
          </div>
          <Button size="lg" className="mr-4">Start Free Trial</Button>
          <Button variant="outline" size="lg">Schedule Demo</Button>
        </div>

        {/* Feature Categories */}
        {featureCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="container mx-auto px-4 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
              <p className="text-lg text-muted-foreground">{category.description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Real Example:</p>
                      <p className="text-sm text-muted-foreground mt-1">{feature.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Cross-Platform Access */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Access Anywhere, Anytime</h2>
            <p className="text-lg text-muted-foreground">Work seamlessly across all your devices</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Web Application</CardTitle>
                <CardDescription>Full-featured web app accessible from any browser</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Mobile Optimized</CardTitle>
                <CardDescription>Responsive design that works perfectly on mobile devices</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Cloud className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Cloud Sync</CardTitle>
                <CardDescription>Real-time synchronization across all your devices</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Integrations */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-lg text-muted-foreground">Connect with the tools you already use</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="text-center p-6">
                <div className="text-2xl mb-2">{integration.logo}</div>
                <p className="font-medium">{integration.name}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 text-center">
          <div className="bg-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using Quilt to streamline operations and accelerate growth.
            </p>
            <Button size="lg" className="mr-4">Start Your Free Trial</Button>
            <Button variant="outline" size="lg">Contact Sales</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;