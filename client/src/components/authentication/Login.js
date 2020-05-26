import React, { useState } from "react";
import { Alert } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { loginMutation } from "../queries/User";
import { Form } from "semantic-ui-react";
import PreloaderFile from "../basic/PreloaderFile";
const Login = () => {
  const [msg, setmsg] = useState(null);
  const [loader, setloader] = useState(null);
  const [login] = useMutation(loginMutation, {
    update(_, result) {
      localStorage.setItem("user", JSON.stringify(result.data.login));
      window.location = "/";
    },
    onError(er) {
      setmsg(er.graphQLErrors[0].extensions.errors.msg);
      setloader(false);
    },
  });
  const handleSub = async (e) => {
    e.preventDefault();
    const userName = e.target.elements.userName.value;
    const password = e.target.elements.password.value;
    setloader(true);
    setmsg(null);
    await login({
      variables: { userName, password },
    });
  };
  return (
    <div className="bg-dark py-5 h-100">
      <div className="container pb-5 pt-2 h-100">
        {loader ? (
          <div className="d-flex justify-content-center align-items-center mt-3 mb-5">
            <PreloaderFile />
          </div>
        ) : (
          <h6 className="text-center white-text pb-5 pt-5 text-muted ">
            مشخصات خود را به منظور ورود وارد کنید
          </h6>
        )}

        {msg && (
          <Alert className="text-center mb-4" color="danger">
            {msg}
          </Alert>
        )}
        <div className="row pb-5 ">
          <div className=" col-12 col-sm-10 col-md-8 col-lg-6 mx-auto pb-5">
            <Form className="pb-5" onSubmit={handleSub}>
              <div className="container mx-auto">
                <div className="row">
                  <input
                    type="text"
                    className="validate text-center w-50 mx-auto"
                    name="userName"
                    placeholder="نام کاربری"
                    required
                  />
                </div>

                <div className="row">
                  <input
                    type="password"
                    className="validate text-center w-75 mx-auto"
                    name="password"
                    placeholder=" رمز ورود"
                    required
                  />
                </div>

                <div className="row d-flex flex-row justify-content-between container  mx-auto">
                  <button
                    type="submit"
                    className="btn-small teal darken-2 my-5"
                  >
                    ورود
                  </button>
                  <a href="/" className="btn-small pink accent-3 my-5">
                    بازگشت
                  </a>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
