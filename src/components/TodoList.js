import { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    TextField,
} from "@mui/material";
import axios from "axios";

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
            })
            .catch((err) => console.log(err));
    };

    const onCheck = (id) => {
        let newList = JSON.parse(JSON.stringify(list));

        for (let i = 0; i < newList.list.length; i++) {
            if (newList.list[i].id == id) {
                newList.list[i].complete = !newList.list[i].complete;
            }
        }

        setList(newList);
    };

    const textChange = (event, id) => {
        let newList = JSON.parse(JSON.stringify(list));
        for (let i = 0; i < newList.list.length; i++) {
            if (newList.list[i].id == id) {
                newList.list[i].item = event.target.value;
            }
        }
        setList(newList);
    };

    if (list.title === undefined) {
        return <p>loading</p>;
    }

    return (
        <List>
            {list.list.map((x) => {
                return (
                    <ListItem key={x.id} disablePadding>
                        <ListItemButton
                            role={undefined}
                            
                        >
                            <Checkbox checked={x.complete} edge="start" onClick={() => onCheck(x.id)}/>
                            <TextField
                                variant="standard"
                                value={x.item}
                                onChange={(event) => textChange(event, x.id)}
                                onClick={(event) => event.stopPropagation()}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default TodoList;
