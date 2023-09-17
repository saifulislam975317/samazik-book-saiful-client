import { useContext } from "react";
import { AuthContext } from "../ContextProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useSelect = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: selects = [], refetch } = useQuery({
    queryKey: ["selected", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/selected/${user?.email}`);
      const data = await res.json();
      return data;
    },
  });
  return [selects, refetch];
};

export default useSelect;
