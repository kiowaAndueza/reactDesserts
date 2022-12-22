import React, { useEffect, useState } from "react";
import { deleteList, getList } from "../../services/ListServices";
import { store } from "../../token/Token";
import { containerLogger } from "../../logger/IsLogger";
import { useNavigate } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { containerIdList, containerNameList } from "../../api/idList/IdList";
import { confirmationMessage, errorMessage, successfulMessage } from "../messages/Messages";

export function List() {
    const [lists, setList] = useState([]);
    const [token, setToken] = store.useState("token");
    const [isLogger, setLogger] = containerLogger.useState("isLogger");
    const navigate = useNavigate();
    const [idList, setIdList] = containerIdList.useState("idList");
    const [nameList, setNameList] = containerNameList.useState("nameList");

    const redirectToPath = (path) => {
        navigate(path);
    };

    const fetchCharacters = async (token) => {
        if (isLogger){
            try {
                const response = await getList(token);
                setList(response.data.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            redirectToPath("/");
        } 
    }
    


    const handleDelete = async (id, name) => {
        const result = await confirmationMessage(`Do you want to delete the ${name} list and its items?`);
        if (!result.value) {
            return;
        }
        try {
            await deleteList(id, token)
            successfulMessage("Has been removed successfully");
        } catch (error) {
            errorMessage(error);
        }
    };


    const redirectToForm = async () => {
        redirectToPath("/newList");
    }

    const redirectToDessertUser = async (id, name) => {
        setIdList(id);
        setNameList(name);
        redirectToPath("/myList");
    }


    useEffect(() => {
        fetchCharacters(token);
    }, [setList]);

    if(lists.length===0){
        return(
            <div className="tableAndSearch">
                <h1 className="mb-3">My Lists<button onClick={redirectToForm} style={{ backgroundColor: "white" }}><i><GoDiffAdded /></i></button></h1>
                <div className="alert alert-success" role="alert">
                    Currently has no lists
                </div>
            </div>
        );
    }
    return (
        <div className="tableAndSearch">
            <h1 className="mb-3">My Lists<button onClick={redirectToForm} style={{ backgroundColor: "white" }}><i><GoDiffAdded /></i></button></h1>
            <ul className="list-group">
                {lists.map((item, index) => (
                    <li key={item.id} className="row list-group-item">
                        <div className="col">{item.name}</div>
                        <div className="col d-flex justify-content-end">
                            <button onClick={async () => {
                                    await handleDelete(item.id, item.name);
                                }} 
                            style={{ backgroundColor: "white" }}><i><MdDelete /></i></button>
                            <button onClick={async () => {
                                    await redirectToDessertUser(item.id, item.name);
                                }} 
                            style={{ backgroundColor: "white" }}><i><BiShow /></i></button>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
        
    );
    }
