import React, { useState } from "react";
import "./Calculadora.css"
import Botao from "../components/Botao";
import Display from "../components/Display";

const estadoInicial = {
    displayValor: '0',
    limparDisplay: false,
    op: null,
    valores: [0, 0],
    atual: 0
};
export default function Calculadora(props) {
    const [estado, setEstado] = useState({ ...estadoInicial });
    function limparMemoria() {
        setEstado({ ...estadoInicial });
    }
    function setOp(op) {
        if (estado.atual === 0) {
            setEstado((prevState) => ({ ...prevState, op: op, atual: 1, limparDisplay: true }));
        } else {
            const final = op === '=';
            const atualOp = estado.op;
            const valores = [...estado.valores];
            // logica da operação
            try {
                valores[0] = eval(`${valores[0]} ${atualOp} ${valores[1]}`);
                
            } catch (error) {
                valores[0] = estado.valores[0];
            }
            valores[1] = 0;
            setEstado((prevState) => ({
                ...prevState, displayValor: valores[0], op: final ? null : op, atual: final ? 0 : 1,
                limparDisplay: !final, valores: valores
            }));
        }
    }
    function addDigito(n) {
        if (n === '.' && estado.displayValor.includes('.')) {
            //regra para evitar ter 2 pontos
            return
        }
        //limpar display
        const limparDisplay = (estado.displayValor === '0' && n !== ".") || estado.limparDisplay;
        const atualValor = limparDisplay ? '' : estado.displayValor;
        // definir valor do display
        const valorDisplay = atualValor + n;
        setEstado((prevState) => ({ ...prevState, displayValor: valorDisplay, limparDisplay: false }));

        if (n !== ".") {
            // mudar os valores
            const i = estado.atual;
            const novoValor = parseFloat(valorDisplay);
            const valores = [...estado.valores];
            valores[i] = novoValor;
            setEstado((prevState) => ({ ...prevState, valores: valores }));
        }


    }
    return (
        <div className="calculadora">
            <Display valor={estado.displayValor}></Display>
            <Botao texto="AC" tipo="triple" click={() => limparMemoria()}></Botao>
            <Botao texto="/" tipo="op" click={(e) => setOp(e)}></Botao>
            <Botao texto="7" click={(e) => addDigito(e)}></Botao>
            <Botao texto="8" click={(e) => addDigito(e)}></Botao>
            <Botao texto="9" click={(e) => addDigito(e)}></Botao>
            <Botao texto="*" tipo="op" click={(e) => setOp(e)}></Botao>
            <Botao texto="4" click={(e) => addDigito(e)}></Botao>
            <Botao texto="5" click={(e) => addDigito(e)}></Botao>
            <Botao texto="6" click={(e) => addDigito(e)}></Botao>
            <Botao texto="-" tipo="op" click={(e) => setOp(e)}></Botao>
            <Botao texto="1" click={(e) => addDigito(e)}></Botao>
            <Botao texto="2" click={(e) => addDigito(e)}></Botao>
            <Botao texto="3" click={(e) => addDigito(e)}></Botao>
            <Botao texto="+" tipo="op" click={(e) => setOp(e)}></Botao>
            <Botao texto="0" tipo="double" click={(e) => addDigito(e)}></Botao>
            <Botao texto="." click={(e) => addDigito(e)}></Botao>
            <Botao texto="=" tipo="op" click={(e) => setOp(e)}></Botao>
        </div>
    );
}
