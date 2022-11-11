import React from "react";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  const menuNav = [
    { name: "Home", path: "/" },
    { name: "Serials", path: "/serials" },
    { name: "Books", path: "/books" },
    { name: "Detail", path: "/detail" },
  ];

  return (
    <div className="bg-gray-300 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex gap-4">
        {menuNav.map((nav) => (
          <NavLink
            key={nav.name}
            to={nav.path}
            className={({ isActive }) =>
              isActive ? "text-red-500 h-6" : "h-6"
            }
          >
            {nav.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default MainNavigation;
