import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ConfirmModal from "../../../components/common/confirmModal";
import ErrorToast from "../../../components/common/errorToast";
import { useConfirmModal } from "../../../components/common/useConfirmModal";
import { mockCourses as initialMockCourses } from "../../../utils/mockData";

let mockCourses = [...initialMockCourses];

const deleteMockCourse = async (_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockCourses.some((c) => c._id === _id);
      if (!exists) {
        reject(new Error("Course not found"));
      } else {
        mockCourses = mockCourses.filter((c) => c._id !== _id);
        resolve({ status: "success", deletedId: _id });
      }
    }, 600);
  });
};

export default function CardCourse({
  _id,
  thumbnail_url = "/assets/images/thumbnails/th-1.png",
  name = "Untitled Course",
  students = [],
  category = { name: "Uncategorized" }
}) {
  const confirmModal = useConfirmModal();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalStudents = students?.length ?? 0;

  const handleDeleteClick = () => {
    setError(null);
    confirmModal.open(async () => {
      setIsLoading(true);
      try {
        await deleteMockCourse(_id);
        console.log(` Deleted course: ${name} (${_id})`);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to delete course");
      } finally {
        setIsLoading(false);
        confirmModal.close();
      }
    });
  };

  const handleCloseModal = () => {
    if (!isLoading) confirmModal.close();
  };

  return (
    <>
      <div className="card flex items-center gap-5">
        <div className="flex shrink-0 w-[140px] h-[110px] rounded-[20px] bg-white shadow-[0px_4px_19px_-5px_rgba(0,_0,_0,_0.1)]  overflow-hidden">
          <img src={thumbnail_url} className="w-full h-full object-cover" alt={`${name} thumbnail`} loading="lazy" />
        </div>

        <div className="w-full">
          <h3 className="font-bold text-xl leading-[30px] line-clamp-1" title={name}>
            {name}
          </h3>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-[6px] mt-[6px]">
              <img src="/assets/images/icons/profile-2user-blue.svg" className="w-5 h-5" alt="students" />
              <p className="text-[#838C9D]">{totalStudents} Students</p>
            </div>

            <div className="flex items-center gap-[6px] mt-[6px]">
              <img src="/assets/images/icons/crown-blue.svg" className="w-5 h-5" alt="category" />
              <p className="text-[#838C9D]">{category?.name}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3">
          <Link
            to={`/manager/courses/students/${_id}`}
            className="w-fit rounded-[16px] border border-[#060A23] p-[14px_20px] font-semibold text-nowrap hover:bg-gray-50 transition-colors">
            Students
          </Link>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="w-fit rounded-[16px] bg-[#FF435A] text-white p-[14px_20px] font-semibold text-nowrap hover:bg-[#E63950] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Deleting..." : "Delete"}
          </button>

          <Link
            to={`/manager/courses/${_id}`}
            className="w-fit rounded-[16px] border border-[#060A23] p-[14px_20px] font-semibold text-nowrap hover:bg-gray-50 transition-colors">
            Manage
          </Link>
        </div>
      </div>
      <ErrorToast message={error} onClose={() => setError(null)} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={confirmModal.confirm}
        title="Delete Course"
        message={
          <>
            Are you sure you want to delete <span className="font-semibold">{name}</span>?
            <br />
            <span className="text-red-500 text-xs mt-1 block">This action cannot be undone.</span>
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isLoading}
        variant="danger"
      />
    </>
  );
}

CardCourse.propTypes = {
  _id: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string,
  name: PropTypes.string,
  students: PropTypes.array,
  category: PropTypes.object
};
