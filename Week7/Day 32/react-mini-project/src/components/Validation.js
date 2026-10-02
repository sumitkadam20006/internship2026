export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
export const MOBILE_REGEX = /^\d{10}$/;
export const AADHAAR_REGEX = /^\d{12}$/;
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/;
export const PINCODE_REGEX = /^\d{6}$/;

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const GENDERS = ["Male", "Female", "Other"];
export const NATIONALITIES = ["Indian", "American", "British", "Canadian", "Australian", "Other"];
export const MARITAL_STATUSES = ["Single", "Married", "Divorced", "Widowed"];
export const COUNTRIES = ["India", "USA", "UK", "Canada", "Australia", "Other"];
export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
export const ADDRESS_TYPES = ["Home", "Office", "Other"];
export const HIGHEST_QUALIFICATIONS = [
  "High School (10th)", "Intermediate (12th)", "Diploma",
  "Bachelor's Degree", "Master's Degree", "PhD / Doctorate", "Other"
];
export const CURRENT_STATUSES = ["Student", "Graduate", "Working Professional"];
export const DEGREES = ["B.Tech", "B.E.", "B.Sc", "B.Com", "B.A.", "M.Tech", "M.E.", "M.Sc", "M.Com", "M.A.", "MBA", "PhD", "Diploma", "Other"];
export const BRANCHES = ["Computer Science", "Information Technology", "Electronics", "Electrical", "Mechanical", "Civil", "Chemical", "Biotechnology", "Mathematics", "Physics", "Chemistry", "Commerce", "Arts", "Other"];
export const THEMES = ["Light", "Dark", "System"];
export const LANGUAGES = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Kannada", "Malayalam", "Gujarati", "Bengali", "Other"];
export const NOTIFICATIONS = ["Email Notifications", "SMS Notifications", "Push Notifications", "Weekly Newsletter"];
export const CATEGORIES = ["Technology", "Science", "Arts", "Sports", "Music", "Travel", "Food", "Fashion"];
export const COMMUNICATION_PREFS = ["Email Notifications", "SMS Notifications", "Push Notifications", "WhatsApp Updates"];
export const INTERESTS = ["Technology", "Sports", "Music", "Movies", "Gaming", "Travel", "Reading", "Coding", "Photography", "Fitness"];
export const PRIVACY_OPTIONS = ["Make Profile Public", "Show Contact Information", "Allow Recruiters to Contact Me"];
export const CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "LinkedIn", "Telegram"];
export const NEWSLETTER_OPTIONS = ["Yes", "No"];
