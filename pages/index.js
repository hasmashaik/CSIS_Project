// import HeroBanner from "../components/HeroBanner";
// import Header from "../components/Header";
// import FullImage from "../components/FullImage";
// import GoogleReview from "../components/GoogleReview";
// import Discover from "../components/Discover";
// import StudentsReview from "../components/StudentsReview";
// import MeetOurStars from "../components/MeetOurStars";
// import Courses from "../components/Courses";
// import Alumni from "../components/Alumni";
// import NeedHelp from "../components/NeedHelp";
// import Footer from "../components/Footer";
// import Chatbot from "../components/chatbot";
// import Popupform from "../components/Popup form";

// export default function Home() {
//   return (
//     <main>
//       <Popupform/>
//       <Chatbot/>
//       <HeroBanner />
//       <Header />
//       <FullImage />
//       <GoogleReview/>
//        <Discover />
//       <StudentsReview />
//       <MeetOurStars />
//       <Courses />
//       <Alumni />
//       <NeedHelp />
//       <Footer />
//     </main>
//   );
// }

// pages/index.js
import HeroBanner from "../components/HeroBanner";
import Header from "../components/Header";
import FullImage from "../components/FullImage";
import GoogleReview from "../components/GoogleReview";
import Discover from "../components/Discover";
import StudentsReview from "../components/StudentsReview";
import MeetOurStars from "../components/MeetOurStars";
import Courses from "../components/Courses";
import Alumni from "../components/Alumni";
import NeedHelp from "../components/NeedHelp";
import Footer from "../components/Footer";
import Chatbot from "../components/chatbot";
import Popupform from "../components/Popup_form"; // ✅ Changed from "Popup form" to "Popup_form"

export default function Home() {
  return (
    <main>
      <Popupform />
      <Chatbot />
      <HeroBanner />
      <Header />
      <FullImage />
      <GoogleReview />
      <Discover />
      <StudentsReview />
      <MeetOurStars />
      <Courses />
      <Alumni />
      <NeedHelp />
      <Footer />
    </main>
  );
}