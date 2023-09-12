import { useContext, useState } from "react";
import { AuthContext } from "../../ContextProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login/login.avif";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const [email, setEmail] = useState("");

  const { logIn, forgotPassword } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (data) => {
    logIn(data.email, data.password)
      .then((loggedInUser) => {
        const user = loggedInUser.user;
        navigate(from, { replace: true });
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      return alert("please input your email in input field.");
    }
    forgotPassword(email)
      .then(() => {
        alert(
          "password reset email has been sent your email. please check your email"
        );
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="hero  bg-base-200">
      <div className="hero-content flex-col gap-24 p-8 my-8 lg:flex-row">
        <div className="text-center lg:text-left">
          <img src={loginImg} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold mt-4 text-center">Login </h1>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="card-body mb-0 pb-0"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                onBlur={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter password"
                className="input input-bordered"
                required
              />

              {error && (
                <span className="text-red-500">Invalid email or password</span>
              )}
            </div>
            <div className="form-control mt-2">
              <input className="btn btn-info" type="submit" value="login" />
            </div>
          </form>
          <button
            onClick={handleForgotPassword}
            className=" text-orange-600 ml-4 link w-2/5"
          >
            Forgot password?
          </button>
          <p className="text-center mt-2">
            Don't have an account?
            <Link className="text-green-500 ml-2" to="/register">
              Register
            </Link>
          </p>
          <div className="divider">OR</div>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
