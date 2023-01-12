import React from "react";
import "./Botao.css"

export default function Botao(props) {
    let classe = "botao " + props.tipo;
    return (
        <button onClick={(e) => props.click && props.click(props.texto)} className={classe}>{props.texto}</button>
    );
}