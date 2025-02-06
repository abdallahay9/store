import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProductPage.css';
import ImageGallery from "react-image-gallery";
import { faCartShopping, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL, CART } from '../../../Api/api';
import Cookie from 'cookie-universal';
import Loading from '../../../Components/Loading/loading';
import { Axios } from '../../../Api/axios';
export default function () {
    const navegate = useNavigate();
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [product , setProduct] = useState([]);
    const [loading , setLoading] = useState(true);
    const [isSended , setIsSended] = useState(false);
    const [images , setImages] = useState([]);
    const [number , setNumber] = useState(1);
    const cookie = new Cookie()
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`${baseURL}/product/${id}`)
        .then(data=>{
            setProduct(data.data[0])
            setImages(data.data[0].images.map((item)=>{
                return {
                    original: item.image,
                    thumbnail: item.image,
                }
            }
            ))
        })
        .catch(()=>{
            navegate("/", {
                state:{
                    message:"This product is not available, please try again later. "
                }
            })
           cookie.set("external",true)
        })
        .finally(()=>setLoading(false))
    },[])
    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    useEffect(()=>{
        const time = setTimeout(() => {
            setSuccess("")
        }, 2400);
        return () => clearTimeout(time);
    },[success])
    function save(e){
        e.preventDefault()
        const items = JSON.parse(localStorage.getItem("product")) || []
        const post = (items.every(item=> item.id != id) || items.length == 0) ? +number : items[items.findIndex(item => item.id == id)].count + +number
        if(number == "") {
            setErr("The number is invalid. Please try again later.")
            return
        }
        setIsSended(true)
        Axios.post(`${CART}/check` , {
            product_id:product.id,
            count:+post
        }).then(()=>{
            if(items.every(item=> item.id != id) || items.length == 0){
                product.count = +number;
                items.push(product);
                localStorage.setItem("product" , JSON.stringify(items));
            }else {
                if(items.some(item=> item.id == id)){
                    const i = items.findIndex(item => item.id == id);
                    if(i!=-1){
                        items[i].count += +number;
                        localStorage.setItem("product" , JSON.stringify(items));
                    }
                }
            }
            setSuccess("Your request has been successfully added! Thank you. 😊")
            setIsSended(false)
        })
        .catch(()=>{
            setIsSended(false)
            setErr("The maximum number of requests for this card has been reached. Please try again later.")
        })
    }
    return <div className='productPage'>
        <div className='back-nav'></div>
        <div className='product-container'>
            <div className='data'>
                <div className='title'>{product.title}</div>
                <div className='des'>{product.description}</div>
                <div className='About'>{product.About}</div>
                <div className='line'></div>
                <div className='productStar-price'>
                        <div><FontAwesomeIcon icon={faStar} className='star' /> <span>{product.rating}</span></div>
                        <div className="product-price">
                            { +product.discount!=0 && <del className="old-price">{+product.price + +product.discount }$</del> }
                            <span className="new-price">{product.price}$</span>
                        </div>
                </div>
                <form onSubmit={(e)=>save(e)} className='d-flex align-items-center justify-content-end gap-1'>
                    <input type='text' onChange={(e)=>setNumber(e.target.value.replaceAll(e.target.value.match(/[^0-9]/) , ""))} value={number} name='' className='inputTheNumber' />
                    {
                        isSended ? 
                        <button className="buy-btn" style={{ width:"164px" , textAlign:"center" }}>                  
                            <FontAwesomeIcon icon={faSpinner} className='fs-4 deleteLoading' style={{ color:"white" }} />
                        </button>
                        :
                        <button className="buy-btn" type="submit">
                            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                            <span className="buy-text">Add to Cart</span>
                        </button>
                    }
                </form>
            </div>
            <div className='slideContent'>
            <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}    
                showNav={false}         
                showThumbnails={images.length > 1}    
                additionalClass="custom-gallery"
            />

            </div>
        </div>
        {loading && <Loading />}
        {err!="" && <span className="error error-dash">{err}</span>}
        {success!="" && <span className="error error-dash text-white" style={{ backgroundColor:"#50C878" }}>{success}</span>}
    </div>
}
