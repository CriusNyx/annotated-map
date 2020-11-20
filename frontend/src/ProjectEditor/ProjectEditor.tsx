import React from "react";
import { request, gql } from "graphql-request";

interface Props {
  projectData: ProjectData;
}

interface State {
  project: any | null;
}

interface ProjectData {
  id: number;
  name: string;
}

class ProjectEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { project: null };

    this.getProjectPanel = this.getProjectPanel.bind(this);

    let projectDataRequest = gql`
            query GetProject(id: $id, $auth: Auth){
                project(id: $id, auth: $auth){
                    id,
                    name,
                    nodes{
                      id,
                      name,
                      parent,
                      graphic,
                      annotations{
                        id,
                        richText,
                        polygon
                      }
                    }
                  }
                }
        `;
  }

  render() {
    return (
      <>
        <h1>Project Editor</h1>
        <p>{this.getProjectPanel()}</p>
      </>
    );
  }

  getProjectPanel() {
    if (this.state.project) {
      return "Project Loaded";
    } else {
      return "Loading";
    }
  }
}

export default ProjectEditor;
