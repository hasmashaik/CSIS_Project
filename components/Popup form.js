// // "use client";
// // import { useState, useEffect, useRef } from "react";

// // export default function CourseEnquiryPopup() {
// //   const [isVisible, setIsVisible] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [showSuccessPopup, setShowSuccessPopup] = useState(false); // ✅ NEW POPUP

// //   const timerRef = useRef(null);

// //   const [formFields, setFormFields] = useState({
// //     fullName: "",
// //     phone: "",
// //     email: "",
// //     location: "",
// //     experience: "",
// //     branch: "",
// //     course: "",
// //     customCourse: "",
// //     countryCode: "+91",
// //   });

// //   // Show popup after 10 seconds
// //   useEffect(() => {
// //     const initialTimer = setTimeout(() => {
// //       setIsVisible(true);
// //     }, 10000);

// //     return () => clearTimeout(initialTimer);
// //   }, []);

// //   const setupReopenTimer = () => {
// //     if (timerRef.current) clearTimeout(timerRef.current);
// //     timerRef.current = setTimeout(() => {
// //       setIsVisible(true);
// //     }, 30000);
// //   };

// //   const closePopup = () => {
// //     setIsVisible(false);
// //     setupReopenTimer();
// //   };

// //   const handleInputChange = (e) => {
// //     setFormFields({ ...formFields, [e.target.name]: e.target.value });
// //   };

// //   const processFormSubmission = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     try {
// //       const response = await fetch("/api/enquiries", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formFields),
// //       });

// //       const result = await response.json();

// //       if (result.success) {
// //         // Reset form
// //         setFormFields({
// //           fullName: "",
// //           phone: "",
// //           email: "",
// //           location: "",
// //           experience: "",
// //           branch: "",
// //           course: "",
// //           customCourse: "",
// //           countryCode: "+91",
// //         });

// //         // Close form popup and open success popup
// //         setIsVisible(false);
// //         setShowSuccessPopup(true); // ✅ SHOW SUCCESS POPUP

// //         setupReopenTimer();
// //       }
// //     } catch (error) {
// //       console.error("Form submission error:", error);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const countryList = [
// //     { code: "+91", name: "India" },
// //     { code: "+1", name: "United States" },
// //     { code: "+44", name: "United Kingdom" },
// //     { code: "+61", name: "Australia" },
// //     { code: "+971", name: "UAE" },
// //     { code: "+974", name: "Qatar" },
// //     { code: "+965", name: "Kuwait" },
// //     { code: "+966", name: "Saudi Arabia" },
// //     { code: "+64", name: "New Zealand" },
// //   ];

// //   return (
// //     <>
// //       {/* ================== MAIN ENQUIRY POPUP ================== */}
// //       {isVisible && (
// //         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4 sm:px-0">
// //           <div className="bg-blue-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[85vh] text-white">

// //             {/* Close button */}
// //             <button
// //               onClick={closePopup}
// //               className="absolute top-2 right-3 text-white hover:text-gray-200 text-lg"
// //               disabled={isSubmitting}
// //             >
// //               ✕
// //             </button>

// //             {/* Logo */}
// //             <div className="flex justify-center mb-2 mt-2">
// //               <img
// //                 src="/Form Icon 2.png"
// //                 alt="CareerSchool Logo"
// //                 className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
// //               />
// //             </div>

// //             <h2 className="text-lg sm:text-xl font-semibold text-center mb-1 text-yellow-300">
// //               Quick Enquiry
// //             </h2>
// //             <p className="text-gray-200 text-center mb-4 text-xs sm:text-sm">
// //               Fill in your details below to get course information
// //             </p>

// //             <form onSubmit={processFormSubmission} className="space-y-2">

// //               <input
// //                 type="text"
// //                 name="fullName"
// //                 required
// //                 placeholder="Full Name"
// //                 value={formFields.fullName}
// //                 onChange={handleInputChange}
// //                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
// //                 disabled={isSubmitting}
// //               />

// //               {/* Phone number */}
// //               <div className="flex bg-white rounded-md">
// //                 <select
// //                   name="countryCode"
// //                   value={formFields.countryCode}
// //                   onChange={handleInputChange}
// //                   className="bg-transparent text-gray-700 px-2 outline-none text-sm w-24"
// //                   disabled={isSubmitting}
// //                 >
// //                   {countryList.map((country) => (
// //                     <option key={country.code} value={country.code}>
// //                       {country.name} {country.code}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <input
// //                   type="tel"
// //                   name="phone"
// //                   required
// //                   maxLength="10"
// //                   placeholder="Phone Number"
// //                   value={formFields.phone}
// //                   onChange={handleInputChange}
// //                   className="flex-1 outline-none py-2 px-2 text-sm bg-white text-black rounded-md"
// //                   disabled={isSubmitting}
// //                 />
// //               </div>

