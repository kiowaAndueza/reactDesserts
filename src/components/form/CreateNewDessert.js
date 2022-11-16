import axios from "axios";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { api } from "../../api/dessertApi";


export function CreateNewDesserts() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(-1);
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const [quantity, setQuantity] = useState(-1);
    const [isSaving, setIsSaving] = useState(false);

    //VALIDATE AND SAVE DESSERT
    const handleValidationAndSave = async () => {
        if (name.length <= 0 || price <= 0 || description.length <= 0 || quantity <= 0) {
            const result = await Swal.fire({
                title: 'Error. The fields: name, price, description and quantity are required',
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
            formData.append("name", name);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("img", img);
            formData.append("quantity", quantity);
            console.log(formData);

            var request = "/api/dessert";
            var url = api + request;
            try {
                await axios.post(url, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Has been created successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setName('');
                setPrice();
                setDescription('');
                setImg('');
                setQuantity();
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
            <form className="form-created">
                <h1 className="mt-2 mb-5 text-center">Dessert</h1>
                <div className="row justify-content-center">
                    <div className="form-group">
                        <label htmlFor="text">Name</label>
                        <input
                            required
                            onChange={(event) => { setName(event.target.value) }}
                            value={name}
                            type="text"
                            className="form-control mb-4"
                            id="name"
                            name="name"
                            placeholder="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="number">Price($)</label>
                        <input
                            required
                            onChange={(event) => { setPrice(event.target.value) }}
                            type="number"
                            className="form-control mb-4"
                            id="price"
                            name="price"
                            placeholder="price"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="text">Description</label>
                        <input
                            required
                            onChange={(event) => { setDescription(event.target.value) }}
                            type="text"
                            className="form-control mb-4"
                            id="description"
                            name="description"
                            placeholder="description"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="text">Img</label>
                        <input
                            onChange={(event) => { setImg(event.target.value) }}
                            type="text"
                            className="form-control mb-4"
                            id="img"
                            name="img"
                            placeholder="URL"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="number">Quantity</label>
                        <input
                            required
                            onChange={(event) => { setQuantity(event.target.value) }}
                            type="number"
                            className="form-control mb-5"
                            id="quantity"
                            name="quantity"
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
                                    <div className="saveText">Save</div>
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