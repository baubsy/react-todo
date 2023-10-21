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
                    <ListItem key={x.id}>
                        <ListItemButton
                            role={undefined}
                            onClick={() => onCheck(x.id)}
                        >
                            <Checkbox checked={x.complete} />
                        </ListItemButton>
                        <TextField
                            variant="standard"
                            value={x.item}
                            onChange={(event) => textChange(event, x.id)}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default TodoList;
