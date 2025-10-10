"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FolderKanban, Gavel, Users, TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const stats = [
  {
    title: "Total Investments",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Projects",
    value: "567",
    change: "+8.2%",
    trend: "up",
    icon: FolderKanban,
  },
  {
    title: "Live Auctions",
    value: "89",
    change: "-3.1%",
    trend: "down",
    icon: Gavel,
  },
  {
    title: "Total Users",
    value: "3,456",
    change: "+15.3%",
    trend: "up",
    icon: Users,
  },
]

const barChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
]

const lineChartData = [
  { name: "Mon", value: 200 },
  { name: "Tue", value: 400 },
  { name: "Wed", value: 300 },
  { name: "Thu", value: 600 },
  { name: "Fri", value: 500 },
  { name: "Sat", value: 700 },
  { name: "Sun", value: 400 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Header title="Dashboard" breadcrumb="Overview" />

      <div className="flex-1 space-y-6 p-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-[#FF6B00]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="text-gray-400">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#FF6B00" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader>
              <CardTitle className="text-white">Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#FF6B00"
                    strokeWidth={2}
                    dot={{ fill: "#FF6B00", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-[#2a2a2a] pb-4 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#2a2a2a]" />
                    <div>
                      <p className="text-sm font-medium text-white">New investment in Urban Farming Initiative</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-[#FF6B00]">$1,000</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
