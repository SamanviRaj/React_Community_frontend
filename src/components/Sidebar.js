import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white h-screen w-1/4">
      <nav className="p-4">
        <ul>
          <li>
            <Link to="/" className="block py-2">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="block py-2">Dashboard</Link>
          </li>
          {/* Add more navigation links */}
          <li>
            <Link to="/invoice" className="block py-2">Invoice</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
