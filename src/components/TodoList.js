import { useEffect, useState } from "react";
import axios from "axios";

const testList = "http://127.0.0.1:3123/api/todoList/375080984463278161";
const TodoList = (props) => {
    const [list, setList] = useState({});
    //get and save listID for updating

    useEffect(() => {
        getList();
        //console.log(list);
    }, []);

    const getList = async () => {
        axios
            .get(props.listURL, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
            })
            .then((res) => {
                setList(res.data);
                console.log(list);
            })
            .catch((err) => console.log(err));

        //setList(response.data);
    };

    if(list.title === undefined){
        return <p>loading</p>
    }
    return (
        <div>
            <h1>{list.title}</h1>
            {list.list.map((x) => {
                return (
                    <p>{x.item}</p>
                )
            })}
        </div>
    );
};

export default TodoList;
