import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const useSingleUser = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const { isLoading, refetch } = useQuery([token], () => {
    async function getUser() {
      if (!token) {
        return;
      } else {
        await axios
          .get(
            "https://classic-server-jk7f.onrender.com/api/user/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
            {
              refetchInterval: 6000,
            }
          )
          .then((data) => setUser(data?.data?.data))
          .catch((err) => {});
      }
    }
    getUser();
  });
  return [user, refetch, isLoading];
};
export default useSingleUser;
