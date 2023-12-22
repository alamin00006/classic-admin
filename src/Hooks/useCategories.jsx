import { useQuery } from "react-query";

const useCategories = () => {
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery([], () =>
    fetch("https://book-collection-server.vercel.app/api/v1/category", {
      method: "GET",
    }).then((res) => res.json())
  );

  return [categories, refetch, isLoading];
};

export default useCategories;
