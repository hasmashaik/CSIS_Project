// "use client";
// import { useEffect, useRef, useState } from "react";

// const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxyz123.../exec";

// const FLOW = {
//   rootOptions: [
//     { label: "🎓 Trainings / Internships", key: "trainings" },
//     { label: "💼 Jobs / Careers", key: "jobs" },
//     { label: "🏫 College Campus Training", key: "college" },
//     { label: "🧾 Recruitment Support", key: "recruitment" },
//     { label: "🤝 Hire Students", key: "hire" },
//   ],
//   trainings: {
//     title: "Trainings / Internships",
//     options: [
//       { label: "💻 IT & Software Trainings", key: "it_training", form: true, team: "Training Team" },
//       { label: "🧩 Non-IT Trainings", key: "nonit_training", form: true, team: "Training Team" },
//       { label: "🧑‍💼 Internships", key: "internships", form: true, team: "Training Team" },
//       { label: "🔐 Student Login", key: "student_login", redirect: "/student-login" },
//       { label: "🧭 Placement Jobs", key: "placement_jobs", redirect: "/placement-jobs" },
//     ],
//   },
//   jobs: {
//     title: "Jobs / Careers",
//     options: [
//       { label: "🧭 Placement Jobs", key: "placement_jobs_job", redirect: "/placement-jobs" },
//       { label: "⚙ Non-IT Jobs", key: "nonit_jobs", form: true, team: "HR Team" },
//       { label: "🏢 Work With Us", key: "work_with_us", form: true, team: "HR Team" },
//     ],
//   },
//   college: {
//     title: "College Campus Training",
//     options: [
//       { label: "🎯 Campus Drive / Placements", key: "campus_drive", form: true, team: "Campus Team" },
//       { label: "📘 Campus Training & Placements", key: "campus_training", form: true, team: "Campus Team" },
//     ],
//   },
//   recruitment: {
//     title: "Recruitment Support",
//     options: [
//       { label: "🔍 Recruitment & Vendor Support", key: "recruitment_vendor", form: true, team: "Talent Acquisition" },
//       { label: "👥 HR Management", key: "hr_management", form: true, team: "Talent Acquisition" },
//     ],
//   },
//   hire: {
//     title: "Hire Students",
//     options: [
//       { label: "✅ Hire Trained Resource", key: "hire_trained", form: true, team: "Placement Team" },
//     ],
//   },
// };

// export default function ChatbotFlow() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Welcome to Careerschool! Chitti here 😊How may I support you today?" },
//     { sender: "options", options: FLOW.rootOptions },
//   ]);
//   const [isOpen, setIsOpen] = useState(false);

//   // ⭐ NEW — BOT IMAGE VISIBILITY CONTROL
//   const [showBot, setShowBot] = useState(false);

//   // Show bot image 2 sec after page load
//   useEffect(() => {
//     const timer = setTimeout(() => setShowBot(true), 1000);
//     return () => clearTimeout(timer);
//   }, []);
//   // ⭐ When chat closes → show bot after 2 seconds
// useEffect(() => {
//   if (!isOpen) {
//     // chat is closed → bring bot image up
//     setTimeout(() => setShowBot(true), 2000);
//   }
// }, [isOpen]);


//   const [ctx, setCtx] = useState({});
//   const endRef = useRef(null);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const push = (i) => setMessages((p) => [...p, i]);
//   const pushBot = (t) => push({ sender: "bot", text: t });
//   const pushUser = (t) => push({ sender: "user", text: t });
//   const pushOptions = (o) => push({ sender: "options", options: o });
//   const pushForm = (m) => push({ sender: "form", meta: m });

//   const restart = () => {
//     setMessages([
//       { sender: "bot", text: "Welcome to Careerschool! Chitti here 😊How may I support you today?" },
//       { sender: "options", options: FLOW.rootOptions },
//     ]);
//     setCtx({});
//   };

//   const keyToLabel = (key, list) => {
//     const found = list.find((l) => l.key === key);
//     return found ? found.label : key;
//   };

//   const handleRootSelect = (key) => {
//     pushUser(keyToLabel(key, FLOW.rootOptions));
//     if (!FLOW[key]) {
//       pushBot("Sorry, wrong option.");
//       return;
//     }
//    pushBot(`Please choose an option under "${FLOW[key].title}" 👇`);
//    pushOptions(FLOW[key].options);

