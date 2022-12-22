import React, {useEffect, useState } from "react";
import profileImg from  '../../img/profile.webp';
import { containerLogger } from "../../logger/IsLogger";
import { useNavigate } from "react-router-dom";
import { store } from "../../token/Token";
import { information } from "../../services/InformationUser";

export function ProfileUser() {
    const [isLogger, setLogger] = containerLogger.useState("isLogger");
    const navigate = useNavigate();
    const [token, setToken] = store.useState("token");

    
    const [totalList, setTotalList] = useState([0]);
    const [totalDessert, setTotalDessert] = useState([0]);
    const [email, setEmail] = useState([""]);
    const [lists, setList] = useState([]);

    const redirectToPath = (path) => {
        navigate(path);
    };

    
    const fetchCharacters = async (token) => {
        if (isLogger){
            try {
                const response = await information(token);
                setEmail(response.data.data[0].email);
                setTotalList(response.data.data[0].nlist);
                setTotalDessert(response.data.data[0].ndessert);
                setList(response.data.data[0].list);
            } catch (error) {
                console.log(error);
            }
        } else {
            redirectToPath("/");
        } 
    }
    

    useEffect(() => {
        fetchCharacters(token);
    },[setTotalList, setTotalDessert, setEmail, setList]);


    return(
        <div className="profile">
            <div className="wrap">
                <div className="grid-container">
                    <img className="profileImg mt-4" src={profileImg} alt="Profile Image"/>
                    <div className="datas-profile mt-4">
                        <div className="information">
                            <div className="name-information">INFORMATION</div>
                            <p className="emailInformation">{email}</p>
                        </div>
                        <div className="total-elements">
                            <div className="total">
                                <div className="name-total">TOTAL LISTS:</div>
                                <div className="number">{totalList}</div>
                            </div>
                            <div className="total">
                                <div className="name-total">TOTAL DESSERTS:</div>
                                <div className="number2">{totalDessert}</div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="list-profile">
                    <h3>LISTS CREATED</h3>
                    <ul>
                        {lists.map((item, index) => (
                            <li >{item.name}</li>
                                        
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}