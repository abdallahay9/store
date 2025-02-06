import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/Bar/sideBar";
import TopBar from "../../Components/Dashboard/Bar/topBar";
import { useContext } from "react";
import { Menu } from "../../Context/menuContext";
import { ScreenWidth } from "../../Context/WindowSize";

export default function Dashboard(){
   const [isOpen , ] = useContext(Menu);
   const [Width ,  ] = useContext(ScreenWidth);
   return <div className="dashboard" style={{paddingLeft:isOpen?(Width <768)?"0px":"255px" : (Width <768)? "0px" : "100px"}}>
    <TopBar />
    <SideBar />
    <Outlet />
   </div>
}