import React, { useEffect, useState } from "react";
import { Vote } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const Header = ()=>{
  const [userData, setUserData] = useState(null)

  const getUserInfo = () => {
    try{
      const storedData = localStorage.getItem("userinfo")
      if(storedData){
        const jsonData = JSON.parse(storedData)
        setUserData(jsonData)
      }
    }
    catch(error){
      console.log("Error while setting userData and parse: ", error)
    }
  };

  const handleLogout = () =>{
    try{
        localStorage.removeItem("userinfo")
        setUserData(null)
    }
    catch(error){
      console.log("Error while loginout user: ", error)
    }
  };

  useEffect(()=>{
    getUserInfo()
  }, [])

  return (
    <>
      <div className=" px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50" >
          {/* Navigation */}
          <nav >
            <div className=" flex h-14 items-center">
              <div className="mr-4 flex">
                <div className="mr-6 flex items-center space-x-2">
                  <Link to="/">
                  <div className="bg-black p-1 px-2 rounded-md">
                      <Vote className="text-white cursor-pointer" size={30} />
                  </div>
                  </Link>
                  <span className="hidden font-bold sm:inline-block text-lg">
                    AI-POWERED ONLINE VOTING SYSTEM
                  </span>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">

                {
                  userData && userData?
                  <div className="flex">
                    {
                      !userData?
                        <div>
                          <Link to="/login">
                            <Button className="ml-4 cursor-pointer p-4 bg-black" size="sm">
                              login
                            </Button>
                          </Link>
                        </div>:
                        <div onClick={handleLogout}>
                          <Link to="/login">
                            <Button className="ml-4 cursor-pointer p-4 bg-red-500" size="sm">
                              logout
                            </Button>
                          </Link>
                        </div>
                    }

                  </div>:
                  <div>
                <div className="w-full flex-1 md:w-auto md:flex-none ">
                  <div className="hidden md:flex space-x-6 ">
                    <a href="#features" className="text-md font-medium text-muted-foreground hover:text-primary transition-colors">
                      Features
                    </a>
                    <a href="#security" className="text-md font-medium text-muted-foreground hover:text-primary transition-colors">
                      Security
                    </a>
                    <Link to="/login">
                      <Button className="ml-4 cursor-pointer p-4 bg-black" size="sm">
                        login
                      </Button>
                    </Link>
                  </div>
                </div>
                </div>
                }
              </div>
            </div>
          </nav>
      </div>
    </>
  )
};

export default Header;