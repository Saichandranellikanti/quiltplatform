import React from 'react';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Zap, BarChart3, Calendar, MessageSquare, UserCheck, Settings, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const ForTeams: React.FC = () => {
  const teamSizes = [
    {
      size: "Small Teams (2-10)",
      description: "Perfect for startups and small businesses",
      features: ["Shared calendars", "Team chat", "Basic permissions", "Shared customer database"],
      price: "$29/month",
      popular: false
    },
    {
      size: "Medium Teams (11-50)",
      description: "Growing businesses with multiple departments",
      features: ["Advanced permissions", "Department workflows", "Team analytics", "Custom integrations"],
      price: "$89/month",
      popular: true
    },
    {
      size: "Large Teams (50+)",
      description: "Enterprise-grade collaboration and security",
      features: ["Enterprise security", "Advanced analytics", "Custom workflows", "Dedicated support"],
      price: "Custom",
      popular: false
    }
  ];

  const collaborationFeatures = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Workspaces",
      description: "Shared spaces where teams can collaborate on projects, manage clients, and track progress together",
      benefits: ["Centralized communication", "Shared project visibility", "Real-time updates", "Team performance tracking"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Role-Based Permissions",
      description: "Control who can access what with granular permission settings for different team roles",
      benefits: ["Secure data access", "Role-specific dashboards", "Audit trails", "Compliance ready"]
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Team Communication",
      description: "Built-in messaging, comments, and notifications keep everyone informed and aligned",
      benefits: ["Reduce email clutter", "Context-aware discussions", "File sharing", "Mobile notifications"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Team Analytics",
      description: "Track team performance, productivity metrics, and collaborative success rates",
      benefits: ["Performance insights", "Productivity tracking", "Team efficiency", "Goal monitoring"]
    }
  ];

  const workflows = [
    {
      department: "Sales Team",
      workflow: "Lead → Qualification → Proposal → Close → Handoff",
      automation: "Auto-assign leads, send follow-up sequences, update CRM",
      timesSaved: "12 hours/week per rep",
      icon: <UserCheck className="h-6 w-6" />
    },
    {
      department: "Service Team",
      workflow: "Booking → Preparation → Service → Follow-up → Review",
      automation: "Schedule confirmations, prep checklists, service reminders",
      timesSaved: "8 hours/week per team",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      department: "Operations",
      workflow: "Planning → Resource allocation → Execution → Quality check",
      automation: "Resource scheduling, quality alerts, performance tracking",
      timesSaved: "15 hours/week per manager",
      icon: <Settings className="h-6 w-6" />
    }
  ];

  const testimonials = [
    {
      quote: "Our team productivity increased by 40% within the first month. Everyone knows what they need to do and when.",
      author: "Jennifer Walsh",
      role: "Operations Manager",
      company: "Wellness Center Pro",
      teamSize: "15 people",
      improvement: "40% productivity increase"
    },
    {
      quote: "The best part is how easy it is to onboard new team members. They're productive from day one.",
      author: "Carlos Rivera",
      role: "CEO",
      company: "Rivera Consulting Group",
      teamSize: "8 people",
      improvement: "50% faster onboarding"
    },
    {
      quote: "We eliminated the weekly status meetings. Everything is visible in real-time now.",
      author: "Sarah Kim",
      role: "Team Lead",
      company: "Design Studio Plus",
      teamSize: "12 people",
      improvement: "6 hours/week saved"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="py-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mb-20">
          <Badge variant="secondary" className="mb-4">Built for Collaboration</Badge>
          <h1 className="text-5xl font-bold mb-6">Supercharge Your Team's Productivity</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform how your team works together. From small startups to growing enterprises, 
            Quilt scales with your team and keeps everyone aligned, productive, and successful.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>2-500+ team members</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>50% less coordination time</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Enterprise security</span>
            </div>
          </div>
          <Button size="lg" className="mr-4">Start Team Trial</Button>
          <Button variant="outline" size="lg">Schedule Team Demo</Button>
        </div>

        {/* Team Size Packages */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Plans That Scale With Your Team</h2>
            <p className="text-lg text-muted-foreground">Choose the perfect plan for your team size and needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamSizes.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.size}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold text-primary mt-4">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? "default" : "outline"}>
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Collaboration Features */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for Team Collaboration</h2>
            <p className="text-lg text-muted-foreground">Everything your team needs to work together seamlessly</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {collaborationFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Workflows */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Streamlined Team Workflows</h2>
            <p className="text-lg text-muted-foreground">See how different departments optimize their processes</p>
          </div>
          <div className="space-y-8">
            {workflows.map((workflow, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid lg:grid-cols-4 gap-6 items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {workflow.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{workflow.department}</h3>
                        <p className="text-sm text-muted-foreground">Workflow optimization</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Process Flow</h4>
                      <p className="text-sm text-muted-foreground">{workflow.workflow}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Automation</h4>
                      <p className="text-sm text-muted-foreground">{workflow.automation}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{workflow.timesSaved}</div>
                      <div className="text-sm text-muted-foreground">Time saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Success Stories */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real Teams, Real Results</h2>
            <p className="text-lg text-muted-foreground">See how teams transformed their collaboration</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-primary mb-2">{testimonial.improvement}</div>
                    <div className="text-sm text-muted-foreground">Team: {testimonial.teamSize}</div>
                  </div>
                  <blockquote className="text-sm mb-4 italic">"{testimonial.quote}"</blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
            <p className="text-lg text-muted-foreground">Your team's data is protected with bank-level security</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">256-bit Encryption</CardTitle>
                <CardDescription>All data encrypted in transit and at rest</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <UserCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">SSO Integration</CardTitle>
                <CardDescription>Connect with your existing identity provider</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Audit Logs</CardTitle>
                <CardDescription>Complete activity tracking and compliance reporting</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">SOC 2 Compliant</CardTitle>
                <CardDescription>Meets enterprise security standards</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Team?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams already working smarter, not harder. Start your free trial today 
              and see the difference collaborative productivity makes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Button size="lg" className="group">
                Start Team Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">Schedule Team Demo</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              30-day free trial • No credit card required • Setup in 15 minutes
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForTeams;