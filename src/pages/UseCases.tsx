import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Scissors, Utensils, Briefcase, GraduationCap, Home, Stethoscope, ShoppingBag, Camera, Car, Paintbrush2 } from 'lucide-react';

const UseCases: React.FC = () => {
  const useCases = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Beauty & Wellness",
      description: "Hair salons, spas, massage therapy, beauty clinics",
      stats: { customers: "500+ clients", revenue: "40% increase", efficiency: "60% less admin" },
      features: ["Online booking", "Client profiles", "Service packages", "Automated reminders"],
      story: "Serenity Spa increased bookings by 65% and reduced no-shows by 40% using automated booking and SMS reminders. They now serve 200+ more clients monthly with the same staff.",
      realData: {
        beforeAfter: "Before: 150 bookings/month → After: 247 bookings/month",
        revenue: "$12,000/month → $19,800/month",
        noShows: "25% no-show rate → 8% no-show rate"
      }
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Restaurants & Food Service",
      description: "Restaurants, cafes, catering, food trucks",
      stats: { customers: "1000+ covers", revenue: "30% increase", efficiency: "50% faster service" },
      features: ["Table reservations", "Menu management", "Order tracking", "Customer feedback"],
      story: "Bistro Luigi streamlined their reservation system and reduced wait times by 45%. Their customer satisfaction scores increased from 3.8 to 4.7 stars on review platforms.",
      realData: {
        beforeAfter: "Before: 80 covers/night → After: 125 covers/night",
        waitTime: "Average wait: 25 minutes → 12 minutes",
        satisfaction: "3.8/5 rating → 4.7/5 rating"
      }
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Professional Services",
      description: "Consultants, lawyers, accountants, coaches",
      stats: { customers: "300+ clients", revenue: "50% increase", efficiency: "70% less paperwork" },
      features: ["Client portals", "Document management", "Time tracking", "Invoicing"],
      story: "Marketing consultant Sarah doubled her client base while reducing administrative work by 3 hours daily. She now focuses on strategy instead of scheduling.",
      realData: {
        beforeAfter: "Before: 15 clients → After: 32 clients",
        adminTime: "4 hours/day → 1 hour/day admin work",
        billableHours: "60% → 85% billable time"
      }
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Education & Training",
      description: "Tutors, music teachers, driving instructors, fitness trainers",
      stats: { customers: "200+ students", revenue: "45% increase", efficiency: "80% automated scheduling" },
      features: ["Class scheduling", "Student progress", "Payment processing", "Resource sharing"],
      story: "Music Academy Phoenix expanded from 50 to 180 students using automated scheduling and progress tracking. Parent satisfaction increased significantly.",
      realData: {
        beforeAfter: "Before: 50 students → After: 180 students",
        parentSatisfaction: "78% → 94% satisfaction rate",
        teacherEfficiency: "6 hours/week → 1.5 hours/week admin"
      }
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Healthcare & Wellness",
      description: "Clinics, therapists, dentists, veterinarians",
      stats: { customers: "800+ patients", revenue: "35% increase", efficiency: "90% digital records" },
      features: ["Appointment booking", "Patient records", "Treatment plans", "Insurance management"],
      story: "Downtown Dental reduced patient wait times by 60% and improved appointment adherence. They now serve 40% more patients with better care quality.",
      realData: {
        beforeAfter: "Before: 120 patients/week → After: 168 patients/week",
        waitTime: "Average wait: 20 minutes → 8 minutes",
        adherence: "75% → 92% appointment adherence"
      }
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Home Services",
      description: "Cleaning, maintenance, landscaping, handyman services",
      stats: { customers: "400+ homes", revenue: "60% increase", efficiency: "75% route optimization" },
      features: ["Service scheduling", "Route optimization", "Before/after photos", "Customer feedback"],
      story: "CleanPro Services tripled their client base and reduced travel time by 40% using smart routing. Customer retention improved from 70% to 95%.",
      realData: {
        beforeAfter: "Before: 80 homes/week → After: 240 homes/week",
        travelTime: "30% → 18% of work time spent traveling",
        retention: "70% → 95% customer retention"
      }
    }
  ];

  const successMetrics = [
    { metric: "Average Revenue Increase", value: "42%", description: "Within first 6 months" },
    { metric: "Time Saved Weekly", value: "15 hours", description: "On administrative tasks" },
    { metric: "Customer Satisfaction", value: "+28%", description: "Improvement in ratings" },
    { metric: "No-Show Reduction", value: "65%", description: "With automated reminders" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mb-20">
          <Badge variant="secondary" className="mb-4">Real Success Stories</Badge>
          <h1 className="text-5xl font-bold mb-6">See How Businesses Like Yours Succeed</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            From small local businesses to growing enterprises, discover how Quilt transforms operations 
            across every industry. Real stories, real results, real growth.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <CardTitle className="text-lg">{metric.metric}</CardTitle>
                  <CardDescription>{metric.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="container mx-auto px-4 mb-20">
          <div className="space-y-16">
            {useCases.map((useCase, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {useCase.icon}
                    </div>
                    <h2 className="text-3xl font-bold">{useCase.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">{useCase.description}</p>
                  
                  {/* Success Story */}
                  <div className="bg-muted p-6 rounded-lg mb-6">
                    <h3 className="font-semibold mb-3">Success Story</h3>
                    <p className="text-muted-foreground mb-4">{useCase.story}</p>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div><strong>Growth:</strong> {useCase.realData.beforeAfter}</div>
                      {useCase.realData.revenue && <div><strong>Revenue:</strong> {useCase.realData.revenue}</div>}
                      {useCase.realData.waitTime && <div><strong>Efficiency:</strong> {useCase.realData.waitTime}</div>}
                      {useCase.realData.noShows && <div><strong>No-shows:</strong> {useCase.realData.noShows}</div>}
                      {useCase.realData.satisfaction && <div><strong>Satisfaction:</strong> {useCase.realData.satisfaction}</div>}
                      {useCase.realData.retention && <div><strong>Retention:</strong> {useCase.realData.retention}</div>}
                      {useCase.realData.adminTime && <div><strong>Admin Time:</strong> {useCase.realData.adminTime}</div>}
                      {useCase.realData.billableHours && <div><strong>Billable Time:</strong> {useCase.realData.billableHours}</div>}
                      {useCase.realData.parentSatisfaction && <div><strong>Parent Satisfaction:</strong> {useCase.realData.parentSatisfaction}</div>}
                      {useCase.realData.teacherEfficiency && <div><strong>Teacher Admin:</strong> {useCase.realData.teacherEfficiency}</div>}
                      {useCase.realData.adherence && <div><strong>Appointment Adherence:</strong> {useCase.realData.adherence}</div>}
                      {useCase.realData.travelTime && <div><strong>Travel Time:</strong> {useCase.realData.travelTime}</div>}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Key Features for {useCase.title}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {useCase.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="group">
                    Start Your Success Story
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Real Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">{useCase.stats.customers}</div>
                          <div className="text-sm text-muted-foreground">Served</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{useCase.stats.revenue}</div>
                          <div className="text-sm text-muted-foreground">Revenue Growth</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{useCase.stats.efficiency}</div>
                          <div className="text-sm text-muted-foreground">Efficiency Gain</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already transforming their operations with Quilt. 
              Your industry-specific solution is just one click away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="mr-4">Start Free Trial</Button>
              <Button variant="outline" size="lg">Book Industry Demo</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UseCases;