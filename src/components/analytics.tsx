"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Eye, Heart, MessageSquare, Users, BarChart3 } from "lucide-react"

const analyticsData = {
  overview: {
    totalViews: 45230,
    totalLikes: 3847,
    totalComments: 892,
    totalFollowers: 1250,
    viewsChange: 15.3,
    likesChange: 8.7,
    commentsChange: -2.1,
    followersChange: 12.5,
  },
  topBlogs: [
    {
      title: "Understanding React Server Components",
      views: 8450,
      likes: 567,
      comments: 89,
      engagement: 7.8,
    },
    {
      title: "The Future of AI in Web Development",
      views: 6230,
      likes: 423,
      comments: 67,
      engagement: 7.9,
    },
    {
      title: "Building Scalable APIs with Node.js",
      views: 5890,
      likes: 389,
      comments: 54,
      engagement: 7.5,
    },
  ],
  monthlyData: [
    { month: "Jan", views: 3200, likes: 245, comments: 67 },
    { month: "Feb", views: 4100, likes: 312, comments: 89 },
    { month: "Mar", views: 3800, likes: 289, comments: 76 },
    { month: "Apr", views: 5200, likes: 398, comments: 102 },
    { month: "May", views: 6100, likes: 467, comments: 134 },
    { month: "Jun", views: 7300, likes: 523, comments: 156 },
  ],
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6months")

  const StatCard = ({ title, value, change, icon, color }: any) => (
    <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6 hover:border-neutral-600 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color}`}>{icon}</div>
        <div className={`flex items-center gap-1 text-sm ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
          {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-1">{value.toLocaleString()}</h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Track your blog performance and engagement</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-[#1d1d1d] border border-neutral-700 rounded-md text-white focus:outline-none focus:border-yellow-500 transition-colors"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="3months">Last 3 months</option>
          <option value="6months">Last 6 months</option>
          <option value="1year">Last year</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Views"
          value={analyticsData.overview.totalViews}
          change={analyticsData.overview.viewsChange}
          icon={<Eye className="w-6 h-6" />}
          color="text-blue-400"
        />
        <StatCard
          title="Total Likes"
          value={analyticsData.overview.totalLikes}
          change={analyticsData.overview.likesChange}
          icon={<Heart className="w-6 h-6" />}
          color="text-red-400"
        />
        <StatCard
          title="Total Comments"
          value={analyticsData.overview.totalComments}
          change={analyticsData.overview.commentsChange}
          icon={<MessageSquare className="w-6 h-6" />}
          color="text-green-400"
        />
        <StatCard
          title="Followers"
          value={analyticsData.overview.totalFollowers}
          change={analyticsData.overview.followersChange}
          icon={<Users className="w-6 h-6" />}
          color="text-yellow-400"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-yellow-500" />
            Monthly Trends
          </h3>
          <div className="space-y-4">
            {analyticsData.monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-gray-400 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-[#1d1d1d] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-yellow-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(data.views / 8000) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-white font-medium w-16 text-right">{data.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Blogs */}
        <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Top Performing Blogs</h3>
          <div className="space-y-4">
            {analyticsData.topBlogs.map((blog, index) => (
              <div key={index} className="p-4 bg-[#1d1d1d] border border-neutral-700 rounded-md">
                <h4 className="font-medium mb-2 text-sm">{blog.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {blog.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {blog.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {blog.comments}
                    </span>
                  </div>
                  <span className="text-yellow-500 font-medium">{blog.engagement}% engagement</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-[#191919] border border-neutral-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6">Engagement Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">7.6%</div>
            <div className="text-sm text-gray-400">Average Engagement Rate</div>
            <div className="text-xs text-green-400 mt-1">+0.8% from last month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">2.3min</div>
            <div className="text-sm text-gray-400">Average Read Time</div>
            <div className="text-xs text-green-400 mt-1">+15s from last month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">68%</div>
            <div className="text-sm text-gray-400">Return Reader Rate</div>
            <div className="text-xs text-green-400 mt-1">+5% from last month</div>
          </div>
        </div>
      </div>
    </div>
  )
}
