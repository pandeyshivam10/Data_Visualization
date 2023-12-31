import React from 'react';

function NavBar() {
  return (
    <nav className=" bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-semibold">Visualization Dashboard</div>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:text-blue-200">About</a>
            </li>
            <li>
              <a href="/" className="text-white hover:text-blue-200">Services</a>
            </li>
            <li>
              <a href="/" className="text-white hover:text-blue-200">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
