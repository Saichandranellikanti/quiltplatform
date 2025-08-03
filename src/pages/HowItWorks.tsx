import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Clock, Users, Zap, Settings, BarChart3, Shield } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Sign Up & Setup",
      description: "Create your account and customize your business profile in under 5 minutes",
      details: [
        "Choose your industry template",
        "Import existing data (optional)",
        "Set up business information",
        "Configure basic settings"
      ],
      timeframe: "5 minutes",
      icon: <Settings className="h-6 w-6" />
    },
    {
      step: "02",
      title: "Connect Your Tools",
      description: "Integrate with your existing systems and tools seamlessly",
      details: [
        "Connect calendar applications",
        "Sync with payment processors",
        "Import customer databases",
        "Set up communication channels"
      ],
      timeframe: "10 minutes",
      icon: <Zap className="h-6 w-6" />
    },
    {
      step: "03",
      title: "Customize Your Workspace",
      description: "Tailor the platform to match your specific business needs",
      details: [
        "Create custom booking forms",
        "Set up service packages",
        "Configure automated workflows",
        "Design customer communications"
      ],
      timeframe: "15 minutes",
      icon: <Users className="h-6 w-6" />
    },
    {
      step: "04",
      title: "Go Live & Grow",
      description: "Launch your optimized business operations and start seeing results",
      details: [
        "Enable online booking",
        "Start automated workflows",
        "Monitor real-time analytics",
        "Scale as your business grows"
      ],
      timeframe: "Immediate",
      icon: <BarChart3 className="h-6 w-6" />
    }
  ];

  const features = [
    {
      title: "Automated Workflows",
      description: "Set up once, run forever. Automated reminders, follow-ups, and scheduling.",
      benefit: "Save 15+ hours per week",
      icon: <Zap className="h-8 w-8" />
    },
    {
      title: "Real-time Analytics",
      description: "Track performance, revenue, and customer satisfaction in real-time.",
      benefit: "Make data-driven decisions",
      icon: <BarChart3 className="h-8 w-8" />
    },
    {
      title: "Secure & Reliable",
      description: "Bank-level security with 99.9% uptime guarantee.",
      benefit: "Peace of mind guaranteed",
      icon: <Shield className="h-8 w-8" />
    }
  ];

  const testimonials = [
    {
      quote: "Setup was incredibly easy. I had my entire booking system running in 20 minutes!",
      author: "Sarah Chen",
      business: "Zen Wellness Spa",
      timeToValue: "20 minutes"
    },
    {
      quote: "The step-by-step process made it foolproof. Even my team members could set up their sections.",
      author: "Mike Rodriguez",
      business: "Rodriguez Consulting",
      timeToValue: "30 minutes"
    },
    {
      quote: "From signup to first booking took less than an hour. Amazing!",
      author: "Lisa Thompson",
      business: "Thompson Tutoring",
      timeToValue: "45 minutes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mb-20">
          <Badge variant="secondary" className="mb-4">Simple 4-Step Process</Badge>
          <h1 className="text-5xl font-bold mb-6">From Setup to Success in 30 Minutes</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            No technical skills required. No complex configurations. Just follow our proven 4-step process 
            and start transforming your business operations today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>30-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>No technical knowledge needed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Free 30-day trial</span>
            </div>
          </div>
          <Button size="lg" className="mr-4">Start Your 30-Day Trial</Button>
          <Button variant="outline" size="lg">Watch Demo Video</Button>
        </div>

        {/* Steps */}
        <div className="container mx-auto px-4 mb-20">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border hidden lg:block"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center relative ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Step Number Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg z-10 hidden lg:flex">
                    {step.step}
                  </div>
                  
                  <Card className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {step.icon}
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">{step.timeframe}</Badge>
                          <CardTitle className="text-2xl">{step.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-base">{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} space-y-4`}>
                    <div className="lg:hidden">
                      <Badge variant="secondary" className="text-2xl font-bold px-4 py-2">{step.step}</Badge>
                    </div>
                    <div className="bg-muted p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">What You'll Accomplish:</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {index === 0 && "Your business profile will be complete and ready for customization."}
                        {index === 1 && "All your existing tools will be connected and data synchronized."}
                        {index === 2 && "Your workspace will be tailored to your specific business workflows."}
                        {index === 3 && "Your business will be running on autopilot with real-time insights."}
                      </p>
                      <div className="text-sm">
                        <strong>Time Investment:</strong> {step.timeframe}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Makes It So Easy?</h2>
            <p className="text-lg text-muted-foreground">Built for business owners, not technical experts</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-semibold text-primary">{feature.benefit}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real Setup Times from Real Customers</h2>
            <p className="text-lg text-muted-foreground">See how quickly others got up and running</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary mb-2">{testimonial.timeToValue}</div>
                    <div className="text-sm text-muted-foreground">Time to first success</div>
                  </div>
                  <blockquote className="text-sm mb-4 italic">"{testimonial.quote}"</blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I need help during setup?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our support team is available via live chat during setup. Plus, we have step-by-step video tutorials for every feature.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I import my existing customer data?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes! We support CSV imports and direct integrations with most popular business tools. Our migration assistance is included free.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if I want to customize something later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Everything is customizable at any time. You can modify workflows, add features, and adjust settings as your business evolves.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses who set up their complete business management system in under 30 minutes. 
              No risk, no commitment—just results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="group">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">Talk to Setup Expert</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">No credit card required • Cancel anytime</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;