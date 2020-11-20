import { render } from "@testing-library/react";
import React from "react";
import Login, { LoginType } from "../api";
import { request, gql } from "graphql-request";
import Stack from "../Stack";
import ProjectEditor from "./ProjectEditor";

interface Props {}

interface State {
  projects: ProjectData[] | null;
}

interface ProjectData {
  id: number;
  name: string;
}

class ProjectSelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.getAllProjectButtons = this.getAllProjectButtons.bind(this);
    this.getProjectButton = this.getProjectButton.bind(this);
    this.loadProject = this.loadProject.bind(this);

    let projectIDRequest = gql`
      query GetProjects($auth: Auth) {
        allProjects(auth: $auth) {
          id
          name
        }
      }
    `;

    let password = Login.getAuth()?.password;
    let args = { auth: { password: password } };

    this.state = { projects: null };

    request(
      `http://${window.location.hostname}:4000/project`,
      projectIDRequest,
      args
    ).then((x) =>
      this.setState({
        projects: x.allProjects as ProjectData[],
      })
    );
  }

  render() {
    let auth = Login.getAuth();
    let admin = "";
    if (auth && auth.loginType === LoginType.Admin) admin = " Admin Mode";
    return (
      <>
        <h1>Project Selector {admin}</h1>
        {this.getAllProjectButtons()}
      </>
    );
  }

  getAllProjectButtons() {
    if (this.state.projects) {
      return this.state.projects.map(this.getProjectButton);
    } else {
      return <p>Loading</p>;
    }
  }

  getProjectButton(projectData: ProjectData) {
    return (
      <button onClick={(x) => this.loadProject(projectData)}>
        {projectData.name}
      </button>
    );
  }

  loadProject(projectData: ProjectData) {
    Stack.Push(<ProjectEditor projectData={projectData} />);
  }
}

export default ProjectSelector;
