import { createContext, useState } from "react";

export const Search = createContext("");

export default function SearchContextFunction({ children }) {
    const [search, setSearch] = useState("");
    return (
        <Search.Provider value={[search, setSearch]}>
            {children}
        </Search.Provider>
    );
}
