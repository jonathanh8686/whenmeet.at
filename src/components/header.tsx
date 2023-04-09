import React from "react";
import { Auth } from "./auth";

export const Header = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-[#14012b]">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-3xl leading-relaxed inline-block mr-4 whitespace-nowrap text-violet-700 font-extrabold"
              href=".."
            >
              whenmeet
            </a>
          </div>
        </div>
        <Auth/>
      </nav>
    </>
  );
}