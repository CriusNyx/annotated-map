enum LoginType {
  User,
  Admin,
  Failed,
}

class Auth {
  public static ValidateLogin(password: string) {
    if (password === 'asdf') {
      return LoginType.User;
    } else if (password === 'qwer') {
      return LoginType.Admin;
    } else {
      return LoginType.Failed;
    }
  }
}

export default Auth;
export { LoginType };
