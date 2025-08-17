import React from 'react';
import { Vote, UserPlus, BarChart3, Brain, CheckCircle,
  ArrowRight, Users, Lock, Zap, Shield, UserCheck, MonitorCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <div className='px-12 bg-background'>
        <div className="min-h-screen  ">
          {/* Hero Section */}
          <section id="intro" className="border-1 rounded-2xl space-y-6 py-4 md:py-10 lg:py-30">
            <div className=" mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <div className="rounded-2xl bg-muted p-4">
                <MonitorCheck className="h-16 w-16" />
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                AI-Powered Online Voting System
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Secure, transparent, and intelligent democratic participation. Experience the future of voting
                with advanced AI verification, real-time results, and uncompromising security.
              </p>
              {/* <div className="space-x-4">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div> */}
            </div>
          </section>

          {/* Main Features */}
          <section id="features" className=" space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-8">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Complete Voting Solution
              </h2>
              <p className="max-w-[85rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Everything you need for secure, modern elections
              </p>
            </div>

            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {/* New Voter Registration */}
              <Card className="relative overflow-hidden h-50">
                <CardContent className="flex h-[180px] flex-col justify-between rounded-md ">
                  <div className="space-y-2">
                    <UserPlus className="h-12 w-12 text-green-600" />
                    <h3 className="font-bold">New Voter Registration</h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered identity verification ensures secure voter registration with real-time document validation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Election Management */}
              <Card className="relative overflow-hidden h-50">
                <CardContent className="flex h-[180px] flex-col justify-between rounded-md ">
                  <div className="space-y-2">
                    <Vote className="h-12 w-12 text-blue-600" />
                    <h3 className="font-bold">Election Platform</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure voting experience with AI-powered fraud prevention and blockchain-verified integrity.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Results & Analytics */}
              <Card className="relative overflow-hidden h-50">
                <CardContent className="flex h-[180px] flex-col justify-between rounded-md">
                  <div className="space-y-2">
                    <BarChart3 className="h-12 w-12 text-purple-600" />
                    <h3 className="font-bold">Results & Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time result tracking with AI-powered analytics and comprehensive reporting.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature Details */}
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {/* Registration Details */}
              <Card >
                <CardContent className="">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900">
                      <UserPlus className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Registration Features</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        ID verification
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Document authenticity check
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Automated eligibility validation
                      </li>
                    </ul>
                    <Button className="w-full" variant="default">
                      Register Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Election Details */}
              <Card>
                <CardContent >
                  <div className="space-y-4">
                    <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                      <Vote className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Election Features</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                        End-to-end encryption
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                        Real-time fraud detection
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                        Audit trail transparency
                      </li>
                    </ul>
                    <Button className="w-full" variant="default">
                      Start Voting
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Details */}
              <Card>
                <CardContent >
                  <div className="space-y-4">
                    <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold">Analytics Features</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                        Live result updates
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-purple-500" />
                        Detailed reporting
                      </li>
                    </ul>
                    <Button className="w-full" variant="default">
                      View Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className=" py-4 mb-6 md:py-6 lg:py-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Uncompromising Security
              </h2>
              <p className="max-w-[85rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our AI-powered security infrastructure ensures the highest levels of election integrity.
              </p>
            </div>

            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="font-semibold">Advanced Encryption</h3>
                    <p className="text-sm text-muted-foreground">
                      Military-grade encryption protects every vote and voter identity
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="font-semibold">Bio-Metric Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Artificial Intelligence technology system guarantees 100% verfication.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                    <Lock className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="font-semibold">Advance Cloud Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time monitoring prevents manipulation and ensures authenticity
                    </p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to make your voice heard</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
            {[
              { step: "1", title: "Sign Up", desc: "Create your account with basic information", icon: UserCheck },
              { step: "2", title: "Verify Identity", desc: "Submit required documents for verification", icon: Shield },
              { step: "3", title: "Get Approved", desc: "Wait for admin approval (2-3 business days)", icon: CheckCircle },
              { step: "4", title: "Start Voting", desc: "Participate in polls and community decisions", icon: Vote }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <span className="text-blue-600 font-bold text-sm">Step: {item.step}</span>
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

          {/* CTA Section */}
          <section className=" py-6 md:py-10 lg:py-20">
            <Card className="relative overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
                  <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                    Ready to Transform Democracy?
                  </h2>
                  <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Join the future of secure, transparent, and intelligent voting systems.
                  </p>
                  <Button size="lg" className="mt-4">
                    Start Your Election Today
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home