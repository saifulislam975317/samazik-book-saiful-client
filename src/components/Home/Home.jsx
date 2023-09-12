import AddPost from "../AddPost/AddPost";
import Media from "../Media/Media";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AddPost></AddPost>
      <Media></Media>
    </div>
  );
};

export default Home;
