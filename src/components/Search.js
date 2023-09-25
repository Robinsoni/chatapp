import { faMagnifyingGlass,faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react" 

const Search = (props) => {
    const [query,setQuery] = useState("");
    const handleInput = (e) =>{
        console.log("**Handle Input",e.target.value );
        setQuery(e.target.value);
    }
    function handleKey(e){
        e.code === "Enter" && props.handleQueryString(query);
    }
    return(
            <div style={{position:"relative", display:"flex",alignItems:"center",borderBottom:"1px solid gray"}}> 
                <input 
                    onKeyDown ={handleKey} 
                    onChange = {handleInput} 
                    style={{background: "#3d3c61",color: "#fdfdfd", border:"none",padding:"0"}}    
                    placeholder="Find by email or userId" type="search"
                />
                {
                    props.isLoading ?<FontAwesomeIcon icon={faSpinner} spinPulse style={{ color:"#ddddf6"}} />:   
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{padding:"5px",cursor:"pointer"}} onClick={()=> props.handleQueryString(query)}/>
                }
            </div>
      
    );
};
export default Search;