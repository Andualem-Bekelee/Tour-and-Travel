import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user, handleLogout, language = "en", setLanguage = () => {} }) => {
const [open, setOpen] = useState(false);

const navItems = [
{ key: "home", labelEn: "Home", labelAm: "መነሻ", to: "/home" },
{ key: "tours", labelEn: "Tours", labelAm: "ጉብኝቶች", to: "/tours" },
{ key: "destination", labelEn: "Destination", labelAm: "መዳረሻ", to: "/destination" },
{ key: "activities", labelEn: "Activities", labelAm: "እንቅስቃሴዎች", to: "/activities" },
{ key: "contact", labelEn: "Contact", labelAm: "አግኙን", to: "/contact" },
];

return ( <nav className="fixed top-0 w-full z-50 "> <div className="max-w-7xl mx-auto px-4 md:px-8 py-[21px] flex items-center gap-6">
{/* LOGO */} <Link to="/" className="text-2xl font-bold text-orange-600"> <img src="http://localhost:5000/uploads/logo1.png" alt="logo" /> </Link>


    {/* Desktop Menu */}
    <div className="hidden md:flex items-center justify-between w-full gap-6">
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-blue-600 font-bold underline underline-offset-4"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {language === "en" ? item.labelEn : item.labelAm}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-6">
        <li>
          
        </li>

        {!user && (
          <>
          <NavLink to="/usd" className="font-medium text-gray-700 hover:text-blue-600">
                {language === "en" ? "USD" : "ግባ"}
              </NavLink>
            <li>
              <NavLink to="/signup" className="font-medium text-gray-700 hover:text-blue-600">
                {language === "en" ? "Sign Up" : "ይመዝገቡ"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="font-medium text-gray-700 hover:text-blue-600">
                {language === "en" ? "Login" : "ግባ"}
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <span className="font-medium text-gray-700">
                {language === "en" ? "Hello," : "ሰላም,"} {user.name}
              </span>
            </li>

            {user.isAdmin && (
              <li>
                <NavLink to="/admin" className="font-medium text-gray-700 hover:text-blue-600">
                  {language === "en" ? "Admin" : "አስተዳደር"}
                </NavLink>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="font-medium text-gray-700 hover:text-red-600"
              >
                {language === "en" ? "Logout" : "ውጣ"}
              </button>
            </li>
          </>
        )}

        <li>
          <button
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
            className="font-medium text-gray-700"
          >
            {language === "en" ? "AM" : "EN"}
          </button>
        </li>
      </ul>
    </div>

    {/* Mobile Buttons */}
    <div className="md:hidden flex items-center gap-3 ml-auto">
      <button
        onClick={() => setLanguage(language === "en" ? "am" : "en")}
        className="px-2 py-1 rounded border text-sm"
      >
        {language === "en" ? "AM" : "EN"}
      </button>

      <button onClick={() => setOpen((prev) => !prev)} className="text-2xl font-bold">
        {open ? "✕" : "☰"}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {open && (
    <div className="md:hidden bg-cream border-t border-gray-300">
      <ul className="flex flex-col gap-2 p-4">
        {navItems.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              {language === "en" ? item.labelEn : item.labelAm}
            </NavLink>
          </li>
        ))}

        {!user && (
          <>
            <li>
              <NavLink
                to="/signup"
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700"
              >
                {language === "en" ? "Sign Up" : "ይመዝገቡ"}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700"
              >
                {language === "en" ? "Login" : "ግባ"}
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <span className="block py-2 text-gray-700">
                {language === "en" ? "Hello," : "ሰላም,"} {user.name}
              </span>
            </li>

            {user.isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                >
                  {language === "en" ? "Admin" : "አስተዳደር"}
                </NavLink>
              </li>
            )}

            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="block py-2 text-gray-700 hover:text-red-600"
              >
                {language === "en" ? "Logout" : "ውጣ"}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  )}

  <style>{`.bg-cream { background-color: #FFF5E1; }`}</style>
</nav>


);
};

export default Navbar;
