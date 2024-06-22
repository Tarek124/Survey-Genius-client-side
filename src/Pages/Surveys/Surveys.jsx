import { useState } from "react";
import useAllSurveys from "../../hooks/useAllSurveys";
import { Link } from "react-router-dom";

const Surveys = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const { allSurveys, isLoading } = useAllSurveys();

  const filteredSurveys = allSurveys
    .filter((survey) =>
      selectedCategory
        ? selectedCategory === "ALL Category"
          ? survey
          : survey.category === selectedCategory
        : true
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.votes - b.votes : b.votes - a.votes
    );

  return !isLoading ? (
    <div className="mt-20 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex ">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Category
            </option>
            <option>ALL Category</option>
            <option>Education</option>
            <option>Technology</option>
            <option>Travel</option>
            <option>Entertainment</option>
            <option>Lifestyle</option>
            <option>Environment</option>
            <option>Health</option>
            <option>Automotive</option>
            <option>Business</option>
          </select>
          <button
            className="btn btn-primary md:mx-2 md:my-0 my-3 shadow-md"
            onClick={() =>
              setSortOrder((prevSortOrder) =>
                prevSortOrder === "asc" ? "desc" : "asc"
              )
            }
          >
            Sort by Votes ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>
        <div className="grid  md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
          {filteredSurveys?.map((item) => (
            <Link key={item._id} to={`/details/${item._id}`}>
              <div className="card bg-base-100 shadow-xl h-40">
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p>{item.description}</p>
                  <p>Votes: {item.votes}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen justify-center flex items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Surveys;
