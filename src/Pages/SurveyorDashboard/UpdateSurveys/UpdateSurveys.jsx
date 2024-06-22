import { Link } from "react-router-dom";
import useAllSurveys from "../../../hooks/useAllSurveys";

const UpdateSurveys = () => {
  const { allSurveys, isLoading } = useAllSurveys();
  console.log(allSurveys);
  return !isLoading ? (
    <div>
      <div className="overflow-x-auto p-4">
        <table className="table">
          <thead>
            <tr>
              <th></th> <th>Survey ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Votes</th>
              <th>Deadline</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allSurveys?.map((survey, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{survey._id}</td>
                <td>{survey.title}</td>
                <td>{survey.category}</td>
                <td>{survey.votes}</td>
                <td>{survey.deadline}</td>
                <td>
                  <Link
                    to={`/dashboard/surveyor/update/${survey._id}`}
                    className="btn bg-cyan-300"
                  >
                    update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="h-screen justify-center flex items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default UpdateSurveys;
