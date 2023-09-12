import { useQuery } from "@tanstack/react-query";

const usePost = () => {
  const { data: posts = [], refetch } = useQuery({
    queryKey: ["UsersPosts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/usersPost");
      const data = await res.json();
      return data;
    },
  });

  return [posts, refetch];
};

export default usePost;
