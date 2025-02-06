import './buyProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Axios } from '../../../../../Api/axios';
import { CART } from '../../../../../Api/api';

export default function BuyProduct(props) {
    const [number , setNumber] = useState(props.num);
    const [load , setLoading] = useState(false);
    const [err , setErr] = useState("");
    function Remove(id) {
        const items = JSON.parse(localStorage.getItem("product"));
        const index = items.findIndex(item => item.id == id);
        localStorage.setItem("product" , JSON.stringify([...items.slice(0 , index) , ...items.slice(index+1)]));
        props.setItems(JSON.parse(localStorage.getItem("product")))
    }
    function handleAdd(){
        setLoading(true)
        Axios.post(`${CART}/check` , {
            product_id:props.id,
            count:props.product.count + 1
        }).then(()=>{
            setNumber(prev=>+prev + 1)
            let product = props.product
            product.count += 1;
            const items = JSON.parse(localStorage.getItem("product"));
            const index = items.findIndex(item => item.id == props.id);
            localStorage.setItem("product" , JSON.stringify([...items.slice(0 , index) , product , ...items.slice(index+1)]));
            props.setItems(JSON.parse(localStorage.getItem("product")))
        })
        .catch(()=>{
            setErr(" The requested quantity exceeds the available stock .")
        })
        .finally(()=>{
            setLoading(false)
        })  
        
    }
    function handleMinus(){
        if(number == 1)
            return
        setNumber(prev=>+prev - 1)
        let product = props.product
        product.count -= 1;
        const items = JSON.parse(localStorage.getItem("product"));
        const index = items.findIndex(item => item.id == props.id);
        localStorage.setItem("product" , JSON.stringify([...items.slice(0 , index) , product , ...items.slice(index+1)]));
        props.setItems(JSON.parse(localStorage.getItem("product")))
    }
    useEffect(()=>{
            const time = setTimeout(() => {
                setErr("")
            }, 2400);
            return () => clearTimeout(time);
    },[err])
    return (
        <div className='buyProduct'>
            <FontAwesomeIcon icon={faCircleXmark} className='close-icon cardRemoved' onClick={()=>Remove(props.id)} style={{ fontSize:"16px" , color:"#dc3545" }} />
            <div className='image' style={{ backgroundImage:`url(${props.image})` }}></div>
            <div className='buyProduct-data'>
                <div className='title'>{props.title}</div>
                <div className='des'>{props.des}</div>
                <div className='last-bar'>
                    <div className='price'>{props.price}$</div>
                    <div className="actions">
                        <button className="minus" onClick={handleMinus}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <label>{number}</label>
                        <button className="add" onClick={handleAdd} >
                            {
                                load ? 
                                <FontAwesomeIcon icon={faSpinner} className='fs-4 deleteLoading' style={{ color:"white" , fontSize:"20px" }} />
                                :
                                <FontAwesomeIcon icon={faPlus} />
                            }
                        </button>
                    </div>
                </div>
            </div>
        {err!="" && <span className="error error-dash">{err}</span>}
        </div>
    );
}

