import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col"></div>
        <div className="col mx-5 text-center">
          <form className="my-4">
            <h1>Sign In</h1>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label for="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
              />
            </div>

            <button
              onClick={(e) => e.preventDefault()}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
            <p className="my-3">
              Already have an account? <Link to="/signIn">Sign In</Link>
            </p>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default SignUp;
