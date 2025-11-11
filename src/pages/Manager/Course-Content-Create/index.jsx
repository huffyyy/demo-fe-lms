import React, { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutateContentSchema } from "../../../utils/zodSchema";
import { useNavigate, useParams } from "react-router-dom";

// ===== Mock Data (contoh, sesuaikan dengan punyamu) =====
const mockContents = [
  { _id: "cnt1", courseId: "1", title: "Intro React", type: "video", youtubeId: "dQw4w9WgXcQ", text: "" },
  {
    _id: "cnt2",
    courseId: "1",
    title: "State & Props",
    type: "text",
    youtubeId: "",
    text: "<p>Materi tentang state & props…</p>"
  }
];

export default function ManageCourseContentCreatePage() {
  const { id, contentId } = useParams(); // id = courseId
  const navigate = useNavigate();

  // Cek apakah sedang edit berdasarkan mock data
  const existingContent = mockContents.find((c) => c.courseId === id && c._id === contentId);
  const isEditMode = !!existingContent;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(mutateContentSchema),
    defaultValues: {
      title: existingContent?.title ?? "",
      type: existingContent?.type ?? "",
      youtubeId: existingContent?.youtubeId ?? "",
      text: existingContent?.text ?? ""
    }
  });

  // Pastikan field "type" terinisialisasi benar saat edit
  useEffect(() => {
    if (existingContent?.type) setValue("type", existingContent.type, { shouldValidate: true });
  }, [existingContent, setValue]);

  const type = watch("type");

  const onSubmit = async (values) => {
    try {
      const payload = { ...values, courseId: id };

      if (isEditMode) {
        console.log("Update Content:", { _id: existingContent._id, ...payload });
      } else {
        console.log("Create Content:", payload);
      }

      // Simulasi selesai & kembali ke detail course
      navigate(`/manager/courses/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="Breadcrumb" className="flex items-center gap-5 *:after:content-['/'] *:after:ml-5">
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">Manage Course</span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">Course</span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">{isEditMode ? "Edit" : "Add"} Content</span>
      </div>

      <header className="flex items-center justify-between gap-[30px]">
        <div className="flex items-center gap-[30px]">
          <div>
            <h1 className="font-extrabold text-[28px] leading-[42px]">{isEditMode ? "Edit" : "Add"} Content</h1>
            <p className="text-[#838C9D] mt-[1]">Give a best content for the course</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[930px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
        {/* Title */}
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className="font-semibold">
            Content Title
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#1E40AF]">
            <img src="/assets/images/icons/note-favorite-black.svg" className="w-6 h-6" alt="icon" />
            <input
              {...register("title")}
              type="text"
              id="title"
              className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
              placeholder="Write better name for your course"
            />
          </div>
          <span className="error-message text-[#FF435A]">{errors?.title?.message}</span>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="type" className="font-semibold">
            Select Type
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#1E40AF]">
            <img src="/assets/images/icons/crown-black.svg" className="w-6 h-6" alt="icon" />
            <select
              {...register("type")}
              id="type"
              className="appearance-none outline-none w-full py-3 px-2 -mx-2 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent">
              <option value="" hidden>
                Choose content type
              </option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
            <img src="/assets/images/icons/arrow-down.svg" className="w-6 h-6" alt="icon" />
          </div>
          <span className="error-message text-[#FF435A]">{errors?.type?.message}</span>
        </div>

        {/* Video */}
        {type === "video" && (
          <div className="flex flex-col gap-[10px]">
            <label htmlFor="video" className="font-semibold">
              Youtube Video ID
            </label>
            <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#1E40AF]">
              <img src="/assets/images/icons/bill-black.svg" className="w-6 h-6" alt="icon" />
              <input
                {...register("youtubeId")}
                type="text"
                id="video"
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
                placeholder="Write YouTube video ID"
              />
            </div>
            <span className="error-message text-[#FF435A]">{errors?.youtubeId?.message}</span>
          </div>
        )}

        {/* Text */}
        {type === "text" && (
          <div className="flex flex-col gap-[10px]">
            <label className="font-semibold">Content Text</label>
            <div className="p-5">
              <h2 className="font-bold mb-3">{isEditMode ? "Edit" : "Add"} Content Text</h2>
              <CKEditor
                editor={ClassicEditor}
                config={{ placeholder: "Start writing your course content here..." }}
                data={watch("text") || ""}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue("text", data, { shouldValidate: true });
                }}
              />
            </div>
            <span className="error-message text-[#FF435A]">{errors?.text?.message}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
            onClick={() => {
              const snapshot = { ...watch(), courseId: id };
              console.log("Draft saved (mock):", snapshot);
              // Opsional: localStorage.setItem(`draft-content-${id}-${contentId || 'new'}`, JSON.stringify(snapshot));
            }}>
            Save as Draft
          </button>

          <button
            type="submit"
            className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#1E40AF] text-nowrap">
            {isEditMode ? "Edit" : "Add"} Content Now
          </button>
        </div>
      </form>
    </>
  );
}
