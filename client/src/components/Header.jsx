import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <header className="bg-primary-dark text-white p-6 border-b">
      <div className="flex justify-around items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Soul Scribe</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-x-10">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/history" className="hover:text-gray-300">History</Link>
          <Link to="/insights" className="hover:text-gray-300">Insights</Link>
          <Link to="/" className="hover:text-gray-300">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-3">
          <Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/history" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>History</Link>
          <Link to="/insights" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Insights</Link>
          <Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
