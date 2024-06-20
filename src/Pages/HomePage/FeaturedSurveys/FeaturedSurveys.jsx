import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const FeaturedSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["featuresSurveys"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/most-voted-surveys");
      return res.data;
    },
  });
  console.log(data)
  return (
    <div className="bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto py-20 ">
        <h1 className="my-6 mx-4 text-4xl font-semibold">Most Voted Surveys</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
          {data?.map((item) => (
            <Link key={item._id} to={`/details/${item._id}`}>
              <div className="card w-96 bg-base-100 shadow-xl">
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
      </div>
    </div>
  );
};

export default FeaturedSurveys;