import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { USER } from "../../Api/api";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/loading";
import { Axios } from "../../Api/axios";
import Forebidden from './403';
export default function RequireAuth(props){
    const cookie = Cookie();
    const navegate = useNavigate();
    const token = cookie.get("Bearer");
    const [user,setUser] = useState("");
    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then((data)=> {
            setUser(data.data)
        })
        .catch(()=>{
            new Cookie().set("external" , true);
            navegate("/login" , {
                replace : true ,
                state : {
                    message : "There's an issue with your account. Please log in again to verify your information."
                }
            });
        })
    },[])
    return user!="" ? (
        props.allowedRole.includes(user.role) ?     
        <Outlet /> :
        <Forebidden role={user.role} />
    ): <Loading /> 
}