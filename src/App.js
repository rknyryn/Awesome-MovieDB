import React, { useState } from "react";
import axios from "axios";

import Results from "./components/Results";
import Search from "./components/Search";
import Popup from "./components/Popup";

const { REACT_APP_API_URL } = process.env

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  const search = (e) => {
    if (e.key === "Enter") {
      axios(REACT_APP_API_URL + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState((prevState) => {
          return { ...prevState, results: results };
        });
      });
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = (id) => {
    axios(REACT_APP_API_URL + "&i=" + id).then((data) => {
      let result = data.data;

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Awesome Movie Databse</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
