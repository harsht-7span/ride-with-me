const { default: Login } = require("@/pages/Login/Login");
const { default: SignUpPage } = require("@/pages/SignupPage/SignupPage");
const {
  default: SuccessfullPage,
} = require("@/pages/Successfull/SuccessfullPage");
const { default: VerifyPage } = require("@/pages/VerifyPage/VerifyPage");

const routes = {
  public: {
    login: {
      path: "/login",
      title: "Login",
      name: "login",
      component: Login,
    },
    signup: {
      path: "/signup",
      title: "SignUp",
      name: "signup",
      component: SignUpPage,
    },
    verify: {
      path: "/verify",
      title: "Verify",
      name: "verify",
      component: VerifyPage,
    },
  },
  private: {
    successfull: {
      path: "/successfull",
      title: "Successfull",
      name: "successfull",
      component: SuccessfullPage,
    },
  },
};
