import './card.css'
import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPenToSquare, faSpinner, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function Card(props){
    const myId = props.thisUser?.id || "defaultId";
    const [isDelCard , setIsDelCard] = useState(false);
    const cardId = props.id ;
    let inerr = useRef();
    return <div className='card-component'>
        <div className='inerr-card' ref={inerr}>
            <div className={"front " + (props.page == "products" && props.dis != 0? "product" : props.page == "category" ? "categories" : "")} dis={
                "-" + 
                ((props.dis * 100 / props.price).toFixed(1).endsWith(".0") 
                    ? (props.dis * 100 / props.price) 
                    : (props.dis * 100 / props.price).toFixed(1)) 
                + "%"
             }>
                {
                    props.page !="category" &&
                    <h3 className={props.page == "products" && props.dis!=0 ? "products-title" : ""}
                   style={{ 
                    background: myId != cardId && props.page == "user" 
                        ? "rgba(0, 123, 255, 0.5)" 
                        : props.page == "user" 
                        ? "rgba(255, 215, 0, 0.5)" 
                        : props.page === "category" ? 
                        "rgba(255, 215, 0, 0.8)"
                        :"rgba(255, 215, 0, 0.5)",
                    color: myId != cardId && props.page == "user" 
                        ? "rgba(255, 255, 255, 0.9)" 
                        : props.page == "user" 
                        ? "rgba(51, 51, 51, 0.9)" 
                        : "",
                    borderRadius: props.page == "products" ? "8px" : "15px",
                    padding: "5px 10px",
                    minWidth: "120px",
                    textAlign: "center",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"  ,
                    textTransform: props.page == "user" 
                        ? "uppercase" 
                        : "capitalize" 
                }}                                  
                    >{
                    props.page == "user" ? (
                    props.role === "1995" ? "Admin" :
                    props.role === "2001" ? "User" :
                    props.role === "1996" ? "Writer" : "Product"
                    )
                    : props.title
                    }
                </h3>
                }
                {
                    props.page == "products" && props.dis!=0 && 
                    <div style={{ height:"30px" }}>

                    </div>
                }
                {
                    props.page == "user" &&
                    <div>
                        <p>Email : {props.email}</p>
                        <p>name : {props.username}</p>
                    </div>
                }
                {
                    props.page == "products" &&
                    <div className='products'>
                        <h6 className='description m-0 py-1' style={{ textTransform:"capitalize" }}>{props.description.length < 60 ? props.description : props.description.slice(0,60) + "..." }</h6>
                        {
                            props.dis!=0 ?
                            <div className='d-flex justify-content-center align-items-center gap-1'>
                                <p className='m-0'><del style={{ textDecorationColor:"red" }}>{props.price}<span>$</span></del></p>
                                <FontAwesomeIcon icon={faArrowRight} />
                                <p className='m-0 text-success'>{props.price - props.dis}<span>$</span></p>
                            </div>
                            :
                            <p className='m-0 text-success'>{props.price - props.dis}<span>$</span></p>
                        }
                    </div>
                }
                {
                    props.page =="category" &&
                    <div className='category-card-topBar'>
                        <h3 className='m-0 text-uppercase'>{props.title}</h3>
                        <img src={props.image} />
                    </div>
                }
                <button className='btnCard' style={{ "--border-top":"#90ee904d ","--border":"#388e3c" , background:"#198754" }} variant="success" onClick={()=>{inerr.current.classList.add("R180")}}>View Details</button>
            </div>
            <div className='back'>
                <p>Created At : {props.createdAt}</p>
                <p>Updated At : {props.updatedAt}</p>
                <div className='ActionsOfCard'>
                    <Link to={cardId+""}>
                        <button className='btnCard' variant="info" style={{ "--border-top":"rgba(179, 224, 230, 0.65)","--border":"rgba(0, 229, 255, 0.5)" , background:"#0dcaf0" , color:"black"}} >
                            <FontAwesomeIcon icon={faPenToSquare} /> Edit
                        </button>
                    </Link>
                    {
                        myId != cardId && (
                        props.idDelete == cardId ? 
                        <button style={{ "--border-top":"#f08c8c ","--border":"hsla(354, 70.10%, 86.90%, 0.40)" , background:"#dc3545" }} className='btnCard' variant="danger" >
                            <FontAwesomeIcon icon={faSpinner} className='text-light fs-5 deleteLoading'/> 
                        </button>
                        :
                        <button className='btnCard' style={{ "--border-top":"#f08c8c ","--border":"hsla(354, 70.10%, 86.90%, 0.40)" , background:"#dc3545" }} variant="danger" onClick={()=>{
                            props.handleDelete(cardId)
                            setIsDelCard(true);
                        }}  >
                            <FontAwesomeIcon icon={faTrashArrowUp} /> Delete
                        </button>
                        )
                    }
                    <button className='btnCard' style={{ "--border-top":"#868e96 ","--border":"rgba(206, 212, 218, 0.2)" , background:"#6c757d"}} variant="secondary" onClick={()=>{inerr.current.classList.remove("R180")}}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                </div>
            </div>
        </div>
    </div>
}


/*
اخضر
border-top: 7px solid #90ee904d;
border-bottom: 2px solid #388e3c;
ازرق
border-top: 7px solid  rgba(179, 224, 230, 0.2);
    border-bottom: 2px solid rgba(0, 229, 255, 0.5);
فضي 
border-top: 7px solid #868e96;
    border-bottom: 2px solidrgba(206, 212, 218, 0.4);
احمر
    border-top: 7px solid #f08c8c;  
    border-bottom: 2px solidrgba(245, 198, 203, 0.5);  
*/