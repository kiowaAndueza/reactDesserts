
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { register } from "../../services/Authentication";
import { Validator } from "../../validator/Validator";
import { EmailConstraint } from "../../validator/EmailConstraint";
import { MinCharactersConstraint } from "../../validator/MinCharactersConstraint";
import { successfulMessage, errorMessage } from "../messages/Messages";
import { useNavigate } from "react-router-dom";

export function CreateNewUser() {
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();
    const redirectToPath = (path) => {
        navigate(path);
    };

    const handleValidationAndSave = async () => {
        var errors = "";
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value

        const newUserData = {
            email: { value: email, constraints: [new EmailConstraint('email', email)] },
            password: { value: password, constraints: [new MinCharactersConstraint('password', password, 3)] }

        }
        errors = new Validator(newUserData).test();

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
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            try {
                await register(formData);
                successfulMessage("Has been created successfully");
                setIsSaving(false);
                redirectToPath("/");
            } catch (error) {
                errorMessage(error);
            }
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <form className="form-created mb-4">
                <h1 className="mt-2 mb-5 text-center">Register</h1>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control mb-4" id="email" name="email" placeholder="email"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control mb-4" id="password" name="password" placeholder="password"/>
                    </div>


                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button disabled={isSaving} onClick={handleValidationAndSave} type="button" className="mt-1 w-50 h-100 rounded-pill font-weight-bold">
                                    <div className="saveText">Create</div>
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