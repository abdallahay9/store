import Form from 'react-bootstrap/Form';
import { Axios } from '../../../../Api/axios';
import { EDIT, USER } from '../../../../Api/api';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faSpinner, faUserGear } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'cookie-universal';
export default function UpdateUsers() {
    const [form, setForm] = useState({ email: '', name: '', role: '' });
    const lastForm = useRef({ email: '', name: '', role: '' });
    const [err, setErr] = useState("");
    const [isSended , setIsSended] = useState(false);
    const id = useParams().id;
    const navigate = useNavigate();
    useEffect(() => {
        Axios.get(`${USER}/${id}`)
            .then((data) => {
                setForm({
                    email: data.data.email,
                    name: data.data.name,
                    role: data.data.role
                })
                lastForm.current = {
                    email: data.data.email,
                    name: data.data.name,
                    role: data.data.role
                };
            })
            .catch(() => {
                // navigate("/path", { state: { key: value } });
                new Cookie().set("external" , true);
                navigate("/dashboard/users" , {
                    state : {
                        message : "There's an error in this element. Please try again."
                    }
                });
            })
    }, [])
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (lastForm.current.email === form.email && lastForm.current.name === form.name && form.role === lastForm.current.role) {
            setErr("Update Username or Email or Role .")
        }
        else {
            setIsSended(true);
            Axios.post(`/${EDIT}/${id}`, form)
                .then(() => {
                    navigate('/dashboard/users')
                })
                .catch((error) => {
                    if(error.response.status == 500) 
                        setErr("There is an error. Please try entering another email.");
                    else
                        setErr(error.response.data.message)
                })
                .finally(()=>{    
                    setIsSended(false);
                })
        }
    }
    useEffect(() => {
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    }, [err])
    return <div className='p-3 pt-0'>
        <h1 className='TITLE'>Update User</h1>
        <Form className="form flex-grow-1 form-dash" onSubmit={handleSubmit} >
            <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                <div className="input-custom">
                    <FontAwesomeIcon icon={faCircleUser} className="icon" />
                    <Form.Control type="text" value={form.name} name="name" required onChange={handleChange} placeholder="Enter The Name ..." />
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
                        "Edit"
                    }
                </button>
            </div>
            {err != "" && <span className="error error-dash">{err}</span>}
        </Form>
    </div>
}

//    !(!Click && !arrived)
