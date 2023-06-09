import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/audio-convert" activeClassName="active">
            Audio Convert
          </NavLink>
        </li>
        <li>
          <NavLink to="/image-convert" activeClassName="active">
            Image Convert
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
