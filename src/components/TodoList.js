import { useEffect, useState } from "react";
import axios from "axios";

const testList = "http://127.0.0.1:3123/api/todoList/375080984463278161";
const TodoList = () => {
    const [list, setList] = useState({});

    useEffect((()=>{
        getList();
        //console.log(list);
    }),[])

    const getList = async () => {
        axios.get(testList, {headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*'}})
        .then(res => console.log(res))
        .catch(err=> console.log(err));
        
        //setList(response.data);
    }
    return (
        <p>Todolist</p>
    )
}

export default TodoList;