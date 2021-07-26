import logo from './logo.svg';
import './App.css';
import CharactersPage from './pages/CharactersPage'
import { Route, Switch, BrowserRouter, useLocation } from "react-router-dom";

function App() {
  return (<BrowserRouter basename="/">
    <Route path="/"
      component={CharactersPage}
    />
  </BrowserRouter>);
}

export default App;
