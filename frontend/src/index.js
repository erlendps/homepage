import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import Navbar from './components/navbar'
import Home from './components/home';
import Projects from './components/projects/projects';
import Cookbook from './components/cookbook/cookbook';
import Recipe from './components/cookbook/recipe';
import Admin from './components/admin/admin';
import './css/index.css';
import Footer from './components/footer';

const Page = (props) => {
  let { recipeName } = useParams();
  useEffect(() => {
    document.title = recipeName ? props.title + `/${recipeName}` : props.title;
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
            path="/admin/*"
            element={
              <Admin />
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
          <Route
            path="/cookbook/:recipeName"
            element={
              <Page title="pauska">
                <Recipe />
              </Page>
            }
          />
        </Routes>

        <Footer />
      </Router>
    );
  }
}

export default Page;

ReactDOM.createRoot(document.getElementById("root")).render(<Landing />)