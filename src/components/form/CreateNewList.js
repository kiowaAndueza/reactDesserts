import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createList } from "../../services/ListServices";
import { store } from "../../token/Token";
import { containerLogger } from "../../logger/IsLogger";
import { useNavigate } from "react-router-dom";
import { Validator } from "../../validator/Validator";
import { MinCharactersConstraint } from "../../validator/MinCharactersConstraint";
import { MaxCharactersConstraint } from "../../validator/MaxCharactersConstraint";
import { successfulMessage, errorMessage } from "../messages/Messages";



export function CreateNewList() {
    const [isSaving, setIsSaving] = useState(false);
    const [token, setToken] = store.useState("token");
    const navigate = useNavigate();
    const [isLogger, setLogger] = containerLogger.useState("isLogger");

    const fetchCharacters = async (token) => {
        if (!isLogger){
          redirectToPath("/");
        }
      }
    
    useEffect(() => {
        fetchCharacters(token);
    }, [setToken]);

      
    const redirectToPath = (path) => {
        navigate(path);
    };


    const handleValidationAndSave = async () => {
        var errors = "";
        const name = document.querySelector('#name').value;
        const newListData = {
            name: { value: name, constraints: [new MinCharactersConstraint('name', name, 3), new MaxCharactersConstraint('name', name, 255)] }
        }
        errors = new Validator(newListData).test();
        var stringError = "";
        errors.forEach(error => {
            stringError += `${error.trim()}`;
            if(stringError.length > 0){
                stringError += '\n';
            }
        });
        if (stringError.length > 0){
            errorMessage(stringError);
        } else {
            setIsSaving(true);
            console.log(isSaving);
            let formData = new FormData();
            formData.append("name", name);

            try {
                await createList(formData, token);
                successfulMessage("Has been created successfully");
                redirectToPath("/myLists");
            } catch (error) {
                errorMessage(error);
            }
        }
    };


    return (
        <div className="d-flex justify-content-center">
            <form className="form-created">
                <h1 className="mt-2 mb-5 text-center">New List</h1>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="text">Name</label>
                        <input type="text" className="form-control mb-4" id="name" name="name" placeholder="name"/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button disabled={isSaving} onClick={handleValidationAndSave} type="button" className="mt-1 w-50 h-100 rounded-pill font-weight-bold">
                                    <div className="saveText">Save</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Outlet />
        </div>
    );
}
