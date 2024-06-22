import { useForm } from "react-hook-form";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSwal from "../../../hooks/useSwal";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const axiosSecure = useAxiosSecure();
  const { swalSuccess } = useSwal();
  const { id } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();

  const {
    data: survey,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["survey", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/surveyor/survey?id=${id}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const surveyData = {
      id,
      ...data,
      deadline: moment(data.deadline).format("MMMM D, YYYY"),
      updatedBy: user?.email,
    };
    console.log(surveyData);
    try {
      const response = await axiosSecure.post("/surveyor/update", surveyData);
      console.log("Survey created successfully:", response.data);
      if (response?.data?.modifiedCount) {
        swalSuccess("Survey Modified successfully");
        refetch();
      }
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };


  return !isLoading ? (
    <div>
      <div className="p-4 mx-4 mt-6 shadow-md">
        <h1 className="text-xl font-bold mb-4">update Survey</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              className="border rounded p-2 w-full"
              type="text"
              defaultValue={survey?.title}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="border rounded p-2 w-full"
              defaultValue={survey?.description}
            />
          </div>
         
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Category ({survey?.category})
            </label>
            <select
              {...register("category", { required: true })}
              className="border rounded p-2 w-full"
            >
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Automotive">Automotive</option>
              <option value="Business">Business</option>
              <option value="Environment">Environment</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              Deadline ({survey?.deadline})
            </label>
            <input
              {...register("deadline")}
              className="border rounded p-2 w-full"
              type="date"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="h-screen justify-center flex items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default UpdateForm;
