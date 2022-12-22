import axios from "axios";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../api/dessertApi";


export function CreateNewUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    //VALIDATE AND SAVE USERS
    const handleValidationAndSave = async () => {
        if (email.length <= 0 ||  password.length <= 0) {
            const result = await Swal.fire({
                title: 'Error. The fields: email and password are required. Also the email must be unique and have more than 4 characters and the password 5 characters min.',
                text: 'Do you want to continue?',
                icon: 'error',
                confirmButtonColor: "#0CC8A8",
                confirmButtonText: 'OK'
            });
            return result;
        } else {
            setIsSaving(true);
            console.log(isSaving);
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            var request = "/register";
            var url = api + request;
            try {
                await axios.post(url, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Has been created successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setEmail('');
                setPassword('');
                setIsSaving(false);
                window.location.reload(false);
            } catch (error) {
                Swal.fire({
                    title: 'Error ' + error,
                    text: 'Do you want to continue?',
                    icon: 'error',
                    confirmButtonColor: "#0CC8A8",
                    confirmButtonText: 'OK'
                });
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
                        <input
                            required
                            onChange={(event) => { setEmail(event.target.value) }}
                            value={email}
                            type="email"
                            className="form-control mb-4"
                            id="email"
                            name="email"
                            placeholder="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            required
                            onChange={(event) => { setPassword(event.target.value) }}
                            value={password}
                            type="password"
                            className="form-control mb-4"
                            id="password"
                            name="password"
                            placeholder="password"
                        />
                    </div>


                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button
                                    disabled={isSaving}
                                    onClick={handleValidationAndSave}
                                    type="button"
                                    className="mt-1 w-50 h-100 rounded-pill font-weight-bold">
                                    <div className="saveText">Create</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <Outlet />
        </div>

    )
}