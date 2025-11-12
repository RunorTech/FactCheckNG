"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  mockClaimsPerWeek,
  mockVerdictDistribution,
  mockTopLGAs,
} from '@/mock/analytics';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const AnalyticsPage = () => {
  const timeToVerdictData = [
    { week: 'Week 1', hours: 42 },
    { week: 'Week 2', hours: 38 },
    { week: 'Week 3', hours: 45 },
    { week: 'Week 4', hours: 32 },
    { week: 'Week 5', hours: 36 },
    { week: 'Week 6', hours: 34 },
  ];

  // TODO: connect to backend for analytics data

  return (
      <div className="p-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Platform performance and insights</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Claims Per Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockClaimsPerWeek}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="claims" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verdict Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockVerdictDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockVerdictDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time to Verdict Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeToVerdictData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top LGAs by Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTopLGAs} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="lga" type="category" width={150} fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="claims" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Verification Rate</p>
                  <p className="text-3xl font-bold mt-2">82%</p>
                  <p className="text-xs text-muted-foreground mt-1">Claims verified within 72h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy Score</p>
                  <p className="text-3xl font-bold mt-2">95%</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on audit reviews</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Users</p>
                  <p className="text-3xl font-bold mt-2">24.5K</p>
                  <p className="text-xs text-green-600 mt-1">↑ 18% from last month</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trust Score</p>
                  <p className="text-3xl font-bold mt-2">4.2/5</p>
                  <p className="text-xs text-muted-foreground mt-1">User satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default AnalyticsPage;
