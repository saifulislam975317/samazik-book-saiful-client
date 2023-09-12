import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Modal = ({ refetch, userDetails }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, university, address } = data;
    const updateUser = {
      name,
      university,
      address,
    };

    fetch(`http://localhost:5000/user/${userDetails?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          reset();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "your details have been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="details-modal" className="modal-toggle" />
      <div className="modal pr-14">
        <div className="modal-box relative">
          <label
            htmlFor="details-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center">Update your Details</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Name*</span>
              </label>
              <input
                type="text"
                defaultValue={userDetails.name}
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="input input-bordered w-full "
              />
              {errors.name && <span> Name is required</span>}
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="email"
                defaultValue={userDetails.email}
                {...register("email")}
                placeholder="Enter your email"
                className="input input-bordered w-full "
                disabled
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">University Name*</span>
              </label>
              <input
                type="text"
                defaultValue={userDetails.university}
                {...register("university", { required: true })}
                placeholder="Enter your university name"
                className="input input-bordered w-full "
              />
              {errors.university && <span>University name is required</span>}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Address*</span>
              </label>
              <input
                type="text"
                defaultValue={userDetails.address}
                {...register("address", { required: true })}
                placeholder="type your address"
                className="input input-bordered w-full "
              />
              {errors.address && <span>Address is required</span>}
            </div>

            <input
              className="btn btn-success mt-2 w-full"
              type="submit"
              value="Update Details"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
