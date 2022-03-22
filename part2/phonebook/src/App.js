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
      <button onClick={deletePerson} name={person.name} id={person.id}>
        delete
      </button>
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

    const personExist = () => persons.some((person) => person.name === newName);

    // console.log(personExist());
    const name = { name: newName, number: newNumber };

    personExist()
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one ?`
        )
        ? update(
            persons.find((person) => person.name === newName).id,
            name
          ).then((res) =>
            setPersons(
              persons.map((person) =>
                person.name === res.name
                  ? { ...person, number: res.number }
                  : person
              )
            )
          )
        : console.log("canceled")
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

  const deletePerson = (event) => {
    const personName = event.target.attributes.name.value;
    const personId = event.target.attributes.id.value;
    if (window.confirm(`Delete ${personName}`)) {
      remove(personId);

      const Newperson = persons.filter((person) => person.name !== personName);
      setPersons(Newperson);
    }
  };

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
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
