import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import data from "../FakeData/FakeData";
import "./Destination.css";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import map from "../Images/Map.png";
import Location from "../Map/Map";
const Destination = () => {
  const { vehId } = useParams();
  const [newData, setNewData] = useState([]);
  const [destination, setDestination] = useState({
    pickFrom: "",
    pickTo: "",
    showData: false,
    journeyDate: "",
  });
  let getData;
  useEffect(() => {
    setNewData(data.transport);
    console.log("newData", newData && newData[0] && newData[0].name);
  }, [vehId, newData]);
  if (vehId) {
    getData = newData.find((pd) => pd.id === parseInt(vehId));
    console.log(getData && getData.name);
  }
  //event handler
  const eventHandeler = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "pickFrom") {
      const userInfo = { ...destination };
      userInfo.pickFrom = e.target.value;
      setDestination(userInfo);
      console.log(destination);
    }
    if (e.target.name === "pickTo") {
      const userInfo = { ...destination };
      userInfo.pickTo = e.target.value;
      setDestination(userInfo);
      console.log(destination);
    }
    if (e.target.name === "journeyDate") {
      const userInfo = { ...destination };
      userInfo.journeyDate = e.target.value;
      setDestination(userInfo);
      console.log(destination);
    }
  };
  const clickHandler = (e) => {
    if (destination.pickFrom !== "" && destination.pickTo !== "") {
      const userInfo = { ...destination };
      userInfo.showData = true;
      setDestination(userInfo);
      console.log(destination.showData);
    }
    e.preventDefault();
  };
  return (
    <div className="destination-container">
      <div className="destination-divider">
        <div className="destination-searchPart">
          {!destination.showData && (
            <form>
              <fieldset>
                <label htmlFor="pickFrom">Pick From:</label>
                <input
                  type="text"
                  id="pickFrom"
                  name="pickFrom"
                  onBlur={eventHandeler}
                />
                <br />
                <br />
                <label htmlFor="pickTo">Pick To:</label>
                <input
                  type="text"
                  id="pickTo"
                  name="pickTo"
                  onBlur={eventHandeler}
                />
                <br />
                <br />

                <label htmlFor="journeyDate">Journey Date:</label>
                <input
                  type="date"
                  id="journeyDate"
                  name="journeyDate"
                  onBlur={eventHandeler}
                />
                <br />
                <br />
                <button onClick={clickHandler}>Search</button>
              </fieldset>
            </form>
          )}
          {destination.showData && (
            <div className="showData">
              <div className="showData-location">
                <h1>{destination.pickFrom.toUpperCase()}</h1>
                <h2>To</h2>
                <h1>{destination.pickTo.toUpperCase()}</h1>
              </div>
              {vehId ? (
                <div>
                  {/* single card */}
                  <div className="showData-info">
                    <img
                      className="destinationImage"
                      src={getData && getData.image}
                      alt={getData && getData.name}
                    />
                    <h2>{getData && getData.name}</h2>
                    <span className="destination-icon">
                      <FontAwesomeIcon icon={faUserFriends} />
                    </span>
                    <h2>{getData && getData.capacity}</h2>
                    <h2 className="price">{getData && getData.price}</h2>
                    {/* <h1>{getData && getData.name}</h1> */}
                  </div>
                  {/* end of single card */}
                  {/* single card */}
                  <div className="showData-info">
                    <img
                      className="destinationImage"
                      src={getData && getData.image}
                      alt={getData && getData.name}
                    />
                    <h2>{getData && getData.name}</h2>
                    <span className="destination-icon">
                      <FontAwesomeIcon icon={faUserFriends} />
                    </span>
                    <h2>{getData && getData.capacity}</h2>
                    <h2 className="price">{getData && getData.price}</h2>
                    {/* <h1>{getData && getData.name}</h1> */}
                  </div>
                  {/* end of single card */}
                  {/* single card */}
                  <div className="showData-info">
                    <img
                      className="destinationImage"
                      src={getData && getData.image}
                      alt={getData && getData.name}
                    />
                    <h2>{getData && getData.name}</h2>
                    <span className="destination-icon">
                      <FontAwesomeIcon icon={faUserFriends} />
                    </span>
                    <h2>{getData && getData.capacity}</h2>
                    <h2 className="price">{getData && getData.price}</h2>
                    {/* <h1>{getData && getData.name}</h1> */}
                  </div>
                  {/* end of single card */}
                  <p>{destination.journeyDate}</p>
                  <p>Happy journey</p>
                </div>
              ) : (
                <div>
                  <h1>{newData && newData[0] && newData[0].name}</h1>
                  {/* single card */}
                  <div className="showData-info">
                    <img
                      className="destinationImage"
                      src={newData && newData[0] && newData[0].image}
                      alt={newData && newData[0] && newData[0].name}
                    />
                    <h2>{newData && newData[0] && newData[0].name}</h2>
                    <span className="destination-icon">
                      <FontAwesomeIcon icon={faUserFriends} />
                    </span>
                    <h2>{newData && newData[0] && newData[0].capacity}</h2>
                    <h2>{newData && newData[0] && newData[0].price}</h2>
                    {/* <h1>{getData && getData.name}</h1> */}
                  </div>
                  {/* end of single card */}
                  <p>{destination.journeyDate}</p>
                  <p>Happy journey</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="destination-map">
          {/* <img src={map} alt="map" /> */}
          <Location />
        </div>
      </div>
    </div>
  );
};

export default Destination;
