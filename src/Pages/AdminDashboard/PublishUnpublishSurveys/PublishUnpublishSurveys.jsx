import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAllSurveys from "../../../hooks/useAllSurveys";
import Swal from "sweetalert2";

const PublishUnpublishSurveys = () => {
  const axiosSecure = useAxiosSecure();
  const { allSurveys, refetch } = useAllSurveys();
  const { data: unpublish = [], refetch: unpublishedRefetch } = useQuery({
    queryKey: ["unpublish"],
    queryFn: async () => {
      const res = await axiosSecure.get("/unpublished");
      return res.data;
    },
  });
  const handleSurveys = (obj) => {
    Swal.fire({
      title: `Are you sure to ${obj.condition}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${obj.condition}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/handleSurveys", obj).then((res) => {
          if (res?.data?.deletedCount) {
            Swal.fire({
              title: `${obj.condition}!`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
            unpublishedRefetch();
          }
        });
      }
    });
  };
  return (
    <div className="p-4">
      <div>
        <h1 className="text-xl font-bold">Publish Surveys</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
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
                      className="btn btn-sm bg-green-300"
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
      </div>{" "}
      <div className="my-12">
        <h1 className="text-xl font-bold">Unpublish Surveys</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
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
                        handleSurveys({ id: survey._id, condition: "publish" })
                      }
                      className="btn btn-sm bg-orange-300"
                    >
                      publish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PublishUnpublishSurveys;
