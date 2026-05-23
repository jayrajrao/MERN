import { Link } from "react-router-dom";

function Navbar() {
  return (
    // 'border-b border-gray-200' se niche ekdum waisi hi crisp line aayegi jaisi Figma mein hai
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      
      {/* Container ki width thodi badha di hai (max-w-[1300px]) taaki spacing match ho */}
      <div className="max-w-[1300px] mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* Purple Star Icon Background */}
          <div className="bg-[#7e22ce] text-white rounded-full w-8 h-8 flex items-center justify-center text-[18px]">
            ★
          </div>
          {/* 'Review' normal hai, '&RATE' ekdum bold hai */}
          <h1 className="text-2xl text-gray-800 tracking-tight">
            Review<span className="text-[#7e22ce] font-extrabold">&RATE</span>
          </h1>
        </Link>

        {/* Right Side Group: Search Bar aur Buttons ko ek sath group kiya hai (Is se Search right mein shift ho jayega) */}
        <div className="flex items-center gap-10">
          
          {/* Search Bar */}
          <div className="relative w-[450px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm text-gray-800 focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce] transition-all"
            />
            {/* Proper SVG Search Icon */}
            <span className="absolute right-3 top-2 text-[#7e22ce]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-6 text-[15px] text-gray-800">
            <button className="hover:text-[#7e22ce] transition-colors">
              SignUp
            </button>
            <button className="hover:text-[#7e22ce] transition-colors">
              Login
            </button>
          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;