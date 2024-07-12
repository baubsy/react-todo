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
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const TodoList = (props) => {
    const [list, setList] = useState({});
    //get and save listID for updating
    //or just keep it in todolist props?

    useEffect(() => {
        getList();
        //console.log(list);
    }, []);

    useEffect(() => {
        const sendList = setTimeout(() => {
            axios.put(props.listURL, JSON.stringify(list), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
            });
            console.log("debounced");
        }, 5000);

        return () => clearTimeout(sendList);
    }, [list]);

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
        //console.log(newList);
        newList.list.push({
            item: "",
            complete: false,
            id: newList.list[newList.list.length - 1].id + 1,
        });
        setList(newList);
    };

    const cancelOnClick = (id) => {
        let newList = JSON.parse(JSON.stringify(list));
        //console.log(newList);
        for (let i = 0; i < newList.list.length; i++) {
            if (newList.list[i].id === id) {
                newList.list.splice(i, 1);
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
        <div className="container">
            <Typography variant="h5">{list.title}</Typography>
            <List>
                {list.list.map((x) => {
                    //console.log(x);

                    if (!x.complete) {
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
                                        onChange={(event) =>
                                            textChange(event, x.id)
                                        }
                                    />
                                </ListItemButton>
                                <IconButton onClick={() => cancelOnClick(x.id)}>
                                    <CancelIcon />
                                </IconButton>
                            </ListItem>
                        );
                    }
                })}
                {list.list.map((x) => {
                    //console.log(x);
                    if (x.complete) {
                        return (
                            <ListItem key={x.id} disablePadding>
                                <ListItemButton role={undefined}>
                                    <Checkbox
                                        checked={x.complete}
                                        edge="start"
                                        onClick={() => onCheck(x.id)}
                                    />
                                    <TextField
                                        style={{
                                            textDecorationLine: "line-through",
                                        }}
                                        variant="standard"
                                        value={x.item}
                                        onChange={(event) =>
                                            textChange(event, x.id)
                                        }
                                    />
                                </ListItemButton>
                                <IconButton onClick={() => cancelOnClick(x.id)}>
                                    <CancelIcon />
                                </IconButton>
                            </ListItem>
                        );
                    }
                })}

                <IconButton onClick={() => addOnClick()}>
                    <AddIcon />
                </IconButton>
            </List>
        </div>
    );
};

export default TodoList;
