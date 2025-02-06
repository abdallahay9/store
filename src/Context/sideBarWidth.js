import { createContext, useContext, useEffect, useState } from "react";
import { Menu } from "./menuContext";
import { ScreenWidth } from "./WindowSize";
export const SideBarWidthContext = createContext();
export default function SideBarWidthProvider({ children }) {
    const [isOpen , ] = useContext(Menu);
    const [bodyWidth , ] = useContext(ScreenWidth);
    const [width, setWidth] = useState( 
        isOpen?(
            (bodyWidth < 768)?"255":"255"
        ):(bodyWidth >=768)?"100":"0" ,
    );
    useEffect(()=>{
        setWidth(
            isOpen?(
                (bodyWidth < 768)?"0":"255"
            ):(bodyWidth >=768)?"100":"0" ,
        );
    },[isOpen , bodyWidth])
    return (
        <SideBarWidthContext.Provider value={[ width, setWidth ]}>
            {children}
        </SideBarWidthContext.Provider>
    );
}
