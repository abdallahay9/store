import Form from 'react-bootstrap/Form';
import { Axios } from '../../../../Api/axios';
import {  USER } from '../../../../Api/api';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faSpinner, faUserGear } from '@fortawesome/free-solid-svg-icons';

export default function AddUser() {
    const [form, setForm] = useState({ email: '', name: '', role: '' , password:'' });
    const [err, setErr] = useState(""); // تعريف حالة الخطأ
    const [isNotChecked , setIsNotChecked] = useState(true);
    const navigate = useNavigate();
    const [isSended , setIsSended] = useState(false);
    const input1 = useRef(null);
    useEffect(()=>{
        input1.current.focus();
    },[])
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSended(true)
        Axios.post(`/${USER}/add`, form)
            .then(() => {
                navigate('/dashboard/users');
            })
            .catch((error) => {
                    setErr(error.response.data.message);
            }).finally(()=>{
                setIsSended(false)
            })
    }
    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])

    return (
        <div className='p-3 pt-0'>
            <h1 className='TITLE'>Add User</h1>
            <Form className="form flex-grow-1 form-dash" onSubmit={handleSubmit} >
                    <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                        <div className="input-custom">
                            <FontAwesomeIcon icon={faCircleUser} className="icon"  />
                            <Form.Control ref={input1} type="text" value={form.name} name="name" required onChange={handleChange} placeholder="Enter The Name ..." />
                            <Form.Label className="label" >Name :</Form.Label>
                        </div>
                    </Form.Group>
                    <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
                        <div className="input-custom">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <Form.Control type="email" value={form.email} name="email" required onChange={handleChange} placeholder="Enter The Email ..." />
                            <Form.Label className="label" >Email :</Form.Label>
                        </div>
                    </Form.Group>
                    <Form.Group className="form-custom" controlId="exampleForm.ControlInput3">
                        <div className="input-custom">
                            <label className="container1">
                                <input type="checkbox" onChange={(e)=>setIsNotChecked(e.target.checked)} defaultChecked="checked" />
                                <svg className="eye" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                                <svg className="eye-slash" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" /></svg>
                            </label>
                            <Form.Control type={isNotChecked ? "password" : "text"} minLength={6} required value={form.password} name="password" onChange={handleChange} placeholder="Entaer The Password ..." />
                            <Form.Label className="label" >Password</Form.Label>
                        </div>
                    </Form.Group>
                    <Form.Group className="form-custom" controlId="exampleForm.ControlInput4">
                        <div className='input-custom'>
                            <FontAwesomeIcon icon={faUserGear} className="icon" />
                            <Form.Select aria-label="Default select example "
                            onChange={handleChange}
                            value={form.role}
                            name='role'
                            required
                            className="input-custom" >
                                <option disabled value="">Open this select menu</option>
                                <option value="1995">Admin</option>
                                <option value="1996">Writer</option>
                                <option value="2001">User</option>
                                <option value="1999">Peoduct Manger</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <div className="btn-custom ">
                        <button className='btn btn-primary animX buttonAdd' disabled={err != "" } style={{ padding: "10px 20px" }}>
                            {
                                isSended ? 
                                <FontAwesomeIcon icon={faSpinner} className='fs-4 deleteLoading' style={{ color:"#e0f7ff" }} />
                                :
                                "Add"
                            }
                        </button>
                    </div>
                    {err!="" && <span className="error error-dash">{err}</span>}
            </Form>
        </div>
    );
}
