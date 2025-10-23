interface ICredentials {
  username: VALID_CREDENTIALS.USERNAME | string;
  password: VALID_CREDENTIALS.PASSWORD | string;
}

interface IUserData {
  title: string;
  credentials: ICredentials;
  errorMessage: NAME_ERROR_NOTIFICATION | PASSWORD_ERROR_NOTIFICATION;
}
//const message = "Successfully registered! Please, click Back to return on login page";

enum NAME_ERROR_NOTIFICATION {
  SPACE_ERROR = "Prefix and postfix spaces are not allowed is username",
  REQUIRED_ERROR = "Username is required",
  LESS3_ERROR = "Username should contain at least 3 characters",
  MORE40_ERROR = "Username can't exceed 40 characters",
  NAME_IN_USE = "Username is in use",
}

enum PASSWORD_ERROR_NOTIFICATION {
  REQUIRED_ERROR = "Password is required",
  LESS8_ERROR = "Password should contain at least 8 characters",
  MORE20_ERROR = "Password can't exceed 20 characters",
  NO_UPPERCASE_ERROR = "Password should contain at least one character in upper case",
  NO_LOWERCASE_ERROR = "Password should contain at least one character in lower case",
}

enum VALID_CREDENTIALS {
  USERNAME = "Andreynemtsev",
  PASSWORD = "SuperSecretPassword!",
}

const invalidTestData: IUserData[] = [
  {
    credentials: { username: "", password: VALID_CREDENTIALS.PASSWORD },
    errorMessage: NAME_ERROR_NOTIFICATION.REQUIRED_ERROR,
    title: "Username is required",
  },
  {
    credentials: { username: "An", password: VALID_CREDENTIALS.PASSWORD },
    errorMessage: NAME_ERROR_NOTIFICATION.LESS3_ERROR,
    title: "Name less than 3 symbols",
  },
  {
    credentials: {
      username: "Jasdjhgasjhdasdasjkdajshdahsdhjaasdndsadadas",
      password: VALID_CREDENTIALS.PASSWORD,
    },
    errorMessage: NAME_ERROR_NOTIFICATION.MORE40_ERROR,
    title: "Name more than 40 symbols",
  },
  {
    credentials: { username: "       ", password: VALID_CREDENTIALS.PASSWORD },
    errorMessage: NAME_ERROR_NOTIFICATION.SPACE_ERROR,
    title: "Name only spaces",
  },
  {
    credentials: { username: " andry", password: VALID_CREDENTIALS.PASSWORD },
    errorMessage: NAME_ERROR_NOTIFICATION.SPACE_ERROR,
    title: "Name with a space prefix",
  },
  {
    credentials: { username: "Andry ", password: VALID_CREDENTIALS.PASSWORD },
    errorMessage: NAME_ERROR_NOTIFICATION.SPACE_ERROR,
    title: "Name with a space postfix",
  },
  {
    credentials: { username: VALID_CREDENTIALS.USERNAME, password: "" },
    errorMessage: PASSWORD_ERROR_NOTIFICATION.REQUIRED_ERROR,
    title: "Required password",
  },
  {
    credentials: { username: VALID_CREDENTIALS.USERNAME, password: "111" },
    errorMessage: PASSWORD_ERROR_NOTIFICATION.LESS8_ERROR,
    title: "Password less than 8 symbols",
  },
  {
    credentials: {
      username: VALID_CREDENTIALS.USERNAME,
      password: "asbhdSADbdandnabsdbasdn8u31283123bandasbdas",
    },
    errorMessage: PASSWORD_ERROR_NOTIFICATION.MORE20_ERROR,
    title: "Password more than 20 symbols",
  },
  {
    credentials: {
      username: VALID_CREDENTIALS.USERNAME,
      password: "         ",
    },
    errorMessage: PASSWORD_ERROR_NOTIFICATION.REQUIRED_ERROR,
    title: "Password is only spaces",
  },
  {
    credentials: {
      username: VALID_CREDENTIALS.USERNAME,
      password: "12312asdadasdasd",
    },
    errorMessage: PASSWORD_ERROR_NOTIFICATION.NO_UPPERCASE_ERROR,
    title: "Password without upper case",
  },
  {
    credentials: {
      username: VALID_CREDENTIALS.USERNAME,
      password: "12312ADSASDSADASDA",
    },
    errorMessage: PASSWORD_ERROR_NOTIFICATION.NO_LOWERCASE_ERROR,
    title: "Password without lower case",
  },
];

export default invalidTestData;
