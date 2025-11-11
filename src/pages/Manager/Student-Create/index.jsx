import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { createStudentSchema, updateStudentSchema } from "../../../utils/zodSchema";
import { Link, useNavigate, useParams } from "react-router-dom";

// ✅ Mock Data Lokal
const mockStudents = [
  {
    _id: "1",
    name: "Andi Saputra",
    email: "andi@example.com",
    photo_url: "/assets/images/avatar-1.png"
  },
  {
    _id: "2",
    name: "Budi Rahman",
    email: "budi@example.com",
    photo_url: "/assets/images/avatar-2.png"
  }
];

export default function ManageStudentCreatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Deteksi mode edit
  const existingStudent = mockStudents.find((s) => s._id === id);
  const isEditMode = !!existingStudent;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(isEditMode ? updateStudentSchema : createStudentSchema),
    defaultValues: {
      name: existingStudent?.name || "",
      email: existingStudent?.email || ""
    }
  });

  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const onSubmit = async (values) => {
    try {
      const formData = {
        ...values,
        avatar: file ? file.name : existingStudent?.photo_url || null
      };

      if (isEditMode) {
        console.log("Updated Student:", formData);
      } else {
        console.log("Created Student:", formData);
      }

      // Simulasi redirect setelah submit
      navigate("/manager/students");
    } catch (error) {
      console.error("Error submitting student:", error);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">{isEditMode ? "Edit" : "Add"} Student</h1>
          <p className="text-[#838C9D] mt-[1px]">{isEditMode ? "Update existing student" : "Register a new student"}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="#" className="w-fit rounded-[16px] border border-[#060A23] p-[14px_20px] font-semibold text-nowrap">
            Import
          </Link>
        </div>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB] m-auto">
        {/* Avatar */}
        <div className="flex flex-col gap-[10px]">
          <label className="font-semibold">{isEditMode ? "Edit" : "Add"} Avatar</label>

          <div
            className="relative flex w-full h-[200px] rounded-[20px] border border-[#CFDBEF] overflow-hidden cursor-pointer"
            onClick={() => inputFileRef.current?.click()}>
            {!file && !existingStudent?.photo_url && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <img src="/assets/images/icons/gallery-add-black.svg" className="w-6 h-6" alt="upload" />
                <span className="text-[#838C9D]">Add student avatar</span>
              </div>
            )}

            {(file || existingStudent?.photo_url) && (
              <img
                src={file ? URL.createObjectURL(file) : existingStudent.photo_url}
                className="w-full h-full object-cover"
                alt="avatar"
              />
            )}
          </div>

          <input
            type="file"
            {...register("avatar")}
            ref={inputFileRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const fileUploaded = e.target.files?.[0];
              if (fileUploaded) {
                setFile(fileUploaded);
                setValue("avatar", fileUploaded, { shouldValidate: true });
              }
            }}
          />

          <span className="text-[#FF435A]">{errors?.avatar?.message}</span>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="name" className="font-semibold">
            Full Name
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all focus-within:ring-2 focus-within:ring-[#1E40AF]">
            <img src="/assets/images/icons/note-favorite-black.svg" className="w-6 h-6" />
            <input
              {...register("name")}
              id="name"
              type="text"
              placeholder="Write student name"
              className="appearance-none outline-none w-full py-3 font-semibold placeholder:text-[#838C9D] bg-transparent"
            />
          </div>
          <span className="text-[#FF435A]">{errors?.name?.message}</span>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="email" className="font-semibold">
            Email Address
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all focus-within:ring-2 focus-within:ring-[#1E40AF]">
            <img src="/assets/images/icons/sms-black.svg" className="w-6 h-6" />
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Write email address"
              className="appearance-none outline-none w-full py-3 font-semibold placeholder:text-[#838C9D] bg-transparent"
            />
          </div>
          <span className="text-[#FF435A]">{errors?.email?.message}</span>
        </div>

        {/* Password hanya muncul di mode Add */}
        {!isEditMode && (
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all focus-within:ring-2 focus-within:ring-[#1E40AF]">
              <img src="/assets/images/icons/lock-black.svg" className="w-6 h-6" />
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Type student password"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:text-[#838C9D] bg-transparent"
              />
            </div>
            <span className="text-[#FF435A]">{errors?.password?.message}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-[14px]">
          <button type="button" className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold">
            Save as Draft
          </button>
          <button type="submit" className="w-full rounded-full p-[14px_20px] font-semibold text-white bg-[#1E40AF]">
            {isEditMode ? "Edit" : "Add"} Now
          </button>
        </div>
      </form>
    </>
  );
}
