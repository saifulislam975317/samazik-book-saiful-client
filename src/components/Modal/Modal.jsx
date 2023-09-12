const Modal = ({ userDetails }) => {
  console.log("userDetails", userDetails);
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
          <form className="grid gap-2 grid-cols-1 mt-5">
            <input
              type="text"
              name="name"
              defaultValue={userDetails.name}
              placeholder="Enter your name"
              className="input input-bordered w-full "
            />
            <input
              type="email"
              name="email"
              defaultValue={userDetails.email}
              placeholder="Enter your email"
              className="input input-bordered w-full "
              required
            />
            <input
              type="text"
              name="university"
              defaultValue={userDetails.university}
              placeholder="Enter your university name"
              className="input input-bordered w-full "
            />
            <input
              type="text"
              name="address"
              defaultValue={userDetails.address}
              placeholder="Enter your address"
              className="input input-bordered w-full "
              required
            />

            <br />
            <input
              className="btn btn-info w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
