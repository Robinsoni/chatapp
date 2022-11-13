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
        <Fragment>
            <input 
                onKeyDown ={handleKey} 
                onChange = {handleInput} 
                style={{background: "#3d3c61",color: "#fdfdfd"}}    
                placeholder="Find a user" type="search"
            />
        </Fragment>
    );
};
export default Search;