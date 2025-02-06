import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN, REGISTER } from "./../../Api/api";
import axios from "axios";
import Cookie from "cookie-universal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import done from './../../Animation/login.json'
import Lottie from "lottie-react";

export default function Register() {
    // States
    const location = useLocation();
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [isSend , setIsSend] = useState(false);
    const cookie = Cookie();
    const isNotValid = useRef(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [form, setForm] = useState({
        name:"",
        email: "", 
        password: "" 
    });

    useEffect(() => {
        if (location?.state?.message && cookie.get("external")) {
            setErr(location?.state?.message);
            cookie.set("external", false);
        }
    }, [location]);

    useEffect(() => {
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    }, [err]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsSend(true);
        axios.post(`${baseURL}/${REGISTER}`, form)
            .then((data) => {
                navigate("/")
                cookie.set('Bearer', data.data.token)
            })
            .catch((error) => {
                setErr(error?.response?.data?.message ?? error?.response?.data?.error);
                isNotValid.current = true;
                console.log(error)
            })
            .finally(()=>{
                setIsSend(false);
            })
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
        isNotValid.current = false
    }

    return (
        <div className="Entered-container">
            <form className="login" onSubmit={handleSubmit}>
                <div className="anim-login-outside">
                    <Lottie animationData={done} />
                </div>
                <div>
                    <div className="Entered-title">
                        <div>
                            <h2 className="m-0">Create Account</h2>
                            <p className="m-0">Enter your details</p>
                        </div>
                        <FontAwesomeIcon icon={faChartSimple} className="i" />
                    </div>
                    <div className="anim-login-inside">
                        <Lottie animationData={done} />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="input-container">
                            <input type="text" onChange={(e) => handleChange(e)} name="name" className={isNotValid.current ? "is-invalid" : ""} placeholder="Name" required />
                            <label>User Name</label>
                        </div>
                        <div className="input-container">
                            <input type="email" onChange={(e) => handleChange(e)} name="email" className={isNotValid.current ? "is-invalid" : ""} placeholder="Email" required />
                            <label>Email</label>
                        </div>
                        <div className="input-container">
                            <input type={isShowPassword ? "text" : "password"} minLength={6} onChange={(e) => handleChange(e)} name="password" className={isNotValid.current ? "is-invalid" : ""} placeholder="Password" required />
                            <label>Password</label>
                            {!isShowPassword && <FontAwesomeIcon icon={faEye} className="eye-pass" onClick={() => setIsShowPassword(prev => !prev)} />}
                            {isShowPassword && <FontAwesomeIcon icon={faEyeSlash} className="eye-pass" onClick={() => setIsShowPassword(prev => !prev)} />}
                        </div>

                         {
                            isSend ? 
                            <button className="Entered-submit">
                                <FontAwesomeIcon icon={faSpinner} className='fs-4 deleteLoading' style={{ color:"#e0f7ff" }} />
                            </button>
                            :
                            <button type="submit" className="Entered-submit">Sign up</button>
                        }
                    </div>
                </div>
                <div>
                    <div className="d-flex gap-1">
                        <p className="m-0">Already have an account?</p><Link to="/login">Log in</Link>
                    </div>
                </div>
            </form>
            {err !== "" && <span className="error error-dash">{err}</span>}
        </div>
    );
}

