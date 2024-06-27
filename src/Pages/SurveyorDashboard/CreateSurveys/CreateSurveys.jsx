import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useSwal from "../../../hooks/useSwal";
import moment from "moment";

const CreateSurveys = () => {
  const axiosSecure = useAxiosSecure();
  const { swalSuccess } = useSwal();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [options, setOptions] = useState([
    { option: "", votes: 0 },
    { option: "", votes: 0 },
    { option: "", votes: 0 },
    { option: "", votes: 0 },
  ]);

  const onSubmit = async (data) => {
    const surveyData = {
      ...data,
      deadline: moment(data.deadline).format("MMMM D, YYYY"),
      votes: 0,
      createdBy: user?.email || "user",
      options: options.filter((option) => option.option !== ""),
    };
    console.log(surveyData);
    try {
      const response = await axiosSecure.post("/surveyor/create", surveyData);
      console.log("Survey created successfully:", response.data);
      if (response?.data?.insertedId) {
        swalSuccess("Survey created successfully");
      }
      reset();
      setOptions([
        { option: "", votes: 0 },
        { option: "", votes: 0 },
        { option: "", votes: 0 },
        { option: "", votes: 0 },
      ]);
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].option = value;
    setOptions(newOptions);
  };

  return (
    <div className="sm:m-4 m-2 sm:p-8 p-4 shadow-lg border-[#7f7e7f38] border rounded ">
      <h1 className="text-xl font-bold mb-4">Create Survey</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Title</label>
          <input
            {...register("title", { required: true })}
            className="border border-[#7f7e7f38] rounded p-2 w-full"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="border border-[#7f7e7f38] rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Options
          </label>
          {options.map((option, index) => (
            <input
              key={index}
              className="border border-[#7f7e7f38] rounded p-2 w-full mb-2"
              type="text"
              value={option.option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Category</label>
          <select
            {...register("category", { required: true })}
            className="border border-[#7f7e7f38] rounded p-2 w-full"
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
          <label className="block font-semibold mb-1">Deadline</label>
          <input
            {...register("deadline", { required: true })}
            className="border border-[#7f7e7f38] rounded p-2 w-full"
            type="date"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Survey
        </button>
      </form>
    </div>
  );
};

export default CreateSurveys;