// //               <input
// //                 type="email"
// //                 name="email"
// //                 required
// //                 placeholder="Email Address"
// //                 value={formFields.email}
// //                 onChange={handleInputChange}
// //                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
// //                 disabled={isSubmitting}
// //               />

// //               <input
// //                 type="text"
// //                 name="location"
// //                 required
// //                 placeholder="Your City"
// //                 value={formFields.location}
// //                 onChange={handleInputChange}
// //                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
// //                 disabled={isSubmitting}
// //               />

// //               <select
// //                 name="experience"
// //                 required
// //                 value={formFields.experience}
// //                 onChange={handleInputChange}
// //                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
// //                 disabled={isSubmitting}
// //               >
// //                 <option value="">Select Your Experience</option>
// //                 <option value="Fresher">No Experience</option>
// //                 <option value="1-2 Years">1-2 Years</option>
// //                 <option value="3-5 Years">3-5 Years</option>
// //                 <option value="5+ Years">5+ Years Experience</option>
// //               </select>

// //               <select
// //                 name="branch"
// //                 required
// //                 value={formFields.branch}
// //                 onChange={handleInputChange}
// //                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
// //                 disabled={isSubmitting}
// //               >
// //                 <option value="">Preferred Learning Mode</option>
// //                 <option value="offline">Classroom Training</option>
// //                 <option value="Online">Online Classes</option>
// //               </select>

// //               <select
// //                 name="course"
// //                 required
// //                 value={formFields.course}
// //                 onChange={handleInputChange}
// //                 className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
// //                 disabled={isSubmitting}
// //               >
// //                 <option value="">Select Your Course</option>
// //                 <option value="Data Analytics">Data Analytics</option>
// //                 <option value="HR Analytics">HR Analytics</option>
// //                 <option value="Python Fullstack+AI">Python Fullstack with AI</option>
// //                 <option value="Java Fullstack">Java Fullstack</option>
// //                 <option value="Digital Marketing">Digital Marketing</option>
// //                 <option value="Business Analytics">Business Analytics</option>
// //                 <option value="Other">Other Courses</option>
// //               </select>

// //               {formFields.course === "Other" && (
// //                 <input
// //                   type="text"
// //                   name="customCourse"
// //                   required
// //                   placeholder="Please specify your course"
// //                   value={formFields.customCourse}
// //                   onChange={handleInputChange}
// //                   className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
// //                   disabled={isSubmitting}
// //                 />
// //               )}

// //               <div className="flex justify-center mt-4">
// //                 <button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   className="w-1/2 bg-yellow-400 text-black py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
// //                 >
// //                   {isSubmitting ? "Submitting..." : "Submit"}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* ================== SUCCESS POPUP ================== */}
// //       {showSuccessPopup && (
// //   <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
// //     <div className="bg-white rounded-xl shadow-2xl w-full max-w-xs p-5 text-center animate-fadeIn">
// //       <h3 className="text-lg font-semibold text-blue-600 mb-2">
// //         Form Submitted Successfully!
// //       </h3>

// //       <p className="text-gray-700 mb-4 text-sm">
// //         Thank you for your enquiry. We will contact you soon.
// //       </p>

// //       <button
// //         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
// //         onClick={() => setShowSuccessPopup(false)}
// //       >
// //         OK
// //       </button>
// //     </div>
// //   </div>
// // )}

// //     </>
// //   );
// // }



// "use client";
// import { useEffect, useState } from "react";

// /**
//  * CourseEnquiryPopup component
//  *
//  * Props:
//  * - open?: boolean (controlled)
//  * - onOpenChange?: (bool) => void
//  * - showInlineTriggers?: boolean (default: false)
//  * - initialEnquiry?: string (optional initial enquiry when parent opens)
//  */
// export default function CourseEnquiryPopup({
//   open,
//   onOpenChange,
//   showInlineTriggers = false,
//   initialEnquiry = "",
// }) {
//   // images (update paths if needed)
//   const FORM_HEADER_MOBILE = "/form-header-mobile.png";
//   const FORM_HEADER_DESKTOP = "/form-header-desktop.png";
//   const SUBMIT_MOBILE = "/submit-header-mobile.png";
//   const SUBMIT_DESKTOP = "/submit-header-desktop.png";

//   // internal state
//   const [internalOpen, setInternalOpen] = useState(false);
//   const [showImage, setShowImage] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   // form data + validation
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     enquiryFor: "", // "" | "Courses / Internship" | "Jobs"
//     location: "",
//     state: "",
//     experience: "",
//     branch: "",
//     course: "",
//     customCourse: "",
//     preferredRole: "",
//     currentEmployer: "",
//     countryCode: "+91",
//   });

//   const [errors, setErrors] = useState({});

//   const isControlled = typeof open === "boolean";
//   const isOpen = isControlled ? open : internalOpen;

