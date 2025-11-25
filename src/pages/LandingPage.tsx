// "use client";
// import React from "react";

// export default function LandingPage() {
//   return (
//     <div className="font-sans">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-[100px]">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
//           <div className="flex items-center gap-3 ">
//             <img
//               src="/class.png"
//               alt="logo"
//               className="h-12 w-12 rounded-3xl object-cover"
//               onError={(e) =>
//                 ((e.target as HTMLImageElement).src =
//                   "/fallback-logo.png")
//               }
//             />
//             <h1 className="text-xl font-bold text-gray-800">
//               RoutineGen Portal
//             </h1>
//           </div>
//           <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
//             <a href="#home" className="hover:text-blue-600 transition">
//               Home
//             </a>
//             <a href="#features" className="hover:text-blue-600 transition">
//               Features
//             </a>
//             <a href="#benefits" className="hover:text-blue-600 transition">
//               Benefits
//             </a>
//             <a href="#contact" className="hover:text-blue-600 transition">
//               Contact
//             </a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section
//         id="home"
//         className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 pt-28 bg-gradient-to-r from-blue-50 to-blue-100"
//       >
//         <div className="max-w-lg text-center lg:text-left">
//           <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
//             Generate College Routines Instantly
//           </h1>
//           <p className="text-gray-600 mb-6 text-lg">
//             Dynamic scheduling with automated email updates for students and teachers.
//           </p>
//           <div className="flex flex-wrap justify-center lg:justify-start gap-4">
//             <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
//               Login as Student
//             </button>
//             <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition">
//               Login as Teacher
//             </button>
//             <button className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition">
//               Admin Panel
//             </button>
//           </div>
//         </div>
//         <div className="mt-10 lg:mt-0">
//           <img
//             src="/image.png"
//             alt="routine preview"
//             className="w-[350px] lg:w-[500px] drop-shadow-xl rounded-lg"
//             onError={(e) =>
//               ((e.target as HTMLImageElement).src =
//                 "/fallback-preview.png")
//             }
//           />
//         </div>
//       </section>

//       {/* Features */}
//       <section id="features" className="py-20 bg-white">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//           Features
//         </h2>
//         <div className="grid gap-8 px-10 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
//           {[
//             { icon: "🗓", title: "Dynamic Scheduling", desc: "Adjusts automatically when classes change." },
//             { icon: "📧", title: "Automated Mailing", desc: "Sends updates directly to inbox." },
//             { icon: "👩‍🏫", title: "Role-based Access", desc: "Student, teacher, admin dashboards." },
//             { icon: "⚡", title: "Conflict-Free", desc: "Prevents timing overlaps." },
//           ].map((feature, i) => (
//             <div
//               key={i}
//               className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition text-center"
//             >
//               <div className="text-4xl">{feature.icon}</div>
//               <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
//               <p className="mt-2 text-gray-600">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Benefits */}
//       <section id="benefits" className="py-20 bg-gray-50">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//           Benefits for Everyone
//         </h2>
//         <div className="grid gap-8 px-10 md:grid-cols-3 max-w-6xl mx-auto">
//           {[
//             { title: "Students", desc: "Always up-to-date, no confusion about class schedules or changes." },
//             { title: "Teachers", desc: "Manage slots easily, no clashes in your teaching schedule." },
//             { title: "Admins", desc: "Saves hours of manual planning and rescheduling conflicts." },
//           ].map((benefit, i) => (
//             <div
//               key={i}
//               className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold">{benefit.title}</h3>
//               <p className="mt-2 text-gray-600">{benefit.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 bg-white">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//           How It Works
//         </h2>
//         <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
//           {[
//             "Admin inputs courses, teachers, classrooms",
//             "System generates optimized routine",
//             "Routine displayed on dashboards",
//             "Emails automatically sent to users",
//           ].map((step, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl shadow-md w-64 hover:shadow-xl transition"
//             >
//               <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-lg font-bold">
//                 {i + 1}
//               </div>
//               <p className="mt-4 text-gray-700 text-center">{step}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Call To Action */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-center text-white">
//         <h2 className="text-3xl font-bold mb-6">
//           Ready to simplify your college routine?
//         </h2>
//         <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
//           Get Started Now →
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-8">
//         <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-6xl mx-auto">
//           <p>Central Campus Of Technology | cct.edu.np</p>
//           <div className="flex gap-6 mt-4 md:mt-0">
//             <a href="#help" className="hover:text-white">Help</a>
//             <a href="#contact" className="hover:text-white">Contact</a>
//           </div>
//         </div>
//         <p className="text-center mt-6 text-sm">
//           © {new Date().getFullYear()} RoutineGen Portal. All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }




