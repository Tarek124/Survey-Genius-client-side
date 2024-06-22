import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: allSurveys = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allSurveys"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allsurveys");
      return res.data;
    },
  });
  return { allSurveys, refetch, isLoading };
};

export default useAllSurveys;