//   // uncontrolled auto-open after 10s (legacy behaviour)
//   useEffect(() => {
//     if (isControlled) return;
//     const timer = setTimeout(() => {
//       setInternalOpen(true);
//       setShowImage(true);
//     }, 10000);
//     return () => clearTimeout(timer);
//   }, [isControlled]);

//   // sync parent's initialEnquiry into form when provided
//   useEffect(() => {
//     if (!initialEnquiry) return;
//     setFormData((p) => {
//       const next = { ...p, enquiryFor: initialEnquiry };
//       if (initialEnquiry === "Courses / Internship") {
//         next.preferredRole = "";
//         next.currentEmployer = "";
//       } else if (initialEnquiry === "Jobs") {
//         next.course = "";
//         next.customCourse = "";
//       }
//       return next;
//     });
//   }, [initialEnquiry]);

//   // lock scrolling while modal open (prevent horizontal & vertical)
//   useEffect(() => {
//     if (isOpen) {
//       document.documentElement.style.overflow = "hidden";
//       document.documentElement.style.overflowX = "hidden";
//       document.body.style.overflow = "hidden";
//       document.body.style.overflowX = "hidden";
//     } else {
//       document.documentElement.style.overflow = "";
//       document.documentElement.style.overflowX = "";
//       document.body.style.overflow = "";
//       document.body.style.overflowX = "";
//     }
//     return () => {
//       document.documentElement.style.overflow = "";
//       document.documentElement.style.overflowX = "";
//       document.body.style.overflow = "";
//       document.body.style.overflowX = "";
//     };
//   }, [isOpen]);

//   const setOpen = (value) => {
//     if (isControlled) {
//       if (typeof onOpenChange === "function") onOpenChange(value);
//     } else {
//       setInternalOpen(value);
//     }
//   };

//   const handleClose = () => {
//     setSubmitted(false);
//     setOpen(false);
//   };

//   const openWith = (enquiryType) => {
//     setFormData((p) => {
//       const next = { ...p, enquiryFor: enquiryType ?? p.enquiryFor };
//       if (enquiryType === "Courses / Internship") {
//         next.preferredRole = "";
//         next.currentEmployer = "";
//       } else if (enquiryType === "Jobs") {
//         next.course = "";
//         next.customCourse = "";
//       }
//       return next;
//     });
//     setOpen(true);
//     setShowImage(true);
//   };

//   const validateName = (value) => {
//     if (!value.trim()) return "Name is required";
//     if (!/^[A-Za-z\s]+$/.test(value)) return "Only alphabets and spaces allowed";
//     return "";
//   };

//   const validatePhone = (value) => {
//     if (!value) return "Phone is required";
//     if (!/^\d{10}$/.test(value)) return "Enter a 10 digit phone number";
//     return "";
//   };

//   const validateEmail = (value) => {
//     if (!value.trim()) return "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
//     return "";
//   };

//   const handleChange = (e) => {
//     const { name, value: rawValue } = e.target;
//     let value = rawValue;

//     if (name === "fullName") {
//       value = rawValue.replace(/[^A-Za-z\s]/g, "");
//       setFormData((p) => ({ ...p, [name]: value }));
//       setErrors((p) => ({ ...p, fullName: validateName(value) }));
//       return;
//     }

//     if (name === "phone") {
//       value = rawValue.replace(/\D/g, "").slice(0, 10);
//       setFormData((p) => ({ ...p, [name]: value }));
//       setErrors((p) => ({ ...p, phone: validatePhone(value) }));
//       return;
//     }

//     if (name === "email") {
//       value = rawValue.trim().toLowerCase();
//       setFormData((p) => ({ ...p, [name]: value }));
//       setErrors((p) => ({ ...p, email: validateEmail(value) }));
//       return;
//     }

//     if (name === "enquiryFor") {
//       const next = { ...formData, enquiryFor: value };
//       if (value === "Courses / Internship") {
//         next.preferredRole = "";
//         next.currentEmployer = "";
//       } else if (value === "Jobs") {
//         next.course = "";
//         next.customCourse = "";
//       }
//       setFormData(next);
//       return;
//     }

//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const nameErr = validateName(formData.fullName);
//     const phoneErr = validatePhone(formData.phone);
//     const emailErr = validateEmail(formData.email);
//     const stateErr = !formData.state ? "Please select your state" : "";

//     let extraErr = {};
//     if (formData.enquiryFor === "Courses / Internship") {
//       if (!formData.course) extraErr.course = "Please select a course or internship";
//       if (formData.course === "Other" && !formData.customCourse) extraErr.customCourse = "Please enter the course name";
//     } else if (formData.enquiryFor === "Jobs") {
//       if (!formData.preferredRole) extraErr.preferredRole = "Please enter your preferred role";
//     } else {
//       extraErr.enquiryFor = "Please select enquiry type";
//     }

