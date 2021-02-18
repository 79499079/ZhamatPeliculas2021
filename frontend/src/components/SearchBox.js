import React, { useState } from "react";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form class="form-inline my-2 my-lg-0" onSubmit={submitHandler}>
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Buscar"
        name="q"
        id="q"
        onChange={(e) => setName(e.target.value)}
        aria-label="Search"
      ></input>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
        Buscar pelicula
      </button>
    </form>
  );
}
