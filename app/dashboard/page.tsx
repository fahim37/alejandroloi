"use client";

import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Coins, FileText, Gavel } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const stats = [
  {
    title: "Total Revenue",
    value: "1250",
    icon: DollarSign,
  },
  {
    title: "Total Investments",
    value: "1250",
    icon: Coins,
  },
  {
    title: "Total Project",
    value: "1250",
    icon: FileText,
  },
  {
    title: "Total Auctions",
    value: "1250",
    icon: Gavel,
  },
];

const chartData = [
  { month: "Jan", auctions: 700, investments: 650, project: 600 },
  { month: "Feb", auctions: 750, investments: 700, project: 580 },
  { month: "Mar", auctions: 800, investments: 680, project: 650 },
  { month: "Apr", auctions: 1000, investments: 750, project: 700 },
  { month: "May", auctions: 850, investments: 720, project: 620 },
  { month: "Jun", auctions: 1240, investments: 1240, project: 680 },
  { month: "Jul", auctions: 900, investments: 800, project: 650 },
  { month: "Aug", auctions: 950, investments: 850, project: 700 },
  { month: "Sep", auctions: 1100, investments: 950, project: 750 },
  { month: "Oct", auctions: 1000, investments: 900, project: 680 },
  { month: "Nov", auctions: 1200, investments: 1000, project: 800 },
  { month: "Dec", auctions: 1150, investments: 1100, project: 750 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Header title="Dashboard" breadcrumb="Overview" />

      <div className="flex-1 space-y-6 p-8">
        <h2 className="text-xl text-gray-400 font-normal">
          Welcome back to your admin panel
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <stat.icon className="h-6 w-6 text-[#FF6B00]" />
                  <span className="text-sm font-medium text-gray-400">
                    {stat.title}
                  </span>
                </div>
                <div className="text-4xl font-bold text-white">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Statistic</CardTitle>
            <p className="text-gray-400 text-sm">Services</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#666"
                  tick={{ fill: "#999" }}
                  axisLine={{ stroke: "#333" }}
                />
                <YAxis
                  stroke="#666"
                  tick={{ fill: "#999" }}
                  axisLine={{ stroke: "#333" }}
                  tickFormatter={(value) => `$${value}`}
                  domain={[0, 1200]}
                  ticks={[0, 200, 400, 600, 800, 1000, 1200]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2a2a2a",
                    border: "1px solid #3a3a3a",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number, name: string) => {
                    const labels: Record<string, string> = {
                      auctions: "Auctions",
                      investments: "Investments",
                      project: "Project",
                    };
                    return [value, labels[name] || name];
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                  formatter={(value) => {
                    const labels: Record<string, string> = {
                      auctions: "Auctions",
                      investments: "Investments",
                      project: "Project",
                    };
                    return (
                      <span className="text-gray-300">
                        {labels[value] || value}
                      </span>
                    );
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="auctions"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#10b981" }}
                />
                <Line
                  type="monotone"
                  dataKey="investments"
                  stroke="#FF6B00"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#FF6B00" }}
                />
                <Line
                  type="monotone"
                  dataKey="project"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
