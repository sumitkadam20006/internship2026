import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import PersonalInfo from "./components/Steps/PersonalInfo";
import Address from "./components/Steps/Address";
import Education from "./components/Steps/Education";
import Preferences from "./components/Steps/Preferences";
import Review from "./components/Steps/Review";

const initialFormData = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobileNumber: "",
  alternateMobile: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  nationality: "Indian",
  maritalStatus: "Single",
  aadhaar: "",
  pan: "",
  website: "",
  linkedin: "",
  favoriteColor: "#6C63FF",
  profilePicture: null,
  shortBio: "",
  acceptTerms: false,
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  addressType: "",
  highestQualification: "",
  collegeName: "",
  degree: "",
  branch: "",
  passingYear: "",
  cgpa: "",
  currentStatus: "",
  skills: [],
  certifications: [],
  theme: "System",
  languagesKnown: [],
  notifications: [],
  interests: [],
  hobbies: [],
  privacySettings: [],
  newsletter: "Yes",
  preferredContact: "",
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  function handleNext(stepData) {
    setFormData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => Math.min(prev + 1, 5));
  }

  function handlePrev(stepData) {
    setFormData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }

  function goToStep(step) {
    setCurrentStep(step);
  }

  function handleReset() {
    setFormData(initialFormData);
    setCurrentStep(0);
  }

  function handleStart() {
    setCurrentStep(1);
  }

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <div className="welcome-screen">
            <h2>Welcome to the Registration Portal</h2>
            <p>Complete all 5 steps to register. Click the button below to get started.</p>
            <button className="btn-primary" onClick={handleStart}>
              Start Registration →
            </button>
          </div>
        );
      case 1:
        return <PersonalInfo formData={formData} onNext={handleNext} />;
      case 2:
        return (
          <Address
            formData={formData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <Education
            formData={formData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <Preferences
            formData={formData}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 5:
        return (
          <Review
            formData={formData}
            onPrev={handlePrev}
            goToStep={goToStep}
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="app">
      <Navbar currentStep={currentStep} />
      <div id="form" className="app-body">
        <Sidebar currentStep={currentStep} />
        <div className="main">
          <div className="main-header">
            <h1>Multi-Step Registration</h1>
            <p>Complete all steps to register</p>
          </div>
          <ProgressBar currentStep={currentStep} />
          <div className="formCard">
            {renderStep()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
