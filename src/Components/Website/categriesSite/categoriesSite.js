import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import './categoriesSite.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { baseURL, CATEGORIES } from '../../../Api/api';
import SiteCategoriesCard from './siteCategoriesCard/siteCategoriesCard';
import Skeleton from 'react-loading-skeleton';
export default function(){
    const [loading , setLoading] = useState(true);
    const [err , setErr] = useState("");
    const [categories , setCategories] = useState([]);
   useEffect(()=>{
        setLoading(true)
        axios.get(`${baseURL}/${CATEGORIES}`)
        .then(data => setCategories(data.data))
        .catch(() => setErr("An error occurred while fetching the data. Please try again."))
        .finally(()=>setLoading(false))
   },[])
   useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    return <div className='categoriesSite'>
        <div className='site-category-title'>Explore Categories</div>
        <div className='line'></div>
        <div className='des'>
            The categories of electronic devices include computers, processors, screens, smartphones, and home appliances. These products, equipped with modern technologies, play an essential role in enhancing daily life and improving efficiency.      
        </div>
        <div className='categories-container'>
        {
            loading ? 
            Array.from({length:6} , (_,i)=>
                <Skeleton key={i} style={{ width:"240px" , height:"160px" , borderRadius:"10px" , boxShadow:"0 0 6px 4px rgba(0, 0, 0, 0.2)" }} baseColor="#666666" highlightColor="#888888"/>
            ) :
            categories.map((item,key)=><SiteCategoriesCard key={key} image={item.image} title={item.title}   />)
        }
        </div>
        {err!="" && <span className="error error-dash">{err}</span>}
    </div>
}