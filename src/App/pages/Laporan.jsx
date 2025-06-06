import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Assuming you have a standard Button component, not one with a 'to' prop for form submission
// import Button from "../../components/ui/button"; // Example path for a UI library button

export default function Laporan() {
  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null); // To hold the selected file

  // State for submission status and messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Handler for file input changes
  const handleFileChange = (e) => {
    // Backend uses upload.single(), so we only take the first file
    setFile(e.target.files[0]);
  };

  // Main function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default browser submission
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    // --- Create FormData to send multipart data ---
    // This is required because you are uploading a file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    
    // The field name 'image' MUST match what's in your backend route: upload.single('image')
    if (file) {
      formData.append("image", file);
    }
    
    // FIXME: Get the actual user ID from your auth context, localStorage, etc.
    // Your backend's createReport function expects a 'userId'.
    const userId = localStorage.getItem("userId"); // Example: retrieving from local storage
    if (userId) {
      formData.append("userId", userId);
    } else {
      setError("You must be logged in to submit a report.");
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/report`, {
        method: "POST",
        // DO NOT set 'Content-Type': 'multipart/form-data'.
        // The browser sets it automatically with the correct boundary when using FormData.
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit the report.");
      }
      
      setSuccessMessage("Report submitted successfully! Thank you.");
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setFile(null);
      event.target.reset(); // Clears the file input

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Centered layout for the page
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        {/* How-to Guide */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 text-gray-800">
            {/* ... (your how-to guide JSX remains the same) ... */}
        </div>

        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          Want to make a report?
        </h2>
        <p className="max-w-xl mb-8 text-gray-700 text-lg">
          Please fill out the form below:
        </p>

        {/* --- Form Section --- */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Report Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-600">Report Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Pothole on Ponlab Street"
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md overflow-hidden resize-none focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
                required
              ></textarea>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-600">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., In front of the Indomaret on Main Street"
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a9c89]"
                required
              />
            </div>
            
            {/* File Upload */}
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-600">Upload Image or Video</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                // Allow both image and video files
                accept="image/jpeg, image/png, image/gif, video/mp4, video/webm"
                // Your backend uses upload.single(), so do not allow multiple files
                // multiple={false} is the default, so it's not needed
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e0f0e9] file:text-[#16423c] hover:file:bg-[#c8e2d8]"
              />
            </div>

            {/* --- Messages for Error and Success --- */}
            {error && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                    <strong>Error:</strong> {error}
                </div>
            )}
            {successMessage && (
                <div className="p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-sm">
                    {successMessage}
                </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-semibold rounded-lg text-white py-3 px-4 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed bg-[#16423c] hover:bg-[#6a9c89]"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}