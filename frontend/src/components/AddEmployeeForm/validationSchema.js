import * as Yup from "yup";

// Maximum file size for image upload (in bytes)
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

// Allowed image file types
const SUPPORTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters"),

  designation: Yup.string()
    .required("Designation is required")
    .min(2, "Designation must be at least 2 characters long")
    .max(50, "Designation must be less than 50 characters"),

  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),

  experience: Yup.number()
    .required("Years of experience is required")
    .min(0, "Experience cannot be negative")
    .max(50, "Experience cannot exceed 50 years"),

  managerId: Yup.string()
    .nullable() // Allow null for top-level employees without a manager
    .required("Reporting manager is required"),

  image: Yup.mixed()
    .required("Employee image is required")
    .test("fileSize", "File size is too large (max 1MB)", (value) => {
      if (!value) return true; // No file selected
      return value.size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true; // No file selected
      return SUPPORTED_FILE_TYPES.includes(value.type);
    }),
});

export default validationSchema;
