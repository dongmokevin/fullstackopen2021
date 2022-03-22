import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAll, remove, create, update } from "./services/persons";

const Persons = ({ persons, newFilter, deletePerson }) => {
  const personsToShow = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  return personsToShow.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={deletePerson}>delete</button>
    </div>
  ));
};

const Filter = ({ newFilter, setNewFilter }) => {
  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      filter shown with <input onChange={handleFilter} value={newFilter} />
    </div>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const AddName = (event) => {
    event.preventDefault();
    if (newName === "") {
      return alert("Invalid input, empty names are not allowed");
    }
    const name = { name: newName, number: newNumber };
    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : create(name).then((res) => setPersons(persons.concat(res)));
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={AddName}>
      <div>
        name: <input onChange={handleName} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    getAll().then((res) => setPersons(res));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
