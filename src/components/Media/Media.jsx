import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
const Media = () => {
  const { data: posts = [], refetch } = useQuery({
    queryKey: ["UsersPosts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/usersPost");
      const data = await res.json();
      return data;
    },
  });

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
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-16">
      {posts.map((post, index) => (
        <div
          key={post._id}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <img src={post.image} alt="post" />
          </figure>
          <div className="card-body">
            <p>{post.details}</p>
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
  );
};

export default Media;
