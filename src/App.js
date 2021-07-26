import './App.css';
// import CharactersPage from './pages/CharactersPage';
import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter } from "react-router-dom";

const CharactersPage = lazy(() =>
  import("./pages/CharactersPage")
);


function App() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/"
          component={CharactersPage}
        />
      </Suspense>
    </BrowserRouter>);
}

export default App;
