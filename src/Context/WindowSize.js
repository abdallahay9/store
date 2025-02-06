import { createContext, useEffect, useState } from "react";
export const ScreenWidth = createContext();
export default function ScreenWidthContext({children}){
    const [width,setWidth] = useState(window.innerWidth);
    useEffect(()=>{
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize",handleResize)
        return () => window.removeEventListener("resize", handleResize);
    },[]) 
    return <ScreenWidth.Provider value={[width,setWidth]}>
        {children}
    </ScreenWidth.Provider>
}