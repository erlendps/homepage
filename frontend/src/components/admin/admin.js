import React from 'react';
import {
  Switch,
  Route,
  Routes,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Page from '../..';
import AdminProjects from './admin_projects';
import AdminRecepies from './admin_recepies';
import AdminTechs from './admin_techs';

const Admin = () => {
  return (
    <div className="container-main">
      <h1>Admin site</h1>
      <Link to="/admin/project">Projects</Link>
      <Link to="/admin/tech">Techs</Link>
      <Link to="/admin/recipe">Recepies</Link>

      <Routes>
        <Route
          path="project"
          element={
            <Page title="sudo/projects">
              <AdminProjects />
            </Page>
          }
        />
        <Route
          path="tech"
          element={
            <Page title="sudo/techs">
              <AdminTechs />
            </Page>
          }
        />
        <Route
          path="recipe"
          element={
            <Page title="sudo/recepies">
              <AdminRecepies />
            </Page>
          }
        />
      </Routes>
    </div>
  );
}

export default Admin;