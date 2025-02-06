import './Products.css';
import Form from 'react-bootstrap/Form';
import { Axios } from '../../../../Api/axios';
import { baseURL, CATEGORIES, PRODUCT } from '../../../../Api/api';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBan, faComments, faDollarSign, faLayerGroup, faPenClip, faSpinner, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookie from 'cookie-universal';

// الخطا بالحذف
export default function AddProduct() {

    // State Var 

    const [categories,setCategories] = useState([]);
    const [images,setImages] = useState([]);
    const [send,setSend] = useState(false);
    const [change , setChanged] = useState(true);
    const [id , setId] = useState("");
    const [isDelete , setisDelete] = useState(false);
    const [isSended , setIsSended] = useState(false);
    const id_delete = useRef(-1);
    const [form,setForm] = useState({
        category:"",
        title:"",
        description:"",
        price:"",
        discount:"",
        About:"",
        stock:""
    });
    const [err,setErr] = useState(false);
    // Ref Var
    const timeoutRef = useRef(null);
    const fileRef = useRef("");
    const progress = useRef([]);
    const progressNum = useRef([]);
    const contentImages = useRef();
    const Changed = useRef(0);
    const j = useRef(0);
    const id_images = useRef([]);
    const token = new Cookie().get("Bearer");
    const id_btnDelete = useRef([]);
    const imageNow = useRef([]);
    const indexOfArray = useRef(0);
    // Default Form
    const defaultForm = {
        category:null,
        title:"title",
        description:"title",
        price:222,
        discount:0,
        About:"444",
        stock:0
    };
    console.log(form.stock)
    // Const Var
    const navigate = useNavigate();
    const imagesShow = images.map((item,key)=>(
      item!=null && 
       <div className='border p-2' key={key} style={{ background:"#f5f5f5" , boxShadow:"0 0 8px 1px rgba(0,0,0,0.15)" , borderRadius:"10px"}}>
            <div className='d-flex align-items-center gap-2'>
            <div className='d-flex justify-content-between align-items-start w-100'>
                <div>
                    <div className='imageBox animX' 
                    style={{
                        borderRadius:"8px" ,
                        backgroundImage:`url(${URL.createObjectURL(item)})`
                    }}
                    ></div> 
                
                    <div className='d-flex flex-column justify-content-between'>
                        <span>{item.name}</span>
                        <span>{(item.size / 1024 ).toFixed(2) + " KB"}</span>
                    </div>
                </div>
                {
                    isDelete && key == id_delete.current? 
                    <FontAwesomeIcon icon={faSpinner} className='text-danger fs-3 deleteLoading mt-4 me-2'/>
                    :
                    <Button variant="danger" className='mt-3'    
                        onClick={
                            ()=>deleteImage(key)
                        }>
                                <FontAwesomeIcon icon={faTrashArrowUp} />
                    </Button >
                }
            </div>
            </div>
            <div className='progress-react mt-3'
            ref={(e)=>{
                progressNum.current[key] = e
            }
            }
            data-num="0%">
                <span 
                ref={(e)=> {
                    progress.current[key] = e
                }}
                ></span>
            </div>
        </div>
    ));
    
    // Get the Categories
   
    useEffect(()=>{
        Axios.get(`/${CATEGORIES}`)
        .then((data) => {
            setCategories(data.data);
            if(data.data.length == 0) {
                new Cookie().set("external", true);
                navigate("/dashboard/products" , {
                    state : {
                        message : "You do not have a category. Please add one and try again later."
                    }
                })
            }
        })
        .catch(()=>{
            new Cookie().set("external", true);
            navigate('/dashboard/products', {
                state: {
                    message: "Categories not found. Please check and try again."
                }
            });            
        })
    },[])
    /*

        Functions

    */

    function handleFileChange(e){
       let CountAutherFiles = 0;
       let imagesArray = [];
       const testImage = [...e.target.files] ;
       for (let index = 0; index < testImage.length; index++) {
        if(testImage[index].type != undefined)
            if(testImage[index].type.split('/')[0] == 'image'){
                imagesArray.push(testImage[index]);
            }else{
                CountAutherFiles++;
            }
       }
       CountAutherFiles !=0 && setErr(`There are ${CountAutherFiles} files that are not images.`)
       if(imagesArray.length != 0){
        setImages([...images, ...imagesArray]);
        Changed.current = send ? Changed.current + 1 : Changed.current;
        (!send && imageNow.current.length!=0) && indexOfArray.current++;
        imageNow.current.push( [...imagesArray] );
        handleImagesChange();
       }
       e.target.value = null;
    }
    


    // Function of delete one image
    function deleteImage(key){
        id_delete.current = key;
        if(!id_btnDelete.current.includes(key)) return;
            const id_btnDelete1 = id_btnDelete.current[key];
            id_btnDelete.current[key] = -1;
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                setErr(false);
                timeoutRef.current = null;
            }
            const findId = id_images.current[key] ;
            setisDelete(true);
            axios.delete(`${baseURL}/product-img/${findId}`,{
                headers:{
                    Authorization:"Bearer "+ token
                }
            }).then(()=>{
                const defaultImage = [...images.slice(0,key),null,...images.slice(key+1)]
                setImages(defaultImage);
                id_images.current[key] = -1;
            }).catch(()=>{
                id_btnDelete.current[key] = id_btnDelete1;
               setErr("Unable to delete the image .");
            }).finally(()=>setisDelete(false))
        
    }

    // Function of send Default Form

    async  function handleSubmitForm(){
        setChanged(false);
        try {
            const res = await Axios.post(`${PRODUCT}/add`, defaultForm )
            setId(res.data.id)  
        } catch (error) {
            new Cookie().set("external", true);
            navigate('/dashboard/products' , {
                state:{
                    message: "An error occurred. Please try again."
                }
            })
        }
    }

    // Function of Send the images with choose
    async function handleImagesChange() {
        if(send) return;
        const formImage = new FormData();
        setSend(true);
        for (let index = 0; index < imageNow.current[indexOfArray.current].length; index++) {
           if(imageNow.current[indexOfArray.current][index]!=null){
                formImage.append("product_id", id);
                formImage.append("image", imageNow.current[indexOfArray.current][index]);
                try {
                    let res = await Axios.post(`/product-img/add`, formImage, {
                        onUploadProgress: (ProgressEvent) => {
                            try {
                                const { total, loaded } = ProgressEvent;
                                const downloading = Math.floor((loaded * 100) / total);
                                progress.current[j.current].style.width = downloading + "%";
                                progressNum.current[j.current].setAttribute("data-num", downloading + "%");
                            } catch (error) {
                                console.log("Error during upload progress:");
                            }
                        }
                    });
                    progress.current[j.current].style.width = "100%";
                    progressNum.current[j.current].setAttribute("data-num", "100%");
                    id_images.current[j.current] = res.data.id;
                    id_btnDelete.current[j.current] = j.current;
                } catch (error) {
                   setErr("Unable to upload the image " + j.current + " .") 
                }
           }
           j.current++;
        }
        setSend(false);
        if(Changed.current > 0) {
            Changed.current--;
            indexOfArray.current++;
            handleImagesChange();
        } 
    }


    // Function handle change
    
    function handleChange(e){
        setForm({...form,[e.target.name]:e.target.value});
        change && handleSubmitForm();
    }
    
    // Function of Send the Form or (Edit the form)

    async function handleEdit(e) {
        e.preventDefault();
        if(images.filter(item=>item==null).length == j.current){
            setErr("Select at least one image.")
            return;
        }
        try {
           setIsSended(true);
           await Axios.post(`/${PRODUCT}/edit/${id}`,form );
           navigate('/dashboard/products')
        } catch (error) {
            setErr("An error occurred. Please try again.")
        }
        setIsSended(false);
    }

    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    useEffect(()=>{
        if (images.length !== 0 && !images.every(item => item == null)) {
            contentImages.current.classList.remove("d-none");
            contentImages.current.classList.add("d-flex");
        } else {
            contentImages.current.classList.remove("d-flex");
            contentImages.current.classList.add("d-none");
        }        
    }, [images])
    return (
        <div className='p-3 pt-0'>
            <h1 className='TITLE'>Add Product</h1>
            <Form onSubmit={handleEdit} className='form-dash'>
                <Form.Group className="form-custom"  controlId="exampleForm.ControlInput4">
                        <div className='input-custom'>
                            <FontAwesomeIcon icon={faLayerGroup} className="icon"/>
                            <Form.Select aria-label="Default select example " 
                            name="category" disabled={categories==""} value={form.category} onChange={handleChange}
                            required
                            className="input-custom" >
                                <option  disabled value=""> Select a Category</option>
                                {
                                categories.map((item,key1)=>(
                                    <option key={key1} value={item.id}>
                                        {item.title}
                                    </option>
                                    
                                ))
                                }
                            </Form.Select>
                        </div>
                </Form.Group>

                <Form.Group className="form-custom"  controlId="exampleForm.ControlInput2">
                        <div className="input-custom" style={{ background: change ? "#e9ecef" : "#f5f5f5" }}>
                            <FontAwesomeIcon icon={faPenClip} className="icon" style={{color:change?"gray":"#8968f1"}} />
                            <Form.Control type="text" value={form.title} name='title' disabled={change} required onChange={handleChange} placeholder="Title ..." />
                            <Form.Label className="label" >Title :</Form.Label>
                        </div>
                </Form.Group>
                <Form.Group className="form-custom"  controlId="exampleForm.ControlInput2">
                        <div className="input-custom" style={{ background: change ? "#e9ecef" : "#f5f5f5" }}>
                            <FontAwesomeIcon icon={faComments} className="icon" style={{color:change?"gray":"#8968f1"}} />
                            <Form.Control type="text" value={form.description} name='description' disabled={change} required onChange={handleChange} placeholder="Description ..." />
                            <Form.Label className="label" >Description :</Form.Label>
                        </div>
                </Form.Group>

                <Form.Group className="form-custom"  controlId="exampleForm.ControlInput2">
                        <div className="input-custom" style={{ background: change ? "#e9ecef" : "#f5f5f5" }}>
                            <FontAwesomeIcon icon={faDollarSign} className="icon" style={{color:change?"gray":"#8968f1"}} />
                            <Form.Control type="number" value={form.price} name='price' disabled={change} required onChange={handleChange} placeholder="Price ..." />
                            <Form.Label className="label" >Price :</Form.Label>
                        </div>
                </Form.Group>

                <Form.Group className="form-custom"  controlId="exampleForm.ControlInput2">
                        <div className="input-custom" style={{ background: change ? "#e9ecef" : "#f5f5f5" }}>
                            <FontAwesomeIcon icon={faBan} className="icon" style={{color:change?"gray":"#8968f1"}} />
                            <Form.Control type="number" value={form.discount} name='discount' disabled={change} required onChange={handleChange} placeholder="Discount ..." />
                            <Form.Label className="label" >Discount :</Form.Label>
                        </div>
                </Form.Group>
                <Form.Group className="form-custom"  controlId="exampleForm.ControlInput2">
                        <div className="input-custom" style={{ background: change ? "#e9ecef" : "#f5f5f5" }}>
                            <FontAwesomeIcon icon={faAddressCard} className="icon" style={{color:change?"gray":"#8968f1"}} />
                            <Form.Control type="text" value={form.About} name='About' disabled={change} required onChange={handleChange} placeholder="About ..." />
                            <Form.Label className="label" >About :</Form.Label>
                        </div>
                </Form.Group>
                <Form.Group className="form-custom"  controlId="exampleForm.ControlInput2">
                        <div className="input-custom" style={{ background: change ? "#e9ecef" : "#f5f5f5" }}>
                            <FontAwesomeIcon icon={faAddressCard} className="icon" style={{color:change?"gray":"#8968f1"}} />
                            <Form.Control type="number" value={form.stock} name='stock' disabled={change} required onChange={handleChange} placeholder="Stock ..." />
                            <Form.Label className="label" >Stock :</Form.Label>
                        </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Images :</Form.Label>
                    <Form.Control 
                        onChange={handleFileChange}
                        multiple 
                        type="file" 
                        hidden
                        disabled={change}
                        ref={fileRef}
                    />
                    <div onClick={()=>fileRef.current.click()} style={{
                        borderColor:change? "gray" : "#0D6EFD" ,
                        cursor : change ? "not-allowed" : "pointer" 
                    }} className='inputFile'>
                        <img src={require('./../../../../Images/cloud-2044822_960_720.webp')} 
                        style={{
                            filter: change ? "grayscale(1) ": "grayscale(0)",
                            userSelect:"none"
                        }}
                        alt="Cloud" />
                    </div>
                </Form.Group>
                <div className='d-none flex-column gap-2 mb-3' ref={contentImages}>
                 {imagesShow}
                </div>  
                {
                    err!="" &&
                    <div className='error error-dash' >
                        {err}
                    </div>
                }
                <button className='btn btn-primary animX buttonAdd' disabled={err != "" } style={{ padding: "10px 20px" }}>
                    {
                        isSended ? 
                        <FontAwesomeIcon icon={faSpinner} className='fs-4 deleteLoading' style={{ color:"#e0f7ff" }} />
                        :
                        "Add"
                    }
                </button>
            </Form>
        </div>
    );
}