//     setErrors({
//       fullName: nameErr,
//       phone: phoneErr,
//       email: emailErr,
//       state: stateErr,
//       ...extraErr,
//     });

//     if (nameErr || phoneErr || emailErr || stateErr || Object.keys(extraErr).length) return;

//     setSubmitted(true);

//     // TODO: replace with real submit (fetch/axios) if needed
//   };

//   useEffect(() => {
//     if (isOpen) setShowImage(true);
//   }, [isOpen]);

//   return (
//     <>
//       {/* Inline triggers — off by default */}
//       {showInlineTriggers && (
//         <div className="fixed bottom-24 left-4 z-[99999] flex flex-col gap-2">
//           <button onClick={() => openWith("Courses / Internship")} className="bg-blue-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-blue-600">
//             Courses / Internship
//           </button>
//           <button onClick={() => openWith("Jobs")} className="bg-green-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-green-600">
//             IT / Non-IT Jobs
//           </button>
//         </div>
//       )}

//       {/* Floating icon trigger (existing behaviour) */}
//       {!isControlled && showImage && !isOpen && (
//         <div
//           onClick={() => setOpen(true)}
//           role="button"
//           tabIndex={0}
//           aria-label="Open enquiry form"
//           onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen(true); }}
//           className="fixed bottom-32 right-6 z-[99999] flex items-center justify-center cursor-pointer"
//         >
//           {/* wrapper to apply animation / focus styles */}
//           <div className="float-icon-wrapper">
            
//             <img
//               src="/Popup images/popup desktop animation.gif"
//               alt="Enquiry Button Desktop"
//               className="float-icon w-12 h-12 object-contain drop-shadow-xl hidden md:block"
//             />
//           </div>
//         </div>
//       )}

//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999999] px-4 sm:px-0">
//           <div className="bg-blue-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[85vh] text-white">
//             <button onClick={handleClose} className="absolute top-2 right-3 text-white hover:text-gray-200 text-lg">✕</button>

//             {!submitted ? (
//               <div className="flex justify-center mb-2 mt-2">
//                 <img src="/Popup images/Form Icon 2.png" alt="Form Public" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
//               </div>
//             ) : (
//               <div className="flex justify-center mb-2 mt-2">
//                 <img src="/Popup images/Form Submitted Icon.png" alt="Submission Public" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
//               </div>
//             )}

//             {!submitted ? (
//               <>
//                 <h2 className="text-lg sm:text-xl font-semibold text-center mb-1 text-yellow-300">Instant Enquiry for Jobs or Training</h2>

//                 <form onSubmit={handleSubmit} className="space-y-2">
//                   <div>
//                     <input type="text" name="fullName" required placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none" />
//                     {errors.fullName && <p className="text-xs text-red-300 mt-1">{errors.fullName}</p>}
//                   </div>

//                   <div className="flex bg-white rounded-md items-center">
//                     <div className="px-3 text-sm text-gray-700 select-none">{formData.countryCode}</div>
//                     <input type="tel" name="phone" required maxLength="10" inputMode="numeric" placeholder="WhatsApp Number" value={formData.phone} onChange={handleChange} className="flex-1 outline-none py-2 px-2 text-sm bg-white text-black rounded-r-md" />
//                   </div>
//                   {errors.phone && <p className="text-xs text-red-300 mt-1">{errors.phone}</p>}

//                   <div>
//                     <input type="email" name="email" required placeholder="Email (must end with @gmail.com)" value={formData.email} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none" />
//                     {errors.email && <p className="text-xs text-red-300 mt-1">{errors.email}</p>}
//                   </div>

//                   <div>
//                     <select name="enquiryFor" required value={formData.enquiryFor} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none">
//                       <option value="">Enquiring For</option>
//                       <option value="Courses / Internship">Courses / Internship</option>
//                       <option value="Jobs">IT / Non-IT Jobs</option>
//                     </select>
//                     {errors.enquiryFor && <p className="text-xs text-red-300 mt-1">{errors.enquiryFor}</p>}
//                   </div>

//                   <input type="text" name="location" required placeholder="Location (City)" value={formData.location} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none" />

//                   <div>
//                     <select name="state" required value={formData.state} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none">
//                       <option value="">Select State / Region</option>
//                       <option value="Andhra Pradesh">Andhra Pradesh</option>
//                       <option value="Tamil Nadu">Tamil Nadu</option>
//                       <option value="Telangana">Telangana</option>
//                       <option value="Karnataka">Karnataka</option>
//                       <option value="Kerala">Kerala</option>
//                       <option value="Maharashtra">Maharashtra</option>
//                       <option value="Other">Other</option>
//                     </select>
//                     {errors.state && <p className="text-xs text-red-300 mt-1">{errors.state}</p>}
//                   </div>

