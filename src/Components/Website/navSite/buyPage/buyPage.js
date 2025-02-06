import { faCircleXmark, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import './buyPage.css';
import BuyProduct from './buyProduct/buyProduct.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
export default function(props){
    const [items , setItems] = useState(JSON.parse(localStorage.getItem("product")) || []);
    return <div className='buyPage-container'>
            <div className='buyPage-blur' onClick={()=>props.setIsOpenWindow(false)}></div>
            <div className='buyPage'>
                <div className='buyPage-topBar'>
                    <div className='title'>My Cart</div>
                    <FontAwesomeIcon icon={faCircleXmark} onClick={()=>props.setIsOpenWindow(false)} className='close-icon' />
                </div>
                {items.length == 0 && <FontAwesomeIcon icon={faFolderOpen} className='Empty-Cart' />}
                <div className='line'></div>
                <div className='buyProducts-container'>
                {
                    items.map(((item , key)=>{
                            return <BuyProduct setItems={setItems} product={item} image={item.images[0].image} id={item.id} key={key} title={item.title} des={item.description} price={item.price} num={item.count} />
                        }
                    ))
                }
                </div>
            </div>
        </div>
}