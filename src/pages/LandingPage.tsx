"use client";
import React from "react";

export default function LandingPage() {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-[100px]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3 ">
            <img
              src="/class.png"
              alt="logo"
              className="h-12 w-12 rounded-3xl object-cover"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "/fallback-logo.png")
              }
            />
            <h1 className="text-xl font-bold text-gray-800">
              RoutineGen Portal
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <a href="#home" className="hover:text-blue-600 transition">
              Home
            </a>
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
            <a href="#benefits" className="hover:text-blue-600 transition">
              Benefits
            </a>
            <a href="#contact" className="hover:text-blue-600 transition">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 pt-28 bg-gradient-to-r from-blue-50 to-blue-100"
      >
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Generate College Routines Instantly
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Dynamic scheduling with automated email updates for students and teachers.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
              Login as Student
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition">
              Login as Teacher
            </button>
            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition">
              Admin Panel
            </button>
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <img
            src="/image.png"
            alt="routine preview"
            className="w-[350px] lg:w-[500px] drop-shadow-xl rounded-lg"
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "/fallback-preview.png")
            }
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Features
        </h2>
        <div className="grid gap-8 px-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {[
            { icon: "🗓", title: "Dynamic Scheduling", desc: "Adjusts automatically when classes change." },
            { icon: "📧", title: "Automated Mailing", desc: "Sends updates directly to inbox." },
            { icon: "👩‍🏫", title: "Role-based Access", desc: "Student, teacher, admin dashboards." },
            { icon: "⚡", title: "Conflict-Free", desc: "Prevents timing overlaps." },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition text-center"
            >
              <div className="text-4xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Benefits for Everyone
        </h2>
        <div className="grid gap-8 px-10 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            { title: "Students", desc: "Always up-to-date, no confusion about class schedules or changes." },
            { title: "Teachers", desc: "Manage slots easily, no clashes in your teaching schedule." },
            { title: "Admins", desc: "Saves hours of manual planning and rescheduling conflicts." },
          ].map((benefit, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How It Works
        </h2>
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {[
            "Admin inputs courses, teachers, classrooms",
            "System generates optimized routine",
            "Routine displayed on dashboards",
            "Emails automatically sent to users",
          ].map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl shadow-md w-64 hover:shadow-xl transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold">
                {i + 1}
              </div>
              <p className="mt-4 text-gray-700 text-center">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">
          Ready to simplify your college routine?
        </h2>
        <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
          Get Started Now →
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-6xl mx-auto">
          <p>Central Campus Of Technology | cct.edu.np</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#help" className="hover:text-white">Help</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
        <p className="text-center mt-6 text-sm">
          © {new Date().getFullYear()} RoutineGen Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
