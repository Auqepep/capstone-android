import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Edit,
  ChevronDown,
  Plus,
  FileText,
  Loader2,
  X, // Icon untuk cancel
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Avatar } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input"; // Import Input
import { Textarea } from "../../components/ui/Textarea"; // Import Textarea
import { useAuth } from "../../contexts/AuthContexts";

function SocialDashboard() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // State untuk menangani mode edit
  const [editingReportId, setEditingReportId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", description: "", location: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = ["Pending", "On Progress", "Fixed"];
  const statusColors = {
    Pending: "destructive",
    "On Progress": "secondary",
    Fixed: "default",
  };

  // --- FUNGSI BARU UNTUK EDIT ---

  // Dipanggil saat tombol 'Edit' di dropdown diklik
  const handleEditClick = (report) => {
    setEditingReportId(report.id);
    setEditFormData({
      title: report.title,
      description: report.description,
      location: report.location,
    });
  };

  // Dipanggil saat tombol 'Cancel' diklik
  const handleCancelEdit = () => {
    setEditingReportId(null);
    setEditFormData({ title: "", description: "", location: "" });
  };

  // Meng-handle perubahan pada input form edit
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Dipanggil saat tombol 'Save' diklik untuk menyimpan perubahan
  const handleUpdateReport = async () => {
    if (!editingReportId) return;

    setIsUpdating(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      // Endpoint untuk update laporan: PUT /report/:id
      const response = await fetch(`${apiUrl}/report/${editingReportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editFormData), // Kirim data yang sudah diubah
      });

      if (response.ok) {
        const updatedReport = await response.json();
        // Perbarui state 'reports' dengan data terbaru dari server
        setReports((currentReports) =>
          currentReports.map((report) =>
            report.id === editingReportId ? updatedReport : report
          )
        );
        handleCancelEdit(); // Keluar dari mode edit setelah berhasil
      } else {
        const errorData = await response.json();
        console.error("Failed to update report:", errorData);
        alert("Gagal memperbarui laporan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error updating report:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusChange = (reportId, newStatus) => {
    // TODO: Implementasi API call untuk update status di backend
    let backendStatus;
    if (newStatus === "On Progress") backendStatus = "DIPROSES";
    else if (newStatus === "Fixed") backendStatus = "SELESAI";
    else backendStatus = "PENDING";

    console.log(`Updating status for report ${reportId} to ${backendStatus}`);

    setReports((currentReports) =>
      currentReports.map(
        (report) =>
          report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };

  const handleCreateReport = () => {
    navigate("/laporan");
  };

  const fetchUserReports = async () => {
    if (!isLoggedIn || !user?.id_user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/report/user/${user.id_user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setReports(data.data);
        } else {
          setReports([]);
        }
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReports();
  }, [user, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="max-w-screen-xl mx-auto bg-[#F7FBFA] pb-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please log in to view your dashboard
          </h2>
          <a
            href="/login"
            className="px-6 py-3 bg-[#16423c] text-white rounded-lg hover:bg-[#6a9c89] transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto bg-[#F7FBFA] pb-6 min-h-screen">
      <div className="bg-[#16423c] text-white p-5 border-b shadow-sm rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 font-header">
            <Avatar className="h-20 w-20 border-2 border-white"></Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user?.user_name || "Unknown User"}</h2>
              <p className="text-sm mt-1 opacity-90">{user?.user_email || ""}</p>
              <p className="text-sm mt-1 capitalize">Role: {user?.role?.role_name || "User"}</p>
            </div>
          </div>
          <Button
            onClick={handleCreateReport}
            className="bg-white text-[#16423c] hover:bg-gray-100 font-semibold px-6 py-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      <div className="mt-6 px-4 lg:px-2 font-body">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Reports</h3>
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#6a9c89] mx-auto" />
            <p className="text-gray-600 mt-2">Loading your reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md p-6">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-700 mb-2">No reports found</h4>
            <Button
              onClick={handleCreateReport}
              className="bg-[#6a9c89] text-white hover:bg-[#5a8c79] font-semibold px-6 py-2 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Your First Report
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <div className="px-4 pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10 border"></Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{report.user_name}</p>
                        <p className="text-xs text-gray-500">{new Date(report.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                       {/* Status Badge/Dropdown */}
                       {user?.role?.role_name === "admin" ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Badge variant={statusColors[report.status]} className="capitalize cursor-pointer py-1 px-2 text-xs hover:opacity-80 transition-opacity">
                                {report.status} <ChevronDown className="h-3 w-3 ml-1 inline-block" />
                              </Badge>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {statusOptions.map((statusOption) => (
                                <DropdownMenuItem key={statusOption} onClick={() => handleStatusChange(report.id, statusOption)} className={`text-xs ${report.status === statusOption ? "bg-gray-100" : ""}`}>
                                  <Check className={`h-3 w-3 mr-2 ${report.status === statusOption ? "opacity-100" : "opacity-0"}`} />
                                  {statusOption}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Badge variant={statusColors[report.status]} className="capitalize py-1 px-2 text-xs">{report.status}</Badge>
                        )}
                        
                        {/* Dropdown Menu untuk Edit/Delete */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {/* OPSI EDIT BARU */}
                                <DropdownMenuItem onClick={() => handleEditClick(report)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                {/* Opsi lain bisa ditambahkan di sini, misal Delete */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-1 flex-grow">
                  {/* Tampilan normal atau form edit */}
                  {editingReportId === report.id ? (
                    // --- FORM EDIT ---
                    <div className="flex flex-col gap-4 py-2">
                        <div>
                            <label className="text-xs font-semibold text-gray-600">Title</label>
                            <Input name="title" value={editFormData.title} onChange={handleFormChange} className="mt-1"/>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-600">Description</label>
                            <Textarea name="description" value={editFormData.description} onChange={handleFormChange} className="mt-1" rows={4}/>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-600">Location</label>
                            <Input name="location" value={editFormData.location} onChange={handleFormChange} className="mt-1"/>
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                            <Button onClick={handleUpdateReport} disabled={isUpdating}>
                                {isUpdating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                Save Changes
                            </Button>
                        </div>
                    </div>
                  ) : (
                    // --- TAMPILAN NORMAL ---
                    <>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h4>
                      <p className="text-sm mb-1 text-gray-700 leading-relaxed break-words">{report.description}</p>
                      <p className="text-xs text-gray-500 mb-3">📍 {report.location}</p>
                      {report.imageUrl && (
                        <div className="rounded-md overflow-hidden mb-3 border">
                          <img src={report.imageUrl} alt="Report content" className="w-full object-cover max-h-72" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SocialDashboard;