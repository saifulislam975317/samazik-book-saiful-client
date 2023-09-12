import { useLoaderData } from "react-router-dom";

const MediaDetails = () => {
  const postInfo = useLoaderData();
  return (
    <div className="my-12">
      <center>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={postInfo.image} alt="postDetails" />
          </figure>
          <div className="card-body">
            <p>{postInfo.details}</p>
            <p>Total Likes: {postInfo.totalLikes}</p>
          </div>
        </div>
      </center>
    </div>
  );
};

export default MediaDetails;
