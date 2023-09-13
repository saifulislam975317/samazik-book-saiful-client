import { useContext, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { AuthContext } from "../../ContextProvider/AuthProvider";
import Swal from "sweetalert2";
import useSelect from "../../hooks/useSelect";
const Media = () => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useSelect();
  const [posts, setPosts] = usePost();
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLike = async (id) => {
    try {
      const likedPost = posts.find((post) => post._id === id);
      if (!likedPost) {
        console.error("Invalid likedPost:", likedPost);
        return;
      }
      const currentLikesCount = likedPost.totalLikes || 0;
      const updatedLikesCount =
        currentLikesCount + (likedPosts.includes(id) ? -1 : 1);
      if (isNaN(updatedLikesCount)) {
        console.error("Invalid likesCount:", updatedLikesCount);
        return;
      }

      const response = await fetch(`http://localhost:5000/usersPost/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likesCount: updatedLikesCount }),
      });

      if (response.ok) {
        const updatedPosts = posts.map((post) => {
          if (post._id === id) {
            return { ...post, totalLikes: updatedLikesCount };
          }
          return post;
        });

        if (likedPosts.includes(id)) {
          setLikedPosts(likedPosts.filter((postId) => postId !== id));
        } else {
          setLikedPosts([...likedPosts, id]);
        }
        setPosts(updatedPosts);

        console.log("success");
      } else {
        console.error("Failed to update likes count");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (post) => {
    const { _id, image, details, totalLikes } = post;
    const selectedItems = {
      selectedId: _id,
      email: user?.email,
      image,
      totalLikes,
      details,
    };
    if (user && user.email) {
      fetch("http://localhost:5000/selected", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedItems),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "your item has been selected",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "without login, you can't select",
        text: "You have to login first",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to login",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Thank you!");
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4"> News Feed</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-12">
        {posts.map((post) => (
          <div
            key={post._id}
            className="card card-compact w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-[400px] h-[300px]"
                src={post.image}
                alt="post"
              />
            </figure>
            <div className="card-body">
              {post.details.length > 40 ? (
                <p>
                  {post.details.slice(0, 40) + "..."}
                  <Link
                    className="text-black text-lg"
                    to={user ? `/details/${post._id}` : "/login"}
                  >
                    Details
                  </Link>
                </p>
              ) : (
                <p>{post.details}</p>
              )}

              <span>Likes:{post.totalLikes || 0}</span>

              <div className="flex justify-between items-center">
                <BiSolidLike
                  onClick={() => handleLike(post._id)}
                  className={`text-3xl cursor-pointer ${
                    likedPosts.includes(post._id) ? "text-blue-400" : ""
                  }`}
                ></BiSolidLike>
                <button
                  onClick={() => handleSelect(post)}
                  className="btn btn-sm btn-neutral"
                >
                  {" "}
                  select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;

/*

const [likedPosts, setLikedPosts] = useState([]);
  const [likesCount, setLikesCount] = useState({});

  const handleLike = (id) => {
    // Step 2: Toggle like for the post with the given id
    if (likedPosts.includes(id)) {
      // Unlike the post
      const newLikedPosts = likedPosts.filter((postId) => postId !== id);
      setLikedPosts(newLikedPosts);

      // Update the like count for the post
      setLikesCount((prevLikesCount) => ({
        ...prevLikesCount,
        [id]: (prevLikesCount[id] || 0) - 1,
      }));
    } else {
      // Like the post
      const newLikedPosts = [...likedPosts, id];
      setLikedPosts(newLikedPosts);

      // Update the like count for the post
      setLikesCount((prevLikesCount) => ({
        ...prevLikesCount,
        [id]: (prevLikesCount[id] || 0) + 1,
      }));
    }
  };
*/
