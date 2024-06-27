import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAllSurveys from "../../../hooks/useAllSurveys";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import toast, { Toaster } from "react-hot-toast";

const PublishUnpublishSurveys = () => {
  const axiosSecure = useAxiosSecure();
  const {
    allSurveys,
    refetch,
    isLoading: allSurveyIsLoading,
  } = useAllSurveys();
  const {
    data: unpublish = [],
    refetch: unpublishedRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["unpublish"],
    queryFn: async () => {
      const res = await axiosSecure.get("/unpublished");
      return res.data;
    },
  });
  const handleSurveys = (obj) => {
    Confirm.show(
      `Are you sure to ${obj.condition}`,
      "you can't undo it!",
      "Yes",
      "No",
      () => {
        toast.promise(
          axiosSecure.post("/handleSurveys", obj).then((res) => {
            if (res?.data?.deletedCount) {
              refetch();
              unpublishedRefetch();
            }
          }),
          {
            loading: `${obj.condition}ing...`,
            success: <b>{obj.condition}</b>,
            error: <b>Could not {obj.condition}.</b>,
          }
        );
      },
      () => {},
      {}
    );
  };
  return (
    <div className="sm:p-4 p-2">
      <div className="border border-[#7f7e7f38] p-4 sm:p-8 rounded">
        <h1 className="sm:text-xl font-bold mb-4">Publish Surveys</h1>
        {!allSurveyIsLoading ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra sm:table-lg table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Total Votes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {allSurveys?.map((survey, inx) => (
                  <tr key={inx}>
                    <th>{inx + 1}</th>
                    <td>{survey.title}</td>
                    <td>{survey.category}</td>
                    <td>{survey.votes}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        onClick={() =>
                          handleSurveys({
                            id: survey._id,
                            condition: "unpublish",
                          })
                        }
                      >
                        unpublish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-screen justify-center flex items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>{" "}
      <div className="my-12 border border-[#7f7e7f38] p-4 sm:p-8 rounded">
        <h1 className="sm:text-xl font-bold mb-4">Unpublish Surveys</h1>
        {!isLoading ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra sm:table-lg table-xs">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Total Votes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {unpublish?.map((survey, inx) => (
                  <tr key={inx}>
                    <th>{inx + 1}</th>
                    <td>{survey.title}</td>
                    <td>{survey.category}</td>
                    <td>{survey.votes}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleSurveys({
                            id: survey._id,
                            condition: "publish",
                          })
                        }
                        className="btn btn-sm"
                      >
                        publish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Toaster position="top-center" reverseOrder={false} />
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

export default PublishUnpublishSurveys;
