import React, { useState, useEffect } from "react";
import { containerIdList, containerNameList } from "../../api/idList/IdList";
import { store } from "../../token/Token";
import { containerLogger } from "../../logger/IsLogger";
import { getDesserts, deleteDessert } from "../../services/ListServices";
import { useNavigate } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { successfulMessage, errorMessage, confirmationMessage } from "../messages/Messages";

export function DessertUser() {
    const idList = containerIdList.useState("idList");
    const nameList = containerNameList.useState("nameList");
    const [lists, setList] = useState([]);
    const [token, setToken] = store.useState("token");
    const [isLogger, setLogger] = containerLogger.useState("isLogger");
    const navigate = useNavigate();

    const fetchCharacters = async (token) => {
        if (isLogger){
            try {
                const response = await getDesserts(token, idList);
                setList(response.data.data);
            } catch (error) {
                errorMessage(error);
            }
        } else {
            redirectToPath("/");
        } 
    }

    const redirectToPath = (path) => {
        navigate(path);
    };


    const handleDelete = async (id, name) => {
        const result = await confirmationMessage(`Do you want to delete ${name} dessert?`);
        if (!result.value) {
            return;
        }
        try {
            await deleteDessert(id, token)
            successfulMessage('Has been removed successfully');
        } catch (error) {
            errorMessage(error);
        }
    };

    useEffect(() => {
        fetchCharacters(token);
    }, [setList]);

    if(lists.length===0){
        return(
            <div className="dessertUser">
                <div className="row">
                    <h1 className="col mb-4">{nameList} </h1>
                    <button 
                    onClick={async () => {
                        await redirectToPath("/newDessertUser");
                    }} 
                    type="button" className="m-2 mr-4 col-lg-1 btn btn-success">
                        Add Dessert
                    </button>
                </div>
                <div className="alert alert-success" role="alert">
                    No desserts added to the list
                </div>
            </div>
        );
    }
    

    return (
        <div className="dessertUser">
            <div className="row">
                <h1 className="col mb-4">{nameList} </h1>
                <button 
                onClick={async () => {
                    await redirectToPath("/newDessertUser");
                }} 
                type="button" className="col-lg-2 col-md-1 mb-3 btn btn-success">Add Dessert
                </button>
            </div>
            {lists.map((item, index) => (
                <div key={index} className="card mb-2 col-md-12">
                    <div className="card-body">
                        <div className="row">
                            <h5 className="col card-title">{item.name}</h5>
                            <button className="col d-flex justify-content-end" onClick={async () => {
                                    await handleDelete(item.id, item.name);
                                }} 
                            style={{ backgroundColor: "white" }}><i><TiDeleteOutline /></i></button>
                            
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">Price: {item.price}$</h6>
                        <p className="card-text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
        
    );
}