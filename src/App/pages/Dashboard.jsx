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
  FileText
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
import { useAuth } from "../../contexts/AuthContexts";

function SocialDashboard() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const statusOptions = ["Pending", "On Progress", "Fixed"];
  
  // Status color mapping
  const statusColors = {
    "Pending": "destructive",
    "On Progress": "secondary", 
    "Fixed": "default"
  };

  const handleStatusChange = (postId, newStatus) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId ? { ...post, status: newStatus } : post
      )
    );
  };

  // Navigate to Laporan page
  const handleCreateReport = () => {
    navigate('/laporan');
  };

  // Fetch user posts from API (optional)
  const fetchUserPosts = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/posts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Uncomment this when you have posts API ready
    // fetchUserPosts();
  }, [user]);

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="max-w-screen-xl mx-auto bg-[#F7FBFA] pb-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your dashboard</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your personalized dashboard.</p>
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

  // User profile data from auth context
  const profileData = {
    name: user?.user_name || "Unknown User",
    avatar: user?.user_profile ? `http://localhost:3000/${user.user_profile}` : "/api/placeholder/80/80",
    role: user?.role?.role_name || "User",
    email: user?.user_email || ""
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-[#F7FBFA] pb-6 min-h-screen">
      {/* Profile Card */}
      <div className="bg-[#16423c] text-white p-5 border-b shadow-sm rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 font-header">
            <Avatar className="h-20 w-20 border-2 border-white">
              <img 
                src={profileData.avatar} 
                alt={`${profileData.name}'s profile avatar`} 
                className="rounded-full object-cover h-full w-full" 
              />
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-sm mt-1 opacity-90">{profileData.email}</p>
              <p className="text-sm mt-1 capitalize">Role: {profileData.role}</p>
            </div>
          </div>
          
          {/* Create Report Button */}
          <Button 
            onClick={handleCreateReport}
            className="bg-white text-[#16423c] hover:bg-gray-100 font-semibold px-6 py-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Container for the main content */}
      <div className="mt-6 px-4 lg:px-2 font-body">
        {/* Quick Actions Bar */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading posts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                {/* Card Header: User Info and Actions */}
                <div className="px-4 pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10 border">
                        <img 
                          src={post.user.avatar} 
                          alt={`${post.user.name}'s avatar`} 
                          className="rounded-full object-cover h-full w-full" 
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{post.user.name}</p>
                        <p className="text-xs text-gray-500">{post.user.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge
                            variant={statusColors[post.status]}
                            className="capitalize cursor-pointer py-1 px-2 text-xs hover:opacity-80 transition-opacity"
                          >
                            {post.status} <ChevronDown className="h-3 w-3 ml-1 inline-block" />
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {statusOptions.map((statusOption) => (
                            <DropdownMenuItem
                              key={statusOption}
                              onClick={() => handleStatusChange(post.id, statusOption)}
                              className={`text-xs ${post.status === statusOption ? "bg-gray-100" : ""}`}
                            >
                              <Check className={`h-3 w-3 mr-2 ${post.status === statusOption ? 'opacity-100' : 'opacity-0'}`} />
                              {statusOption}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Card Content: Post Text and Image */}
                <div className="px-4 pb-1 flex-grow">
                  <p className="text-sm mb-3 text-gray-700 leading-relaxed">{post.content}</p>
                  {post.image && (
                    <div className="rounded-md overflow-hidden mb-3 border">
                      <img src={post.image} alt="Post content" className="w-full object-cover max-h-72" />
                    </div>
                  )}
                </div>
                
                {/* Card Stats */}
                <div className="px-4 pb-3">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>{post.stats.likes} likes</span>
                    <span>{post.stats.comments} comments</span>
                  </div>
                </div>

                {/* Card Footer: Action Buttons */}
                <div className="flex justify-between border-t border-gray-100">
                  <Button variant="ghost" className="flex-1 text-gray-600 hover:bg-gray-50 flex items-center justify-center text-xs py-3 rounded-none">
                    <Heart className="h-4 w-4 mr-1.5" /> LIKE
                  </Button>
                  <Button variant="ghost" className="flex-1 text-gray-600 hover:bg-gray-50 flex items-center justify-center text-xs py-3 border-l border-r border-gray-100 rounded-none">
                    <MessageSquare className="h-4 w-4 mr-1.5" /> COMMENT
                  </Button>
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