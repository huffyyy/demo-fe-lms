import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ConfirmModal from "../../../components/common/confirmModal";
import ErrorToast from "../../../components/common/errorToast";
import { useConfirmModal } from "../../../components/common/useConfirmModal";

let mockStudents = [
  {
    id: "1",
    name: "Naila",
    imageUrl: "/assets/images/photos/photo-profile-blue.svg",
    totalCourse: 3
  },
  {
    id: "2",
    name: "Husnul",
    imageUrl: "/assets/images/photos/photo-profile-blue.svg",
    totalCourse: 5
  },
  {
    id: "3",
    name: "Fikri",
    imageUrl: "/assets/images/photos/photo-profile-blue.svg",
    totalCourse: 2
  },
  {
    id: "4",
    name: "Hufy",
    imageUrl: "/assets/images/photos/photo-profile-blue.svg",
    totalCourse: 4
  }
];

const deleteMockStudent = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockStudents.some((s) => s.id === id);
      if (!exists) {
        reject(new Error("Student not found"));
      } else {
        mockStudents = mockStudents.filter((s) => s.id !== id);
        resolve({ status: "success", deletedId: id });
      }
    }, 700);
  });
};

export default function StudentItem({
  imageUrl = "/assets/images/photos/photo-3.png",
  name = "Angga Risky Setiawan",
  totalCourse = 0,
  id = "1"
}) {
  const confirmModal = useConfirmModal();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = () => {
    setError(null);
    confirmModal.open(async () => {
      setIsLoading(true);
      try {
        await deleteMockStudent(id);
        console.log(`✅ Deleted student: ${name} (${id})`);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to delete student");
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
        <div className="relative flex shrink-0 w-20 h-20">
          <div className="rounded-[20px]  overflow-hidden shadow-[0px_4px_19px_-5px_rgba(0,_0,_0,_0.1)]">
            <img
              src={imageUrl}
              className="w-full h-full object-cover "
              alt={name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/photos/photo-3.png";
              }}
            />
          </div>
        </div>

        <div className="w-full">
          <h3 className="font-bold text-xl leading-[30px] line-clamp-1">{name}</h3>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-[6px] mt-[6px]">
              <img src="/assets/images/icons/note-favorite-blue.svg" className="w-5 h-5" alt="icon" />
              <p className="text-[#838C9D]">{totalCourse} Course Joined</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3">
          <Link
            to={`/manager/students/edit/${id}`}
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap hover:bg-gray-50 transition-colors">
            Edit Profile
          </Link>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap hover:bg-[#E63950] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <ErrorToast message={error} onClose={() => setError(null)} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={confirmModal.confirm}
        title="Delete Student"
        message={
          <>
            Confirm deletion of <span className="font-semibold">{name}</span>?
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

StudentItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  totalCourse: PropTypes.number,
  id: PropTypes.string
};
