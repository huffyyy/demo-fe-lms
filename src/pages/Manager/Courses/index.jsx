import React from "react";
import CardCourse from "./card"; // ✅ perbaikan ejaan
import { Link, useLoaderData } from "react-router-dom";

export default function ManageCoursePage() {
  const courses = useLoaderData();

  console.log("Loaded courses:", courses);

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">Manage Courses</h1>
          <p className="text-[#838C9D] mt-[1px]">Give the best future for your great employees</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="#" className="w-fit rounded-[16px] border border-[#1E40AF] p-[14px_20px] font-semibold text-nowrap">
            Import File
          </Link>

          <Link
            to="/manager/courses/create"
            className="w-fit rounded-[16px] p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#1E40AF] text-nowrap">
            Add Courses
          </Link>
        </div>
      </header>

      <section id="CourseList" className="flex flex-col w-full rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
        {courses?.length > 0 ? (
          courses.map((item) => (
            <CardCourse
              key={item._id}
              _id={item._id}
              name={item.name}
              thumbnail_url={item.thumbnail_url}
              category={item.category}
              students={item.students}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center py-10">No courses available.</p>
        )}

        {/* Pagination */}
        <div id="Pagination" className="flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              className={`flex shrink-0 w-9 h-9 rounded-full items-center justify-center text-center transition-all duration-300 ${
                num === 1 ? "bg-[#1E40AF] text-white" : "border border-[#060A23] hover:bg-[#1E40AF] hover:text-white"
              }`}>
              <span className="font-semibold text-sm leading-[21px]">{num}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