//                   <select name="experience" required value={formData.experience} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none">
//                     <option value="">Total Experience</option>
//                     <option value="Fresher">Fresher</option>
//                     <option value="1-2 Years">1–2 Years</option>
//                     <option value="3-5 Years">3–5 Years</option>
//                     <option value="5+ Years">5+ Years</option>
//                   </select>

//                   <select name="branch" required value={formData.branch} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none">
//                     <option value="">Mode of Training</option>
//                     <option value="Offline">Offline</option>
//                     <option value="Online">Online</option>
//                   </select>

//                   {/* Conditional */}
//                   {formData.enquiryFor === "Courses / Internship" ? (
//                     <>
//                       <select name="course" required value={formData.course} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none">
//                         <option value="">Select Course / Training</option>
//                         <option value="Internship">Internship</option>
//                         <option value="Data Analytics">Data Analytics</option>
//                         <option value="HR Analytics">HR Analytics</option>
//                         <option value="Python Fullstack + AI">Python Fullstack + AI</option>
//                         <option value="Java Fullstack">Java Fullstack</option>
//                         <option value="Zoho Payroll">Zoho Payroll Training</option>
//                         <option value="Digital Marketing">Digital Marketing</option>
//                         <option value="Business Analytics">Business Analytics</option>
//                         <option value="Other">Other</option>
//                       </select>
//                       {errors.course && <p className="text-xs text-red-300 mt-1">{errors.course}</p>}

//                       {formData.course === "Other" && (
//                         <input type="text" name="customCourse" required placeholder="Enter your course name" value={formData.customCourse} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none" />
//                       )}
//                       {errors.customCourse && <p className="text-xs text-red-300 mt-1">{errors.customCourse}</p>}
//                     </>
//                   ) : formData.enquiryFor === "Jobs" ? (
//                     <>
//                       <input type="text" name="preferredRole" required placeholder="Preferred Role (e.g. Support Engineer, HR Executive)" value={formData.preferredRole} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none" />
//                       {errors.preferredRole && <p className="text-xs text-red-300 mt-1">{errors.preferredRole}</p>}

//                       <input type="text" name="currentEmployer" placeholder="Current Employer (optional)" value={formData.currentEmployer} onChange={handleChange} className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none" />
//                     </>
//                   ) : null}

//                   <div className="flex justify-center mt-4">
//                     <button type="submit" className="w-1/2 bg-yellow-400 text-black py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-all">Submit</button>
//                   </div>
//                 </form>
//               </>
//             ) : (
//               <div className="text-center py-6">
//                 <h2 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-300">Thank you!</h2>
//                 <p className="text-gray-200 text-sm mb-4">Your enquiry has been submitted.</p>
//                 <p className="text-green-200 text-sm font-bold">Our team will connect with you within <span className="text-yellow-300">24 hours</span>.</p>
//                 <div className="flex justify-center mt-4">
//                   <button onClick={handleClose} className="px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold">Close</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Styles for floating animation */}
//       <style jsx>{`
//         .float-icon-wrapper {
//           display: inline-block;
//           border-radius: 9999px;
//           /* improves hit area for touch */
//           padding: 6px;
//         }

//         .float-icon {
//           display: block;
//           will-change: transform, filter;
//           transition: transform 240ms cubic-bezier(.2,.9,.3,1), filter 240ms;
//           /* subtle shadow lift on focus/hover */
//         }

//         /* smooth up-down float */
//         @keyframes floatY {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); }
//           100% { transform: translateY(0px); }
//         }

//         /* subtle scale pulse loop */
//         @keyframes floatPulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.03); }
//           100% { transform: scale(1); }
//         }

//         /* apply both animations */
//         .float-icon {
//           animation: floatY 3.8s ease-in-out infinite, floatPulse 6s ease-in-out infinite;
//         }

//         /* on hover / focus make it pop and stop the long animations for clarity */
//         .float-icon-wrapper:hover .float-icon,
//         .float-icon-wrapper:focus-within .float-icon,
//         .float-icon-wrapper:active .float-icon {
//           transform: translateY(-4px) scale(1.06);
//           filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45));
//           animation-play-state: paused; /* pause the background loop while hovering */
//         }

//         /* keyboard focus ring for accessibility */
//         .float-icon-wrapper:focus-within {
//           outline: 3px solid rgba(255,205,80,0.18);
//           outline-offset: 4px;
//           border-radius: 9999px;
//         }

//         /* Respect user preference for reduced motion */
//         @media (prefers-reduced-motion: reduce) {
//           .float-icon {
//             animation: none;
//             transition: none;
//           }
//           .float-icon-wrapper:hover .float-icon,
//           .float-icon-wrapper:focus-within .float-icon {
//             transform: none;
//             filter: none;
//           }
//         }
//       `}</style>
//     </>
//   );
// }


