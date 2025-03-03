const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm h-24"> {/* Increased header height */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-full"> {/* Use h-full to fill the increased height */}
          {/* Logo and Menu Button */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-12 w-auto" /> {/* Increased logo size */}
            {/* Add more spacing here if needed */}
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-800 hover:text-gray-500">Home</a>
            <a href="/about" className="text-gray-800 hover:text-gray-500">About</a>
            <a href="/contact" className="text-gray-800 hover:text-gray-500">Contact</a>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-24 right-4 bg-white shadow-lg rounded-md"> {/* Adjusted top position */}
          <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Home
          </a>
          <a href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            About
          </a>
          <a href="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;