import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const MyReports = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      if (user.email) {
        const res = await axiosPublic.get(`/reports?email=${user.email}`);
        return res.data;
      }
    },
  });
  console.log(data);
  return user ? (
    <div className="p-4 bg-emerald-200 h-screen">
      <h1 className="lg:m-4 text-2xl font-bold">Reports</h1>
      {data?.length !== 0 ? (
        <div className="my-4">
          {data?.map((report) => (
            <div
              key={report._id}
              className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{report.title}</div>
                <p className="text-gray-700 text-base mb-4">
                  {report.description}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Reason for Report:</strong> {report.reason}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Survey ID:</strong> {report.surveyId}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 lg:mx-4 text-lg font-semibold">
          You have not reported any survey yet.
        </p>
      )}
    </div>
  ) : (
    <div className="h-screen justify-center flex items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default MyReports;
