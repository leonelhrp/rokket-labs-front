import React, { useState, useEffect } from "react";
import AnimalDataService from "../services/AnimalService";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const AnimalsList = () => {
  const [animals, setAnimals] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveAnimals();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveAnimals = async () => {
    try {
      const { data } = await AnimalDataService.getAll()
      setAnimals(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const refreshList = () => {
    retrieveAnimals();
    setCurrentAnimal(null);
    setCurrentIndex(-1);
  };

  const setActiveAnimal = (animal, index) => {
    setCurrentAnimal(animal);
    setCurrentIndex(index);
  };

  const removeAllAnimals = async () => {
    try {
      const { data } = await AnimalDataService.removeAll()
      console.log(data);
      refreshList();
    } catch (e) {
      console.log(e);
    }
  };

  const findByName = async () => {
    try {
      const { data } = await AnimalDataService.findByName(searchName)
      setAnimals(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onKeyUp = event => {
    if (event.charCode === 13) {
      findByName()
    }
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
            onKeyPress={onKeyUp}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Animals List</h4>

        <ul className="list-group">
          {animals &&
            animals.map((animal, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveAnimal(animal, index)}
                key={index}
              >
                <Avatar {...animal} avatarWidth={50} avatarHeight={50} /> {animal.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllAnimals}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentAnimal ? (
          <div>
            <h4>Animal</h4>
            <Avatar {...currentAnimal}/>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentAnimal.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentAnimal.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentAnimal.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/animals/" + currentAnimal.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Animal...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalsList;
