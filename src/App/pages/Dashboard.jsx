import React, { useState } from "react";
import {
  Check,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Repeat2,
  // TrendingUp, // Removed as Insights are removed
  // Users,      // Removed as Insights are removed
  // Eye,        // Removed as Insights are removed
  Edit,
  ChevronDown
} from "lucide-react";
// Card, CardContent, CardHeader are removed as their usage (Insights) is removed
import { Button } from "../../components/ui/button";
import { Avatar } from "../../components/ui/avatar"; // Assuming AvatarFallback and AvatarImage are part of this or handled internally
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

//warna
const statusOptions = ["Belum Jalan", "Dalam Progress", "Fixed"];
const statusColors = {
  "Belum Jalan": "destructive",
  "Dalam Progress": "warning",
  "Fixed": "success",
};

const initialPostsData = [
  {
    id: "post1",
    user: {
      name: "Ann Louis",
      avatar: "/api/placeholder/32/32", // Pastikan path ini valid atau ganti dengan placeholder
      time: "14 jam yang lalu"
    },
    content: "Hello everybody! We are preparing a new Fresh campaign. Here's a sneak peek :)",
    status: "Dalam Progress",
    stats: {
      likes: 1250,
      comments: 87,
      shares: 24
    }
  },
  {
    id: "post2",
    user: {
      name: "Ann Louis",
      avatar: "/api/placeholder/32/32",
      time: "2 days ago"
    },
    content: "lorem ipsum sit dolor amet",
    status: "Belum Jalan",
    stats: {
      likes: 890,
      comments: 55,
      shares: 15
    }
  },
  {
    id: "post3",
    user: {
      name: "John Doe",
      avatar: "/api/placeholder/32/32",
      time: "3 days ago"
    },
    content: "Just fixed the pothole on Main St. #communityservice",
    status: "Fixed",
    stats: {
      likes: 750,
      comments: 40,
      shares: 10
    }
  },
  // Tambahkan lebih banyak post untuk melihat efek grid dengan baik
  {
    id: "post4",
    user: {
      name: "Jane Smith",
      avatar: "/api/placeholder/32/32",
      time: "5 days ago"
    },
    content: "Exploring new design trends for our upcoming project. #designthinking",
    status: "Dalam Progress",
    stats: {
      likes: 920,
      comments: 65,
      shares: 20
    }
  }
];

function SocialDashboard() {
  const [posts, setPosts] = useState(initialPostsData);

  const handleStatusChange = (postId, newStatus) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId ? { ...post, status: newStatus } : post
      )
    );
  };

  const profileData = {
    name: "Ann Louis",
    avatar: "/api/placeholder/80/80", // Pastikan path ini valid
    role: "Influencer | Content Creator",
    connections: 145
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-[#F7FBFA] pb-6 min-h-screen">
      {/* Profile Card */}
      <div className="bg-[var(--btn-primary)] text-white p-5 border-b shadow-sm rounded-t-2xl">
        <div className="flex items-center gap-6 font-header">
          <Avatar className="h-20 w-20 border-2 border-white"> {/* Menambahkan border agar terlihat di bg gelap */}
            <img src={profileData.avatar} alt={`${profileData.name}'s profile avatar`} className="rounded-full object-cover h-full w-full" />
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-sm mt-1">{profileData.role}</p>
            <p className="text-xs mt-2">{profileData.connections} connections</p>
          </div>
        </div>
      </div>

      {/* Container for the main content (Post Feed in a Grid) */}
      <div className="mt-6 px-4 lg:px-2 font-body">
        {/* Post Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              {/* Card Header: User Info and Actions */}
              <div className="px-4 pt-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 border">
                      <img src={post.user.avatar} alt={`${post.user.name}'s avatar`} className="rounded-full object-cover h-full w-full" />
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
              <div className="px-4 pb-1 flex-grow"> {/* flex-grow agar konten mengisi ruang */}
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
      </div>
    </div>
  );
}

export default SocialDashboard;