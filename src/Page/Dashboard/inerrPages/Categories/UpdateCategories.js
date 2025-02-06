import Form from 'react-bootstrap/Form';
import { Axios } from '../../../../Api/axios';
import { CATEGORY } from '../../../../Api/api';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPenClip, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Cookie from "cookie-universal";
export default function UpdateCategories() {
    const [title,setTitle] = useState("");
    const [image,setImage] = useState("");
    const img = useRef("");
    const [err, setErr] = useState(""); 
    const file = useRef("");
    const navigate = useNavigate();
    const id = useParams().id;
    const [isSended , setIsSended] = useState(false);
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
        setIsSended(true);
        Axios.post(`/${CATEGORY}/edit/${id}`, form )
            .then(() => {
                navigate('/dashboard/categories');
            })
            .catch((err) => {
                setErr(err.response.data.message);
            }).finally(()=>{
                setIsSended(false)
            })
    }
    useEffect(()=>{
        Axios.get(`/${CATEGORY}/${id}`)
        .then((data)=>{
            img.current = data.data.image;
            setTitle(data.data.title)
        }).catch(()=>{
            new Cookie().set("external" , true);
            navigate("/dashboard/categories" , {
                state : {
                    message : "There is an error in this category, please try again."
                }
            })
        })
    },[])
    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    return (
        <div className='p-3 pt-0'>
            <h1 className='TITLE'>Update Categories</h1>
            <Form onSubmit={handleSubmit} className='form-dash'>
                <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
                    <div className="input-custom">
                        <FontAwesomeIcon icon={faPenClip} className='icon' />
                        <Form.Control minLength={1} onChange={(e)=>setTitle(e.target.value)} required type="text" value={title}  name='title' placeholder="Title ..." />
                        <Form.Label className="label" >Title :</Form.Label>
                    </div>
                </Form.Group>
                <Form.Group className="form-custom" style={{ background:"#f7f8fa" }} controlId="exampleForm.ControlInput1">
                    <Form.Label>Image :</Form.Label>
                    <div className="input-custom" onClick={()=>file.current.click()} style={{ cursor:"pointer" , background:"#f5f5f5" }}>
                        <FontAwesomeIcon icon={faImage} className='icon' />
                        <Form.Control disabled type="text" name="image"  className='inputImage' placeholder="Choose a Image" />
                    </div>
                </Form.Group>
                <Form.Group controlId="formFile1" style={{ display:"none" }} >
                    <Form.Control type="file" ref={file} name='file' onChange={(e)=>{
                        setImage(e.target.files.item(0));
                        img.current = "";
                    }} />
                </Form.Group>
                <img src={img.current} className='imageNow' style={{ display:"block" , marginBottom:"20px" }} />
                {
                    image!="" && image.type != undefined && image.type.split('/')[0] == 'image' &&
                    <img src={URL.createObjectURL(image)} className='imageNow' style={{ display:"block" , marginBottom:"20px" }} />
                }
                <button className='btn btn-primary animX buttonAdd' disabled={err != "" } style={{ padding: "10px 20px" }}>
                {
                        isSended ? 
                        <FontAwesomeIcon icon={faSpinner} className='fs-4 deleteLoading' style={{ color:"#e0f7ff" }} />
                        :
                        "Edit"
                    }
                </button>
                <div className='d-flex justify-content-center'>
                    {
                    err!="" &&
                        <p className='error error-dash'>
                            {err}
                        </p> 
                    }
                </div>
            </Form>
        </div>
    );
}
