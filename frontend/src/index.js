import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Projects from "./components/projects/projects";
import Cookbook from "./components/cookbook/cookbook";
import Recipe from "./components/cookbook/recipe";
import Admin from "./components/admin/admin";
import "./css/index.css";
import "./css/general.css";
import Footer from "./components/footer";
import Login from "./components/login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Page = (props) => {
  let { recipeName } = useParams();
  useEffect(() => {
    document.title = recipeName ? props.title + `/${recipeName}` : props.title;
  }, [props.title, recipeName]);
  return props.children;
};

class Landing extends React.Component {
  render() {
    const token = cookies.get("TOKEN");
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
            path="/admin/login"
            element={token ? <Navigate to="/admin" replace /> : <Login />}
          />
          <Route path="/admin/*" element={<ProtectedRoutes />} />
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

ReactDOM.createRoot(document.getElementById("root")).render(<Landing />);