"use client";
import { useEffect, useState, useRef } from "react";

/**
 * CourseEnquiryPopup component
 *
 * Props:
 * - open?: boolean (controlled)
 * - onOpenChange?: (bool) => void
 * - showInlineTriggers?: boolean (default: false)
 * - initialEnquiry?: string (optional initial enquiry when parent opens)
 */
export default function CourseEnquiryPopup({
  open,
  onOpenChange,
  showInlineTriggers = false,
  initialEnquiry = "",
}) {
  // internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef(null);

  // form data + validation
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    enquiryFor: "", // "" | "Courses / Internship" | "Jobs"
    location: "",
    state: "",
    experience: "",
    branch: "",
    course: "",
    customCourse: "",
    preferredRole: "",
    currentEmployer: "",
    countryCode: "+91",
  });

  const [errors, setErrors] = useState({});

  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;

  // uncontrolled auto-open after 10s (legacy behaviour)
  useEffect(() => {
    if (isControlled) return;
    const timer = setTimeout(() => {
      setInternalOpen(true);
      setShowImage(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [isControlled]);

  // sync parent's initialEnquiry into form when provided
  useEffect(() => {
    if (!initialEnquiry) return;
    setFormData((p) => {
      const next = { ...p, enquiryFor: initialEnquiry };
      if (initialEnquiry === "Courses / Internship") {
        next.preferredRole = "";
        next.currentEmployer = "";
      } else if (initialEnquiry === "Jobs") {
        next.course = "";
        next.customCourse = "";
      }
      return next;
    });
  }, [initialEnquiry]);

  // lock scrolling while modal open (prevent horizontal & vertical)
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowX = "";
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowX = "";
      document.body.style.overflow = "";
      document.body.style.overflowX = "";
    };
  }, [isOpen]);

  const setOpen = (value) => {
    if (isControlled) {
      if (typeof onOpenChange === "function") onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  const setupReopenTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setInternalOpen(true);
    }, 30000); // Reopen after 30 seconds
  };

  const handleClose = () => {
    setSubmitted(false);
    setOpen(false);
    setupReopenTimer();
  };

  const openWith = (enquiryType) => {
    setFormData((p) => {
      const next = { ...p, enquiryFor: enquiryType ?? p.enquiryFor };
      if (enquiryType === "Courses / Internship") {
        next.preferredRole = "";
        next.currentEmployer = "";
      } else if (enquiryType === "Jobs") {
        next.course = "";
        next.customCourse = "";
      }
      return next;
    });
    setOpen(true);
    setShowImage(true);
  };

  // Country list for dropdown
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

  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (!/^[A-Za-z\s]+$/.test(value)) return "Only alphabets and spaces allowed";
    return "";
  };

  const validatePhone = (value) => {
    if (!value) return "Phone is required";
    if (!/^\d{10}$/.test(value)) return "Enter a 10 digit phone number";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleChange = (e) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;

    if (name === "fullName") {
      value = rawValue.replace(/[^A-Za-z\s]/g, "");
      setFormData((p) => ({ ...p, [name]: value }));
      setErrors((p) => ({ ...p, fullName: validateName(value) }));
      return;
    }

    if (name === "phone") {
      value = rawValue.replace(/\D/g, "").slice(0, 10);
      setFormData((p) => ({ ...p, [name]: value }));
      setErrors((p) => ({ ...p, phone: validatePhone(value) }));
      return;
    }

    if (name === "email") {
      value = rawValue.trim().toLowerCase();
      setFormData((p) => ({ ...p, [name]: value }));
      setErrors((p) => ({ ...p, email: validateEmail(value) }));
      return;
    }

    if (name === "enquiryFor") {
      const next = { ...formData, enquiryFor: value };
      if (value === "Courses / Internship") {
        next.preferredRole = "";
        next.currentEmployer = "";
      } else if (value === "Jobs") {
        next.course = "";
        next.customCourse = "";
      }
      setFormData(next);
      return;
    }

    if (name === "countryCode") {
      setFormData((p) => ({ ...p, [name]: value }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const nameErr = validateName(formData.fullName);
    const phoneErr = validatePhone(formData.phone);
    const emailErr = validateEmail(formData.email);
    const stateErr = !formData.state ? "Please select your state" : "";

    let extraErr = {};
    if (formData.enquiryFor === "Courses / Internship") {
      if (!formData.course) extraErr.course = "Please select a course or internship";
      if (formData.course === "Other" && !formData.customCourse) extraErr.customCourse = "Please enter the course name";
    } else if (formData.enquiryFor === "Jobs") {
      if (!formData.preferredRole) extraErr.preferredRole = "Please enter your preferred role";
    } else {
      extraErr.enquiryFor = "Please select enquiry type";
    }

    setErrors({
      fullName: nameErr,
      phone: phoneErr,
      email: emailErr,
      state: stateErr,
      ...extraErr,
    });

    if (nameErr || phoneErr || emailErr || stateErr || Object.keys(extraErr).length) return;

    // Start submission
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quickform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          enquiryFor: "",
          location: "",
          state: "",
          experience: "",
          branch: "",
          course: "",
          customCourse: "",
          preferredRole: "",
          currentEmployer: "",
          countryCode: "+91",
        });

        // Close form popup and show success popup
        setSubmitted(true);
        setShowSuccessPopup(true);
        setIsSubmitting(false);

        // Setup timer to reopen form
        setupReopenTimer();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit form. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) setShowImage(true);
  }, [isOpen]);

  return (
    <>
      {/* Inline triggers — off by default */}
      {showInlineTriggers && (
        <div className="fixed bottom-24 left-4 z-[99999] flex flex-col gap-2">
          <button 
            onClick={() => openWith("Courses / Internship")} 
            className="bg-blue-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-blue-600"
          >
            Courses / Internship
          </button>
          <button 
            onClick={() => openWith("Jobs")} 
            className="bg-green-700 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-green-600"
          >
            IT / Non-IT Jobs
          </button>
        </div>
      )}

      {/* Floating icon trigger (existing behaviour) */}
      {!isControlled && showImage && !isOpen && !showSuccessPopup && (
        <div
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Open enquiry form"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen(true); }}
          className="fixed bottom-32 right-6 z-[99999] flex items-center justify-center cursor-pointer"
        >
          {/* wrapper to apply animation / focus styles */}
          <div className="float-icon-wrapper">
            <img
              src="/Popup images/popup desktop animation.gif"
              alt="Enquiry Button Desktop"
              className="float-icon w-12 h-12 object-contain drop-shadow-xl hidden md:block"
            />
          </div>
        </div>
      )}

      {/* MAIN ENQUIRY FORM POPUP */}
      {isOpen && !showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999999] px-4 sm:px-0">
          <div className="bg-blue-800 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative animate-fadeIn overflow-y-auto max-h-[85vh] text-white">
            <button 
              onClick={handleClose} 
              className="absolute top-2 right-3 text-white hover:text-gray-200 text-lg"
              disabled={isSubmitting}
            >
              ✕
            </button>

            {!submitted ? (
              <div className="flex justify-center mb-2 mt-2">
                <img src="/Popup images/Form Icon 2.png" alt="Form Public" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
              </div>
            ) : (
              <div className="flex justify-center mb-2 mt-2">
                <img src="/Popup images/Form Submitted Icon.png" alt="Submission Public" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
              </div>
            )}

            {!submitted ? (
              <>
                <h2 className="text-lg sm:text-xl font-semibold text-center mb-1 text-yellow-300">
                  Instant Enquiry for Jobs or Training
                </h2>

                <form onSubmit={handleSubmit} className="space-y-2">
                  <div>
                    <input 
                      type="text" 
                      name="fullName" 
                      required 
                      placeholder="Full Name" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                      disabled={isSubmitting}
                    />
                    {errors.fullName && <p className="text-xs text-red-300 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone with country code dropdown */}
                  <div className="flex bg-white rounded-md items-center">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="bg-transparent text-gray-700 px-2 outline-none text-sm w-28 border-r border-gray-300"
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
                      inputMode="numeric" 
                      placeholder="WhatsApp Number" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="flex-1 outline-none py-2 px-2 text-sm bg-white text-black rounded-r-md"
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-300 mt-1">{errors.phone}</p>}

                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="Email Address" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-xs text-red-300 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <select 
                      name="enquiryFor" 
                      required 
                      value={formData.enquiryFor} 
                      onChange={handleChange} 
                      className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                      disabled={isSubmitting}
                    >
                      <option value="">Enquiring For</option>
                      <option value="Courses / Internship">Courses / Internship</option>
                      <option value="Jobs">IT / Non-IT Jobs</option>
                    </select>
                    {errors.enquiryFor && <p className="text-xs text-red-300 mt-1">{errors.enquiryFor}</p>}
                  </div>

                  <input 
                    type="text" 
                    name="location" 
                    required 
                    placeholder="Location (City)" 
                    value={formData.location} 
                    onChange={handleChange} 
                    className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                    disabled={isSubmitting}
                  />

                  <div>
                    <select 
                      name="state" 
                      required 
                      value={formData.state} 
                      onChange={handleChange} 
                      className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                      disabled={isSubmitting}
                    >
                      <option value="">Select State / Region</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.state && <p className="text-xs text-red-300 mt-1">{errors.state}</p>}
                  </div>

                  <select 
                    name="experience" 
                    required 
                    value={formData.experience} 
                    onChange={handleChange} 
                    className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                    disabled={isSubmitting}
                  >
                    <option value="">Total Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1-2 Years">1–2 Years</option>
                    <option value="3-5 Years">3–5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>

                  <select 
                    name="branch" 
                    required 
                    value={formData.branch} 
                    onChange={handleChange} 
                    className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                    disabled={isSubmitting}
                  >
                    <option value="">Mode of Training</option>
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                  </select>

                  {/* Conditional fields based on enquiry type */}
                  {formData.enquiryFor === "Courses / Internship" ? (
                    <>
                      <select 
                        name="course" 
                        required 
                        value={formData.course} 
                        onChange={handleChange} 
                        className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                        disabled={isSubmitting}
                      >
                        <option value="">Select Course / Training</option>
                        <option value="Internship">Internship</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="HR Analytics">HR Analytics</option>
                        <option value="Python Fullstack + AI">Python Fullstack + AI</option>
                        <option value="Java Fullstack">Java Fullstack</option>
                        <option value="Zoho Payroll">Zoho Payroll Training</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Business Analytics">Business Analytics</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.course && <p className="text-xs text-red-300 mt-1">{errors.course}</p>}

                      {formData.course === "Other" && (
                        <input 
                          type="text" 
                          name="customCourse" 
                          required 
                          placeholder="Enter your course name" 
                          value={formData.customCourse} 
                          onChange={handleChange} 
                          className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                          disabled={isSubmitting}
                        />
                      )}
                      {errors.customCourse && <p className="text-xs text-red-300 mt-1">{errors.customCourse}</p>}
                    </>
                  ) : formData.enquiryFor === "Jobs" ? (
                    <>
                      <input 
                        type="text" 
                        name="preferredRole" 
                        required 
                        placeholder="Preferred Role (e.g. Support Engineer, HR Executive)" 
                        value={formData.preferredRole} 
                        onChange={handleChange} 
                        className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                        disabled={isSubmitting}
                      />
                      {errors.preferredRole && <p className="text-xs text-red-300 mt-1">{errors.preferredRole}</p>}

                      <input 
                        type="text" 
                        name="currentEmployer" 
                        placeholder="Current Employer (optional)" 
                        value={formData.currentEmployer} 
                        onChange={handleChange} 
                        className="w-full bg-white text-black rounded-md py-2 px-3 text-sm outline-none"
                        disabled={isSubmitting}
                      />
                    </>
                  ) : null}

                  <div className="flex justify-center mt-4">
                    <button 
                      type="submit" 
                      className="w-1/2 bg-yellow-400 text-black py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-yellow-300">Thank you!</h2>
                <p className="text-gray-200 text-sm mb-4">Your enquiry has been submitted.</p>
                <p className="text-green-200 text-sm font-bold">Our team will connect with you within <span className="text-yellow-300">24 hours</span>.</p>
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={() => {
                      handleClose();
                      setSubmitted(false);
                    }} 
                    className="px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUCCESS POPUP MODAL */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999999] px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xs p-5 text-center animate-fadeIn">
            <div className="flex justify-center mb-4">
              <img 
                src="/Popup images/Form Submitted Icon.png" 
                alt="Success" 
                className="w-16 h-16 object-contain"
              />
            </div>
            
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Form Submitted Successfully!
            </h3>

            <p className="text-gray-700 mb-4 text-sm">
              Thank you for your enquiry. Our team will contact you within 24 hours.
            </p>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition w-full"
              onClick={() => {
                setShowSuccessPopup(false);
                setSubmitted(false);
                handleClose();
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Styles for floating animation */}
      <style jsx>{`
        .float-icon-wrapper {
          display: inline-block;
          border-radius: 9999px;
          padding: 6px;
        }

        .float-icon {
          display: block;
          will-change: transform, filter;
          transition: transform 240ms cubic-bezier(.2,.9,.3,1), filter 240ms;
        }

        /* smooth up-down float */
        @keyframes floatY {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        /* subtle scale pulse loop */
        @keyframes floatPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }

        /* apply both animations */
        .float-icon {
          animation: floatY 3.8s ease-in-out infinite, floatPulse 6s ease-in-out infinite;
        }

        /* on hover / focus make it pop and stop the long animations for clarity */
        .float-icon-wrapper:hover .float-icon,
        .float-icon-wrapper:focus-within .float-icon,
        .float-icon-wrapper:active .float-icon {
          transform: translateY(-4px) scale(1.06);
          filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45));
          animation-play-state: paused;
        }

        /* keyboard focus ring for accessibility */
        .float-icon-wrapper:focus-within {
          outline: 3px solid rgba(255,205,80,0.18);
          outline-offset: 4px;
          border-radius: 9999px;
        }

        /* Respect user preference for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .float-icon {
            animation: none;
            transition: none;
          }
          .float-icon-wrapper:hover .float-icon,
          .float-icon-wrapper:focus-within .float-icon {
            transform: none;
            filter: none;
          }
        }

        /* Form animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}