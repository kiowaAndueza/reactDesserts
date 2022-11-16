import React from "react";
import { ListDessert } from "../components/table/ListDessert";
const Home = ({ characters = [] }) => {
    return (
        <div className="home-page">
            <ListDessert characters={characters} />
        </div>
    );
}

export default Home;