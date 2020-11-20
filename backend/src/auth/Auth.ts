import { Lexer } from 'graphql';

enum LoginType {
  User = 'User',
  Admin = 'Admin',
  Failed = 'Failed',
}

interface Auth {
  password: string;
}

class Authenticate {
  public static ValidateLogin(auth: Auth) {
    let { password } = auth;
    if (password === 'asdf') {
      return LoginType.User;
    } else if (password === 'qwer') {
      return LoginType.Admin;
    } else {
      return LoginType.Failed;
    }
  }
}

export default Authenticate;
export { LoginType, Auth };
