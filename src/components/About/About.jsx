import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../ContextProvider/AuthProvider";
import Modal from "../Modal/Modal";

const About = () => {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const { data: userInfo = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/user/${user?.email}`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="card w-96 mx-auto bg-base-100 shadow-xl my-12">
      <Modal refetch={refetch} userDetails={userDetails}></Modal>
      <div className="card-body ">
        <div className="card-actions justify-end">
          <label
            onClick={() => setUserDetails(userInfo)}
            htmlFor="details-modal"
            className="btn bg-slate-600 text-white"
          >
            Edit
          </label>
        </div>
        <div>
          <h1 className="text-2xl font-bold underline">User details:</h1>
        </div>
        <h1 className="text-lg ">Name: {userInfo.name}</h1>
        <h2>Email: {userInfo.email}</h2>
        <h3>University: {userInfo?.university}</h3>
        <p>Address: {userInfo?.address}</p>
      </div>
    </div>
  );
};

export default About;
