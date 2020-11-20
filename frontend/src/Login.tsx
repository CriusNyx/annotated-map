import React from "react";
import Stack from "./Stack";
import Annotation from "./Project/Annotation";
import RichText from "./Project/RichText";
import Project from "./Project/Project";
import MapNode from "./Project/MapNode";
import { url } from "inspector";
import { request, gql } from "graphql-request";
import ProjectSelector from "./ProjectEditor/ProjectSelector";
import { LoginType, Auth } from "./api";

interface Props {}

interface State {
  passwordInput: string;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputUpdate = this.onInputUpdate.bind(this);
    this.testPoly = this.testPoly.bind(this);
    this.testTree = this.testTree.bind(this);

    let urlParams = new URLSearchParams(window.location.search);
    let password = urlParams.get("password");
    let passwordInput = "";
    if (password) {
      passwordInput = password;
      this.tryLogin(password);
    }

    this.state = { passwordInput };
  }

  private static auth: Auth | null = null;

  private static getAuthValue(auth: Auth) {
    switch (auth.loginType) {
      case LoginType.Admin:
        return 2;
      case LoginType.User:
        return 1;
      case LoginType.Failed:
        return 0;
    }
  }

  public static setAuth(auth: Auth) {
    if (this.auth) {
      if (this.getAuthValue(auth) > this.getAuthValue(this.auth)) {
        this.auth = auth;
      }
    } else {
      this.auth = auth;
    }
  }

  public static getAuth() {
    return Login.auth;
  }

  render() {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onInputUpdate}
            type="password"
            placeholder="password"
            value={this.state.passwordInput}
          />
          <button>Login</button>
        </form>
      </>
    );
  }

  testPoly() {
    let annotation = new Annotation(
      [
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ],
      new RichText("")
    );
    return annotation.pointInPolygon([0, 0]) ? "true" : "false";
  }

  testTree() {
    let nodes: MapNode[] = [];
    let project = new Project(nodes);
    let n0 = project.addNode();
    let n1 = project.addNode();
    n1.setParent(n0);
    return JSON.stringify(project.getTree());
  }

  onSubmit(event: React.FormEvent) {
    event.preventDefault();

    this.tryLogin(this.state.passwordInput);

    this.setState({ passwordInput: "" });
  }

  async tryLogin(password: string) {
    let loginRequest = gql`
      query DoLogin($auth: Auth) {
        login(auth: $auth) {
          loginType
        }
      }
    `;

    let args = { auth: { password } };

    let loginResponse = await request(
      `http://${window.location.hostname}:4000/project`,
      loginRequest,
      args
    ).catch((e) => alert(JSON.stringify(e)));

    let auth = { password, loginType: loginResponse.login.loginType } as Auth;

    if (
      auth.loginType === LoginType.User ||
      auth.loginType === LoginType.Admin
    ) {
      Login.setAuth(auth);

      Stack.Push(<ProjectSelector />);
    } else {
      alert("incorrect password");
    }
  }

  onInputUpdate(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ passwordInput: event.target.value });
  }
}

export default Login;
