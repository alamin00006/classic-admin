import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const useAllUser = () => {
  const [allUser, setAllUser] = useState([]);

  const { isLoading, refetch } = useQuery([], () => {
    async function getAllUser() {
      await axios
        .get("https://classic-server-jk7f.onrender.com/api/user")
        .then((data) => setAllUser(data))
        .catch((err) => {
          console.log(err);
        });
    }
    getAllUser();
  });
  return [allUser, refetch, isLoading];
};
export default useAllUser;
