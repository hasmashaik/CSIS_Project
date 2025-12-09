// "use client";

// import { useState, useEffect } from "react";

// export default function ChatbotDetails() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterTeam, setFilterTeam] = useState("all");

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   const fetchSubmissions = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();
//       if (searchTerm) {
//         params.append('search', searchTerm);
//       }
      
//       const response = await fetch(`/api/chatbot-submissions?${params}`);
//       const result = await response.json();

//       if (result.success) {
//         setSubmissions(result.data);
//       } else {
//         console.error('Failed to fetch submissions:', result.message);
//         // Fallback to localStorage
//         const stored = localStorage.getItem('chatbotSubmissions');
//         if (stored) {
//           setSubmissions(JSON.parse(stored));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching submissions:', error);
//       // Fallback to localStorage
//       const stored = localStorage.getItem('chatbotSubmissions');
//       if (stored) {
//         setSubmissions(JSON.parse(stored));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchSubmissions();
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [searchTerm]);

//   const filteredSubmissions = submissions.filter(submission => {
//     const matchesTeam = filterTeam === "all" || submission.team === filterTeam;
//     return matchesTeam;
//   });

//   const exportToCSV = () => {
//     const headers = ["ID", "Name", "WhatsApp", "Email", "Team", "Type", "Category", "Status", "Date"];
//     const csvContent = [
//       headers.join(","),
//       ...filteredSubmissions.map(sub => [
//         sub.id,
//         `"${sub.full_name || ''}"`,
//         `"${sub.whatsapp || ''}"`,
//         `"${sub.email || ''}"`,
//         `"${sub.team || ''}"`,
//         `"${sub.type || ''}"`,
//         `"${sub.category || ''}"`,
//         `"${sub.status || 'Pending'}"`,
//         `"${new Date(sub.created_at).toLocaleDateString()}"`
//       ].join(","))
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `chatbot-submissions-${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
//         <h2 className="text-2xl font-bold text-gray-900">ChatBot Submissions</h2>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Search by name, email, or WhatsApp..."
//             className="px-4 py-2 border rounded-lg w-full md:w-64"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <select
//             className="px-4 py-2 border rounded-lg"
//             value={filterTeam}
//             onChange={(e) => setFilterTeam(e.target.value)}
//           >
//             <option value="all">All Teams</option>
//             <option value="HR Team">HR Team</option>
//             <option value="Training Team">Training Team</option>
//             <option value="Campus Team">Campus Team</option>
//           </select>
//           <button
//             onClick={exportToCSV}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 whitespace-nowrap"
//             disabled={filteredSubmissions.length === 0}
//           >
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center py-8 text-gray-600">Loading submissions...</div>
//       ) : filteredSubmissions.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           {searchTerm || filterTeam !== 'all' ? "No submissions found matching your filters" : "No submissions found"}
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Contact</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team & Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredSubmissions.map((submission) => (
//                 <tr key={submission.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{submission.id}</td>
//                   <td className="px-6 py-4">
//                     <div className="font-medium text-gray-900">{submission.full_name}</div>
//                     <div className="text-sm text-gray-900">{submission.whatsapp}</div>
//                     {submission.alternate_phone && (
//                       <div className="text-xs text-gray-500">Alt: {submission.alternate_phone}</div>
//                     )}
//                     <div className="text-sm text-gray-500">{submission.email}</div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900">Location: {submission.location}</div>
//                     <div className="text-sm text-gray-500">College: {submission.college}</div>
//                     <div className="text-sm text-gray-500">Course: {submission.training_course}</div>
//                     {submission.questions && (
//                       <div className="text-xs text-gray-400 mt-1">Q: {submission.questions}</div>
//                     )}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="font-medium text-gray-900">{submission.team}</div>
//                     <div className="text-sm text-gray-500">{submission.type}</div>
//                     <div className="text-xs text-gray-400">{submission.category}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <select
//                       value={submission.status || "Pending"}
//                       onChange={(e) => {
//                         // Here you would update the status in the database
//                         console.log('Update status:', submission.id, e.target.value);
//                       }}
//                       className="text-sm border rounded px-2 py-1"
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Contacted">Contacted</option>
//                       <option value="Enrolled">Enrolled</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(submission.created_at).toLocaleDateString()}
//                     <div className="text-xs text-gray-400">
//                       {new Date(submission.created_at).toLocaleTimeString()}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
//             Showing {filteredSubmissions.length} of {submissions.length} submissions
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- CONFIG (tweak these) ---------- */
// Desktop navbar height
const NAVBAR_HEIGHT = "80px";
// Mobile navbar height (used when viewport < 640px)
const NAVBAR_HEIGHT_MOBILE = "64px";

// Space to reserve at bottom so chat doesn't overlap the floating bot icon.
const BOT_ICON_GAP = "140px";
const BOT_ICON_GAP_MOBILE = "120px";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxyz123.../exec";

/* Avatar image paths — replace with your real asset paths */
const BOT_AVATAR = "/chatbot image/Simran last .png";
const USER_AVATAR = "/chatbot image/User PFP.png";

/* ---------- Flow (unchanged) ---------- */
const FLOW = {
  rootOptions: [
    { label: "💼 Job Seeker", key: "job_seeker", category: "Job Seeker" },
    { label: "🎓 Student / Learning", key: "student_learning", category: "Student / Learning" },
    { label: "🏫 Placement Officer / College Staff", key: "placement_officer", category: "Placement Officer / College Staff" },
  ],

  job_seeker: {
    title: "Job Seeker",
    options: [
      { label: "🖥️ IT Jobs", key: "it_jobs", form: true, team: "HR Team", type: "IT Jobs" },
      { label: "🛠️ Non-IT Jobs", key: "nonit_jobs", form: true, team: "HR Team", type: "Non-IT Jobs" },
    ],
  },

  student_learning: {
    title: "Student / Learning",
    options: [
      { label: "💻 IT & Software Trainings", key: "it_training", form: true, team: "Training Team", type: "IT & Software Trainings" },
      { label: "🧩 Non-IT Trainings", key: "nonit_training", form: true, team: "Training Team", type: "Non-IT Trainings" },
      { label: "🧑‍💼 Internships", key: "internships", form: true, team: "Training Team", type: "Internships" },
    ],
  },

  placement_officer: {
    title: "Placement Officer / College Staff",
    options: [
      { label: "🎯 Campus Drive / Placements", key: "campus_drive", form: true, team: "Campus Team", type: "Campus Drive / Placements" },
      { label: "📘 Campus Training & Placements", key: "campus_training", form: true, team: "Campus Team", type: "Campus Training & Placements" },
    ],
  },
};

/* ---------- Main Component (responsive) ---------- */
export default function ChatbotFlow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I'm Simran, your virtual assistant. Select who you are 👇" },
    { sender: "options", options: FLOW.rootOptions },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [ctx, setCtx] = useState({});
  const endRef = useRef(null);

  // responsive offsets (top and bottom) that update on resize
  const [topOffset, setTopOffset] = useState(NAVBAR_HEIGHT);
  const [bottomGap, setBottomGap] = useState(BOT_ICON_GAP);

  useEffect(() => {
    const applyOffsets = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setTopOffset(NAVBAR_HEIGHT_MOBILE);
        setBottomGap(BOT_ICON_GAP_MOBILE);
      } else {
        setTopOffset(NAVBAR_HEIGHT);
        setBottomGap(BOT_ICON_GAP);
      }
    };

    applyOffsets();
    window.addEventListener("resize", applyOffsets);
    return () => window.removeEventListener("resize", applyOffsets);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowBot(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setShowBot(true), 2000);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const push = (m) => setMessages((p) => [...p, m]);
  const pushBot = (t) => push({ sender: "bot", text: t });
  const pushUser = (t) => push({ sender: "user", text: t });
  const pushOptions = (o) => push({ sender: "options", options: o });
  const pushForm = (m) => push({ sender: "form", meta: m });

  const restart = () => {
    setMessages([
      { sender: "bot", text: "Hi, I'm Simran, your virtual assistant. Select who you are 👇" },
      { sender: "options", options: FLOW.rootOptions },
    ]);
    setCtx({});
    setIsOpen(true);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const endChat = () => {
    pushBot("This chat has ended. Click Start New Chat to begin again.");
    setTimeout(() => setIsOpen(false), 400);
  };

  const keyToLabel = (key, list) => {
    const found = list.find((l) => l.key === key);
    return found ? found.label : key;
  };

  const handleRootSelect = (key) => {
    const selected = FLOW.rootOptions.find((l) => l.key === key);
    pushUser(selected ? selected.label : key);
    
    if (!FLOW[key]) {
      pushBot("Sorry, wrong option.");
      return;
    }
    
    // Store category in context
    setCtx(prev => ({ ...prev, category: selected.category }));
    
    pushBot(`Please choose an option under "${FLOW[key].title}" 👇`);
    pushOptions(FLOW[key].options);
  };

  const handleSubOption = (opt) => {
    pushUser(opt.label);

    if (opt.redirect) {
      pushBot(`🔗 Opening ${opt.label}...`);
      push({ sender: "final", text: `${opt.label}`, meta: { action: "redirect", url: opt.redirect } });
      push({ sender: "endActions" });
      return;
    }

    if (opt.form) {
      setCtx({ 
        lastChosen: opt,
        category: ctx.category || "General"
      });
      pushBot(`Please fill this form — our ${opt.team} team will contact you.`);
      pushForm({ team: opt.team, type: opt.label });
      return;
    }
  };

  const submitForm = async (formData) => {
    pushUser("✅ Form Submitted");
    pushBot("Saving your details...");

    const payload = {
      ...ctx.lastChosen,
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save to MySQL database via API
      const dbResponse = await fetch('/api/chatbot-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          whatsapp: formData.whatsapp,
          alternatePhone: formData.alternatePhone,
          email: formData.email,
          location: formData.location,
          college: formData.college,
          degree: formData.degree,
          stream: formData.stream,
          passingYear: formData.passingYear,
          experience: formData.experience,
          trainingCourse: formData.trainingCourse || ctx.lastChosen.type,
          source: formData.source,
          questions: formData.questions,
          team: ctx.lastChosen.team,
          type: ctx.lastChosen.label,
          category: ctx.category || "General"
        })
      });

      const dbResult = await dbResponse.json();

      // Always save to localStorage for admin panel access (even if DB fails)
      try {
        const existing = JSON.parse(localStorage.getItem("chatbotSubmissions") || "[]");
        const submissionData = {
          ...formData,
          id: dbResult.data?.id || Date.now(),
          full_name: formData.fullName,
          whatsapp: formData.whatsapp,
          alternate_phone: formData.alternatePhone,
          email: formData.email,
          location: formData.location,
          college: formData.college,
          degree: formData.degree,
          stream: formData.stream,
          passing_year: formData.passingYear,
          experience: formData.experience,
          training_course: formData.trainingCourse || ctx.lastChosen.type,
          source: formData.source,
          questions: formData.questions,
          team: ctx.lastChosen.team,
          type: ctx.lastChosen.label,
          category: ctx.category || "General",
          status: "Pending",
          created_at: new Date().toISOString()
        };
        existing.push(submissionData);
        localStorage.setItem("chatbotSubmissions", JSON.stringify(existing));
      } catch (localStorageError) {
        console.warn("Failed to save to localStorage:", localStorageError);
      }

      // Send to Google Sheets if configured
      if (!GOOGLE_SCRIPT_URL.includes("xyz123")) {
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (googleError) {
          console.warn("Google Sheets submission failed:", googleError);
        }
      }

      pushBot(`🎉 Thank you! Our ${ctx.lastChosen.team} will contact you soon.`);
    } catch (error) {
      console.error("Submission error:", error);
      
      // Fallback: Save to localStorage only
      try {
        const existing = JSON.parse(localStorage.getItem("chatbotSubmissions") || "[]");
        existing.push({
          ...formData,
          id: Date.now(),
          full_name: formData.fullName,
          whatsapp: formData.whatsapp,
          team: ctx.lastChosen.team,
          type: ctx.lastChosen.label,
          category: ctx.category || "General",
          status: "Pending",
          created_at: new Date().toISOString()
        });
        localStorage.setItem("chatbotSubmissions", JSON.stringify(existing));
        pushBot("✅ Your details have been saved. Our team will contact you soon.");
      } catch (fallbackError) {
        pushBot("❌ We're experiencing technical issues. Please try again later or contact us directly.");
      }
    }

    push({ sender: "endActions" });
  };

  /* ---------- UI pieces ---------- */
  const ChatBubble = ({ sender, text }) => {
    const isBot = sender === "bot";
    return (
      <div className={`w-full flex ${isBot ? "justify-start" : "justify-end"} items-start gap-2`}>
        {isBot && (
          <img
            src="/chatbot image/Simran - 3.png"
            alt="Simran"
            className="w-8 h-8 rounded-full object-cover shadow-sm"
            style={{ flex: "0 0 36px" }}
          />
        )}
        <div
          className={
            "px-3 py-2 text-sm max-w-[78%] rounded-2xl shadow-sm " +
            (isBot ? "bg-blue-500 text-white rounded-bl-none" : "bg-gray-200 text-black rounded-br-none")
          }
        >
          {text}
        </div>
        {!isBot && (
          <img
            src={USER_AVATAR}
            alt="You"
            className="w-8 h-8 rounded-full object-cover shadow-sm"
            style={{ flex: "0 0 36px" }}
          />
        )}
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
      {/* Floating Bot Icon (responsive sizes / position) */}
      <div className="fixed bottom-4 right-4 z-[1300] flex flex-col items-center sm:bottom-6 sm:right-6">
        <img
          src={BOT_AVATAR}
          alt="bot"
          onClick={() => {
            const newState = !isOpen;
            setIsOpen(newState);
            if (newState) setShowBot(false);
            else setTimeout(() => setShowBot(true), 2000);
          }}
          className={`cursor-pointer mb-2 transition-all duration-700 ease-out hover:scale-110
            w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg`}
          style={{
            transformOrigin: "center",
            display: "block",
            // simple show/hide animation
            transform: showBot ? "translateY(0)" : "translateY(200%)",
            opacity: showBot ? 1 : 0,
          }}
        />
      </div>

      {/* Chat window fixed between NAVBAR and BOT_ICON_GAP */}
      {isOpen && (
        <div
          className="fixed right-4 sm:right-6 z-[1250] bg-[#f5f5f7] rounded-3xl shadow-xl border border-gray-300
            w-[94%] max-w-md sm:w-96"
          style={{
            top: topOffset,
            bottom: bottomGap,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            className="bg-blue-600 text-white py-3 rounded-t-3xl px-4 flex items-center justify-between"
            style={{ height: 56 }}
          >
            <div className="flex items-center gap-3">
              <img
                src={BOT_AVATAR}
                alt="Simran"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
              <div className="text-left">
                <div className="text-sm font-bold leading-tight">Simran</div>
                <div className="text-xs opacity-90">Virtual Assistant</div>
              </div>
            </div>
            <button className="text-white text-2xl leading-none" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          {/* Messages area */}
          <div className="p-3 sm:p-4 overflow-y-auto flex-1 flex flex-col gap-3">
            {messages.map((m, i) => {
              if (m.sender === "bot" || m.sender === "user")
                return <ChatBubble key={i} sender={m.sender} text={m.text} />;
              if (m.sender === "options") return <OptionsRow key={i} options={m.options} />;
              if (m.sender === "form") return <ContactForm key={i} meta={m.meta} onSubmit={submitForm} />;
              if (m.sender === "final")
                return (
                  <div key={i} className="bg-gray-100 p-3 rounded-xl text-sm">
                    {m.text}
                    <br />
                    <a className="text-blue-600 underline" href={m.meta.url} target="_blank" rel="noreferrer">
                      Open →
                    </a>
                  </div>
                );
              if (m.sender === "endActions") return <EndActions key={i} />;
              return null;
            })}
            <div ref={endRef} />
          </div>

          {/* Footer */}
          <div className="p-3 border-t bg-white rounded-b-3xl flex gap-2 justify-between" style={{ height: 64 }}>
            <button
              onClick={restart}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Start New Chat
            </button>
            <button
              onClick={endChat}
              className="flex-1 ml-2 bg-red-600 text-white py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              End Chat
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Contact form (responsive tweaks) ---------- */
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

  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await onSubmit(form);
        } finally {
          setLoading(false);
        }
      }}
      className="bg-white border p-3 sm:p-4 rounded-xl flex flex-col gap-3"
    >
      <div className="text-xs text-gray-600">
        Enroll Now for <b>{meta.type}</b>
      </div>

      <input
        name="fullName"
        placeholder="Full Name*"
        className="border p-2 rounded-md text-sm w-full"
        required
        onChange={update}
        disabled={loading}
      />
      <input
        name="whatsapp"
        placeholder="Phone Number (WhatsApp)*"
        className="border p-2 rounded-md text-sm w-full"
        required
        onChange={update}
        disabled={loading}
      />

      {/* two-column layout on wider screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input name="alternatePhone" placeholder="Alternate Contact Number" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />
        <input name="email" placeholder="Email" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />
        <input name="location" placeholder="Location" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />
        <input name="college" placeholder="College Name" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />
        <input name="degree" placeholder="Highest Degree" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />
        <input name="stream" placeholder="Stream" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />
        <input name="passingYear" placeholder="Year of Passing" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />
        <input name="experience" placeholder="Experience" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />
      </div>

      <input 
        name="trainingCourse" 
        placeholder="Course Interested" 
        className="border p-2 rounded-md text-sm" 
        onChange={update} 
        disabled={loading}
        value={form.trainingCourse}
      />
      <input name="source" placeholder="How did you hear about us?" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading} />

      <textarea name="questions" placeholder="Any Questions?" className="border p-2 rounded-md text-sm" onChange={update} disabled={loading}></textarea>

      <button 
        type="submit" 
        className="bg-blue-600 text-white p-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}