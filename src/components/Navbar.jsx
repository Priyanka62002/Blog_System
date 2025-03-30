import React, { useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";

const Navbar = ({ setText }) => {
  const [value, setValue] = useState("");

  return (
    <nav className="flex items-center justify-between p-4 w-[90%] mx-auto bg-black">
      <p className="text-gray-50 uppercase font-bold text-2xl">Blog</p>
      <div className="bg-black rounded-md p-1 flex items-center">
        <LiaSearchSolid className="size-4 mr-2" />
        <input
          type="text"
          className="bg-transparent border-none focus:outline-0 focus:ring-transparent w-[250px]"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => setText(value)}
          className="bg-neutral-800 text-neutral-50 px-2 py-1 rounded-md text-sm"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
