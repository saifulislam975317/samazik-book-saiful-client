import { useQuery } from "@tanstack/react-query";

const Media = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ["UsersPosts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/usersPost");
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-16">
      {posts.map((post) => (
        <div
          key={post._id}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <img src={post.image} alt="post" />
          </figure>
          <div className="card-body">
            <p>{post.details}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Media;
