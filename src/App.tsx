import { useEffect, useState } from "react";
//import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NavigationBar from "./Components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Posts from "./Pages/Posts";
import PostCreate from "./Pages/PostCreate";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ConfirmSignUp from "./Pages/ConfirmSignUp";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/confirm-signup" Component={ConfirmSignUp} />
        <Route path="/post">
          <Route path="" Component={Posts} />
          <Route path="create" Component={PostCreate} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
