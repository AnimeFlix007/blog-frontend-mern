/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useFormik } from "formik"
import loginSchema from '../../utils/schema/loginSchema'
import { Link, useNavigate } from "react-router-dom";
import LoginPoster from "../../images/loginPoster.jfif";
import { userLogin } from "../../context/slice/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const initialValues = {
  email: "",
  password: ""
};

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, user } = useSelector(store => store.users)
  const { handleSubmit, handleBlur, handleChange, errors, values, touched } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, action) => {
      dispatch(userLogin(values))
      action.resetForm();
    }
  })
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  return (
    <div className="container">
      <div className="modal">
        <div className="modal-container" style={{
          flexDirection: 'row-reverse'
        }}>
          <div className="modal-left">
            <h1 className="modal-title">Welcome!</h1>
            <p className="modal-desc">Please LogIn My Dear Anime Fans</p>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
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
              <div className="modal-buttons">
                {!loading ? (
                  <button className="input-button" type="submit">
                    Login
                  </button>
                ) : (
                  <button className="input-button" disabled>
                    Loading..
                  </button>
                )}
              </div>
            </form>
            <p className="sign-up">
              Don't have an account? <Link to={"/register"}>SignUp now</Link>
            </p>
          </div>
          <div className="modal-right">
            <img src={LoginPoster} alt="poster" />
          </div>
        </div>
      </div>
    </div>)
}

export default Login