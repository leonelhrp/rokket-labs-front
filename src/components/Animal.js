import React, { useState, useEffect } from "react";
import AnimalDataService from "../services/AnimalService";

import Avatar from "./Avatar";

const Animal = props => {
  const initialAnimalState = {
    id: null,
    name: "",
    description: "",
    published: false
  };
  const [currentAnimal, setCurrentAnimal] = useState(initialAnimalState);
  const [message, setMessage] = useState("");

  const getAnimal = async id => {
    try {
      const { data } = await AnimalDataService.get(id)
      setCurrentAnimal(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimal(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentAnimal({ ...currentAnimal, [name]: value });
  };

  const updatePublished = async status => {
    const animal = {
      id: currentAnimal.id,
      name: currentAnimal.name,
      description: currentAnimal.description,
      published: status
    };

    try {
      const { data } = await AnimalDataService.update(currentAnimal.id, animal)
      setCurrentAnimal({ ...currentAnimal, published: status });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateAnimal = async () => {
    try {
      const { data } = await AnimalDataService.update(currentAnimal.id, currentAnimal)
      console.log(data);
      setMessage("The animal was updated successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAnimal = async () => {
    try {
      const { data } = await AnimalDataService.remove(currentAnimal.id)
      console.log(data);
      props.history.push("/animals");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {currentAnimal ? (
        <div className="edit-form">
          <h4>Animal</h4>
          <Avatar {...currentAnimal}/>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentAnimal.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentAnimal.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentAnimal.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentAnimal.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteAnimal}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateAnimal}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Animal...</p>
        </div>
      )}
    </div>
  );
};

export default Animal;
