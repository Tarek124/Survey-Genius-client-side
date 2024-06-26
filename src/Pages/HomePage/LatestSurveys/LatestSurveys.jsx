import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const LatestSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["LatestSurveys"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/latest-surveys");
      return res.data;
    },
  });
  return (
    <div>
      <div className="max-w-7xl mx-auto sm:py-20 sm:border sm:border-[#7f7e7f38] rounded sm:my-10 px-7 sm:px-10">
        <h1 className="my-6 mx-4 sm:text-4xl font-semibold">Latest Surveys</h1>
        {!isLoading ? (
          <div className="sm:p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data?.map((item) => (
              <Link
                key={item._id}
                to={`/details/${item._id}`}
                data-aos="zoom-in"
              >
                <div className="card md:w-96 bg-base-100 shadow-xl border-[#7f7e7f38] border">
                  <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.description}</p>
                    <p>Votes: {item.votes}</p>
                    <p>Deadline: {item.deadline}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="h-screen justify-center flex items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestSurveys;
