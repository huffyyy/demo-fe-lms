import React, { useRef, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createCourseSchema, updateCourseSchema } from "../../../utils/zodSchema";

// ✅ Mock Data
const mockCategories = [
  { _id: "cat1", name: "Web Development" },
  { _id: "cat2", name: "Data Science" },
  { _id: "cat3", name: "UI/UX Design" }
];

const mockCourses = [
  {
    _id: "1",
    name: "React Fundamentals",
    tagline: "Learn React from scratch",
    categoryId: "cat1",
    description: "Basic course for React beginners.",
    thumbnail: null
  }
];

export default function ManageCreateCoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Cek apakah sedang edit course
  const existingCourse = mockCourses.find((c) => c._id === id);
  const isEditMode = !!existingCourse;

  const [file, setFile] = useState(existingCourse?.thumbnail ?? null);
  const inputFileRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(isEditMode ? updateCourseSchema : createCourseSchema),
    defaultValues: {
      name: existingCourse?.name ?? "",
      tagline: existingCourse?.tagline ?? "",
      categoryId: existingCourse?.categoryId ?? "",
      description: existingCourse?.description ?? ""
    }
  });

  // Pastikan select category terisi saat edit
  useEffect(() => {
    if (existingCourse?.categoryId) {
      setValue("categoryId", existingCourse.categoryId);
    }
  }, [existingCourse, setValue]);

  const onSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        thumbnail: file ? file.name : null
      };

      if (isEditMode) {
        console.log("Updated Course:", formData);
      } else {
        console.log("Created Course:", formData);
      }

      // Simulasi redirect setelah submit
      navigate("/manager/courses");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">{isEditMode ? "Edit" : "Add"} Course</h1>
          <p className="text-[#838C9D] mt-[2px]">
            {isEditMode ? "Update existing course details" : "Create new future for company"}
          </p>
        </div>

        <button className="rounded-[16px] border border-[#060A23] px-5 py-3 font-semibold">Import</button>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl bg-[#F8FAFB] rounded-[30px] p-10 mx-auto flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Name */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Course Name</label>
            <div className="flex items-center w-full border border-[#CFDBEF] rounded-[14px] px-4 h-[52px] gap-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-[#F2F4F7] flex items-center justify-center">
                <img src="/assets/images/icons/note-favorite-black.svg" className="w-5" />
              </div>
              <input
                {...register("name")}
                placeholder="Write better name for your course"
                className="w-full outline-none bg-transparent font-semibold placeholder:font-normal"
              />
            </div>
            <span className="text-[#FF435A] text-sm">{errors?.name?.message}</span>
          </div>

          {/* Tagline */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Course Tagline</label>
            <div className="flex items-center w-full border border-[#CFDBEF] rounded-[14px] px-4 h-[52px] gap-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-[#F2F4F7] flex items-center justify-center">
                <img src="/assets/images/icons/bill-black.svg" className="w-5" />
              </div>
              <input
                {...register("tagline")}
                placeholder="Write tagline for better copy"
                className="w-full outline-none bg-transparent font-semibold placeholder:font-normal"
              />
            </div>
            <span className="text-[#FF435A] text-sm">{errors?.tagline?.message}</span>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Select Category</label>
            <div className="flex items-center w-full border border-[#CFDBEF] rounded-[14px] px-4 h-[52px] gap-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-[#F2F4F7] flex items-center justify-center">
                <img src="/assets/images/icons/bill-black.svg" className="w-5" />
              </div>
              <select {...register("categoryId")} className="w-full outline-none bg-transparent font-semibold">
                <option value="">Choose one category</option>
                {mockCategories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-[#FF435A] text-sm">{errors?.categoryId?.message}</span>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Add a Thumbnail</label>
          <div className="relative h-[220px] w-full border border-[#CFDBEF] rounded-[20px] overflow-hidden bg-white">
            {file ? (
              <img
                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => inputFileRef?.current?.click()}
              />
            ) : (
              <button
                type="button"
                onClick={() => inputFileRef?.current?.click()}
                className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#838C9D]">
                <img src="/assets/images/icons/gallery-add-black.svg" className="w-6" />
                <span>Add an attachment</span>
              </button>
            )}
          </div>

          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
                setValue("thumbnail", e.target.files[0]);
              }
            }}
          />

          <span className="text-[#FF435A] text-sm">{errors?.thumbnail?.message}</span>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Description</label>
          <div className="flex items-start gap-3 border border-[#CFDBEF] rounded-[20px] p-4 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#F2F4F7] flex items-center justify-center">
              <img src="/assets/images/icons/note-favorite-black.svg" className="w-5" />
            </div>
            <textarea
              {...register("description")}
              rows={5}
              placeholder="Explain what this course about"
              className="w-full outline-none bg-transparent font-semibold placeholder:font-normal"
            />
          </div>
          <span className="text-[#FF435A] text-sm">{errors?.description?.message}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-5">
          <button type="button" className="w-full rounded-full border border-[#060A23] py-4 font-semibold bg-white">
            Save as Draft
          </button>

          <button type="submit" className="w-full rounded-full py-4 font-semibold text-white bg-[#1E40AF]">
            {isEditMode ? "Edit" : "Add"} Now
          </button>
        </div>
      </form>
    </>
  );
}
