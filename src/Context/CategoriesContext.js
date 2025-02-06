// CategoriesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL, CATEGORIES } from '../Api/api';


const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/${CATEGORIES}`)
            .then((data) => setCategories(data.data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => {
    return useContext(CategoriesContext);
};
