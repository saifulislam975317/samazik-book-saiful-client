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
  const [commentTexts, setCommentTexts] = useState({});

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

  const handleComment = async (postId) => {
    try {
      // Get the comment text for the specific post
      const commentText = commentTexts[postId] || "";

      if (!commentText.trim()) {
        // Don't send empty comments
        return;
      }

      // Send the comment to the server
      const response = await fetch(`http://localhost:5000/comment/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (response.ok) {
        // Update the UI by adding the comment to the post
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...(post.comments || []), commentText],
            };
          }
          return post;
        });

        setPosts(updatedPosts);

        // Clear the comment text for the specific post
        setCommentTexts((prevCommentTexts) => ({
          ...prevCommentTexts,
          [postId]: "",
        }));

        console.log("Comment added successfully");
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error(error);
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

                <input
                  className="border w-[150px] input input-sm input-bordered"
                  type="text"
                  placeholder="Add a comment"
                  value={commentTexts[post._id] || ""}
                  onChange={(e) =>
                    setCommentTexts({
                      ...commentTexts,
                      [post._id]: e.target.value,
                    })
                  }
                />

                <button
                  type="submit"
                  onClick={() => handleComment(post._id)}
                  className="btn btn-sm "
                >
                  send
                </button>

                <button
                  onClick={() => handleSelect(post)}
                  className="btn btn-sm btn-neutral"
                >
                  select
                </button>
              </div>
              <p className="ml-24">{post.totalComments}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
