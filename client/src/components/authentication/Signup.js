import React, { useState } from "react";
import { Alert } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { signupMutation } from "../queries/User";
import PreloaderFile from "../basic/PreloaderFile";
const Signup = () => {
  const [msg, setmsg] = useState(null);
  const [loader, setloader] = useState(false);
  const [signup] = useMutation(signupMutation, {
    update(proxy, result) {
      localStorage.setItem("user", JSON.stringify(result.data.signup));
      window.location = "/";
    },
    onError(err) {
      setmsg(err.graphQLErrors[0].extensions.errors.msg);
      setloader(false);
    },
  });
  const handleSub = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const lastName = e.target.elements.lastName.value;
    const userName = e.target.elements.userName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const password1 = e.target.elements.password1.value;
    if (password === password1) {
      setloader(true);
      setmsg(null);
      await signup({
        variables: { name, lastName, userName, email, password },
      });
    } else {
      setmsg("رمز های وارد شده با هم مطابق نیستند");
    }
  };
  return (
    <div className="bg-dark py-5">
      <div className="container pb-5 pt-2">
        {loader ? (
          <div className="d-flex justify-content-center align-items-center mt-3 mb-5">
            <PreloaderFile />
          </div>
        ) : (
          <h6 className="text-center white-text pb-4 text-muted ">
            مشخصات خود را به منظور ثبت نام وارد کنید
          </h6>
        )}

        {msg && (
          <Alert className="text-center" color="danger">
            {msg}
          </Alert>
        )}
        <div className="row pb-5 ">
          <div className=" col-12 col-sm-10 col-md-8 col-lg-6 mx-auto ">
            <form onSubmit={handleSub}>
              <div className="container mx-auto">
                <div className="row">
                  <input
                    type="text"
                    className="validate text-center w-50 mx-auto"
                    name="name"
                    placeholder="نام"
                    required
                  />
                </div>
                <div className="row">
                  <input
                    type="text"
                    className="validate text-center w-50 mx-auto"
                    name="lastName"
                    placeholder="نام خانوادگی"
                    required
                  />
                </div>
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
                    type="email"
                    className="validate text-center w-75 mx-auto"
                    name="email"
                    placeholder="ایمیل "
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
                <div className="row">
                  <input
                    type="password"
                    className="validate text-center w-75 mx-auto"
                    name="password1"
                    placeholder=" تایید رمز ورود"
                    required
                  />
                </div>
                <div className="row d-flex flex-row justify-content-around container mx-auto">
                  <div>
                    <button
                      type="submit"
                      className="btn-small teal darken-2 my-4"
                    >
                      ثبت نام
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn-small pink accent-3 my-4"
                    >
                      بازگشت
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
