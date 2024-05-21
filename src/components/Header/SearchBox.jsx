import React, { useState } from "react";
import { set } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SearchBox() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        if (input.length > 1) {
            navigate(`/auctions/${input}`)
        }
    }


    return (
        <form className="flex w-full">
            <input
                className="border-gray-300 bg-transparent text-sm outline-none overflow-hidden bg-white w-full px-4 py-2 rounded-l-md"
                type="text"
                placeholder="Search Anything Here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button 
                className="text-white text-xl bg-green-600 px-2 py-2 rounded-r-md"
                type="submit"
                onClick={(e) => handleSearch(e)}
            >
                <FiSearch />
            </button>
        </form>
    );
}

export default SearchBox;
