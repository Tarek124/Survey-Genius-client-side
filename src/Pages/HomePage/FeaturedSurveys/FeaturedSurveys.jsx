import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import image from "../../../../public/icons/popular.png";

const FeaturedSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ["featuresSurveys"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/most-voted-surveys");
      return res.data;
    },
  });
  console.log(data);
  return (
    <div>
      <div className="max-w-7xl mx-auto sm:py-20 sm:border sm:border-[#7f7e7f38] my-4 sm:my-10 rounded  px-7 sm:px-10">
        <div className="flex justify-center items-center my-4 gap-1">
          <img className="w-16 md:w-20" src={image} alt="" />
          <h1 className="text-3xl md:text-4xl font-semibold">
            Most Voted Surveys
          </h1>
        </div>

        {!isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:p-4">
            {data?.map((item) => (
              <Link
                data-aos="zoom-in"
                key={item._id}
                to={`/details/${item._id}`}
              >
                <div className="card md:w-96 bg-base-100 shadow hover:shadow-lg transition-shadow border border-[#7f7e7f38]">
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

export default FeaturedSurveys;
