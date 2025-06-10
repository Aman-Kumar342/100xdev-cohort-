import *./App,css*;
export default function App() {
    function onClickHandler(){
        const currentValue=document.getElementById("btn").innerHTML;

        const currentCounter=currentValue.split(" ")[1];
        const newCounter=parseInt(currentCounter)+1;
        document.getElementById("btn").innerHTML=`Click me ${newCounter}`;
    }
    return(
        <div>
            <button id="btn" onClick={onClickHandler}>counter 0</button>
        </div>
    );

    }