//   };

//   const handleSubOption = (opt) => {
//     pushUser(opt.label);

//     if (opt.redirect) {
//       pushBot(`🔗 Redirecting to ${opt.label}...`);
//       push({ sender: "final", text: `${opt.label} page`, meta: { action: "redirect", url: opt.redirect } });
//       push({ sender: "endActions" });
//       return;
//     }

//     if (opt.form) {
//       setCtx({ lastChosen: opt });
//       pushBot(`Please fill this form for ${opt.label} — our ${opt.team} will contact you.`);
//       pushForm({ team: opt.team, type: opt.label });
//       return;
//     }
//   };

//   const submitForm = async (formData) => {
//     pushUser("✅ Form Submitted");
//     pushBot("Saving your details...");

//     const payload = {
//       ...ctx.lastChosen,
//       ...formData,
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       if (!GOOGLE_SCRIPT_URL.includes("xyz123")) {
//         await fetch(GOOGLE_SCRIPT_URL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       }
//       pushBot(`🎉 Thank you! Please wait for a call from our ${ctx.lastChosen.team}.`);
//     } catch {
//       pushBot("❌ Could not save details. We will still contact you.");
//     }

//     push({ sender: "endActions" });
//   };

//   const ChatBubble = ({ sender, text }) => {
//     const isBot = sender === "bot";
//     return (
//       <div className={`flex ${isBot ? "justify-start" : "justify-end"} w-full`}>
//         <div
//           className={
//             "px-4 py-2 text-sm max-w-[78%] rounded-2xl shadow-sm " +
//             (isBot ? "bg-blue-500 text-white rounded-bl-none" : "bg-gray-200 text-black rounded-br-none")
//           }
//         >
//           {text}
//         </div>
//       </div>
//     );
//   };

//   const OptionsRow = ({ options }) => (
//     <div className="flex flex-wrap gap-2 w-full">
//       {options.map((o, i) => (
//         <button
//           key={i}
//           onClick={() => {
//             const rootKeys = FLOW.rootOptions.map((r) => r.key);
//             if (rootKeys.includes(o.key)) handleRootSelect(o.key);
//             else handleSubOption(o);
//           }}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
//         >
//           {o.label}
//         </button>
//       ))}
//     </div>
//   );

//   const EndActions = () => (
//     <div className="flex gap-2 w-full justify-center">
//       <button
//         className="bg-gray-200 text-black px-3 py-1 rounded-md text-sm"
//         onClick={() => setIsOpen(false)}
//       >
//         End Chat
//       </button>
//       <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm" onClick={restart}>
//         Start New Chat
//       </button>
//     </div>
//   );

//   return (
//     <>
      
// {/* ⭐ BOT IMAGE AS BUTTON (ANIMATES EVERY TIME) */}
// <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">

//   {/* BOT IMAGE — CLICKABLE */}
//   <img
//     src="/ChatBot -final1.png"
//     alt="bot"
//     onClick={() => {
//       // When clicked → toggle chat
//       const newState = !isOpen;
//       setIsOpen(newState);

//       if (newState) {
//         // Chat OPEN → image slides DOWN and hides
//         setShowBot(false);
//       } else {
//         // Chat CLOSED → after 2 sec image slides UP
//         setTimeout(() => setShowBot(true), 2000);
//       }
//     }}
//     className={`
//       w-20 h-20 cursor-pointer mb-2
//       transition-all duration-700 ease-out
//       hover:scale-110
//       ${showBot ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"}
//     `}
//   />
// </div>

      

//       {isOpen && (
//         <div
//           className="fixed bottom-24 right-6 w-96 bg-[#f5f5f7] rounded-3xl shadow-2xl flex flex-col overflow-hidden 
//                      border border-gray-300 z-50 animate-slide-up"
//         >
//           <div className="bg-blue-600 text-white text-center py-3 font-semibold text-lg rounded-t-3xl relative">
//             Bot Name 
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute right-4 top-2 text-white text-xl font-bold hover:text-yellow-300"
//             >
//               ×
//             </button>
//           </div>

//           <div className="p-4 h-[460px] overflow-y-auto flex flex-col gap-3">
//             {messages.map((m, i) => {
//               if (m.sender === "bot" || m.sender === "user")
//                 return <ChatBubble key={i} sender={m.sender} text={m.text} />;

//               if (m.sender === "options")
//                 return <OptionsRow key={i} options={m.options} />;

//               if (m.sender === "form")
//                 return (
//                   <ContactForm key={i} meta={m.meta} onSubmit={submitForm} />
//                 );

//               if (m.sender === "final")
//                 return (
//                   <div key={i} className="bg-gray-100 p-3 rounded-xl text-sm">
//                     {m.text}
//                     <br />
//                     <a className="text-blue-600 underline" href={m.meta.url} target="_blank">
//                       Open Page →
//                     </a>
//                   </div>
//                 );

//               if (m.sender === "endActions")
//                 return <EndActions key={i} />;

//               return null;
//             })}

//             <div ref={endRef} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function ContactForm({ meta, onSubmit }) {
//   const [form, setForm] = useState({
//     fullName: "",
//     whatsapp: "",
//     alternatePhone: "",
//     email: "",
//     location: "",
//     college: "",
//     degree: "",
//     stream: "",
//     passingYear: "",
//     experience: "",
//     trainingCourse: "",
//     source: "",
//     questions: "",
//   });

//   const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSubmit(form);
//       }}
//       className="bg-white border p-3 rounded-xl flex flex-col gap-3"
//     >
//       <div className="text-xs text-gray-600">
//         Enroll Now for <b>{meta.type}</b>
//       </div>

//       <input name="fullName" placeholder="Full Name*" className="border p-2 rounded-md text-sm" required onChange={update} />
//       <input name="whatsapp" placeholder="Phone Number (WhatsApp)*" className="border p-2 rounded-md text-sm" required onChange={update} />
//       <input name="alternatePhone" placeholder="Alternate Contact Number" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="email" placeholder="Email" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="location" placeholder="Location" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="college" placeholder="Name of The College" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="degree" placeholder="Highest Qualifying Degree" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="stream" placeholder="Stream / Course of Study" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="passingYear" placeholder="Year of Passing" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="experience" placeholder="Total Experience" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="trainingCourse" placeholder="Training I would like to apply for (e.g., Data Analysis / Python / HR)" className="border p-2 rounded-md text-sm" onChange={update} />
//       <input name="source" placeholder="How did you hear about Careerschool Training Program?" className="border p-2 rounded-md text-sm" onChange={update} />

//       <textarea name="questions" placeholder="Any Questions?" className="border p-2 rounded-md text-sm" onChange={update}></textarea>

//       <button type="submit" className="bg-blue-600 text-white p-2 rounded-md text-sm">
//         Submit
//       </button>
//     </form>
//   );
// }


"use client";
import { useEffect, useRef, useState } from "react";

const FLOW = {
  rootOptions: [
    { label: "🎓 Trainings / Internships", key: "trainings" },
    { label: "💼 Jobs / Careers", key: "jobs" },
    { label: "🏫 College Campus Training", key: "college" },
    { label: "🧾 Recruitment Support", key: "recruitment" },
    { label: "🤝 Hire Students", key: "hire" },
  ],
  trainings: {
    title: "Trainings / Internships",
    options: [
      { label: "💻 IT & Software Trainings", key: "it_training", form: true, team: "Training Team" },
      { label: "🧩 Non-IT Trainings", key: "nonit_training", form: true, team: "Training Team" },
      { label: "🧑‍💼 Internships", key: "internships", form: true, team: "Training Team" },
      { label: "🔐 Student Login", key: "student_login", redirect: "/student-login" },
      { label: "🧭 Placement Jobs", key: "placement_jobs", redirect: "/placement-jobs" },
    ],
  },
  jobs: {
    title: "Jobs / Careers",
    options: [
      { label: "🧭 Placement Jobs", key: "placement_jobs_job", redirect: "/placement-jobs" },
      { label: "⚙ Non-IT Jobs", key: "nonit_jobs", form: true, team: "HR Team" },
      { label: "🏢 Work With Us", key: "work_with_us", form: true, team: "HR Team" },
    ],
  },
  college: {
    title: "College Campus Training",
    options: [
      { label: "🎯 Campus Drive / Placements", key: "campus_drive", form: true, team: "Campus Team" },
      { label: "📘 Campus Training & Placements", key: "campus_training", form: true, team: "Campus Team" },
    ],
  },
  recruitment: {
    title: "Recruitment Support",
    options: [
      { label: "🔍 Recruitment & Vendor Support", key: "recruitment_vendor", form: true, team: "Talent Acquisition" },
      { label: "👥 HR Management", key: "hr_management", form: true, team: "Talent Acquisition" },
    ],
  },
  hire: {
    title: "Hire Students",
    options: [
      { label: "✅ Hire Trained Resource", key: "hire_trained", form: true, team: "Placement Team" },
    ],
  },
};

export default function ChatbotFlow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to Careerschool! Chitti here 😊How may I support you today?" },
    { sender: "options", options: FLOW.rootOptions },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [ctx, setCtx] = useState({});
  const endRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowBot(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowBot(true), 2000);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const push = (i) => setMessages((p) => [...p, i]);
  const pushBot = (t) => push({ sender: "bot", text: t });
  const pushUser = (t) => push({ sender: "user", text: t });
  const pushOptions = (o) => push({ sender: "options", options: o });
  const pushForm = (m) => push({ sender: "form", meta: m });

  const restart = () => {
    setMessages([
      { sender: "bot", text: "Welcome to Careerschool! Chitti here 😊How may I support you today?" },
      { sender: "options", options: FLOW.rootOptions },
    ]);
    setCtx({});
  };

  const keyToLabel = (key, list) => {
    const found = list.find((l) => l.key === key);
    return found ? found.label : key;
  };

  const handleRootSelect = (key) => {
    pushUser(keyToLabel(key, FLOW.rootOptions));
    if (!FLOW[key]) {
      pushBot("Sorry, wrong option.");
      return;
    }
    pushBot(`Please choose an option under "${FLOW[key].title}" 👇`);
    pushOptions(FLOW[key].options);
  };

  const handleSubOption = (opt) => {
    pushUser(opt.label);

    if (opt.redirect) {
      pushBot(`🔗 Redirecting to ${opt.label}...`);
      push({ sender: "final", text: `${opt.label} page`, meta: { action: "redirect", url: opt.redirect } });
      push({ sender: "endActions" });
      return;
    }

    if (opt.form) {
      setCtx({ lastChosen: opt });
      pushBot(`Please fill this form for ${opt.label} — our ${opt.team} will contact you.`);
      pushForm({ team: opt.team, type: opt.label });
      return;
    }
  };

  const submitForm = async (formData) => {
    pushUser("✅ Form Submitted");
    pushBot("Saving your details...");

    // Map the chatbot form fields to match your database schema
    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.whatsapp,
      alternate_phone: formData.alternatePhone,
      location: formData.location,
      college: formData.college,
      degree: formData.degree,
      stream: formData.stream,
      passing_year: formData.passingYear,
      experience: formData.experience,
      course: formData.trainingCourse,
      source: formData.source,
      questions: formData.questions,
      team: ctx.lastChosen.team,
      type: ctx.lastChosen.type,
      key_label: ctx.lastChosen.label,
      country_code: "India +91", // Default or extract from form
      branch: formData.stream || "Not specified" // Using stream as branch
    };

    try {
      const response = await fetch('/api/quickformInd/save-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        pushBot(`🎉 Thank you! Your details have been saved. Our ${ctx.lastChosen.team} will contact you shortly.`);
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving enquiry:', error);
      pushBot("❌ Could not save details. Please try again or contact us directly.");
    }

    push({ sender: "endActions" });
  };

  const ChatBubble = ({ sender, text }) => {
    const isBot = sender === "bot";
    return (
      <div className={`flex ${isBot ? "justify-start" : "justify-end"} w-full`}>
        <div
          className={
            "px-4 py-2 text-sm max-w-[78%] rounded-2xl shadow-sm " +
            (isBot ? "bg-blue-500 text-white rounded-bl-none" : "bg-gray-200 text-black rounded-br-none")
          }
        >
          {text}
        </div>
      </div>
    );
  };

  const OptionsRow = ({ options }) => (
    <div className="flex flex-wrap gap-2 w-full">
      {options.map((o, i) => (
        <button
          key={i}
          onClick={() => {
            const rootKeys = FLOW.rootOptions.map((r) => r.key);
            if (rootKeys.includes(o.key)) handleRootSelect(o.key);
            else handleSubOption(o);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
        >
          {o.label}
        </button>
      ))}
    </div>
  );

  const EndActions = () => (
    <div className="flex gap-2 w-full justify-center">
      <button
        className="bg-gray-200 text-black px-3 py-1 rounded-md text-sm"
        onClick={() => setIsOpen(false)}
      >
        End Chat
      </button>
      <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm" onClick={restart}>
        Start New Chat
      </button>
    </div>
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
        <img
          src="/ChatBot -final1.png"
          alt="bot"
          onClick={() => {
            const newState = !isOpen;
            setIsOpen(newState);
            if (newState) {
              setShowBot(false);
            } else {
              setTimeout(() => setShowBot(true), 2000);
            }
          }}
          className={`
            w-20 h-20 cursor-pointer mb-2
            transition-all duration-700 ease-out
            hover:scale-110
            ${showBot ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"}
          `}
        />
      </div>

      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-96 bg-[#f5f5f7] rounded-3xl shadow-2xl flex flex-col overflow-hidden 
                     border border-gray-300 z-50 animate-slide-up"
        >
          <div className="bg-blue-600 text-white text-center py-3 font-semibold text-lg rounded-t-3xl relative">
            Chitti Bot
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-2 text-white text-xl font-bold hover:text-yellow-300"
            >
              ×
            </button>
          </div>

          <div className="p-4 h-[460px] overflow-y-auto flex flex-col gap-3">
            {messages.map((m, i) => {
              if (m.sender === "bot" || m.sender === "user")
                return <ChatBubble key={i} sender={m.sender} text={m.text} />;

              if (m.sender === "options")
                return <OptionsRow key={i} options={m.options} />;

              if (m.sender === "form")
                return (
                  <ContactForm key={i} meta={m.meta} onSubmit={submitForm} />
                );

              if (m.sender === "final")
                return (
                  <div key={i} className="bg-gray-100 p-3 rounded-xl text-sm">
                    {m.text}
                    <br />
                    <a className="text-blue-600 underline" href={m.meta.url} target="_blank">
                      Open Page →
                    </a>
                  </div>
                );

              if (m.sender === "endActions")
                return <EndActions key={i} />;

              return null;
            })}
            <div ref={endRef} />
          </div>
        </div>
      )}
    </>
  );
}

function ContactForm({ meta, onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    whatsapp: "",
    alternatePhone: "",
    email: "",
    location: "",
    college: "",
    degree: "",
    stream: "",
    passingYear: "",
    experience: "",
    trainingCourse: "",
    source: "",
    questions: "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="bg-white border p-3 rounded-xl flex flex-col gap-3"
    >
      <div className="text-xs text-gray-600">
        Enroll Now for <b>{meta.type}</b>
      </div>

      <input name="fullName" placeholder="Full Name*" className="border p-2 rounded-md text-sm" required onChange={update} />
      <input name="whatsapp" placeholder="Phone Number (WhatsApp)*" className="border p-2 rounded-md text-sm" required onChange={update} />
      <input name="alternatePhone" placeholder="Alternate Contact Number" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="email" placeholder="Email" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="location" placeholder="Location" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="college" placeholder="Name of The College" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="degree" placeholder="Highest Qualifying Degree" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="stream" placeholder="Stream / Course of Study" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="passingYear" placeholder="Year of Passing" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="experience" placeholder="Total Experience" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="trainingCourse" placeholder="Training I would like to apply for (e.g., Data Analysis / Python / HR)" className="border p-2 rounded-md text-sm" onChange={update} />
      <input name="source" placeholder="How did you hear about Careerschool Training Program?" className="border p-2 rounded-md text-sm" onChange={update} />

      <textarea name="questions" placeholder="Any Questions?" className="border p-2 rounded-md text-sm" onChange={update}></textarea>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded-md text-sm">
        Submit
      </button>
    </form>
  );
}