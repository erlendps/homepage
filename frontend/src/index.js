import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/navbar'
import Home from './components/home';
import Projects from './components/projects';
import Cookbook from './components/cookbook';
import './css/index.css';
import Footer from './components/footer';

class Landing extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/cookbook" element={<Cookbook />}></Route>
        </Routes>

        <Footer />
      </Router>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<Landing />)