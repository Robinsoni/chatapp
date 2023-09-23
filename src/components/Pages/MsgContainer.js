import React from 'react';

const MsgContainer = ({msg,color}) => {
    console.log("message ",msg);
  return (
    <p style={{color:color,position:"absolute",top:"-6%"}}>
       <div style={{display:"flex", background:"#d3ddec", padding: "10px",borderRadius:"5px"}}>{msg} </div >
    </p>
    
  )
}

export default MsgContainer