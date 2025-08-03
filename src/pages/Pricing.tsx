import React, { useState } from 'react';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, X, Star, Zap, Users, Shield, ArrowRight, Calculator } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Solo",
      description: "Perfect for individual entrepreneurs and freelancers",
      monthlyPrice: 19,
      annualPrice: 190, // 2 months free
      features: [
        "Up to 100 customers",
        "Basic booking system",
        "Email notifications",
        "Customer database",
        "Mobile app access",
        "Basic analytics",
        "Email support",
        "5GB storage"
      ],
      limitations: [
        "Single user only",
        "Basic templates"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Business",
      description: "For small to medium businesses ready to scale",
      monthlyPrice: 49,
      annualPrice: 490, // 2 months free
      features: [
        "Up to 2,500 customers",
        "Advanced booking & automation",
        "SMS & email marketing",
        "Up to 10 team members",
        "Custom forms & workflows",
        "Advanced analytics",
        "Payment processing",
        "Document management",
        "Priority support",
        "Custom branding",
        "100GB storage",
        "API access"
      ],
      limitations: [],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      monthlyPrice: 149,
      annualPrice: 1490, // 2 months free
      features: [
        "Unlimited customers",
        "Unlimited team members",
        "Advanced security & compliance",
        "Custom integrations",
        "Dedicated account manager",
        "White-label options",
        "Advanced API access",
        "SSO integration",
        "24/7 phone support",
        "Custom training & onboarding",
        "Unlimited storage",
        "SLA guarantee",
        "Advanced reporting suite"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const addOns = [
    {
      name: "Additional Users",
      price: "$15/month per user",
      description: "Add team members beyond your plan limit"
    },
    {
      name: "Premium Support",
      price: "$99/month",
      description: "24/7 phone support with 1-hour response time"
    },
    {
      name: "Custom Integrations",
      price: "$299/month",
      description: "Connect with specialized industry tools"
    },
    {
      name: "Advanced Analytics",
      price: "$49/month",
      description: "Advanced reporting and business intelligence"
    }
  ];

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
    },
    {
      question: "What's included in the free trial?",
      answer: "All plans include a 30-day free trial with full access to features. No credit card required to start."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees, ever. We include free onboarding and migration assistance for all plans."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and ACH transfers for annual plans."
    }
  ];

  const savings = isAnnual ? "Save 17%" : "";

  return (
    <div className="min-h-screen bg-background">
      <main className="py-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mb-20">
          <Badge variant="secondary" className="mb-4">Simple, Transparent Pricing</Badge>
          <h1 className="text-5xl font-bold mb-6">Choose the Perfect Plan for Your Business</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            No hidden fees, no surprises. Start with a 30-day free trial and scale as you grow. 
            All plans include free setup and migration assistance.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg ${!isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-lg ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Annual
              {savings && <Badge variant="secondary" className="ml-2">{savings}</Badge>}
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4 mb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="pt-4">
                    <div className="text-4xl font-bold">
                      ${isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice}
                      <span className="text-lg font-normal text-muted-foreground">/month</span>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-muted-foreground">
                        Billed annually (${plan.annualPrice}/year)
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="flex items-center gap-2 text-muted-foreground">
                        <X className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ROI Calculator Preview */}
        <div className="container mx-auto px-4 mb-20">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center">
            <Calculator className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">See Your Return on Investment</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our customers typically save 15+ hours per week and increase revenue by 30% within 6 months. 
              Calculate your potential savings and ROI.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-primary">15+ hours</div>
                <div className="text-muted-foreground">Weekly time savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">30%</div>
                <div className="text-muted-foreground">Average revenue increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">$2,400</div>
                <div className="text-muted-foreground">Monthly value generated*</div>
              </div>
            </div>
            <Button size="lg" variant="outline">
              Calculate Your ROI
            </Button>
            <p className="text-xs text-muted-foreground mt-4">*Based on average customer data</p>
          </div>
        </div>

        {/* Add-ons */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Optional Add-ons</h2>
            <p className="text-lg text-muted-foreground">Enhance your plan with additional features</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{addon.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{addon.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enterprise Features */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Features</h2>
            <p className="text-lg text-muted-foreground">Advanced capabilities for large organizations</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Advanced Security</CardTitle>
                <CardDescription>SOC 2 compliance, SSO, audit logs, and advanced permissions</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Dedicated Support</CardTitle>
                <CardDescription>Account manager, custom training, and priority support</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Custom Integrations</CardTitle>
                <CardDescription>API access, webhooks, and custom workflow automation</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* FAQs */}
        <div className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="container mx-auto px-4 mb-20">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-8 text-center">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">30-Day Money-Back Guarantee</h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Try Quilt risk-free for 30 days. If you're not completely satisfied, 
                we'll refund your payment—no questions asked.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Free migration assistance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already saving time and increasing revenue with Quilt. 
              Start your free trial today—no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">Schedule Demo</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Questions? Call us at (555) 123-4567 or chat with our sales team
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;