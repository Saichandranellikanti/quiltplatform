import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, Zap, Globe, ArrowRight, Target, Award, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { number: "10,000+", label: "Businesses Served" },
    { number: "2.5M+", label: "Bookings Processed" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "15+", label: "Countries" }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer-First",
      description: "Every decision we make starts with our customers' success in mind"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Simplicity",
      description: "We believe powerful tools should be easy to use and understand"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Accessibility",
      description: "Great business tools should be available to businesses of all sizes"
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former McKinsey consultant with 10+ years helping small businesses scale"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-founder",
      bio: "Ex-Google engineer passionate about building tools that actually work"
    },
    {
      name: "Emily Watson",
      role: "Head of Customer Success",
      bio: "15 years in SaaS, dedicated to ensuring every customer achieves their goals"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mb-20">
          <Badge variant="secondary" className="mb-4">Our Story</Badge>
          <h1 className="text-5xl font-bold mb-6">Building the Future of Small Business</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            We started Quilt because we believe every small business deserves access to enterprise-grade tools 
            without the complexity or cost. Today, we're proud to serve over 10,000 businesses worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              To democratize business management technology, making it possible for any business owner 
              to compete with larger enterprises through smart, simple, and affordable tools.
            </p>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-8">
                <blockquote className="text-xl italic">
                  "We believe that great businesses shouldn't be held back by complicated software. 
                  Every entrepreneur deserves tools that help them succeed, not struggle."
                </blockquote>
                <cite className="block mt-4 text-muted-foreground">— Sarah Chen, CEO</cite>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg text-primary w-fit mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-lg text-muted-foreground">The people behind Quilt's success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4"></div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey */}
        <div className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-lg text-muted-foreground">From idea to impact</p>
            </div>
            <div className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="text-sm">2020</Badge>
                    <div>
                      <h3 className="font-semibold mb-2">The Problem</h3>
                      <p className="text-muted-foreground">Sarah and Marcus witnessed small businesses struggling with complex, expensive software during the pandemic.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="text-sm">2021</Badge>
                    <div>
                      <h3 className="font-semibold mb-2">The Solution</h3>
                      <p className="text-muted-foreground">Launched Quilt with 50 beta customers, focusing on simplicity and affordability.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Badge variant="secondary" className="text-sm">2024</Badge>
                    <div>
                      <h3 className="font-semibold mb-2">The Impact</h3>
                      <p className="text-muted-foreground">Now serving 10,000+ businesses across 15 countries, with $500M+ in transactions processed.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <Lightbulb className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a business owner looking to grow or someone passionate about helping small businesses succeed, 
              we'd love to have you as part of the Quilt community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">Join Our Team</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;