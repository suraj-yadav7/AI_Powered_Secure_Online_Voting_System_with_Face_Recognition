import React from "react";

const Header = ()=>{
  return (
    <>
      <div>
        <nav>
          <ul className="flex gap-10 cursor-pointer ">
            <li className="hover:bg-gray-300 p-2 rounded-xl">Home</li>
            <li className="hover:bg-gray-300 p-2 rounded-xl">Election</li>
            <li className="hover:bg-gray-300 p-2 rounded-xl">Result</li>
            <li className="hover:bg-gray-300 p-2 rounded-xl">Profile</li>
            <li className="hover:bg-gray-300 p-2 rounded-xl">Login</li>
          </ul>
        </nav>
      </div>
    </>
  )
};

export default Header;