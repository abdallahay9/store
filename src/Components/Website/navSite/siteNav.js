import './siteNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faFingerprint , faFolderMinus, fas, faUser, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import BuyPage from './buyPage/buyPage';
export default function SiteNave(){
    const [isOpen , setIsOpen] = useState(false);
    const [openWindow , setIsOpenWindow] = useState(false);
    const nav = useRef();
    const blur = useRef();
    useEffect(()=>{
        (isOpen) ? nav.current.classList.add("open" , "siteNav-right-shadow") : nav.current.classList.remove("open" , "siteNav-right-shadow");
        (!isOpen) ? blur.current.classList.add("remove") : blur.current.classList.remove("remove");
    },[isOpen])
    return <nav className="siteNav">
        <div className='siteNav-nav'>
            <div className='site-logo'>
                <h1 className='logo-text'>ONLINE SHOP</h1>
            </div>
            <div className='content-blur' ref={blur} onClick={()=>setIsOpen(false)}></div>
            <div className='siteNav-right' ref={nav}>
                <div className='siteNav-right-title'>
                    <div> <FontAwesomeIcon icon={faFolderMinus} className='content-menu-icon text-primary' /> <span style={{ color:"black" }}>Menu</span></div>
                    <FontAwesomeIcon icon={faXmark} onClick={()=>setIsOpen(false)} className='siteNav-right-title-icon' />
                </div>
                <NavLink className="link" >
                    <FontAwesomeIcon className='content-menu-icon' icon={faUser} />
                    account
                </NavLink>
                <NavLink className="link" onClick={()=>{
                    setIsOpenWindow(true);
                    setIsOpen(false);
                }} >
                    <FontAwesomeIcon className='content-menu-icon' icon={faCartShopping} />    
                    buy
                </NavLink>
                <NavLink className="link" to={'/login'} >
                    <FontAwesomeIcon className='content-menu-icon' icon={faFingerprint} />
                    Login
                </NavLink>
                <NavLink className="link" to={'/register'} >
                    <FontAwesomeIcon className='content-menu-icon' icon={faUserPlus} />
                    Sign in
                </NavLink>
            </div>
            <div className='content-menu-btn'>
                <FontAwesomeIcon icon={faBars} onClick={()=>setIsOpen(true)} />
            </div>
            { openWindow && <BuyPage setIsOpenWindow={setIsOpenWindow}  />}
        </div>
    </nav>
}