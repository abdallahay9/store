import { useContext, useEffect, useRef, useState } from "react"
import { CATEGORY } from "../../../../Api/api"
import SmallLoading from "../../../../Components/Loading/SmallLoading";
import TableShaw from "../../../../Components/Dashboard/Table/Table";
import { Search } from "../../../../Context/searchContext";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
export default function Categories(){
    const [arrived , setArrived] = useState(false);
    const [page,setPage] = useState(1);
    const [limit,setLimit] = useState(7);
    const total = useRef(1);
    const [search ,] = useContext(Search);
    const location = useLocation();
    const [err , setErr] = useState("");
    const headers = [
      {
        value : "Title",
        key:"title"
      },
      {
        value : "image",
        key:"image"
      },
      {
        key:"created_at",
        value:"Create"
      },
      {
        key:"updated_at",
        value:"Update"
      }
    ];
    useEffect(()=>{
      if(location.state?.message && new Cookie().get("external")) {
        setErr(location.state.message);
        new Cookie().set("external" , false)
      }
    },[location])
    useEffect(()=>{
        const time = setTimeout(() => {
            setErr("")
        }, 2400);
        return () => clearTimeout(time);
    },[err])
    return  (
      <div className="p-1 px-2 pt-0 px-md-3 pageTable">
        {
          total.current == 0 ?
          (
            arrived ? 
          <div className="d-flex justify-content-center align-items-center" style={{minHeight:"calc(100dvh - 97px)"}}>
              <span className="TITLE mb-5" style={{userSelect:"none"}} >There Not Categories</span>
          </div> 
          :
          <SmallLoading />
          )
          :
          <TableShaw 
            searchText={search} 
            setArrived={setArrived} 
            search={"title"} 
            limit={limit} 
            setLimit={setLimit} 
            total={total} 
            headers={headers} 
            page={page} 
            delete={CATEGORY} 
            title={"All Categories"}  
            setPage={setPage} 
          />
        }
        {err!="" && <span className="error error-dash">{err}</span>}
     </div>
    )
}
