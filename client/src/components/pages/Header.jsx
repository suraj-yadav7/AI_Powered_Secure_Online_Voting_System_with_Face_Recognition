import React from "react";
import { Vote } from 'lucide-react';
import { Button } from "@/components/ui/button";



const Header = ()=>{
  return (
    <>
      <div>
          {/* Navigation */}
          <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className=" flex h-14 items-center">
              <div className="mr-4 flex">
                <div className="mr-6 flex items-center space-x-2">
                  <Vote className="h-6 w-6" />
                  <span className="hidden font-bold sm:inline-block">
                    AI-POWERED ONLINE VOTING SYSTEM
                  </span>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  <div className="hidden md:flex space-x-6">
                    <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                      Features
                    </a>
                    <a href="#security" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                      Security
                    </a>
                    <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                      About
                    </a>
                  </div>
                </div>
                <Button size="sm">
                  Login
                </Button>
              </div>
            </div>
          </nav>
      </div>
    </>
  )
};

export default Header;