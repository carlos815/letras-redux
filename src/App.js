import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { SearchField } from "./app/SearchField";
import { SearchResults } from "./pages/searchResuts/SearchResults";
import { SinglePageBook } from "./pages/singlePageBook/SinglePageBook";
import logo from "./img/logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
              <div className="home wrapper">
                <section>
                  <div className="logo">
                    <img src={logo} alt="Letras. Googling books with extra steps" srcSet="" />
                  </div>
                  <SearchField />
                </section>
              </div>
          )}
        />
      </div>

      <Route exact path="/search/:search" component={SearchResults} />
      <Route exact path="/book/:bookId" component={SinglePageBook} />
    </Router>
  );
}

export default App;
