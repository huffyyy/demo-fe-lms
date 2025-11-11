import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PricingPage({ data }) {
  console.log("Signup data (if any):", data);

  return (
    <div className="relative flex flex-col flex-1 p-[10px]">
      {/* Background */}
      <div className="absolute w-[calc(100%-20px)] min-h-[calc(100vh-20px)] h-[calc(100%-20px)] bg-[#fff] -z-10 rounded-[20px]" />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-8 border-b border-black/25 py-4">
        <Navbar />
        <div className="flex items-center gap-3">
          <Link to="/manager/sign-in">
            <div className="flex items-center justify-center gap-2 rounded-[16px] border px-6 py-3 transition-all duration-300 bg-[#ffffff] border-[#1E40AF] hover:bg-[#f5f5f5dc] hover:border-[#1E40AF]">
              <span className="font-semibold text-[#1E40AF] whitespace-nowrap">My Dashboard</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="flex flex-col items-center gap-5 text-center mt-[30px]">
        <h1 className="font-extrabold text-[46px] leading-[69px] text-black">
          Choose the plan that fits your
          <br />
          <span className="text-[#1E40AF]">learning journey</span>
        </h1>
        <p className="text-lg leading-[27px] text-black/40">
          Whether you’re just starting out or managing a team of learners, we’ve got the right plan for you.
        </p>
      </header>

      {/* Pricing Plans */}
      <div className="grid grid-cols-3 gap-[30px] max-w-[1440px] mx-auto mt-[60px]">
        {/* FREE PLAN */}
        <div className="card flex flex-col h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#ffffff]">
          <div>
            <p className="font-extrabold text-[46px] leading-[69px] text-black">
              Free <span className="text-[#1E40AF]">Plan</span>
            </p>
            <p className="text-[24px] text-black">Starts at</p>
            <p className="text-[46px] text-[#1E40AF]">
              $0<span className="text-[12px] text-black">/mo</span>
            </p>
            <p className="text-[#6B6C7F] mt-[6px]">Good for students who are just getting started.</p>
          </div>

          <hr className="border-[#262A56]" />

          <Link to="/success-checkout">
            <div className="flex items-center justify-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 bg-white border-[#1E40AF] hover:bg-[#f5f5f5] hover:border-[#1E40AF]">
              <span className="text-[18px] text-[#1E40AF] font-medium">Get Started</span>
            </div>
          </Link>

          <hr className="border-[#262A56]" />

          <span className="text-black font-semibold text-[20px]">
            Plan <span className="text-[#1E40AF]">highlights</span>
          </span>
          <div className="flex flex-col gap-5">
            {["Access to basic courses", "Track personal progress", "Join community discussions"].map((text, i) => (
              <p key={i} className="font-semibold text-black flex gap-2 items-center">
                <img src="/assets/images/icons/done-black.svg" className="w-6 h-6" /> {text}
              </p>
            ))}
          </div>
        </div>

        {/* ENTERPRISE PLAN */}
        <div className="card flex flex-col h-fit rounded-[20px] border border-[#262A56] p-[45px] gap-[30px] bg-[#1340AF] text-white">
          <div>
            <p className="font-extrabold text-[46px] leading-[69px]">Enterprise Plan</p>
            <p className="text-[24px]">Starts at</p>
            <p className="text-[46px]">
              $99<span className="text-[12px]">/mo</span>
            </p>
            <p className="mt-[6px]">Best for managers, teams, and organizations.</p>
          </div>

          <hr className="border-white/60" />

          <Link to="/success-checkout">
            <div className="flex items-center justify-center gap-2 rounded-full border px-6 py-2 transition-all duration-300 bg-white border-[#1E40AF] hover:bg-[#f5f5f5] hover:border-[#1E40AF]">
              <span className="text-[18px] text-[#1E40AF] font-medium">Get Started</span>
            </div>
          </Link>

          <hr className="border-white/60" />

          <span className="font-semibold text-[20px]">Features</span>
          <div className="flex flex-col gap-5">
            {["Custom learning path", "Dedicated account manager", "Multi-user access", "Admin dashboard & reporting"].map(
              (text, i) => (
                <p key={i} className="flex gap-2 items-center">
                  <img src="/assets/images/icons/done-white.svg" className="w-6 h-6" /> {text}
                </p>
              )
            )}
          </div>
        </div>

        {/* PRO PLAN */}
        <div className="card flex flex-col h-fit rounded-[20px] border border-[#262A56] p-[30px] gap-[30px] bg-[#ffffff]">
          <div>
            <p className="font-extrabold text-[46px] leading-[69px] text-black">
              Pro <span className="text-[#1E40AF]">Plan</span>
            </p>
            <p className="text-[24px] text-black">Starts at</p>
            <p className="text-[46px] text-[#1E40AF]">
              $49<span className="text-[12px] text-black">/mo</span>
            </p>
            <p className="text-[#6B6C7F] mt-[6px]">Highly recommended for professionals.</p>
          </div>

          <hr className="border-[#262A56]" />

          <Link to="/success-checkout">
            <div className="flex items-center justify-center gap-2 rounded-full border px-4 py-2 transition-all duration-300 bg-white border-[#1E40AF] hover:bg-[#f5f5f5] hover:border-[#1E40AF]">
              <span className="text-[18px] text-[#1E40AF] font-medium">Get Started</span>
            </div>
          </Link>

          <hr className="border-[#262A56]" />

          <span className="text-black font-semibold text-[20px]">
            What's <span className="text-[#1E40AF]">included</span>
          </span>
          <div className="flex flex-col gap-5">
            {[
              "Advanced progress analytics",
              "Unlimited courses access",
              "Certificates of completion",
              "Priority email support"
            ].map((text, i) => (
              <p key={i} className="flex gap-2 items-center">
                <img src="/assets/images/icons/done-black.svg" className="w-6 h-6" /> {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

PricingPage.propTypes = {
  data: PropTypes.object
};
