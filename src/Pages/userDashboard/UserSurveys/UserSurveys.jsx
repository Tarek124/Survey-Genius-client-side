import { Link } from "react-router-dom";
import useAllSurveys from "../../../hooks/useAllSurveys";

const UserSurveys = () => {
  const { allSurveys } = useAllSurveys();

  return (
    <div className="p-4 bg-purple-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid  md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
          {allSurveys?.map((item) => (
            <Link key={item._id} to={`/details/${item._id}`}>
              <div className="card bg-base-100 shadow-xl min-h-40">
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
  );
};

export default UserSurveys;
