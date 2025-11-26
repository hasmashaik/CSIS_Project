// "use client";
// import { useState, useEffect, useRef } from "react";

// export default function CourseEnquiryPopup() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const reopenTimer = useRef(null);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     location: "",
//     experience: "",
//     branch: "",
//     course: "",
//     customCourse: "",
//     countryCode: "+91",
//   });

//   // 🕐 Show popup first after 10s
//   useEffect(() => {
//     const firstTimer = setTimeout(() => {
//       setIsOpen(true);
//     }, 10000);

//     return () => clearTimeout(firstTimer);
//   }, []);

//   // ⏰ Reopen popup after 30s when closed
//   const scheduleReopen = () => {
//     if (reopenTimer.current) clearTimeout(reopenTimer.current);
//     reopenTimer.current = setTimeout(() => {
//       setIsOpen(true);
//     }, 30000);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     scheduleReopen();
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('/api/enquiries', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (result.success) {
//         // ✅ NO ALERT POPUP - Just close the form quietly
//         console.log('✅ Form submitted successfully with ID:', result.id);
        
//         // Reset form
//         setFormData({
//           fullName: "",
//           phone: "",
//           email: "",
//           location: "",
//           experience: "",
//           branch: "",
//           course: "",
//           customCourse: "",
//           countryCode: "+91",
//         });
//         setIsOpen(false);
//         scheduleReopen();
//       } else {
//         console.error('❌ Form submission failed:', result.message);
//       }
//     } catch (error) {
//       console.error('❌ Network error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const countryCodes = [
//     { code: "+91", name: "India" },
//     { code: "+1", name: "United States" },
//     { code: "+44", name: "United Kingdom" },
//     { code: "+61", name: "Australia" },
//     { code: "+971", name: "UAE" },
//     { code: "+974", name: "Qatar" },
//     { code: "+965", name: "Kuwait" },
//     { code: "+966", name: "Saudi Arabia" },
//     { code: "+880", name: "Bangladesh" },
//     { code: "+94", name: "Sri Lanka" },
//     { code: "+92", name: "Pakistan" },
//     { code: "+977", name: "Nepal" },
//     { code: "+60", name: "Malaysia" },
//     { code: "+65", name: "Singapore" },
//     { code: "+81", name: "Japan" },
//     { code: "+86", name: "China" },
//     { code: "+62", name: "Indonesia" },
//     { code: "+63", name: "Philippines" },
//     { code: "+27", name: "South Africa" },
//     { code: "+49", name: "Germany" },
//     { code: "+33", name: "France" },
//     { code: "+39", name: "Italy" },
//     { code: "+7", name: "Russia" },
//     { code: "+64", name: "New Zealand"},
//   ];

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4 sm:px-0">
//           <div className="bg-blue-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[85vh] text-white">
//             {/* ❌ Close Button */}
//             <button
//               onClick={handleClose}
//               className="absolute top-2 right-3 text-white hover:text-gray-200 text-lg"
//               disabled={isSubmitting}
//             >
//               ✕
//             </button>

//             {/* 🧩 Logo */}
//             <div className="flex justify-center mb-2 mt-2">
//               <img
//                 src="/Form Icon 2.png"
//                 alt="CareerSchool Logo"
//                 className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
//               />
//             </div>

//             <h2 className="text-lg sm:text-xl font-semibold text-center mb-1 text-yellow-300">
//               Quick Enquiry
//             </h2>
//             <p className="text-gray-200 text-center mb-4 text-xs sm:text-sm">
//               Fill in your details below to get course info
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-2">
//               <input
//                 type="text"
//                 name="fullName"
//                 required
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//                 disabled={isSubmitting}
//               />

//               {/* 🌍 Country + Phone */}
//               <div className="flex bg-white rounded-md">
//                 <select
//                   name="countryCode"
//                   value={formData.countryCode}
//                   onChange={handleChange}
//                   className="bg-transparent text-gray-700 px-2 outline-none text-sm w-24"
//                   disabled={isSubmitting}
//                 >
//                   {countryCodes.map((c) => (
//                     <option key={c.code} value={c.code}>
//                       {c.name} {c.code}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   maxLength="10"
//                   placeholder="WhatsApp Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="flex-1 outline-none py-2 px-2 text-sm bg-white text-black rounded-md"
//                   disabled={isSubmitting}
//                 />
//               </div>

//               <input
//                 type="email"
//                 name="email"
//                 required
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//                 disabled={isSubmitting}
//               />

//               <input
//                 type="text"
//                 name="location"
//                 required
//                 placeholder="Location (City)"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//                 disabled={isSubmitting}
//               />

//               <select
//                 name="experience"
//                 required
//                 value={formData.experience}
//                 onChange={handleChange}
//                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//                 disabled={isSubmitting}
//               >
//                 <option value="">Total Experience</option>
//                 <option value="Fresher">Fresher</option>
//                 <option value="1-2 Years">1–2 Years</option>
//                 <option value="3-5 Years">3–5 Years</option>
//                 <option value="5+ Years">5+ Years</option>
//               </select>

//               <select
//                 name="branch"
//                 required
//                 value={formData.branch}
//                 onChange={handleChange}
//                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//                 disabled={isSubmitting}
//               >
//                 <option value="">Mode of Training</option>
//                 <option value="offline">Offline</option>
//                 <option value="Online">Online</option>
//               </select>

//               <select
//                 name="course"
//                 required
//                 value={formData.course}
//                 onChange={handleChange}
//                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//                 disabled={isSubmitting}
//               >
//                 <option value="">Select Course / Training</option>
//                 <option value="Data Analytics">Data Analytics</option>
//                 <option value="HR Analytics">HR Analytics</option>
//                 <option value="Python Fullstack+AI">Python Fullstack+AI</option>
//                 <option value="Java Fullstack">Java Fullstack</option>
//                 <option value="Zoho payroll Training">Zoho payroll Training</option>
//                 <option value="Digital Marketing">Digital Marketing</option>
//                 <option value="Business Analytics">Business Analytics</option>
//                 <option value="Other">Others</option>
//               </select>

//               {formData.course === "Other" && (
//                 <input
//                   type="text"
//                   name="customCourse"
//                   required
//                   placeholder="Enter your course name"
//                   value={formData.customCourse}
//                   onChange={handleChange}
//                   className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//                   disabled={isSubmitting}
//                 />
//               )}

//               <div className="flex justify-center mt-4">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-1/2 bg-yellow-400 text-black py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }





// "use client";
// import { useState, useEffect, useRef } from "react";

// export default function CourseEnquiryPopup() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const timerRef = useRef(null);

//   const [formFields, setFormFields] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     location: "",
//     experience: "",
//     branch: "",
//     course: "",
//     customCourse: "",
//     countryCode: "+91",
//   });

//   // Show popup after 10 seconds
//   useEffect(() => {
//     const initialTimer = setTimeout(() => {
//       setIsVisible(true);
//     }, 10000);

//     return () => clearTimeout(initialTimer);
//   }, []);

//   const setupReopenTimer = () => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(() => {
//       setIsVisible(true);
//     }, 30000);
//   };

//   const closePopup = () => {
//     setIsVisible(false);
//     setupReopenTimer();
//   };

//   const handleInputChange = (e) => {
//     setFormFields({ ...formFields, [e.target.name]: e.target.value });
//   };

//   const processFormSubmission = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('/api/enquiries', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formFields),
//       });

//       const result = await response.json();

//       if (result.success) {
//         // Reset form and close
//         setFormFields({
//           fullName: "",
//           phone: "",
//           email: "",
//           location: "",
//           experience: "",
//           branch: "",
//           course: "",
//           customCourse: "",
//           countryCode: "+91",
//         });
//         setIsVisible(false);
//         setupReopenTimer();
//       }
//     } catch (error) {
//       console.error('Form submission error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const countryList = [
//     { code: "+91", name: "India" },
//     { code: "+1", name: "United States" },
//     { code: "+44", name: "United Kingdom" },
//     { code: "+61", name: "Australia" },
//     { code: "+971", name: "UAE" },
//     { code: "+974", name: "Qatar" },
//     { code: "+965", name: "Kuwait" },
//     { code: "+966", name: "Saudi Arabia" },
//     { code: "+64", name: "New Zealand" }
//   ];

//   if (!isVisible) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4 sm:px-0">
//         <div className="bg-blue-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[85vh] text-white">
//           {/* Close button */}
//           <button
//             onClick={closePopup}
//             className="absolute top-2 right-3 text-white hover:text-gray-200 text-lg"
//             disabled={isSubmitting}
//           >
//             ✕
//           </button>

//           {/* Logo section */}
//           <div className="flex justify-center mb-2 mt-2">
//             <img
//               src="/Form Icon 2.png"
//               alt="CareerSchool Logo"
//               className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
//             />
//           </div>

//           <h2 className="text-lg sm:text-xl font-semibold text-center mb-1 text-yellow-300">
//             Quick Enquiry
//           </h2>
//           <p className="text-gray-200 text-center mb-4 text-xs sm:text-sm">
//             Fill in your details below to get course information
//           </p>

//           <form onSubmit={processFormSubmission} className="space-y-2">
//             <input
//               type="text"
//               name="fullName"
//               required
//               placeholder="Full Name"
//               value={formFields.fullName}
//               onChange={handleInputChange}
//               className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//               disabled={isSubmitting}
//             />

//             {/* Phone number with country code */}
//             <div className="flex bg-white rounded-md">
//               <select
//                 name="countryCode"
//                 value={formFields.countryCode}
//                 onChange={handleInputChange}
//                 className="bg-transparent text-gray-700 px-2 outline-none text-sm w-24"
//                 disabled={isSubmitting}
//               >
//                 {countryList.map((country) => (
//                   <option key={country.code} value={country.code}>
//                     {country.name} {country.code}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="tel"
//                 name="phone"
//                 required
//                 maxLength="10"
//                 placeholder="Phone Number"
//                 value={formFields.phone}
//                 onChange={handleInputChange}
//                 className="flex-1 outline-none py-2 px-2 text-sm bg-white text-black rounded-md"
//                 disabled={isSubmitting}
//               />
//             </div>

//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="Email Address"
//               value={formFields.email}
//               onChange={handleInputChange}
//               className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//               disabled={isSubmitting}
//             />

//             <input
//               type="text"
//               name="location"
//               required
//               placeholder="Your City"
//               value={formFields.location}
//               onChange={handleInputChange}
//               className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//               disabled={isSubmitting}
//             />

//             <select
//               name="experience"
//               required
//               value={formFields.experience}
//               onChange={handleInputChange}
//               className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//               disabled={isSubmitting}
//             >
//               <option value="">Select Your Experience</option>
//               <option value="Fresher">No Experience</option>
//               <option value="1-2 Years">1-2 Years</option>
//               <option value="3-5 Years">3-5 Years</option>
//               <option value="5+ Years">5+ Years Experience</option>
//             </select>

//             <select
//               name="branch"
//               required
//               value={formFields.branch}
//               onChange={handleInputChange}
//               className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//               disabled={isSubmitting}
//             >
//               <option value="">Preferred Learning Mode</option>
//               <option value="offline">Classroom Training</option>
//               <option value="Online">Online Classes</option>
//             </select>

//             <select
//               name="course"
//               required
//               value={formFields.course}
//               onChange={handleInputChange}
//               className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//               disabled={isSubmitting}
//             >
//               <option value="">Select Your Course</option>
//               <option value="Data Analytics">Data Analytics</option>
//               <option value="HR Analytics">HR Analytics</option>
//               <option value="Python Fullstack+AI">Python Fullstack with AI</option>
//               <option value="Java Fullstack">Java Fullstack</option>
//               <option value="Digital Marketing">Digital Marketing</option>
//               <option value="Business Analytics">Business Analytics</option>
//               <option value="Other">Other Courses</option>
//             </select>

//             {formFields.course === "Other" && (
//               <input
//                 type="text"
//                 name="customCourse"
//                 required
//                 placeholder="Please specify your course"
//                 value={formFields.customCourse}
//                 onChange={handleInputChange}
//                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
//                 disabled={isSubmitting}
//               />
//             )}

//             <div className="flex justify-center mt-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-1/2 bg-yellow-400 text-black py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";

export default function CourseEnquiryPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // ✅ NEW POPUP

  const timerRef = useRef(null);

  const [formFields, setFormFields] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    experience: "",
    branch: "",
    course: "",
    customCourse: "",
    countryCode: "+91",
  });

  // Show popup after 10 seconds
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(initialTimer);
  }, []);

  const setupReopenTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 30000);
  };

  const closePopup = () => {
    setIsVisible(false);
    setupReopenTimer();
  };

  const handleInputChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const processFormSubmission = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setFormFields({
          fullName: "",
          phone: "",
          email: "",
          location: "",
          experience: "",
          branch: "",
          course: "",
          customCourse: "",
          countryCode: "+91",
        });

        // Close form popup and open success popup
        setIsVisible(false);
        setShowSuccessPopup(true); // ✅ SHOW SUCCESS POPUP

        setupReopenTimer();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const countryList = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
    { code: "+61", name: "Australia" },
    { code: "+971", name: "UAE" },
    { code: "+974", name: "Qatar" },
    { code: "+965", name: "Kuwait" },
    { code: "+966", name: "Saudi Arabia" },
    { code: "+64", name: "New Zealand" },
  ];

  return (
    <>
      {/* ================== MAIN ENQUIRY POPUP ================== */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4 sm:px-0">
          <div className="bg-blue-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[85vh] text-white">

            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-3 text-white hover:text-gray-200 text-lg"
              disabled={isSubmitting}
            >
              ✕
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-2 mt-2">
              <img
                src="/Form Icon 2.png"
                alt="CareerSchool Logo"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              />
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-center mb-1 text-yellow-300">
              Quick Enquiry
            </h2>
            <p className="text-gray-200 text-center mb-4 text-xs sm:text-sm">
              Fill in your details below to get course information
            </p>

            <form onSubmit={processFormSubmission} className="space-y-2">

              <input
                type="text"
                name="fullName"
                required
                placeholder="Full Name"
                value={formFields.fullName}
                onChange={handleInputChange}
                className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                disabled={isSubmitting}
              />

              {/* Phone number */}
              <div className="flex bg-white rounded-md">
                <select
                  name="countryCode"
                  value={formFields.countryCode}
                  onChange={handleInputChange}
                  className="bg-transparent text-gray-700 px-2 outline-none text-sm w-24"
                  disabled={isSubmitting}
                >
                  {countryList.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength="10"
                  placeholder="Phone Number"
                  value={formFields.phone}
                  onChange={handleInputChange}
                  className="flex-1 outline-none py-2 px-2 text-sm bg-white text-black rounded-md"
                  disabled={isSubmitting}
                />
              </div>

              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formFields.email}
                onChange={handleInputChange}
                className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                disabled={isSubmitting}
              />

              <input
                type="text"
                name="location"
                required
                placeholder="Your City"
                value={formFields.location}
                onChange={handleInputChange}
                className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                disabled={isSubmitting}
              />

              <select
                name="experience"
                required
                value={formFields.experience}
                onChange={handleInputChange}
                className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                disabled={isSubmitting}
              >
                <option value="">Select Your Experience</option>
                <option value="Fresher">No Experience</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5+ Years">5+ Years Experience</option>
              </select>

              <select
                name="branch"
                required
                value={formFields.branch}
                onChange={handleInputChange}
                className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                disabled={isSubmitting}
              >
                <option value="">Preferred Learning Mode</option>
                <option value="offline">Classroom Training</option>
                <option value="Online">Online Classes</option>
              </select>

              <select
                name="course"
                required
                value={formFields.course}
                onChange={handleInputChange}
                className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                disabled={isSubmitting}
              >
                <option value="">Select Your Course</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="HR Analytics">HR Analytics</option>
                <option value="Python Fullstack+AI">Python Fullstack with AI</option>
                <option value="Java Fullstack">Java Fullstack</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Business Analytics">Business Analytics</option>
                <option value="Other">Other Courses</option>
              </select>

              {formFields.course === "Other" && (
                <input
                  type="text"
                  name="customCourse"
                  required
                  placeholder="Please specify your course"
                  value={formFields.customCourse}
                  onChange={handleInputChange}
                  className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                  disabled={isSubmitting}
                />
              )}

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 bg-yellow-400 text-black py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================== SUCCESS POPUP ================== */}
      {showSuccessPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-xs p-5 text-center animate-fadeIn">
      <h3 className="text-lg font-semibold text-blue-600 mb-2">
        Form Submitted Successfully!
      </h3>

      <p className="text-gray-700 mb-4 text-sm">
        Thank you for your enquiry. We will contact you soon.
      </p>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
        onClick={() => setShowSuccessPopup(false)}
      >
        OK
      </button>
    </div>
  </div>
)}

    </>
  );
}
