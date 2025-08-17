import React from 'react';
import { Vote, Mail, Phone, MapPin, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-slate-100 border-t border-gray-200 ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-black p-2 rounded-lg">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-black bg-clip-text text-transparent">
                AI-POWERED ONLINE VOTING SYSTEM
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              A secure online voting platform using advanced AI and face recognition for voter verification,
              ensuring transparent and trustworthy elections.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-blue-100 hover:bg-blue-200 p-2 rounded-lg transition-colors">
                <Twitter className="h-4 w-4 text-blue-600" />
              </a>
              <a href="#" className="bg-green-100 hover:bg-green-200 p-2 rounded-lg transition-colors">
                <Github className="h-4 w-4 text-green-600" />
              </a>
              <a href="#" className="bg-purple-100 hover:bg-purple-200 p-2 rounded-lg transition-colors">
                <Linkedin className="h-4 w-4 text-purple-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/"  className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center group">
                  <span>Home</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-green-600 transition-colors text-sm flex items-center group">
                  <span>About</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center group">
                  <span>FAQs</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-center group">
                  <span>Contact</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="/signup" target='_blank' className="text-gray-600 hover:text-green-600 transition-colors text-sm flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Voter Registration
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Elections
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Results & Analytics
                </a>
              </li>
              <li>
                <a href="#security" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-center">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                  Security Features
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <a
                    href="mailto:support@aionlinevoting.com"
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    support@aionlinevoting.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Phone className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <a 
                    href="tel:+91234567890" 
                    className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                  >
                    +91 234 567 890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-600">
                    Telangana, Hyderabad-500055<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-500">
                © 2025 AI Powered Online Voting System. All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a href="#intro" className="text-gray-500 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#intro" className="text-gray-500 hover:text-green-600 transition-colors">
                Terms of Service
              </a>
              <a href="#security" className="text-gray-500 hover:text-purple-600 transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-black py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-white text-sm">
            <Vote className="h-4 w-4" />
            <span className="font-medium">Powered by Advanced AI Technology</span>
            <div className="flex items-center space-x-1 ml-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}