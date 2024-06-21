import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useAllSurveys from "../../../hooks/useAllSurveys";

const Comments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { allSurveys } = useAllSurveys();
  const { data = [], isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user/comments?name=${user.displayName}`
      );
      return res.data;
    },
  });

  const newData = data?.map((item) => {
    const filterSurvey = allSurveys.filter(
      (survey) => survey._id === item.surveyId
    );

    const withCmment = data?.map((item) => {
      if (filterSurvey[0]._id === item.surveyId) {
        return { comment: item.comment, time: item.time };
      }
    });
    return { ...filterSurvey[0], comments: withCmment };
  });
  const uniqueSurveys = newData?.filter(
    (survey, index, self) =>
      index === self.findIndex((s) => s._id === survey._id)
  );
  return user && !isLoading ? (
    <div className="p-4">
      <h2 className="text-xl font-semibold lg:m-4">Comment</h2>
      {data.length !== 0 ? (
        <div className="">
          {uniqueSurveys?.map((item) => (
            <div className="my-4" key={item._id}>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <div>
                    {item?.comments?.map((comment, index) => (
                      <div key={index}>
                        {comment?.comment && (
                          <div className="chat chat-start">
                            <div className="chat-header">
                              <time className="text-xs opacity-50">
                                {comment?.time}
                              </time>
                            </div>
                            <div className="chat-bubble">
                              {comment?.comment}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 lg:mx-4 text-lg font-semibold">
          No comment on any survey.
        </p>
      )}
    </div>
  ) : (
    <div className="h-screen justify-center flex items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Comments;
