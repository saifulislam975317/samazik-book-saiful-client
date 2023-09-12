import { useContext, useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { AuthContext } from "../../ContextProvider/AuthProvider";
const Media = () => {
  const [posts, refetch] = usePost();
  const { user } = useContext(AuthContext);

  // Create an array to store the like state for each post
  const [likes, setLikes] = useState(Array(posts?.length).fill(false));

  // Create an array to store the likes count for each post
  const [likesCount, setLikesCount] = useState(
    Array.from({ length: posts.length }, () => 0)
  );

  useEffect(() => {
    // Ensure likes and likesCount are updated when posts changes
    setLikes(posts.map(() => false));
    setLikesCount(Array.from({ length: posts.length }, () => 0));
  }, [posts]);

  const handleLike = (id, index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);

    const newLikesCount = [...likesCount];
    newLikesCount[index] = newLikes[index]
      ? newLikesCount[index] + 1
      : newLikesCount[index] - 1;
    setLikesCount(newLikesCount);
    const newLike = {
      countLikes: newLikesCount[index],
    };
    fetch(`http://localhost:5000/usersPost/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newLike),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          console.log("success");
        }
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4"> News Feed</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-12">
        {posts.map((post, index) => (
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

              <span>Likes: {post.totalLikes}</span>
              {likes[index] ? (
                <BiSolidLike
                  onClick={() => handleLike(post._id, index)}
                  className="text-3xl text-blue-400 cursor-pointer"
                ></BiSolidLike>
              ) : (
                <BiSolidLike
                  onClick={() => handleLike(post._id, index)}
                  className="text-3xl cursor-pointer"
                ></BiSolidLike>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
