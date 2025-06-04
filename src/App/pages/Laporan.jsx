import React, { useState, useEffect } from 'react';
import Button from "../../components/button.jsx"; 
import { FileText, ListChecks, CheckCircle2, BarChartHorizontalBig, MapPin, Image as ImageIcon, AlertCircle } from 'lucide-react'; 

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const baseStyle = "fixed top-5 right-5 p-4 rounded-md shadow-lg text-white flex items-center justify-between max-w-sm z-50";
  const typeStyle = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`${baseStyle} ${typeStyle}`}>
      <div className="flex items-center">
        {type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};


export default function ReportPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userId, setUserId] = useState(null);
  const dummyMapImageUrl = "/assets/map.png";

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });


  const [stats, setStats] = useState({
    totalReports: 2004,
    processingReports: 75,
    completedReports: 1370,
  });

  const chartData = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Completed Reports',
        data: [121, 155, 297, 388, 204],
        backgroundColor: 'rgba(106, 156, 137, 0.6)',
        borderColor: 'rgba(106, 156, 137, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 20, font: { size: 12 } }
      },
      title: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0, font: { size: 10 } },
        grid: { color: '#e9e9e9', drawBorder: false, }
      },
      x: {
        ticks: { font: { size: 10 } },
        grid: { display: false, }
      }
    },
  };

  useEffect(() => {
    const loggedInUserId = "USER_ID_CONTOH_DARI_AUTH";
    setUserId(loggedInUserId);
  }, []);

  const showNotification = (message, type = 'success', duration = 4000) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, duration);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Report title is required';
    if (!description.trim()) newErrors.description = 'Report description is required';
    if (!location.trim()) newErrors.location = 'Report location is required';
    if (!file) newErrors.file = 'Image proof is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setErrors(prev => ({ ...prev, file: '' }));
    if (selectedFile) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrors(prev => ({ ...prev, file: 'Only JPG, JPEG, PNG formats are allowed' }));
        setFile(null); setImagePreview(null); event.target.value = null; return;
      }
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null); setImagePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    if (!userId) {
      showNotification("User ID not found. Please make sure you are logged in.", "error");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('userId', userId);
    formData.append('image', file);

     try {
       const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
       const response = await axios.post(`${apiUrl}/report`, formData, { headers: { 'Content-Type': 'multipart/form-data', /* 'Authorization': `Bearer YOUR_TOKEN` */ } });
       showNotification('Your report has been submitted successfully!', 'success');
       // Reset form
     } catch (error) {
       const errMsg = error.response?.data?.message || error.response?.data?.error || 'Failed to submit report. Please try again.';
       showNotification(errMsg, 'error');
     } finally {
       setIsSubmitting(false);
     }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 md:px-6 lg:px-8">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ show: false, message: '', type: 'success' })}
      />
      <div className="container mx-auto space-y-8">
        {/* Card Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Total Reports Made", value: stats.totalReports, icon: FileText, desc: "Total number of reports" },
            { title: "Reports In Process", value: stats.processingReports, icon: ListChecks, desc: "Currently being verified/actioned" },
            { title: "Completed Reports", value: stats.completedReports, icon: CheckCircle2, desc: "Has been handled" }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all hover:shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-600">{stat.title}</h3>
                <stat.icon className="h-5 w-5 text-[#6a9c89]" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{stat.value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Instruksi & Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="font-semibold text-xl md:text-2xl text-[#6a9c89] mb-4">How to Submit a Report</h3>
              <p className="text-sm md:text-base mb-5 text-gray-700">
                Follow these steps to report damaged infrastructure:
              </p>
              <div className="space-y-3">
                {[
                  "Enter the report title.",
                  "Provide a description of the issue, for example: The pothole is quite deep and dangerous for motorcyclists.",
                  "Enter the location where the issue was found.",
                  "Upload photos showing the condition of the infrastructure.",
                  "After completing the form, click the Submit button to send your report."
                ].map((text, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2.5 h-2.5 bg-[#6a9c89] rounded-full mt-1.5"></div>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">{text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs md:text-sm text-gray-500">
                Your report will be verified and forwarded to the relevant authorities for prompt action.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="font-semibold text-xl md:text-2xl text-gray-800 mb-2">Report Form</h3>
              <p className="text-sm text-gray-600 mb-6">Please fill in all fields correctly.</p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">Report Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Example: Pothole on Ponlab Street"
                    className={`mt-1 block w-full px-4 py-2.5 border ${errors.title ? 'border-red-500 ring-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6a9c89] focus:border-[#6a9c89] sm:text-sm transition-colors`}
                  />
                  {errors.title && <p className="text-red-600 text-xs mt-1.5">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the damage details and potential hazards..."
                    rows={4}
                    className={`mt-1 block w-full px-4 py-2.5 border ${errors.description ? 'border-red-500 ring-red-500' : 'border-gray-300'} rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#6a9c89] focus:border-[#6a9c89] sm:text-sm min-h-[100px] transition-colors`}
                  ></textarea>
                  {errors.description && <p className="text-red-600 text-xs mt-1.5">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">Detailed Address and Landmark</label>
                   <div className="relative mt-1">
                     <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                     <input
                       type="text"
                       id="location"
                       value={location}
                       onChange={(e) => setLocation(e.target.value)}
                       placeholder="Example: Ponlab Street, next to DDN Park"
                       className={`pl-10 block w-full px-4 py-2.5 border ${errors.location ? 'border-red-500 ring-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6a9c89] focus:border-[#6a9c89] sm:text-sm transition-colors`}
                     />
                   </div>
                  {errors.location && <p className="text-red-600 text-xs mt-1.5">{errors.location}</p>}
                </div>

                <div className="my-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Location on Map</label>
                  <div className="mt-1 h-56 md:h-64 w-full rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                    <img
                      src={"src/assets/map.png"}
                      alt="Decorative Map Location"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1.5">Upload Proof Photo</label>
                  <div className={`mt-1 flex items-center justify-center w-full px-6 pt-5 pb-6 border-2 ${errors.file ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer hover:border-[#6a9c89] transition-colors`}>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#6a9c89] hover:text-[#578a78] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#6a9c89]">
                      <div className="space-y-1 text-center">
                        <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold">{file ? file.name : "Click to select a photo"}</span>
                        </p>
                         {!file && <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>}
                      </div>
                    </label>
                  </div>
                  {errors.file && <p className="text-red-600 text-xs mt-1.5">{errors.file}</p>}
                </div>

                {imagePreview && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-700 mb-1">Preview:</p>
                    <div className="relative w-full max-w-xs h-32 mt-1 rounded-md overflow-hidden border border-gray-200 bg-slate-50">
                      <img src={imagePreview} alt="Report Preview" className="w-full h-full object-contain" />
                    </div>
                  </div>
                )}

                {errors.form && <p className="text-red-600 text-sm p-3 bg-red-100 rounded-md my-4 flex items-center"><AlertCircle className="inline w-4 h-4 mr-2"/>{errors.form}</p>}

                <div className="pt-4">
                  <Button
                    title={isSubmitting ? "Submitting..." : "Submit Report"} 
                    type="submit"
                    className={`py-3 px-6 text-base w-full font-semibold rounded-lg text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#16423c] hover:bg-[#578a78]'}`}
                    condition={!isSubmitting} 
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="font-semibold text-xl md:text-2xl text-gray-800 mb-2 flex items-center">
                <BarChartHorizontalBig className="w-6 h-6 mr-2 text-[#6a9c89]" />
                Report Statistics
              </h3>
              <p className="text-sm text-gray-600 mb-6">Number of completed reports per year</p>
              <div className="relative h-[300px] md:h-[350px] w-full">
                <Bar options={chartOptions} data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}