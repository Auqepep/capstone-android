import React, { useState } from "react";
import {
  Check,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Repeat2,
  TrendingUp,
  Users,
  Eye,
  Edit,
  ChevronDown // Added for status dropdown
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button"; 
import { Avatar } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"; 
import placeholder from "../../assets/placeholder.jpg";

//warna
const statusOptions = ["Belum Jalan", "Dalam Progress", "Fixed"];
const statusColors = {
  "Belum Jalan": "destructive",
  "Dalam Progress": "warning",
  "Fixed": "success",
};

const initialPostsData = [
  {
    id: "post1", // Added unique ID
    user: {
      name: "Ann Louis",
      avatar: "/api/placeholder/32/32",
      time: "14 jam yang lalu"
    },
    content: "Hello everybody! We are preparing a new Fresh campaign. Here's a sneak peek :)",
    image: placeholder,
    status: "Dalam Progress", // Initial status
    stats: {
      likes: 1250,
      comments: 87,
      shares: 24
    }
  },
  {
    id: "post2", // Added unique ID
    user: {
      name: "Ann Louis",
      avatar: "/api/placeholder/32/32",
      time: "2 days ago"
    },
    content: "lorem ipsum sit dolor amet",
    image: placeholder,
    status: "Belum Jalan", // Initial status
    stats: {
      likes: 890,
      comments: 55,
      shares: 15
    }
  },
  {
    id: "post3", // Added a third post for variety
    user: {
      name: "John Doe",
      avatar: "/api/placeholder/32/32",
      time: "3 days ago"
    },
    content: "Just fixed the pothole on Main St. #communityservice",
    image: placeholder, // You might want a different placeholder or actual image
    status: "Fixed", // Initial status
    stats: {
      likes: 750,
      comments: 40,
      shares: 10
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

  // Sample data (rest of the data remains the same)
  const profileData = {
    name: "Ann Louis",
    avatar: "/api/placeholder/80/80",
    role: "Influencer | Content Creator",
    connections: 145
  };

  const insightsData = [
    {
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      text: "Anda telah melaporkan kerusakan sebanyak",
      highlight: "10 laporan"
    },
    {
      icon: <Users className="h-4 w-4 text-blue-500" />,
      text: "Anda mendapatkan",
      highlight: "10 pengikut baru"
    },
    {
      icon: <Eye className="h-4 w-4 text-purple-500" />,
      text: "Anda memiliki",
      highlight: "101 pengunjung",
      suffix: "di profil Anda"
    }
  ];

  const recommendedUsers = [
    { name: "Desiree Baptiste", role: "Kritik Pemerintah", avatar: "/api/placeholder/40/40" },
    { name: "James Derwent", role: "Kritik Aspal", avatar: "/api/placeholder/40/40" },
    { name: "Jocelyn Westervelt", role: "Kritik Bangunan", avatar: "/api/placeholder/40/40" },
    { name: "Philip Amiroff", role: "Kritik Tata Kelola", avatar: "/api/placeholder/40/40" },
    { name: "Ann Louis", role: "Kritik Jalanan", avatar: "/api/placeholder/40/40" }
  ];

  return (
    <div className="max-w-screen-xl mx-auto bg-[#F7FBFA] pb-6">
      {/* Profile Card */}
      <div className="bg-[var(--btn-primary)] text-white p-5 border-b shadow-sm rounded-t-2xl"> {/* Assuming --btn-primary is defined CSS variable */}
        <div className="flex items-center gap-6 font-header">
          <Avatar className="h-20 w-20 border">
            <img src={profileData.avatar} alt={`${profileData.name}'s profile avatar`} className="rounded-full object-cover h-full w-full" />
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-sm mt-1">{profileData.role}</p>
            <p className="text-xs mt-2">{profileData.connections} connections</p>
          </div>
        </div>
      </div>

      {/* Container for the three columns */}
      <div className="flex flex-col lg:flex-row lg:gap-6 mt-6 px-4 lg:px-2 font-body">
        {/* Column 1: Insights */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-4 border-b rounded-t-md">
            <h1 className="text-lg font-medium">Insight Tracker</h1>
          </div>
          <div className="p-4 grid grid-cols-1 gap-3 bg-white rounded-b-md shadow-sm">
            {insightsData.map((insight, index) => (
              <Card key={index} className="bg-white shadow-sm border">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {insight.icon}
                  </div>
                  <p className="text-sm text-gray-700">
                    {insight.text}{" "}
                    <span className="font-bold text-green-600">{insight.highlight}</span>
                    {insight.suffix && ` ${insight.suffix}`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Column 2: Post Feed */}
        <div className="w-full lg:w-1/3 mt-4 lg:mt-0 bg-white rounded-md shadow-md overflow-hidden">
          {posts.map((post, index) => (
            <div
              key={post.id} // Use post.id for key
              className={`px-4 py-4 ${
                index < posts.length - 1 ? "border-b border-gray-100" : "" // Removed mb-4 to avoid double spacing
              }`}
            >
              <div className="flex justify-between items-start mb-3"> {/* Changed to items-start for better alignment */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 border">
                    <img src={post.user.avatar} alt={`${post.user.name}'s avatar`} className="rounded-full object-cover h-full w-full" />
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{post.user.name}</p>
                    <p className="text-xs text-gray-500">{post.user.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2"> {/* Container for status and more options */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge
                        variant={statusColors[post.status]}
                        className="capitalize cursor-pointer py-1 px-2 text-xs"
                      >
                        {post.status} <ChevronDown className="h-3 w-3 ml-1 inline-block" />
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {statusOptions.map((statusOption) => (
                        <DropdownMenuItem
                          key={statusOption}
                          onClick={() => handleStatusChange(post.id, statusOption)}
                          className={post.status === statusOption ? "bg-gray-100" : ""}
                        >
                          <Check className={`h-4 w-4 mr-2 ${post.status === statusOption ? 'opacity-100' : 'opacity-0'}`} />
                          {statusOption}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>

              <p className="text-sm mb-3 text-gray-700">{post.content}</p>

              {post.image && ( // Conditionally render image
                <div className="rounded-md overflow-hidden mb-3">
                  <img src={post.image} alt="Post related content" className="w-full object-cover max-h-96" />
                </div>
              )}

              <div className="flex gap-4 text-xs text-gray-500 mb-3">
                <span>{post.stats.likes} likes</span>
                <span>{post.stats.comments} comments</span>
                <span>{post.stats.shares} shares</span>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-2">
                <Button variant="ghost" className="flex-1 text-gray-600 flex items-center justify-center text-xs">
                  <Heart className="h-4 w-4 mr-1" /> LIKE
                </Button>
                <Button variant="ghost" className="flex-1 text-gray-600 flex items-center justify-center text-xs">
                  <MessageSquare className="h-4 w-4 mr-1" /> COMMENT
                </Button>
                <Button variant="ghost" className="flex-1 text-gray-600 flex items-center justify-center text-xs">
                  <Repeat2 className="h-4 w-4 mr-1" /> SHARE
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3: Recommended Users */}
        <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
          <div className="px-4 py-3 bg-gray-100 border-b border-t lg:border-t-0 border-gray-200 rounded-t-md">
            <h2 className="text-sm font-medium text-gray-700">People You Might Know</h2>
          </div>
          <div className="mt-0 bg-white rounded-b-md shadow-sm">
            {recommendedUsers.map((user, index) => (
              <div key={index} className="px-4 py-2 flex items-center justify-between border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <img src={user.avatar} alt={`${user.name}'s avatar`} className="rounded-full object-cover h-full w-full"/>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-3 py-1 text-xs">
                  CONNECT
                </Button>
              </div>
            ))}
            <div className="px-4 py-3 text-center border-t border-gray-100">
              <Button variant="ghost" size="sm" className="text-gray-500 text-xs hover:underline">
                VIEW MORE →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialDashboard;