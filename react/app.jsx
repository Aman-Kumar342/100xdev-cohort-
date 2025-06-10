// import *./App,css*;
// export default function App() {
//     function onClickHandler(){
//         const currentValue=document.getElementById("btn").innerHTML;

//         const currentCounter=currentValue.split(" ")[1];
//         const newCounter=parseInt(currentCounter)+1;
//         document.getElementById("btn").innerHTML=`Click me ${newCounter}`;
//     }
//     return(
//         <div>
//             <button id="btn" onClick={onClickHandler}>counter 0</button>
//         </div>
//     );

//     }

// import{useState} from "react";
// import "./App.css";
// export default function App() {
//     const [counter, setCounter] = useState(0);

//     function onClickHandler() {
//         setCounter(counter + 1);
//     }

//     return (
//         <div>
//             <button id="btn" onClick={onClickHandler}>
//                 Click me {counter}
//             </button>
//         </div>
//     );
// }
// function Button(props){
//     return (
//         <button id="btn" onClick={props.onClick}>
//             Click me {props.counter}
//         </button>
//     );
// }


import { useState } from "react";
import "./App.css";
export default function App() {
    const[todos, setTodos] = useState([
        {
            title:"go to gym",
            description:"hit gym regularly",
            completed: false
        },
    ]);
    function addTodo() {
        let newTodo=[];
        for(let i=0; i<10; i++){
            newTodo.push({
                title: `todo ${i}`,
                description: `description ${i}`,
                completed: false
            });
        }
        setTodos([...todos, ...newTodo]);
    }
}