import React, { useEffect } from 'react';
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

const Page = (props) => {
  useEffect(() => {
    document.title = props.title || "pauska";
  }, [props.title]);
  return props.children;
}

class Landing extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Page title="pauska/hjem">
                <Home />
              </Page>
            }
          />
          <Route 
            path="/projects" 
            element={
              <Page title="pauska/prosjekter">
                <Projects />
              </Page>
            }
          />
          <Route
            path="/cookbook"
            element={
              <Page title="pauska/kokebok">
                <Cookbook />
              </Page>
            }
          />
        </Routes>

        <Footer />
      </Router>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<Landing />)