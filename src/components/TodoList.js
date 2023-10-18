import { useEffect, useState } from "react";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox} from '@mui/material'
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

    if (list.title === undefined) {
        return <p>loading</p>;
    }

    return (
        <List>
            {list.list.map((x) => {

                return(
                    <ListItem
                        key={x.item}
                    >
                        <ListItemButton role={undefined} onClick={()=> console.log('click')}>
                            <Checkbox
                                checked={false}
                            />
                            <ListItemText id={x.item} primary={x.item}/>
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    )
};

export default TodoList;
