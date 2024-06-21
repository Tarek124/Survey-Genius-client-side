import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { IoPaperPlaneSharp } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SurveyDetail = () => {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const { userRole, user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: survey = [], refetch } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      if (user.email) {
        const res = await axiosPublic.get(
          `/detail?email=${user?.email}&id=${id}`
        );
        return res.data;
      }
    },
  });
  const { data: comments = [], refetch: commentsRefetch } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments?id=${id}`);
      return res.data;
    },
  });

  const handleSubmit = () => {
    if (!user) {
      navigate("/login");
    }
    if (selectedOption !== null) {
      const totalVotes = survey.votes + 1;
      const optionVote = survey?.options.map((item, inx) => {
        if (inx === selectedOption) {
          item.votes += 1;
        }
        return item;
      });
      const data = {
        surveyId: id,
        userEmail: user.email,
        optionVote,
        totalVotes,
      };
      axiosSecure.post("/submitVote", data).then((res) => {
        console.log(res.data);
        refetch();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Select a option",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    if (comment.length === 0) {
      return alert("Please enter a comment");
    }
    const commentData = {
      name: user.displayName,
      image: user.photoURL,
      comment,
      time: moment().format("llll"),
      surveyId: id,
    };
    axiosPublic.post("/comment", commentData).then((res) => {
      if (res.data?.insertedId) {
        commentsRefetch();
        e.target.reset();
      }
    });
    console.log(commentData);
  };

  const data = survey?.options?.map((option) => {
    return { name: option.option, votes: option.votes };
  });

  // report related
  const [reportReason, setReportReason] = useState("");
  const buttonRef = useRef(null);

  const handleReportSubmit = async () => {
    axiosPublic
      .post("/report", {
        surveyId: survey._id,
        reason: reportReason,
        email: user.email,
        title: survey.title,
        description: survey.description,
      })
      .then((res) => {
        console.log(res.data);
        if (res?.data?.insertedId) {
          buttonRef.current.click();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "survey reported successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="bg-purple-300 flex justify-center items-center h-screen">
      {user && survey.length !== 0 ? (
        <div className="lg:w-1/2 px-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body lg:p-8 p-4">
              <h2 className="card-title">{survey?.title}:</h2>
              <p className="font-medium">{survey?.description}</p>
              <p>Votes: {survey?.votes}</p>
              <div>
                {survey?.options?.map((option, inx) => (
                  <div className="form-control" key={inx}>
                    <label className="label cursor-pointer">
                      <span className="label-text">{option.option}</span>
                      <input
                        type="radio"
                        name="survey-option"
                        required
                        checked={selectedOption === inx}
                        onChange={() => setSelectedOption(inx)}
                        className="radio"
                      />
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-start flex-wrap gap-4 mt-3">
                {survey?.voted ? (
                  <p disabled className="btn btn-sm text-slate-500">
                    Voted
                  </p>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="btn w-32 btn-info text-white shadow-md mt-4"
                  >
                    Submit
                  </button>
                )}
                <p
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="btn btn-sm text-slate-500"
                >
                  {comments?.length} comments
                </p>
                {survey?.voted ? (
                  <p
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                    className="btn btn-sm text-slate-500"
                  >
                    View Result{" "}
                  </p>
                ) : (
                  ""
                )}
                <p
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                  className="btn btn-sm text-red-600 underline"
                >
                  report
                </p>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">comments</h3>
                    <div className="h-[70vh] flex flex-col justify-end">
                      {/* add comment here */}
                      <div className="overflow-y-auto">
                        {comments.map((comment) => (
                          <div key={comment?._id} className="chat chat-start">
                            <div className="chat-image avatar">
                              <div className="w-10 rounded-full">
                                <img
                                  alt="Tailwind CSS chat bubble component"
                                  src={comment?.image}
                                />
                              </div>
                            </div>
                            <div className="chat-header">
                              <time className="text-xs opacity-50">
                                {comment?.time}
                              </time>
                            </div>
                            <div className="chat-bubble">
                              <div className="font-semibold text-sm text-[#f2f2f2c4]">
                                {comment?.name}
                              </div>
                              {comment?.comment}
                            </div>
                          </div>
                        ))}
                      </div>
                      <form
                        onSubmit={handleSubmitComment}
                        className="join w-full mt-4"
                      >
                        <input
                          name="comment"
                          className="bg-[#f5f4f4fb] w-full outline-none px-4 rounded-l-md"
                          placeholder="Write a comment..."
                        />
                        <button
                          disabled={userRole !== "pro-user"}
                          className="btn join-item"
                        >
                          <IoPaperPlaneSharp />
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <dialog id="my_modal_4" className="modal">
                  <div className="modal-box lg:p-4 p-2">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Result</h3>
                    <div className="h-[50vh] flex flex-col justify-end">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          width={500}
                          height={400}
                          data={data}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="votes"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </dialog>
                <dialog id="my_modal_5" className="modal">
                  <div className="modal-box lg:p-4 p-2">
                    <form method="dialog">
                      <button
                        ref={buttonRef}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">report</h3>
                    <div className="flex flex-col justify-end">
                      <textarea
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        placeholder="Describe why you are reporting this survey"
                        className="textarea border shadow-md w-full bg-[#f1f0f0]"
                      />
                      <button
                        onClick={handleReportSubmit}
                        className="btn bg-lime-300 mt-4 "
                      >
                        Submit Report
                      </button>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span className="loading loading-spinner loading-lg" />
      )}
    </div>
  );
};

export default SurveyDetail;
