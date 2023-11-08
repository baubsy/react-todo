import { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Checkbox,
    TextField,
    IconButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
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

    const addOnClick = () => {
        let newList = JSON.parse(JSON.stringify(list));
        console.log(newList);
        newList.list.push({item: '', complete: false, id: newList.list[newList.list.length -1].id + 1})
        setList(newList);
    }

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
                        <ListItemButton role={undefined}>
                            <Checkbox
                                checked={x.complete}
                                edge="start"
                                onClick={() => onCheck(x.id)}
                            />
                            <TextField
                                variant="standard"
                                value={x.item}
                                onChange={(event) => textChange(event, x.id)}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
            <IconButton>
                <AddIcon onClick={()=> addOnClick()}/>
            </IconButton>
        </List>
    );
};

export default TodoList;
