import { Outlet } from "react-router-dom";
import SiteNav from "../../Components/Website/navSite/siteNav";
export default function Website(){
    return <div style={{ background:"white" }}>
        {/* <SiteNav /> */}
        <Outlet />
    </div>
}

// السكيلتون
// المنتجات 
// لو حذفت بطاقة تروح من السلة 
