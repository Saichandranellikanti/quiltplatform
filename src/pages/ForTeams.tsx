import React from 'react';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Zap, BarChart3, Calendar, MessageSquare, UserCheck, Settings, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const ForTeams: React.FC = () => {
  const departmentWorkflows = [
    {
      department: "Sales Teams",
      challenges: ["Lead tracking chaos", "Manual follow-ups", "Quota visibility"],
      solutions: ["Shared lead pipeline", "Automated sequences", "Team leaderboards"],
      results: "40% more qualified leads, 25% faster close rates",
      icon: <UserCheck className="h-8 w-8" />,
      workflow: [
        "Lead capture → Auto-assignment",
        "Qualification → Team review", 
        "Proposal → Manager approval",
        "Close → Celebration & handoff"
      ]
    },
    {
      department: "Service Teams", 
      challenges: ["Scheduling conflicts", "Resource overlap", "Quality consistency"],
      solutions: ["Team calendars", "Resource management", "Service checklists"],
      results: "60% fewer conflicts, 35% higher satisfaction",
      icon: <Calendar className="h-8 w-8" />,
      workflow: [
        "Booking → Team availability",
        "Prep → Shared resources",
        "Service → Quality checklist", 
        "Follow-up → Team feedback"
      ]
    },
    {
      department: "Operations Teams",
      challenges: ["Process inconsistency", "Communication gaps", "Performance tracking"],
      solutions: ["Standard workflows", "Real-time updates", "Team dashboards"],
      results: "50% faster processes, 90% accuracy",
      icon: <Settings className="h-8 w-8" />,
      workflow: [
        "Planning → Team input",
        "Execution → Live tracking",
        "Quality → Peer review",
        "Optimization → Data insights"
      ]
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
          <Badge variant="secondary" className="mb-4">Team Collaboration</Badge>
          <h1 className="text-5xl font-bold mb-6">Transform How Your Team Works Together</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stop the chaos of scattered communications, duplicate work, and missed deadlines. 
            Quilt brings your entire team together with workflows designed for real collaboration.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>75% faster team coordination</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Works for teams of any size</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>No learning curve</span>
            </div>
          </div>
          <Button size="lg" className="mr-4">Try Team Features Free</Button>
          <Button variant="outline" size="lg">See Team Demo</Button>
        </div>

        {/* Department Workflows */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for How Real Teams Work</h2>
            <p className="text-lg text-muted-foreground">See how different departments transform their daily operations</p>
          </div>
          <div className="space-y-16">
            {departmentWorkflows.map((dept, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {dept.icon}
                    </div>
                    <h3 className="text-3xl font-bold">{dept.department}</h3>
                  </div>
                  
                  {/* Before: Challenges */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-red-600 mb-3">❌ Before: Common Struggles</h4>
                    <ul className="space-y-2">
                      {dept.challenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* After: Solutions */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-green-600 mb-3">✅ After: Quilt Solutions</h4>
                    <ul className="space-y-2">
                      {dept.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="font-semibold text-primary">Real Results: {dept.results}</p>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Workflow</CardTitle>
                      <CardDescription>How {dept.department.toLowerCase()} collaborate on every project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {dept.workflow.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                              {stepIndex + 1}
                            </div>
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Features */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything Teams Need to Collaborate</h2>
            <p className="text-lg text-muted-foreground">Powerful features designed specifically for team productivity</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
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
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Success Metrics */}
        <div className="container mx-auto px-4 mb-20">
          <div className="bg-primary/5 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Teams Choose Quilt</h2>
              <p className="text-lg text-muted-foreground">Real improvements from teams just like yours</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-primary mb-2">{testimonial.improvement}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.teamSize}</div>
                    </div>
                    <blockquote className="text-sm mb-4 italic text-center">"{testimonial.quote}"</blockquote>
                    <div className="text-center">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Security for Teams */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security Your Team Can Trust</h2>
            <p className="text-lg text-muted-foreground">Protect your team's work with industry-leading security</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Role-Based Access</CardTitle>
                <CardDescription>Control exactly who sees what data</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <UserCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Team Permissions</CardTitle>
                <CardDescription>Granular permissions for every team member</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Settings className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Audit Trails</CardTitle>
                <CardDescription>Track all team activities and changes</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">SOC 2 Certified</CardTitle>
                <CardDescription>Enterprise security standards</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <Users className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Unite Your Team?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stop working in silos. Start working as a team. See how Quilt transforms collaboration 
              for teams of every size and industry.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Button size="lg" className="group">
                Start Team Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">Book Team Demo</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Free for 30 days • Setup in 15 minutes • Works with any team size
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForTeams;