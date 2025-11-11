import React from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../utils/zodSchema";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = (data) => {
    console.log("✅ SignUp Data:", data);

    // Simpan ke localStorage sementara (mock)
    localStorage.setItem("mockSignUpData", JSON.stringify(data));

    // Arahkan ke halaman Pricing
    navigate("/manager/sign-up/pricing", { state: { data } });
  };

  return (
    <div className="relative flex flex-col flex-1 p-[10px]">
      {/* Background */}
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#fff] -z-10 rounded-[20px]" />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-8 border-b border-black/25 py-4">
        <Navbar />
        <div className="flex items-center space-x-4">
          <Link to="/manager/sign-in">
            <div className="flex items-center justify-center gap-2 rounded-[16px] border px-6 py-3 transition-all duration-300 bg-[#ffffff] border-[#1E40AF] hover:bg-[#f5f5f5dc] hover:border-[#1E40AF]">
              <span className="font-semibold text-[#1E40AF] whitespace-nowrap">My Dashboard</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="flex items-start justify-start gap-[109px] mt-5">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[500px] h-fit rounded-[20px] ml-55 border mt-5 border-[#1E40AF] p-[30px] gap-[30px] bg-[#1E40AF]">
          <div>
            <h2 className="font-bold text-[26px] leading-[39px] text-white">Create Account</h2>
            <p className="text-white/60">Sign up as a Student or Manager based on your role.</p>
          </div>

          <hr className="border-white/60" />

          {/* Name */}
          <div className="flex flex-col gap-2">
            <span className="text-[#fff]">Full Name</span>
            <div className="flex items-center gap-3 w-full rounded-[16px] p-[14px_20px] bg-[#728DE5]">
              <img src="/assets/images/icons/user-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
              <input
                type="text"
                id="name"
                {...register("name")}
                className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-white/60"
                placeholder="Write your complete name"
              />
            </div>
            {errors.name?.message && <p className="text-red-500 text-xs">{errors.name?.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <span className="text-white">Email Address</span>
            <div className="flex items-center gap-3 w-full rounded-[16px] p-[14px_20px] bg-[#728DE5]">
              <img src="/assets/images/icons/email-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
              <input
                type="email"
                id="email"
                {...register("email")}
                className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-white/60"
                placeholder="Write your email address"
              />
            </div>
            {errors.email?.message && <p className="text-red-500 text-xs">{errors.email?.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <span className="text-white">Password</span>
            <div className="flex items-center gap-3 w-full rounded-[16px] p-[14px_20px] bg-[#728DE5]">
              <img src="/assets/images/icons/key-white.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
              <input
                type="password"
                id="password"
                {...register("password")}
                className="appearance-none outline-none !bg-transparent w-full font-semibold text-white placeholder:font-normal placeholder:text-white/60"
                placeholder="Type your secure password"
              />
            </div>
            {errors.password?.message && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
          </div>

          <hr className="border-[#262A56]" />

          {/* Create Account Button */}
          <Link to="/manager/sign-up/pricing">
            <button
              type="submit"
              className="w-full rounded-[16px] border p-[14px_20px] text-center font-semibold text-[#1E40AF] bg-white hover:bg-gray-100 transition">
              Create Account
            </button>
          </Link>

          {/* Already have account */}
          <div className="text-white/60">
            Already have an account?{" "}
            <Link to="/manager/sign-in" className="text-white hover:underline">
              <span>Sign In</span>
            </Link>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-extrabold text-[46px] leading-[69px] text-black">
            Start Your Learning <span className="text-[#1E40AF]">Journey Today!</span>
          </h1>

          <p className="text-lg leading-[26px] text-black/40 mt-[-15px] mb-12">
            Transform your career with expert-led courses and industry-recognized certifications.
          </p>

          <div className="flex flex-col gap-5 h-fit">
            {[
              {
                icon: "check-white.svg",
                title: "Premium Content",
                desc: "Access 500+ courses from industry experts"
              },
              {
                icon: "data-white.svg",
                title: "Track Progress",
                desc: "Monitor your growth with detailed analytics"
              },
              {
                icon: "certificate-white.svg",
                title: "Get Certified",
                desc: "Earn recognized certificates upon completion"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-white border-2 border-[#1E40AF] p-6 rounded-[12px]">
                <img
                  src={`/assets/images/icons/${item.icon}`}
                  className="w-16 h-16 p-1 shrink-0 mr-4 bg-[#1E40AF] rounded-[6px]"
                  alt="icon"
                />
                <div className="flex flex-col p-2">
                  <h1 className="text-3xl font-semibold gap-3 text-[#1E40AF]">{item.title}</h1>
                  <h4 className="text-[14px] text-[#1E40AF]">{item.desc}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-12 gap-1">
            <div className="flex gap-6 text-[#1E40AF] text-4xl font-extrabold">
              <h1>50k+</h1>
              <h1>500+</h1>
              <h1>95%</h1>
            </div>
            <div className="flex text-black/50 text-sm gap-8 ">
              <h1>Active Students</h1>
              <h1>Courses</h1>
              <h1>Satisfaction</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
