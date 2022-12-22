import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createDessert } from "../../services/ApiServices";
import { store } from "../../token/Token";
import { useNavigate } from "react-router-dom";
import { Validator } from "../../validator/Validator";
import { MinCharactersConstraint } from "../../validator/MinCharactersConstraint";
import { MaxCharactersConstraint } from "../../validator/MaxCharactersConstraint";
import { MinRangeConstraint } from "../../validator/MinRangeConstraint";
import { errorMessage, successfulMessage } from "../messages/Messages";
import { containerLogger } from "../../logger/IsLogger";

export function CreateNewDesserts() {
  const [isSaving, setIsSaving] = useState(false);
  const [token, setToken] = store.useState("token");
  const [isLogger, setLogger] = containerLogger.useState("isLogger");

  const navigate = useNavigate();
  const redirectToPath = (path) => {
      navigate(path);
  };

  const fetchCharacters = async (token) => {
    if (!isLogger){
      redirectToPath("/");
    }
  }

  useEffect(() => {
    fetchCharacters(token);
  }, [setToken]);


  const handleValidationAndSave = async () => {
    var errors = "";
    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const description = document.querySelector('#description').value;
    const quantity = document.querySelector('#quantity').value;
    const img= document.querySelector('#img').value;
    const newDessert = {
        name: { value: name, constraints: [new MinCharactersConstraint('name', name, 2), new MaxCharactersConstraint('name', name, 25)] },
        price: { value: price, constraints: [new MinRangeConstraint('price', price, 0.09)] },
        description: { value: description, constraints: [new MinCharactersConstraint('description', description, 0), new MaxCharactersConstraint('description', description, 300)] },
        quantity: { value: quantity, constraints: [new MinRangeConstraint('quantity', quantity, 0)] },
        img: { value: img, constraints: [new MaxCharactersConstraint('img', img, 300)] },
    }

    errors = new Validator(newDessert).test();
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
      formData.append("name", document.querySelector('#name').value);
      formData.append("price", document.querySelector('#price').value);
      formData.append("description", document.querySelector('#description').value);
      formData.append("img", document.querySelector('#img').value);
      formData.append("quantity", document.querySelector('#quantity').value);

      try {
        await createDessert(formData, token);
        successfulMessage("Has been created successfully");
        setIsSaving(false);
        redirectToPath("/");
      } catch (error) {
        errorMessage(error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
        <form className="form-created">
            <h1 className="mt-2 mb-5 text-center">Dessert</h1>
            <div className="row justify-content-center">
              <div className="form-group">
                <label htmlFor="text">Name</label>
                <input type="text" className="form-control mb-4" id="name" name="name" placeholder="name"/>
              </div>
                    
              <div className="form-group">
                <label htmlFor="number">Price($)</label>
                <input step={0.1} type="number" className="form-control mb-4" id="price" name="price" placeholder="price"/>
              </div>

              <div className="form-group">
                <label htmlFor="text">Description</label>
                <input type="text" className="form-control mb-4" id="description" name="description" placeholder="description"/>
              </div>

              <div className="form-group">
                <label htmlFor="text">Img</label>
                <input type="text" className="form-control mb-4" id="img" name="img" placeholder="URL"/>
              </div>

              <div className="form-group">
                <label htmlFor="number">Quantity</label>
                <input type="number" className="form-control mb-5" id="quantity" name="quantity"/>
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
