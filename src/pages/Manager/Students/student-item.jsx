import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ConfirmModal from "../../../components/common/confirmModal";
import ErrorToast from "../../../components/common/errorToast";
import { useConfirmModal } from "../../../components/common/useConfirmModal";

// ✅ Mock data (daftar students)
let mockStudents = [
  {
    id: "1",
    name: "Angga Risky Setiawan",
    imageUrl: "/assets/images/photos/photo-3.png",
    totalCourse: 3
  },
  {
    id: "2",
    name: "Budi Hartono",
    imageUrl: "/assets/images/photos/photo-4.png",
    totalCourse: 5
  },
  {
    id: "3",
    name: "Citra Dewi",
    imageUrl: "/assets/images/photos/photo-2.png",
    totalCourse: 2
  }
];

// ✅ Simulasi fungsi hapus student (mock)
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

  // 🔥 Fungsi hapus mock
  const handleDeleteClick = () => {
    setError(null);
    confirmModal.open(async () => {
      setIsLoading(true);
      try {
        await deleteMockStudent(id);
        console.log(`✅ Deleted student: ${name} (${id})`);
        // Bisa tambahkan callback untuk update parent state nanti
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
        {/* Avatar */}
        <div className="relative flex shrink-0 w-20 h-20">
          <div className="rounded-[20px] bg-[#D9D9D9] overflow-hidden">
            <img
              src={imageUrl}
              className="w-full h-full object-cover"
              alt={name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/photos/photo-3.png";
              }}
            />
          </div>
        </div>

        {/* Info student */}
        <div className="w-full">
          <h3 className="font-bold text-xl leading-[30px] line-clamp-1">{name}</h3>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-[6px] mt-[6px]">
              <img src="/assets/images/icons/note-favorite-blue.svg" className="w-5 h-5" alt="icon" />
              <p className="text-[#838C9D]">{totalCourse} Course Joined</p>
            </div>
          </div>
        </div>

        {/* Tombol aksi */}
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

      {/* Toast & Modal */}
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
