import React from 'react'
import { Button } from "@/components/ui/button"
import Header from './Header';
import Footer from './Footer';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const Home = () => {
  return (
    <>
    {/* Header Component */}
      <div className='header flex justify-center items-center h-12 border'>
        <Header/>
      </div>

      {/* Body Component */}
      <div className='h-[70vh]'>
        <div className='flex justify-center items-center gap-20 h-full pb-20'>
          <Card className="w-full max-w-md">
            <img
              src="https://cdn.pixabay.com/photo/2020/10/22/16/41/vote-5676562_1280.jpg"
              alt="Voting Illustration"
              className="w-full h-48 object-cover rounded-t-md"
            />
            <CardHeader>
              <CardTitle>New User</CardTitle>
              <CardDescription>
                First-time users should register to vote through a secure process.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button>Register</Button>
            </CardFooter>
          </Card>

          <Card className="w-full max-w-md ">
            <CardHeader>
              <CardTitle>Election</CardTitle>
              <CardDescription>
                See different types of election in the country.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button>Know More</Button>
            </CardFooter>
          </Card>

          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Election Result</CardTitle>
              <CardDescription>
                See election result of all recent elections.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button>Know More</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer Component */}
      <div className='header flex justify-center items-center h-12 border'>
        <Footer/>
      </div>
    </>
  )
};

export default Home;