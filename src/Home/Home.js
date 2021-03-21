import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Data from "../FakeData/FakeData";

import "./Home.css";
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(Data.transport);
  }, []);

  return (
    <div>
      <div className="container">
        {data.map((ids) => {
          console.log(ids);
          const { name, id, image } = ids;

          return (
            <Link className="link" key={id} to={`/${id}`}>
              <div className="card">
                <img src={`${image}`} className="homeVehicle" alt="" />
                <h1>{name}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
