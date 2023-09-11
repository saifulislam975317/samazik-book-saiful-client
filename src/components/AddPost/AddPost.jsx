import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const imageBB_api = import.meta.env.VITE_imageBB_api;
const AddPost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const imageBB_url = `https://api.imgbb.com/1/upload?key=${imageBB_api}`;
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(`${imageBB_url}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const imageURL = imageData.data.display_url;

          const newPost = {
            details: data.details,
            image: imageURL,
          };
          fetch("http://localhost:5000/usersPost", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newPost),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: `your post is publishing successfully.`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };
  return (
    <div className="w-full px-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">write your think*</span>
          </label>
          <textarea
            className="textarea textarea-bordered resize-none h-24"
            {...register("details")}
            placeholder="What's on your mind?"
          ></textarea>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Choose a photo*</span>
          </label>
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered w-full max-w-xs"
          />
          {errors.image && <span> Image is required</span>}
        </div>
        <input className="btn btn-accent mt-2" type="submit" value="Post" />
      </form>
    </div>
  );
};

export default AddPost;