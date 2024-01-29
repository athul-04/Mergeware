import React from "react";
import { Link } from "react-router-dom";

const Errorjs=()=>{
    return(
        <div>
            <h1>Hello You Are Not authorized To Access This page</h1>

            <Link to={'/'} >Login to Continue</Link>
        </div>
    )
}

export default Errorjs;