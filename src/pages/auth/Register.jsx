/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "../../css/register.css";
import RegisterPoster from "../../images/registerPoster.jfif";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import signUpSchema from "../../utils/schema/signUpSchema";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../context/slice/user/userSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [navi, setNavi] = useState(false)
  const { loading, registered } = useSelector((store) => store.users);
  // console.log(user, error.message);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async({ confirm_password, ...values }, action) => {
        console.log('submitted');
        setNavi(true)
        await dispatch(registerUserAction(values));
        action.resetForm();
      },
    });

  useEffect(() => {
    if (registered && navi) {
      setNavi(false)
      navigate("/login")
    }
  }, [registered, navi])

  return (
    <div className="container">
      <div className="modal">
        <div className="modal-container">
          <div className="modal-left">
            <h1 className="modal-title">Welcome!</h1>
            <p className="modal-desc">Please Register My Anime Fans.</p>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="firstName" className="input-label">
                  First Name
                </label>
                <input
                  type="name"
                  autoComplete="off"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName ? (
                  <p className="form-error">{errors.firstName}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="lastName" className="input-label">
                  Last Name
                </label>
                <input
                  type="name"
                  autoComplete="off"
                  name="lastName"
                  id="lastName"
                  placeholder="First Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName ? (
                  <p className="form-error">{errors.lastName}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="confirm_password" className="input-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="form-error">{errors.confirm_password}</p>
                ) : null}
              </div>
              <div className="modal-buttons">
                {!loading ? (
                  <button className="input-button" type="submit">
                    Registration
                  </button>
                ) : (
                  <button className="input-button" disable="true">
                    Loading..
                  </button>
                )}
              </div>
            </form>
            <p className="sign-up">
              Already have an account? <Link to={"/login"}>LogIn Now</Link>
            </p>
          </div>
          <div className="modal-right">
            <img src={RegisterPoster} alt="poster" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
