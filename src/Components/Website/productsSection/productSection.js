import ProductCard from "./productSite/siteProducts";
import './productSection.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, PRODUCTS } from "../../../Api/api";
import CardSiteLoading from "../../Loading/cardSiteLoading";
export default function ProductSection(){
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const [err , setErr] = useState("");
    useEffect(()=>{
        setLoading(true)
        axios.get(`${baseURL}/${PRODUCTS}`)
        .then((data)=>{
            setProducts(data.data)
        })
        .catch(() => setErr("Failed to load products. Please try again later or contact support if the issue persists."))
        .finally(()=>{
            setLoading(false)
        })
    },[])
    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    return <div className="ProductSection">
        <div className='site-ProductSection-title'>Explore Products</div>
        <div className='line'></div>
        <div className='des'>
         Our electronic products include computers, processors, monitors, smartphones, and home appliances, featuring modern technologies that play a key role in enhancing your daily life and increasing efficiency.
        </div>
        <div className="all-products">
            {
                loading ?
                Array.from({length:8}).map((_,i)=><CardSiteLoading key={i}/>)
                :
                products.map((item)=>{
                    return <ProductCard key={item.id} id={item.id} discount={item.discount} title={item.title} description={item.description} rating={item.rating} price={item.price} image={item.images[0]?.image} />
                })
            }
        </div>
        {err!="" && <span className="error error-dash">{err}</span>}
    </div>
}