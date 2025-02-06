import CategoriesSite from "../../../Components/Website/categriesSite/categoriesSite";
import Content from "../../../Components/Website/content/content";
import DiscountCards from "../../../Components/Website/DiscountCards/discountCards";
import ProductSection from "../../../Components/Website/productsSection/productSection";
import Footer from "../../../Components/Website/Footer/footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookie from 'cookie-universal';
export default function(){
    const [err , setErr] = useState("");
    const location = useLocation();
    useEffect(()=>{
          if(location.state?.message && new Cookie().get("external")) {
            setErr(location.state.message);
            new Cookie().set("external" , false)
          }
    },[location])
    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    return <div>
        <Content />
        <CategoriesSite />
        <ProductSection />
        <DiscountCards />
        <Footer />
        {err!="" && <span className="error error-dash">{err}</span>}
    </div>
}