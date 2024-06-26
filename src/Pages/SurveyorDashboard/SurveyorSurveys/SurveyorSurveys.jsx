import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import NotFoundPage from "../../../components/NotFoundPage/NotFoundPage";
import useAuth from "../../../hooks/useAuth";
const SurveyorSurveys = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["updated"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/surveyor/allSurvey?email=${user.email}`
      );
      return res.data;
    },
  });
  console.log(data);
  if (isError) {
    return <NotFoundPage />;
  }
  return !isLoading ? (
    <div className="p-4">
      <div className="shadow-lg p-8 rounded mb-10 border border-[#7f7e7f38]">
        <h1 className="text-xl font-bold">Created Survey</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th> <th>Survey ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Votes</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {data?.created?.map((survey, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{survey._id}</td>
                  <td>{survey.title}</td>
                  <td>{survey.category}</td>
                  <td>{survey.votes}</td>
                  <td>{survey.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
      <div className="shadow-lg p-8 rounded border border-[#7f7e7f38]">
        <h1 className="text-xl font-bold">Updated Survey</h1>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th> <th>Survey ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Votes</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {data?.updated?.map((survey, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{survey._id}</td>
                  <td>{survey.title}</td>
                  <td>{survey.category}</td>
                  <td>{survey.votes}</td>
                  <td>{survey.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen justify-center flex items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default SurveyorSurveys;
