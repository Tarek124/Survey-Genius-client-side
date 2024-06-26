import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentAndSurveysResponses = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["payment", "votes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/votesAndPayments");
      return res.data;
    },
  });
  console.log(data);
  return !isLoading ? (
    <div className="">
      <div className="mx-4 shadow-lg my-10 border  border-[#7f7e7f38] p-8 rounded">
        <h1 className="text-xl font-bold mb-6">Payments</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Email</th>
                <th>Transaction Id</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.payments?.map((payment, inx) => (
                <tr key={payment._id}>
                  <th>{inx + 1}</th>
                  <td>{payment?.email}</td>
                  <td>{payment?.transactionId}</td>
                  <td>{payment?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
      <div className="mx-4 shadow-lg border border-[#7f7e7f38] p-8 rounded">
        <h1 className="text-xl font-bold mb-6">Survey Responses</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Email</th>
                <th>Title</th>
                <th>response</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data?.votes?.map((vote, inx) => (
                <tr key={vote._id}>
                  <th>{inx + 1}</th>
                  <td>{vote?.userEmail}</td>
                  <td>{vote?.title}</td>
                  <td>{vote?.response}</td>
                  <td>{vote?.time}</td>
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

export default PaymentAndSurveysResponses;
