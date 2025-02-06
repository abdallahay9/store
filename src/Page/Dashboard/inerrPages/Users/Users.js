import { useContext, useEffect, useRef, useState } from "react"
import { USER } from "../../../../Api/api"
import './Users.css';
import { Axios } from "../../../../Api/axios";
import TableShaw from "../../../../Components/Dashboard/Table/Table";
import { Search } from "../../../../Context/searchContext";
import SmallLoading from "../../../../Components/Loading/SmallLoading";
import { useLocation } from "react-router-dom";
import Cookie from 'cookie-universal';
export default function Users(){
    const [thisUser,setThisUser] = useState("");
    const [arrived , setArrived] = useState(false);
    const [page,setPage] = useState(1);
    const [limit,setLimit] = useState(7);
    const [err, setErr] = useState("");
    const total = useRef(1);
    const [search ,] = useContext(Search);
    const location = useLocation();
    const cookie = new Cookie();
    useEffect(()=>{
      Axios.get(`/${USER}`)
      .then((data)=>setThisUser(data.data))
      .catch(()=>{
        setErr("There is an error, please reload.");
      })
    },[]) 
    useEffect(()=>{
        if (location.state?.message && cookie.get("external")) {
          setErr(location.state.message); 
          cookie.set("external" , false)
        }
    },[location])
      const headers = [
        {
          key:"name",
          value:"Username"
        },
        {
          key:"email",
          value:"Email"
        },
        {
          key:"role",
          value:"Role"
        },
        {
          key:"created_at",
          value:"Create"
        },
        {
          key:"updated_at",
          value:"Update"
        }
       ]

       useEffect(() => {
          const time = setTimeout(() => {
              setErr("")
          }, 2400);
          return () => clearTimeout(time);
        }, [err])
    return <div className="p-1 px-2 pt-0 px-md-3 pageTable">
      {
        total.current == 0 ?
        arrived ? 
        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"calc(100dvh - 97px)"}}>
            <span className="TITLE mb-5" style={{userSelect:"none"}} >There Not Users</span>
        </div> 
        :
        <SmallLoading />
       : 
       <TableShaw 
        setArrived={setArrived} 
        searchText={search} 
        search={"name"}   
        headers={headers} 
        limit={limit} 
        setLimit={setLimit} 
        total={total} 
        delete={USER} 
        title={"All Users"} 
        thisUser={thisUser} 
        page={page}  
        setPage={setPage} 
      />     
      }
      {err!="" && <span className="error error-dash">{err}</span>}
    </div>
}