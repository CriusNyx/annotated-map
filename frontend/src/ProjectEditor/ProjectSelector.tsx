import { render } from "@testing-library/react";
import React from "react";
import Login, { LoginType } from "../Login";
class ProjectSelector extends React.Component {
  render() {
    let auth = Login.getAuth();
    let admin = "";
    if (auth && auth.loginType === LoginType.Admin) admin = " Admin Mode";
    return "Project Selector" + admin;
  }
}

export default ProjectSelector;
