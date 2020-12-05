import React, { useState } from "react";
import AnimalDataService from "../services/AnimalService";

const AddAnimal = props => {
  const initialAnimalState = {
    id: null,
    name: "",
    description: "",
    published: false
  };
  const [animal, setAnimal] = useState(initialAnimalState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAnimal({ ...animal, [name]: value });
  };

  const saveAnimal = async () => {
    const newAnimal = {
      name: animal.name,
      description: animal.description
    };

      try {
        const { data } = await AnimalDataService.create(newAnimal)
        setAnimal({
          id: data.id,
          name: data.name,
          description: data.description,
          published: data.published
        });
        setSubmitted(true);
        console.log(data);
        props.history.push("/animals");
      } catch (e) {
        console.log(e);
      }
  };

  const newAnimal = () => {
    setAnimal(initialAnimalState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newAnimal}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={animal.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={animal.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveAnimal} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAnimal;
