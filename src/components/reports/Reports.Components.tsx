import React from "react";
import { useLocation } from "react-router-dom";
import RulesComponent from "./rules/rules.component";
import Regulationscomponent from "./regulations/Regulations.component";
function ReportsComponents() {
  const location = useLocation();
  return (
    <>
      {location?.pathname === "/reports/regulations" ? (
        <Regulationscomponent />
      ) : (
        <RulesComponent />
      )}
    </>
  );
}
export default ReportsComponents;
