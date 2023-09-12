import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../ContextProvider/AuthProvider";
import registerImg from "../../assets/register/register.avif";

const Register = () => {
  const navigate = useNavigate();
  const { registration, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("data", data);
    registration(data.email, data.password).then((userInfo) => {
      const user = userInfo.user;
      updateUserProfile(data.name).then(() => {
        const saveUser = {
          name: data.name,
          university: data.university,
          address: data.address,
          email: data.email,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
      });
      console.log(user);
    });
  };
  return (
    <div className="hero  ">
      <div className="hero-content flex-col gap-24 p-4 my-4 lg:flex-row">
        <div className="text-center lg:text-left">
          <img src={registerImg} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-5xl font-bold text-center mt-4">Register Now!</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">University Name</span>
              </label>
              <input
                {...register("university")}
                type="text"
                placeholder="Enter your university name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Address</span>
              </label>
              <input
                {...register("address")}
                type="text"
                placeholder="Enter your address"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "password should be at least 6 characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      "Password must be Uppercase,lowercase, special characters, and numbers ",
                  },
                })}
                placeholder="Enter password"
                className="input input-bordered"
                required
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-info" type="submit" value="register" />
            </div>
          </form>
          <p className="text-center">
            Already have an account?
            <Link className="text-green-500 ml-2" to="/login">
              Login
            </Link>
          </p>
          <div className="divider">OR</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
