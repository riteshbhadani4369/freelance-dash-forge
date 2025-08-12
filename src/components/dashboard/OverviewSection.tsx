import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  HeadphonesIcon,
  TrendingUp,
  Globe,
  AlertTriangle,
  Activity
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts"

const revenueData = [
  { month: "Jan", revenue: 45000, users: 1200 },
  { month: "Feb", revenue: 52000, users: 1400 },
  { month: "Mar", revenue: 48000, users: 1350 },
  { month: "Apr", revenue: 61000, users: 1600 },
  { month: "May", revenue: 55000, users: 1500 },
  { month: "Jun", revenue: 67000, users: 1750 }
]

const countryData = [
  { country: "United States", users: 2500, color: "#3B82F6" },
  { country: "United Kingdom", users: 1800, color: "#10B981" },
  { country: "Canada", users: 1200, color: "#F59E0B" },
  { country: "Australia", users: 900, color: "#EF4444" },
  { country: "Germany", users: 800, color: "#8B5CF6" }
]

const techData = [
  { tech: "Web Development", jobs: 450 },
  { tech: "Mobile Apps", jobs: 320 },
  { tech: "UI/UX Design", jobs: 280 },
  { tech: "Data Science", jobs: 190 },
  { tech: "DevOps", jobs: 150 }
]

export function OverviewSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your admin dashboard. Here's what's happening on your platform.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-up [animation-delay:0.1s]">
        <Card className="border-card-border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">8,756</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </Badge>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">1,234</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </Badge>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">$67,000</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3%
              </Badge>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Support Tickets</CardTitle>
            <HeadphonesIcon className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">23</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                5 urgent
              </Badge>
              <p className="text-xs text-muted-foreground">pending review</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-in-up [animation-delay:0.3s]">
        {/* Revenue Trend */}
        <Card className="border-card-border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue and user growth over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--chart-primary))" 
                  fill="hsl(var(--chart-primary) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Total Users PIE Chart */}
        <Card className="border-card-border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Total Users Distribution</CardTitle>
            <CardDescription>User breakdown by role and status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Active Freelancers", value: 3450, color: "hsl(var(--chart-success))" },
                    { name: "Active Clients", value: 2890, color: "hsl(var(--chart-info))" },
                    { name: "Inactive Users", value: 1890, color: "hsl(var(--chart-muted))" },
                    { name: "Pending Verification", value: 526, color: "hsl(var(--chart-warning))" }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {[
                    { color: "hsl(var(--chart-success))" },
                    { color: "hsl(var(--chart-info))" },
                    { color: "hsl(var(--chart-muted))" },
                    { color: "hsl(var(--chart-warning))" }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Geographic and Tech Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-up [animation-delay:0.5s]">
        {/* Active Jobs Geographic Map */}
        <Card className="border-card-border shadow-sm lg:col-span-2 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Active Jobs by Location</CardTitle>
            <CardDescription>Geographic distribution of active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] bg-gradient-to-br from-primary/5 to-info/5 rounded-lg border border-card-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Geographic Distribution</h3>
                  <p className="text-muted-foreground text-sm">Interactive map visualization</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-info">456</p>
                    <p className="text-xs text-muted-foreground">North America</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">342</p>
                    <p className="text-xs text-muted-foreground">Europe</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">234</p>
                    <p className="text-xs text-muted-foreground">Asia Pacific</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-card-border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">System Health</CardTitle>
            <CardDescription>Current platform status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-success" />
                <span className="text-sm text-card-foreground">Server Status</span>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">Healthy</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-info" />
                <span className="text-sm text-card-foreground">API Response</span>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">95ms</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm text-card-foreground">Memory Usage</span>
              </div>
              <Badge className="bg-warning/10 text-warning border-warning/20">78%</Badge>
            </div>

            <div className="pt-4 border-t border-card-border">
              <p className="text-xs text-muted-foreground">
                Last updated: 2 minutes ago
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}