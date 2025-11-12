import React from "react";
import { Link } from "react-router-dom";
import { mockCourses } from "../../../utils/mockData";

export default function Courses() {
  const courses = mockCourses.slice(0, 6);

  return (
    <section id="LatestCourse" className="flex flex-col w-[1525px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
      <h2 className="font-extrabold text-[22px] leading-[33px]">Latest Courses</h2>

      <div className="grid grid-cols-3">
        {courses.map((item, index) => {
          const isColumn1 = index % 3 === 0;
          const isColumn2 = index % 3 === 1;

          return (
            <div
              key={item._id}
              className={`flex items-center gap-5 p-4 ${isColumn1 || isColumn2 ? "border-r border-[#D3D6E4]" : ""}`}>
              <div className="flex shrink-0 w-[90px] h-[70px] rounded-[16px] bg-white shadow-[0px_4px_19px_-5px_rgba(0,_0,_0,_0.1)] overflow-hidden ">
                <img src={item.thumbnail_url} className="w-full h-full object-cover" alt="thumbnail" />
              </div>

              <div className="flex flex-col">
                <Link
                  to={`/manager/courses/${item._id}`}
                  className="font-bold text-lg leading-[24px] line-clamp-1 hover:underline">
                  {item.name}
                </Link>

                <div className="flex items-center gap-[6px] mt-[6px]">
                  <img src="/assets/images/icons/crown-blue.svg" alt="category" className="w-4 h-4" />
                  <p className="text-[#838C9D] text-sm">{item.category?.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
