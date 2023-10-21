import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login, { loginLoader } from "./pages/authentication/Login";
import { requiredAuth } from "./shared/utils";
import RegulationsPage from "./pages/regulations/Regulations.Page";
import RulesPage from "./pages/rules/Rules.Page";
import SpeciesPage from "./pages/species/Species.Page";
import SpeciesGroupPage from "./pages/species-group/SpeciesGroup.Page";
import TakeMethodPage from "./pages/take-method/TakeMethod.page";
import RegulationsDetailsComponent from "./components/regulations/regulations-details/RegulationsDetails.component";
import FeaturePage from "./pages/feature-page/FeaturePage";
import ReportsPages from "./pages/reports/Reports.Pages";
import { Appspages } from "./pages/apps/apps.pages";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<RegulationsPage />}
          loader={async () => {
            await requiredAuth();
            return null;
          }}
        />
        <Route
          path="regulations/:id"
          element={<RegulationsDetailsComponent />}
        />
        <Route path="app-viewer" element={<Appspages />} />
        <Route
          path="rules"
          element={<RulesPage />}
          loader={async () => {
            await requiredAuth();
            return null;
          }}
        ></Route>
        <Route
          path="species"
          element={<SpeciesPage />}
          loader={async () => {
            await requiredAuth();
            return null;
          }}
        />
        <Route
          path="species-groups"
          element={<SpeciesGroupPage />}
          loader={async () => {
            await requiredAuth();
            return null;
          }}
        />
        <Route
          path="take-methods"
          element={<TakeMethodPage />}
          loader={async () => {
            await requiredAuth();
            return null;
          }}
        />
        <Route
          path="features"
          element={<FeaturePage />}
          loader={async () => {
            await requiredAuth();
            return null;
          }}
        />
        <Route
          path="reports/regulations"
          element={<ReportsPages />}
          loader={async () => {
            await requiredAuth();
            return null;
          }}
        />
        <Route
          path="reports/rules"
          element={<ReportsPages />}
          loader={async () => {
            await requiredAuth();
            return null;
          }}
        />
      </Route>
      <Route path="login" element={<Login />} loader={loginLoader} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
