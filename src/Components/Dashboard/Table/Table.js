import { faArrowPointer, faBan, faClock, faPenToSquare, faSpinner, faTrashArrowUp, faUserMinus, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Axios } from '../../../Api/axios';
import ReactPaginate from 'react-paginate';
import React, { useState , useEffect, useRef, useContext } from 'react';
import './Table.css';
import createDate from '../../../Function/creatrDate';
import defaultImage from './../../../Images/696755.png';
import TableLoad from '../../Loading/TableLoad';
import { Form } from 'react-bootstrap';
import Cookie from 'cookie-universal';
import CreateShort from '../../../Function/createShort';
import Card from './card/card.js';
import { ScreenWidth } from '../../../Context/WindowSize.js';
import Skeleton from '../../Skeleton/skeleton.js';
import { SideBarWidthContext } from '../../../Context/sideBarWidth.js';
export default function TableShaw(props){
    const [width,] = useContext(ScreenWidth);
    // Var
    const [isDelete,setIsDelete] = useState(false);
    const [date,setDate] = useState("");
    const [idDelete , setIdDelete] = useState("");
    const [openDate , setOpenDate] = useState(false);
    const [isDataArrived,setIsDataArrived] = useState(false);
    const [allData,setAllData] = useState([]);
    const [filterData,setFilterData] = useState([]);
    const thisUser = props.thisUser || false;
    const [pageCount,setPageCount] = useState(1)
    const [err,setErr] = useState("");
    const [sideBarWidth , ] = useContext(SideBarWidthContext);
    // SetPageCount
    useEffect(()=>{
        setPageCount(Math.ceil(Math.max(props.total.current , 1) / props.limit));
    },[props.limit , props.total.current])

    // Delete
    function handleDelete(id){
          setIdDelete(id);
          Axios.delete(`/${props.delete}/${id}`)
          .then(()=>{
            setIsDelete(prev => !prev);
            setIdDelete("");
          })
          .catch((err)=>{
            setErr("Deletion failed, please try again later.")
          })
    }

    // Search
    // Get All Data
    useEffect(()=>{
        setIsDataArrived(false);
        props.setArrived(false);
        Axios.post(`${props.delete}/search?title=${""}`)
        .then((data)=>{
            props.total.current = data.data.length ;
            setAllData(data.data);
            setFilterData(data.data.slice((props.page - 1) * props.limit , (props.page - 1) * props.limit + props.limit));
        } )
        .catch(()=>{
            setErr("Failed to fetch data, please try again.")
        })
        .finally(()=>{
            setIsDataArrived(true);
            props.setArrived(true);
        })
    },[isDelete])
    useEffect(()=>{
        if(isDataArrived){
            let arr = allData.filter((item) => item[props.search].toLowerCase().includes(props.searchText.toLowerCase()));
            if (date != "") arr = arr.filter((item) => createDate(new Date(item.created_at)) == date);            
            setPageCount(Math.ceil(arr.length / props.limit));
            setFilterData(arr.slice((props.page - 1) * props.limit , (props.page - 1) * props.limit + props.limit));
            props.page == 0 && arr.length !=0 && props.setPage(new Cookie().get("page"))
        }
    },[props.limit,props.page , props.searchText , allData , date ])
    const showData = filterData.length !=0 ? filterData.map((item,key)=>(
        <tr key={key}>
            <th><span className='bg-warning rounded p-1 text-light'>{item.id}</span></th>
            {
               props.headers.map((item1, key1) => (
                <th key={key1}>
                    {
                        item1.key === "role" ? (
                            item[item1.key] === "1995" ? "Admin" :
                            item[item1.key] === "2001" ? "User" :
                            item[item1.key] === "1996" ? "Writer" : "Product"
                        ) : item1.key === "name" && thisUser.id === item.id ? (
                            item[item1.key] + " (YOU)"
                        ) : item1.key === "image" ? (
                            <img src={item[item1.key]} className='image' alt='' />
                        ) : item1.key === "images" ? (
                            <div className='d-flex gap-1 justify-content-center flex-wrap'>
                                {
                                    item[item1.key].length !== 0 ? (
                                            <div className='d-flex gap-1 align-items-center'>
                                                <img src={item[item1.key][0].image} className='image' alt='' />
                                                <img src={defaultImage} className='defaultImage' alt='' />...
                                            </div>
                                    ) : (
                                        <img src={defaultImage} className='image' alt='' />
                                    )
                                }
                            </div>
                        ) : item1.key === 'updated_at' || item1.key === 'created_at' ? (
                            createDate(item[item1.key])
                        ) : item1.key === 'title' || item1.key === 'description' ? CreateShort(item[item1.key]) :(
                            item[item1.key]
                        )
                    }
                </th>
            ))            
            }
                <th>
                    <div>
                        {
                            item.id != thisUser.id && 
                            <span>
                                {
                                    idDelete == item.id ? 
                                    <FontAwesomeIcon icon={faSpinner} className='text-danger fs-5 deleteLoading'/>
                                    : 
                                    <FontAwesomeIcon icon={faTrashArrowUp}
                                    onClick={()=>handleDelete(item.id)}
                                    cursor={"pointer"} className='text-danger fs-5' />
                                }
                            </span>
                        }
                        <span className='space' style={{ width: item.id != thisUser.id ? "20px" : "38px"  }}></span>
                        <Link to={`${item.id}`} >
                             <FontAwesomeIcon icon={faPenToSquare} cursor={"pointer"} className='text-primary fs-5' />
                        </Link>
                    </div>
                </th>
        </tr>
    )) : (
        <tr>
            <th colSpan={props.headers.length + 2}>
                <span style={{ marginRight:"5px" , color:"#dc3545" }}>No Resault</span>
                <FontAwesomeIcon icon={faBan} fontSize={"18px"} color='#dc3545' />
            </th>
        </tr>
    );
    const showHeaders = <tr>
        <th>id</th>
        {
        props.headers.map((item , key)=>(
            <th key={key}>{item.value}</th>
        ))
        }
        <th>Action</th>
    </tr>

    const cardShow = filterData.length !=0 ?
        filterData.map((item , i) => 
            props.delete == "user" ?
            <div className='col-12 col-sm-6 col-md-6 p-0 pb-2 ps-sm-2 ' key={item.id} >
                <Card username={item.name} isDelete={isDelete} handleDelete={handleDelete} idDelete={idDelete} thisUser={thisUser} id={item.id} page="user" email={item.email} role={item.role} createdAt={createDate(item.created_at)} updatedAt={createDate(item.updated_at)} /> 
            </div>
            : props.delete == "category" ?
            <div className='col-12 col-sm-6 col-md-6 p-0 pb-2 ps-sm-2 ' key={item.id} >
                <Card page="category" title={item.title} isDelete={isDelete} handleDelete={handleDelete} idDelete={idDelete} id={item.id} image={item.image} createdAt={createDate(item.created_at)} updatedAt={createDate(item.updated_at)} /> 
            </div>
            :
            <div className='col-12 col-sm-6 col-md-6 p-0 pb-2 ps-sm-2 ' key={item.id} >
                <Card title={item.title.length > 10 ? item.title.slice(0,8) + "..." : item.title} isDelete={isDelete} dis={item.discount} handleDelete={handleDelete} idDelete={idDelete} id={item.id} page="products" description={item.description} price={item.price} createdAt={createDate(item.created_at)} updatedAt={createDate(item.updated_at)} /> 
            </div>
        )
    : ""

    const cardLoad = Array.from({length:4} , (_,i) => false).map((_,i)=>
         <div className='col-12 col-sm-6 col-md-6 p-0 pb-2 ps-sm-2 ' key={i} >
            <Skeleton />
        </div>
    ) 
    useEffect(()=>{
        const listItems = document.getElementsByClassName('li');
        const lastItem = listItems[listItems.length - 1];
            if( pageCount < props.page ){
                props.setPage(pageCount);
                if( lastItem != undefined )
                    lastItem.click();
            }
    },[pageCount, props.page, props.limit]);

    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    
    return (
        <div>
            <h1 className="TITLE">
                {props.title}
            </h1>
            <div className='bar1'>
                <Form.Group className="form-custom" controlId="exampleForm.ControlInput4">
                            <div className='input-custom'>
                            <FontAwesomeIcon icon={faArrowPointer} className='icon' />
                                <Form.Select aria-label="Default select example "
                                name='role'
                                defaultValue={""}
                                required
                                onChange={(e)=>props.setLimit(+e.target.value)}
                                className="input-custom" >
                                    <option disabled value="">Select the number of items</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="16">16</option>
                                </Form.Select>
                            </div>
                </Form.Group>
                <div className='show-date-input' onClick={()=>setOpenDate(true)}>
                     <FontAwesomeIcon icon={faClock} className='icon' />
                </div>
                {
                    openDate && 
                    <div>
                        <div className='fixed' onClick={()=>setOpenDate(false)} />
                        <div className='container-date'>
                            <div className='card-date'>
                                    <p>Enter the Date
                                    <FontAwesomeIcon icon={faClock}/>
                                    </p>
                                    <div className='custom-date'>
                                        <FontAwesomeIcon icon={faTrashArrowUp} className='deleteDate' onClick={()=>setDate("")} />
                                        <div>
                                            <input type='text' onChange={()=>{}} value={date!= "" ? new Date(date).getFullYear() : ""}  />
                                            <input type='text' onChange={()=>{}} value={date!= "" ? new Date(date).getMonth() : ""} />
                                            <input type='text' onChange={()=>{}} value={date!= "" ? new Date(date).getDate() : ""}  />
                                        </div>
                                        <input type='date' className='date' onChange={(e)=>setDate(e.target.value)} />
                                    </div>
                            </div>
                        </div>
                    </div>
                }
             </div>
             {
                (width > 1100 && props.delete == "product"  || width >(750 + +sideBarWidth) && props.delete != "product") &&
                <div className='table-res'>
                {
                     !isDataArrived || (props.delete == "user" && thisUser == false) ?
                    <TableLoad rowCount = {props.limit}/> 
                    : 
                    <table>
                        <thead>
                            {
                                showHeaders
                            }
                        </thead>
                        <tbody>
                            {
                                showData
                            }
                        </tbody>
                    </table>
                }
                </div>
             }
            {
                (width <=1100 && props.delete == "product" || width <= (750 + +sideBarWidth) && props.delete != "product")  && (
                    
                !isDataArrived || (props.delete == "user" && thisUser == false) ? 
                <div className='row m-0 mt-4'>
                        {cardLoad}
                </div>
                : 
                <div className='row m-0 mt-4'>
                    { cardShow }
                </div>
                )
            }
            {
                pageCount != 1 &&
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=""
                    onPageChange={(e)=>{
                        e.selected != -1 && props.setPage(e.selected +1);
                        new Cookie().set("page",e.selected == -1 ? 1 : e.selected+1);
                    }}
                    pageRangeDisplayed={2}
                    breakClassName="list-unstyled"
                    pageCount={pageCount}
                    initialPage={Math.min(props.page - 1, pageCount - 1)}
                    previousLabel=""
                    className="d-flex gap-2 paginate justify-content-center align-items-center"
                    pageClassName="list-unstyled"
                    pageLinkClassName="pageLinkClassName rounded-circle li"
                    activeLinkClassName="bg-info text-light"
                    nextClassName="list-unstyled"
                    previousClassName="list-unstyled fa-solid fa-circle-arrow-left"
                    renderOnZeroPageCount={null}
                />
            }
            {
                err!="" &&
                <div className='error error-dash'>
                    {err}
                </div>
            }
        </div>
    );
}   