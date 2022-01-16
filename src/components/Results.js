import React from "react";
import Result from "./Result";

function Results({ results, openPopup }) {
  return (
    <section className="results">
      {results.map((r) => {
        return <Result key={results.imdbID} result={r} openPopup={openPopup} />;
      })}
    </section>
  );
}

export default Results;
