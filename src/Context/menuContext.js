import { createContext, useContext, useState } from "react";
import { ScreenWidth } from "./WindowSize";
export const Menu = createContext("");
export default function MenuContaxt({children}){
    const [screenWidth,] = useContext(ScreenWidth)
    const [isOpen,setIsOpen] = useState(screenWidth < 768 ? false : true);
    return <Menu.Provider value={[isOpen,setIsOpen]}>{children}</Menu.Provider>
}