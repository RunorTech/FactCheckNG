"use client"
import { StatCard } from '@/components/admin/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { mockAnalyticsStats, mockTopLGAs } from '@/mock/analytics';
import { mockClaims } from '@/mock/claims';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const recentActivity = mockClaims.slice(0, 5).map(claim => ({
    title: claim.title,
    lga: claim.lga,
    date: claim.verdictDate || claim.submittedDate,
    verdict: claim.verdict,
  }));

  // TODO: connect to admin analytics API

  return (
      <div className="p-8 bg-background">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Overview of platform activity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Claims"
              value={mockAnalyticsStats.totalClaims}
              icon={FileText}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Verified True"
              value={mockAnalyticsStats.verifiedTrue}
              icon={CheckCircle}
              description="Green verdicts"
            />
            <StatCard
              title="Verified False"
              value={mockAnalyticsStats.verifiedFalse}
              icon={XCircle}
              description="Grey verdicts"
            />
            <StatCard
              title="Pending"
              value={mockAnalyticsStats.pending}
              icon={Clock}
              description="Awaiting verification"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top LGAs by Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTopLGAs}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lga" angle={-45} textAnchor="end" height={100} fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="claims" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm">
                      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                        activity.verdict === 'true' ? 'bg-verdict-true' :
                        activity.verdict === 'false' ? 'bg-verdict-false' :
                        activity.verdict === 'pending' ? 'bg-verdict-pending' :
                        'bg-verdict-inconclusive'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{activity.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {activity.lga} • {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Time to Verdict</p>
                  <p className="text-2xl font-bold mt-1">{mockAnalyticsStats.avgTimeToVerdict}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Verification Rate</p>
                  <p className="text-2xl font-bold mt-1">82%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Researchers</p>
                  <p className="text-2xl font-bold mt-1">24</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trust Score</p>
                  <p className="text-2xl font-bold mt-1">4.2/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default DashboardPage;
