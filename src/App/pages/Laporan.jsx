import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/Textarea"
import { Label } from "../../components/ui/Label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/Alert"
import { Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "../../contexts/AuthContexts"

export default function LaporanPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  })
  
  // Use AuthContext for authentication
  const { user: authUser, isLoggedIn, loading: authLoading } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({
      ...prev,
      image: file,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check authentication
    if (!isLoggedIn || !authUser) {
      setMessage({ type: "error", text: "You must be logged in to submit a report." })
      return
    }

    // Validate required fields
    if (!formData.title || !formData.description || !formData.location) {
      setMessage({ type: "error", text: "Please fill in all required fields." })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const submitData = new FormData()
      submitData.append("title", formData.title)
      submitData.append("description", formData.description)
      submitData.append("location", formData.location)
      submitData.append("status", "PENDING")
      
      // Note: userId will be extracted from JWT token by backend
      // No need to send userId in form data

      if (formData.image) {
        submitData.append("image", formData.image)
      }

      // Get token from localStorage
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication token not found")
      }
      
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000"
      console.log("Submitting to:", `${apiUrl}/report`) // Debug log
      
      const response = await fetch(`${apiUrl}/report`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: submitData,
      })

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch (jsonError) {
          // If JSON parsing fails, use the HTTP status message
          console.warn("Could not parse error response as JSON:", jsonError)
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()

      setMessage({ 
        type: "success", 
        text: "Report submitted successfully! It will be reviewed by our team." 
      })
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        image: null,
      })
      
      // Reset file input
      const fileInput = document.getElementById("file")
      if (fileInput) fileInput.value = ""
      
      // Optional: Navigate back to dashboard after successful submission
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)

    } catch (error) {
      console.error("Submit error:", error)
      
      // Provide more specific error messages
      let errorMessage = "An error occurred while submitting the report."
      
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "Connection failed. Please check if the server is running and CORS is configured properly."
      } else if (error.message.includes("CORS")) {
        errorMessage = "CORS policy error. Please contact the administrator to configure server permissions."
      } else if (error.message.includes("NetworkError")) {
        errorMessage = "Network error. Please check your internet connection."
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setMessage({ 
        type: "error", 
        text: errorMessage
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogin = () => {
    navigate("/login")
  }

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F7FBFA]">
        <Loader2 className="h-8 w-8 animate-spin text-[#6a9c89]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7FBFA] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Instructions Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#16423c] to-[#6a9c89] text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">How to Submit a Report</CardTitle>
            <CardDescription className="text-lg text-gray-100">
              Follow these steps to report damaged infrastructure:
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                'Enter the report title, such as "Pothole on Ponlab Street".',
                'Provide a description of the issue, for example: "The pothole is quite deep and dangerous for motorcyclists".',
                "Enter the location where the issue was found.",
                "Upload photos showing the condition of the infrastructure.",
                'After completing the form, click the "Submit" button to send your report.',
              ].map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#6a9c89] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium">
              Your report will be verified and forwarded to the relevant authorities for prompt action.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Authentication Check */}
        {!isLoggedIn || !authUser ? (
          <Card className="mb-8 shadow-lg">
            <CardContent className="pt-6">
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  You must be logged in to submit a report.
                  <Button 
                    variant="link" 
                    className="p-0 ml-2 h-auto font-semibold text-[#6a9c89] hover:text-[#16423c]" 
                    onClick={handleLogin}
                  >
                    Login here
                  </Button>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 shadow-lg">
            <CardContent className="pt-6">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                Logged in as: <strong>{authUser?.user_name || authUser?.name || 'Unknown'}</strong> 
                  ({authUser?.user_email || authUser?.email || 'Unknown'})
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Report Form */}
        <Card className="shadow-lg">
          <CardHeader className="bg-white border-b">
            <CardTitle className="text-3xl text-[#16423c] font-bold">Submit Infrastructure Report</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Please fill out all required fields below:
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {message && (
              <Alert className={`mb-6 ${
                message.type === "error" 
                  ? "border-red-200 bg-red-50" 
                  : "border-green-200 bg-green-50"
              }`}>
                {message.type === "error" ? (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <AlertDescription className={
                  message.type === "error" ? "text-red-800" : "text-green-800"
                }>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                  Report Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g., Pothole on Main Street"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={!isLoggedIn || !authUser || isSubmitting}
                  className="mt-2 focus:ring-[#6a9c89] focus:border-[#6a9c89] border-gray-300"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the infrastructure issue in detail..."
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isLoggedIn || !authUser || isSubmitting}
                  className="mt-2 min-h-[120px] focus:ring-[#6a9c89] focus:border-[#6a9c89] border-gray-300 resize-none"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g., Jl. Sudirman No. 123, Jakarta"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!isLoggedIn || !authUser || isSubmitting}
                  className="mt-2 focus:ring-[#6a9c89] focus:border-[#6a9c89] border-gray-300"
                  required
                />
              </div>

              <div>
                <Label htmlFor="file" className="text-sm font-semibold text-gray-700">
                  Upload Images <span className="text-gray-500">(Optional)</span>
                </Label>
                <div className="mt-2">
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={!isLoggedIn || !authUser || isSubmitting}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#6a9c89] file:text-white hover:file:bg-[#5a8c79] file:cursor-pointer border-gray-300"
                  />
                  {formData.image && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                      <p className="text-sm text-gray-700">
                        📎 Selected file: <span className="font-medium">{formData.image.name}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={!isLoggedIn || !authUser || isSubmitting}
                  className="w-full bg-[#16423c] hover:bg-[#6a9c89] disabled:bg-gray-400 text-white py-4 text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}