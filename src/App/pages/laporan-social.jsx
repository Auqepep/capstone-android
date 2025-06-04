import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  Repeat2,
  Eye,
  Edit,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Sample initial data for posts with commentsList
const initialPostsData = [
  {
    id: 1,
    author: "Ann Louis",
    authorAvatar: null,
    time: "4 jam yang lalu",
    location: "Jakarta Creative Hub",
    description:
      "Hello everybody! We are preparing a new fresh campaign. Here's a sneak peek :)",
    likes: 1250,
    shares: 24,
    status: "Dalam progress",
    isLiked: false,
    commentsList: [
      { id: "c1-1", user: "Bob", text: "Looks exciting!" },
      { id: "c1-2", user: "Charlie", text: "Can't wait to see more." },
      { id: "c1-3", user: "David", text: "Great initiative!" },
      { id: "c1-4", user: "Eve", text: "Keep up the good work." },
    ],
  },
  {
    id: 2,
    author: "John Doe",
    authorAvatar: null,
    time: "6 jam yang lalu",
    location: "Main Street, Downtown",
    description: "Found this broken sidewalk. Needs immediate attention!",
    likes: 450,
    shares: 12,
    status: "Belum Jalan",
    isLiked: true,
    commentsList: [
      { id: "c2-1", user: "Frank", text: "Oh no, hope it gets fixed soon." },
      { id: "c2-2", user: "Grace", text: "Thanks for reporting, John!" },
    ],
  },
  {
    id: 3,
    author: "Sarah Kim",
    authorAvatar: null,
    time: "1 hari yang lalu",
    location: "5th Avenue Pothole",
    description:
      "The pothole on 5th Avenue has been repaired. Thanks for your quick response!",
    likes: 780,
    shares: 18,
    status: "Fixed",
    isLiked: false,
    commentsList: [
      { id: "c3-1", user: "Henry", text: "Awesome news!" },
      { id: "c3-2", user: "Ivy", text: "That was quick." },
      { id: "c3-3", user: "Jack", text: "Finally!" },
    ],
  },
];

// Status badge color mapping
const statusColors = {
  "Belum Jalan": "destructive",
  "Dalam progress": "warning",
  Fixed: "success",
};

function SocialFeed() {
  const [postsData, setPostsData] = useState(initialPostsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // State untuk bagian komentar
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

  const filteredPosts = postsData.filter((post) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      post.description.toLowerCase().includes(searchTermLower) ||
      post.author.toLowerCase().includes(searchTermLower) ||
      (post.location && post.location.toLowerCase().includes(searchTermLower));
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleLike = (postId) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const toggleCommentSection = (postId) => {
    setActiveCommentPostId((currentOpenId) =>
      currentOpenId === postId ? null : postId
    );
    setNewCommentText(""); // Reset input field ketika membuka/menutup
  };

  const handleAddComment = (postId) => {
    if (!newCommentText.trim()) return; // Jangan tambahkan komentar kosong

    setPostsData((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `comment-${Date.now()}-${Math.random()}`, // ID unik sederhana
            user: "You", // Ganti dengan nama pengguna yang login jika ada
            text: newCommentText,
          };
          return {
            ...post,
            commentsList: [...post.commentsList, newComment],
          };
        }
        return post;
      })
    );
    setNewCommentText(""); // Kosongkan input field setelah post
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-header">
      <div className="w-64 p-4 border-r bg-white">
        {/* ... Filter sidebar (tidak berubah) ... */}
        <h2 className="text-3xl font-bold mb-4">FILTER</h2>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Belum Jalan">Belum Jalan</SelectItem>
                <SelectItem value="Dalam progress">Dalam Progress</SelectItem>
                <SelectItem value="Fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-0">
                  {/* ... CardHeader (tidak banyak berubah) ... */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={post.authorAvatar || "/placeholder-avatar.svg"}
                          alt={post.author}
                        />
                        <AvatarFallback>
                          {post.author.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={statusColors[post.status]}
                        className="capitalize"
                      >
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 font-body">
                  {post.location && (
                    <p className="text-sm text-gray-700 font-semibold mb-1">
                      Lokasi: {post.location}
                    </p>
                  )}
                  <p className="mb-3 text-gray-800">{post.description}</p>
                  {post.image && (
                    <div className="rounded-md overflow-hidden mb-3 border">
                      <img
                        src={post.image}
                        alt={`Post by ${post.author}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="flex items-center mr-4">
                      <Heart
                        className={`h-4 w-4 mr-1 ${
                          post.isLiked ? "text-red-500 fill-red-500" : ""
                        }`}
                      />{" "}
                      {post.likes} likes
                    </span>
                    <span
                      className="flex items-center mr-4 cursor-pointer"
                      onClick={() => toggleCommentSection(post.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />{" "}
                      {post.commentsList.length} comments
                    </span>
                  </div>
                  <div className="flex border-t pt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex-1 ${
                        post.isLiked
                          ? "text-red-500 hover:text-red-600"
                          : "text-gray-600 hover:text-red-500"
                      }`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          post.isLiked ? "fill-current" : ""
                        }`}
                      />
                      {post.isLiked ? "LIKED" : "LIKE"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-gray-600 hover:text-blue-500"
                      onClick={() => toggleCommentSection(post.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" /> COMMENT
                    </Button>
                  </div>

                  {/* Bagian Komentar yang bisa expand/collapse */}
                  {activeCommentPostId === post.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-semibold mb-3">
                        Comments ({post.commentsList.length})
                      </h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto mb-4 pr-2">
                        {post.commentsList.length > 0 ? (
                          // Tampilkan N komentar terakhir, atau semua jika kurang dari N+1
                          // Di sini kita balik arraynya agar komentar terbaru di atas, lalu ambil 4 teratas dari yang terbaru
                          [...post.commentsList]
                            .reverse()
                            .slice(0, 4)
                            .map((comment) => (
                              <div
                                key={comment.id}
                                className="text-xs bg-gray-100 p-2 rounded-md shadow-sm"
                              >
                                <span className="font-semibold text-gray-700">
                                  {comment.user}:{" "}
                                </span>
                                <span className="text-gray-600">
                                  {comment.text}
                                </span>
                              </div>
                            ))
                        ) : (
                          <p className="text-xs text-gray-500">
                            No comments yet. Be the first to comment!
                          </p>
                        )}
                        {/* Opsi untuk melihat semua komentar jika lebih dari 4 */}
                        {post.commentsList.length > 4 && (
                          <p className="text-xs text-blue-500 hover:underline cursor-pointer mt-2">
                            View all {post.commentsList.length - 4} other
                            comments
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2 items-center">
                        <Avatar size="sm" className="w-8 h-8">
                          {" "}
                          {/* Avatar kecil untuk input komentar */}
                          <AvatarFallback>Y</AvatarFallback>{" "}
                          {/* Ganti 'Y' dengan inisial user yang login */}
                        </Avatar>
                        <Input
                          type="text"
                          placeholder="Write a comment..."
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          className="flex-1 text-sm"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault(); // Mencegah newline di input jika hanya Enter
                              handleAddComment(post.id);
                            }
                          }}
                        />
                        <Button
                          onClick={() => handleAddComment(post.id)}
                          size="sm"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <p className="text-xl">No posts match your criteria.</p>
              <p>Try adjusting your search or status filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SocialFeed;