"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  ShieldCheck,
  Sparkles,
  Clock,
  GraduationCap,
  Users,
  MailCheck,
  CheckCircle2,
  Settings,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useSelectMultiple } from "react-day-picker";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [open, setOpen] = useState(false);

  const nav = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "benefits", label: "Benefits" },
    { id: "how", label: "How it works" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  useEffect(() => {
    const user= localStorage.getItem("user");
    // if(!user){
    //   const user= useSelector((state: any) => state.auth.user);
    //   console.log('this is the use from landing page :- ', user);
    // }
  })

  return (
    <div className="font-sans text-slate-800 selection:bg-blue-100">
      {/* Decorative background */}
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-blue-200 via-indigo-200 to-transparent blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -right-24 h-[34rem] w-[34rem] rounded-full bg-gradient-to-tr from-sky-100 via-teal-100 to-transparent blur-3xl opacity-70" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
          <button
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-3"
            aria-label="RoutineGen Portal Home"
          >
            <img
              src="/class.png"
              alt="RoutineGen logo"
              className="h-12 w-12 rounded-2xl object-cover ring-1 ring-slate-200"
              onError={(e) => ((e.target as HTMLImageElement).src = "/fallback-logo.png")}
              loading="lazy"
              decoding="async"
            />
            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                RoutineGen <span className="text-blue-600">Portal</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Smart timetable generation for colleges</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="hover:text-blue-700 transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Register
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Open navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-2">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100"
                >
                  {n.label}
                </button>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <Link to="/login" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-center font-semibold">
                  Login
                </Link>
                <Link to="/register" className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-center font-semibold text-white">
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 lg:pt-24 pb-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Generate college routines <span className="text-blue-700">instantly</span>
            </motion.h1>
            <p className="mt-4 text-lg text-slate-600 max-w-prose">
              Conflict‑free timetables with automated email updates for students and teachers. Save hours of admin time every semester.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-blue-700"
              >
                Try the demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-50"
              >
                Register as Teacher
              </Link>
              <a
                href="#how"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("how");
                }}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-slate-700 hover:text-blue-700"
              >
                See how it works
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Clash‑free scheduling</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Role‑based access</div>
              <div className="flex items-center gap-2"><MailCheck className="h-4 w-4" /> Email notifications</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-200/50 via-indigo-200/50 to-transparent blur-2xl" aria-hidden />
            <img
              src="/image.png"
              alt="Routine preview"
              className="relative z-10 w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl"
              onError={(e) => ((e.target as HTMLImageElement).src = "/fallback-preview.png")}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="py-20 bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center">Features</h2>
          <p className="mt-3 text-center text-slate-600 max-w-2xl mx-auto">
            Built for colleges, departments, and faculties to plan, publish, and adapt schedules quickly.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Calendar, title: "Dynamic scheduling", desc: "Auto‑adjusts when courses or rooms change." },
              { icon: Mail, title: "Automated mailing", desc: "Instant updates to student & teacher inboxes." },
              { icon: ShieldCheck, title: "Role‑based access", desc: "Student, teacher, and admin dashboards." },
              { icon: Sparkles, title: "Conflict‑free", desc: "Optimizes to avoid overlaps and clashes." },
            ].map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center">Benefits for everyone</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: GraduationCap, title: "Students", desc: "Always up‑to‑date—no confusion about class changes." },
              { icon: Users, title: "Teachers", desc: "Manage slots easily and avoid double‑booking." },
              { icon: Settings, title: "Admins", desc: "Save hours of manual drafting and rescheduling." },
            ].map((b, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                </div>
                <p className="mt-3 text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { k: "85%", v: "faster planning" },
              { k: "0 clashes", v: "on optimized runs" },
              { k: "\u22653,000", v: "email alerts / term" },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-extrabold text-slate-900">{s.k}</div>
                <div className="mt-1 text-slate-600">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center">How it works</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: 1, text: "Admin inputs courses, teachers, rooms", icon: Settings },
              { step: 2, text: "System generates optimized routine", icon: Sparkles },
              { step: 3, text: "Routine displayed on dashboards", icon: Calendar },
              { step: 4, text: "Emails automatically sent to users", icon: MailCheck },
            ].map((s, i) => (
              <div key={i} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-semibold text-slate-500">Step {s.step}</div>
                </div>
                <p className="mt-3 font-medium text-slate-800">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Runs in minutes</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Access controls</div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative isolate py-20 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <svg className="absolute inset-x-0 -top-24 -z-10 h-24 w-full text-indigo-700" viewBox="0 0 1440 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M0 74h1440V0C960 74 480 74 0 0v74Z" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to simplify your college routine?</h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">Get started with a modern, fast, and reliable routine generator built for academic schedules.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-slate-100">
              Get started now <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo("features"); }} className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
              Explore features
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
                 <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center">FAQs</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Can it handle multiple faculties and semesters?",
                a: "Yes. Define faculties, semesters, subjects, teachers, rooms, and availability. The generator ensures no conflicts across all relations.",
              },
              {
                q: "How are email notifications sent?",
                a: "On publish or change, the system triggers emails to enrolled students and assigned teachers.",
              },
              {
                q: "Is there an admin panel?",
                a: "Yes. Admins can manage entities, run the optimizer, and preview before publishing.",
              },
              {
                q: "Can teachers block unavailable times?",
                a: "Teachers can set availability; the optimizer respects time blocks automatically.",
              },
            ].map((item, i) => (
              <details key={i} className="group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-semibold text-slate-900">{item.q}</span>
                  <span className="text-slate-500 group-open:rotate-90 transition-transform">›</span>
                </summary>
                <p className="mt-3 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/class.png"
                alt="RoutineGen logo"
                className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-700"
                onError={(e) => ((e.target as HTMLImageElement).src = "/fallback-logo.png")}
                loading="lazy"
              />
              <span className="text-lg font-bold text-white">RoutineGen Portal</span>
            </div>
            <p className="mt-3 text-sm text-slate-400 max-w-xs">Central Campus Of Technology | cct.edu.np</p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(n.id);
                    }}
                    className="hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Get in touch</h3>
            <p className="mt-3 text-sm text-slate-400">Have questions or need a demo? Email us anytime.</p>
            <a href="mailto:info@cct.edu.np" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
              <Mail className="h-4 w-4" /> info@cct.edu.np
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800">
          <p className="text-center text-xs text-slate-500 py-6">© {year} RoutineGen Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}