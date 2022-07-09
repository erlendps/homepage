import React from 'react';
import {
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Page from '../..';
import AdminProjects from './admin_projects';
import AdminCookbook from './admin_recepies';
import AdminTechs from './admin_techs';
import '../../css/admin/admin.css';

const AdminLanding = () => {
  return (
    <div className="admin-menu">
      <h1>Admin site</h1>
      <div className="container">
        <div className="admin-menu-item">
          <Link to="/admin/project" className="admin-menu-option">
            <strong>Projects</strong> - Edit old projects or add new ones
          </Link>
        </div>
        <div className="admin-menu-item">
          <Link to="/admin/tech" className="admin-menu-option">
            <strong>Techs</strong> - Delete or add new technologies
          </Link>
        </div>
        <div className="admin-menu-item">
          <Link to="/admin/recipe" className="admin-menu-option">
            <strong>Recepies</strong> - Edit old recepies or add new ones
          </Link>
        </div>
      </div>
    </div>
  );
}

const Admin = () => {
  return (
    <div className="container-main">
      <Routes>
        <Route
          path=""
          element={
            <Page title="pauska/sudo">
              <AdminLanding />
            </Page>
          }
        />
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
              <AdminCookbook />
            </Page>
          }
        />
      </Routes>
    </div>
  );
}

export default Admin;