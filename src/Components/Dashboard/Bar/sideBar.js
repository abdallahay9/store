import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../../Context/menuContext";
import { useContext, useEffect, useState } from "react";
import { ScreenWidth } from "../../../Context/WindowSize";
import { Axios } from "../../../Api/axios";
import { LOGOUT, USER } from "../../../Api/api";
import { links } from "./NavLink";
import { faArrowRightFromBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Cookie from 'cookie-universal';

export default function SideBar(){
    const [width,] = useContext(ScreenWidth);
    const [isOpen,setIsOpen ] = useContext(Menu);
    const [user,setUser] = useState("");
    const [isSended , setIsSended] = useState(false);
    const navigate = useNavigate();
    const [err , setErr] = useState("");
    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then((data)=>{
            setUser(data.data);
        })
        .catch(()=>{
            new Cookie().set("external" , true);
            navigate("/login" , {
                state : {
                    message : "There's an issue with your account. Please log in again to verify your information."
                }
            });
        })
    },[])
    const cookie = Cookie();
    function handleLogout(){
            setIsSended(true);
            Axios.get(`/${LOGOUT}`).then(()=>{
                window.location.pathname="/login";
                cookie.remove("Bearer");
            }).catch(()=>{
                setErr("An issue occurred while logging out. Please try again.");
            }).finally(()=>{
                setIsSended(false);
            })
    }
    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    return <div className="side-bar">
         {
            isOpen && width < 768 ? <div className='fixed fixedSideBar' style={{ background:"rgba(0,0,0,0.3)" }} onClick={()=>setIsOpen(false)} /> :""
         }
        <div className="sideBar"
        style={{width: isOpen?(width < 768)?"255px":"255px":(width>=768)?"100px":"255px" ,
        left:isOpen?(width < 768)?"0":"0":(width>=768)?"0":"-100%" ,
        }}>
                <div>
                        {
                        links.map((element,key)=>(
                                element.role.includes(user.role) &&
                                <NavLink to={element.path} key={key} style={{justifyContent:(!isOpen && width>=768)?"center":""}} className="d-flex gap-3 align-items-center side-bar-link" >
                                <FontAwesomeIcon icon={element.icon} /> 
                                <span 
                                style={{display:(isOpen || width < 768 )?"block":"none"}}
                                >{element.name}</span>
                                </NavLink>   
                        ))
                        }
                </div>
                <div className="low">
                    {
                        user!= "" &&(
                        isSended ? 
                        <div className="logout bg-danger text-white d-flex justify-content-center" style={{justifyContent:(!isOpen && width>=768)?"center":""}}>
                            <FontAwesomeIcon icon={faSpinner} className='fs-4 deleteLoading text-white' style={{ color:"#e0f7ff" }} />
                        </div>
                        :
                        <div className="logout bg-danger text-white" onClick={handleLogout} style={{justifyContent:(!isOpen && width>=768)?"center":""}}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            <span style={{display:(isOpen || width < 768 )?"block":"none"}} >Logout</span>
                        </div>
                        )
                    }
                </div>
                {err!="" && <span className="error error-dash">{err}</span>}
        </div>
    </div>
}
