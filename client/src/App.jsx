import Login from "./Components/account/Login";
import DataProvider from "./context/DataProvider";
import Home from "./Components/Home/Home";
import {BrowserRouter,Routes,Route, Navigate, Outlet,} from 'react-router-dom'
import Header from "./Components/Header/Header";
import { useState } from "react";
import PropTypes from 'prop-types';
import CreatePost from "./Components/create/CreatePost";
import DetailView from "./Components/details/DetailView";
import Update from "./Components/create/Update";
import About from "./Components/about/About";
import Contact from "./Components/contact/Contact";

const PrivateRoute = ({isAuthenticated})=>{
  return isAuthenticated?
  <>
  <Header />
  <Outlet />
  </>
  : <Navigate replace to="/login" />
}
function App() {
  const [isAuthenticated,isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
      
      <div style={{ marginTop: 64 }}>
        <Routes>
        <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/create" element={<CreatePost />} />
            </Route>
            <Route path="/details/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/details/:id" element={<DetailView/>} />
            </Route>
            <Route path="/update/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/update/:id" element={<Update/>} />
            </Route>
            <Route path="/about" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/about" element={<About/>} />
            </Route>
            <Route path="/contact" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/contact" element={<Contact />} />
            </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </DataProvider>
  )
}


PrivateRoute.propTypes = {
  isAuthenticated:PropTypes.bool,
}
export default App;
