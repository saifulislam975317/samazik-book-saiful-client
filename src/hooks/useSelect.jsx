import { useContext } from "react";
import { AuthContext } from "../ContextProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useSelect = () => {
  const { user } = useContext(AuthContext);
  const { data: selects = [], refetch } = useQuery({
    queryKey: ["selected", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/selected/${user?.email}`);
      const data = await res.json();
      return data;
    },
  });
  return [selects, refetch];
};

export default useSelect;
