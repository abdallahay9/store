import Form from 'react-bootstrap/Form';
import { Axios } from '../../../../Api/axios';
import { CATEGORY } from '../../../../Api/api';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPenClip, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './category.css';
export default function AddCategories() {
    const [title,setTitle] = useState("");
    const [image,setImage] = useState("");
    const [err, setErr] = useState(""); 
    const [isSended , setIsSended] = useState(false);
    const input1 = useRef(null);
    const file = useRef("");
    useEffect(()=>{
        input1.current.focus();
    },[])
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if(image.type != undefined)
            if(image.type.split('/')[0] != 'image'){
                setErr("Select only an image, not any other file .");
                return;
            }
        const form = new FormData();
        form.append('title', title);  
        form.append('image', image);
        setIsSended(true)
        Axios.post(`/${CATEGORY}/add`, form )
        .then(() => {
            navigate('/dashboard/categories');
        })
        .catch((err) => {
            setErr(err.response.data.message)
        }).finally(()=>setIsSended(false));
    }
    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    return (
        <div className='p-3 pt-0'>
            <h1 className='TITLE'>Add Categories</h1>
            <Form onSubmit={handleSubmit} className='form-dash'>
                <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                    <div className="input-custom">
                        <FontAwesomeIcon icon={faPenClip} className='icon' />
                        <Form.Control ref={input1}  minLength={1} onChange={(e)=>setTitle(e.target.value)}  type="text" value={title}  name='title' required placeholder="Title ..." />
                        <Form.Label className="label" >Title :</Form.Label>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3 form-custom" style={{ background:"#f7f8fa" }} controlId="exampleForm.ControlInput1">
                    <Form.Label>Image :</Form.Label>
                    <div className="input-custom" onClick={()=>file.current.click()} style={{ cursor:"pointer" , background:"#f5f5f5" }}>
                        <FontAwesomeIcon icon={faImage} className='icon' />
                        <Form.Control disabled type="text" name="image"  className='inputImage' placeholder="Choose a Image" />
                    </div>
                </Form.Group>
                <Form.Group controlId="formFile1" style={{ display:"none" }} className="mb-3">
                    <Form.Control type="file" ref={file} name='file' onChange={(e)=>setImage(e.target.files.item(0))} />
                </Form.Group>
                {
                    image!="" && image.type != undefined && image.type.split('/')[0] == 'image' &&
                    <img src={URL.createObjectURL(image)} className='imageNow' style={{ display:"block" , marginBottom:"20px" }} />
                }
                <button className='btn btn-primary animX buttonAdd' disabled={err != "" } style={{ padding: "10px 20px" }}>
                    {
                        isSended ? 
                        <FontAwesomeIcon icon={faSpinner} className='fs-4 deleteLoading' style={{ color:"#e0f7ff" }} />
                        :
                        "Send"
                    }
                </button>
                    {err!="" && <span className="error error-dash">{err}</span>}
            </Form>
        </div>
    );
}
