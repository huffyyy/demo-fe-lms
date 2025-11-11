import React, { useState } from "react";
import PropTypes from "prop-types";
import ConfirmModal from "../../../components/common/confirmModal";
import ErrorToast from "../../../components/common/errorToast";
import { useConfirmModal } from "../../../components/common/useConfirmModal";

// ✅ Mock data (contoh daftar student yang terdaftar di course)
let mockCourseStudents = [
  { id: "s1", name: "Andi Saputra", imageUrl: "" },
  { id: "s2", name: "Budi Rahman", imageUrl: "" },
  { id: "s3", name: "Citra Dewi", imageUrl: "" }
];

// ✅ Simulasi penghapusan student dari course
const deleteMockStudentFromCourse = async (studentId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = mockCourseStudents.some((s) => s.id === studentId);
      if (!exists) {
        reject(new Error("Student not found in course"));
      } else {
        mockCourseStudents = mockCourseStudents.filter((s) => s.id !== studentId);
        resolve({ status: "success", deletedId: studentId });
      }
    }, 700);
  });
};

export default function StudentItem({ imageUrl, name, id }) {
  const confirmModal = useConfirmModal();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔤 Generate warna avatar berdasarkan nama
  const stringToHsl = (str) => {
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 70%, 60%)`;
  };

  const initial = name?.charAt(0)?.toUpperCase() ?? "U";
  const avatarColor = stringToHsl(name ?? "User");

  // 🧹 Fungsi hapus student (mock)
  const handleDeleteClick = () => {
    setError(null);
    confirmModal.open(async () => {
      setIsLoading(true);
      try {
        await deleteMockStudentFromCourse(id);
        console.log(`✅ Removed student ${name} (${id})`);
        // Bisa tambahkan callback revalidate di parent nanti
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to remove student");
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
          <div className="rounded-[20px] overflow-hidden w-full h-full">
            {imageUrl ? (
              <img
                src={imageUrl}
                className="w-full h-full object-cover"
                alt="avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white font-semibold text-2xl"
                style={{ backgroundColor: avatarColor }}>
                {initial}
              </div>
            )}
          </div>
        </div>

        {/* Nama Student */}
        <div className="w-full">
          <h3 className="font-bold text-xl leading-[30px] line-clamp-1">{name}</h3>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end items-center gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteClick}
            className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#E63950]">
            {isLoading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>

      {/* Toast & Modal */}
      <ErrorToast message={error} onClose={() => setError(null)} />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={confirmModal.confirm}
        title="Remove Student from Course"
        message={
          <>
            Are you sure you want to remove <span className="font-semibold">{name}</span> from this course?
            <span className="text-red-500 text-xs mt-1 block">This action cannot be undone.</span>
          </>
        }
        confirmText="Remove"
        cancelText="Cancel"
        isLoading={isLoading}
        variant="danger"
      />
    </>
  );
}

StudentItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
