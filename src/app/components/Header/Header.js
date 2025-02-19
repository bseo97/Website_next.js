"use client";
import React, { useEffect, useState } from "react";
import Drawer from "./DiagonalDrawer";

export default function Header() {
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent body scrolling when the drawer is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div className={`diagonal-drawer ${isOpen ? "open" : ""}`}>
        <Drawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedIndex1={selectedIndex1}
          setSelectedIndex1={setSelectedIndex1}
        />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500`}
        style={{
          backgroundColor: isScrolled ? "rgba(0, 40, 50, 0.6)" : "rgba(0, 40, 0, 0.4)",
        }}
      >
        <div className="relative flex justify-between items-center p-4">
          {/* Hamburger Button */}
          <button
            className={`text-white text-3xl xl:hidden transition-opacity duration-300 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          {/* Home Link */}
          <div
            className={`flex-grow text-center xl:hidden transition-opacity duration-300 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <a
              href="/#home"
              className="text-white text-2xl font-bold"
              onClick={() => setSelectedIndex1(0)}
            >
              Home
            </a>
          </div>

          {/* Placeholder for alignment */}
          <div className="hidden xl:block w-14"></div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:block mt-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <a
                className={`menu-item ${
                  selectedIndex1 === 0 ? "text-emerald-200" : ""
                } text-[#ffffff] hover:text-[#53c9c9]`}
                href="/#home"
                onClick={() => setSelectedIndex1(0)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className={`menu-item ${
                  selectedIndex1 === 1 ? "text-emerald-200" : ""
                } text-[#ffffff] hover:text-[#53c9c9]`}
                href="/#aboutme"
                onClick={() => setSelectedIndex1(1)}
              >
                AboutMe
              </a>
            </li>
            <li>
              <a
                className={`menu-item ${
                  selectedIndex1 === 2 ? "text-emerald-200" : ""
                } text-[#ffffff] hover:text-[#53c9c9]`}
                href="/#projects"
                onClick={() => setSelectedIndex1(2)}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className={`menu-item ${
                  selectedIndex1 === 3 ? "text-emerald-200" : ""
                } text-[#ffffff] hover:text-[#53c9c9]`}
                href="/#contactme"
                onClick={() => setSelectedIndex1(3)}
              >
                ContactMe
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
}
2