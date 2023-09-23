import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner,spinPulse } from '@fortawesome/free-solid-svg-icons'
const Spinner = () => {
    return (
        <p style={{   background:"rgba(183, 200, 225, 0.46)", width:"100%",height:"100%",alignItems:"center", display:"flex", justifyContent: "center",  padding: "10px",borderRadius:"10px", position: "absolute", top: "0%" }}>
                  <FontAwesomeIcon icon={faSpinner} spinPulse style={{height:"15%",color:"rgb(31, 89, 179)"}} />
        </p>
    )
}

export default Spinner;