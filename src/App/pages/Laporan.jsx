import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/Textarea"
import { Label } from "../../components/ui/Label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/Alert"
import { Loader2, Upload, CheckCircle, AlertCircle } from "../../components/ui/icons/Icons"
import { useAuth } from "@/contexts/AuthContexts"

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
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/report`, {
        method: "POST",
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: submitData,
      })

      const result = await response.json()

      if (response.ok) {
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
      } else {
        console.error("Submit failed:", result)
        setMessage({ 
          type: "error", 
          text: result.message || result.error || "Failed to submit report." 
        })
      }
    } catch (error) {
      console.error("Submit error:", error)
      setMessage({ 
        type: "error", 
        text: error.message || "An error occurred while submitting the report." 
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Instructions Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl text-[#6a9c89]">How to Submit a Report</CardTitle>
          <CardDescription className="text-lg">Follow these steps to report damaged infrastructure:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              'Enter the report title, such as "Pothole on Ponlab Street".',
              'Provide a description of the issue, for example: "The pothole is quite deep and dangerous for motorcyclists".',
              "Enter the location where the issue was found.",
              "Upload photos showing the condition of the infrastructure.",
              'After completing the form, click the "Submit" button to send your report.',
            ].map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-[#6a9c89] rounded-full flex-shrink-0"></div>
                <p className="text-gray-600 font-medium">{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-600">
            Your report will be verified and forwarded to the relevant authorities for prompt action.
          </p>
        </CardContent>
      </Card>

      {/* Authentication Check */}
      {!isLoggedIn || !authUser ? (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You must be logged in to submit a report.
                <Button variant="link" className="p-0 ml-2 h-auto font-semibold text-[#6a9c89]" onClick={handleLogin}>
                  Login here
                </Button>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Logged in as: <strong>{authUser?.user_name || authUser?.name || 'Unknown'}</strong> 
                ({authUser?.user_email || authUser?.email || 'Unknown'})
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Report Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-gray-700">Want to make a report?</CardTitle>
          <CardDescription className="text-lg">Please fill out the form below:</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className={`mb-6 ${message.type === "error" ? "border-red-500" : "border-green-500"}`}>
              {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
              <AlertDescription className={message.type === "error" ? "text-red-700" : "text-green-700"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Report Title *</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter report title"
                value={formData.title}
                onChange={handleInputChange}
                disabled={!isLoggedIn || !authUser || isSubmitting}
                className="mt-2 focus:ring-[#6a9c89] focus:border-[#6a9c89]"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter report description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={!isLoggedIn || !authUser || isSubmitting}
                className="mt-2 min-h-[100px] focus:ring-[#6a9c89] focus:border-[#6a9c89]"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Enter report location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={!isLoggedIn || !authUser || isSubmitting}
                className="mt-2 focus:ring-[#6a9c89] focus:border-[#6a9c89]"
                required
              />
            </div>

            <div>
              <Label htmlFor="file">Upload Images</Label>
              <div className="mt-2">
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={!isLoggedIn || !authUser || isSubmitting}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6a9c89] file:text-white hover:file:bg-[#5a8c79]"
                />
                {formData.image && <p className="text-sm text-gray-600 mt-2">Selected: {formData.image.name}</p>}
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={!isLoggedIn || !authUser || isSubmitting}
                className="w-full bg-[#6a9c89] hover:bg-[#5a8c79] text-white py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}