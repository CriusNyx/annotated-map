import request, { gql } from "graphql-request";

const serverURL = `http://${window.location.hostname}:4000/project`;

enum LoginType {
  User = "User",
  Admin = "Admin",
  Failed = "Failed",
}

interface Auth {
  password: string;
  loginType: LoginType;
}

class API {
  public static async Login(password: string) {
    let loginRequest = gql`
      query DoLogin($auth: Auth) {
        login(auth: $auth) {
          loginType
        }
      }
    `;

    let args = { auth: { password } };

    let loginResponse = await request(serverURL, loginRequest, args);

    let auth = { password, loginType: loginResponse.login.loginType } as Auth;

    return auth;
  }
}

export { LoginType, Auth };
export default API;
