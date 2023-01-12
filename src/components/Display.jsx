import React from "react";
import "./Display.css"

export default function Display(props){

    return(
        <div className="display">
            <h2>{props.valor}</h2>
        </div>
    );
}