import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  DollarSign, 
  TrendingUp, 
  Download,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft
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

interface UserEarningsData {
  id: string
  name: string
  email: string
  role: "freelancer" | "client"
  totalEarnings: number
  totalSpent: number
  projectsCompleted: number
  avgProjectValue: number
  country: string
  joinDate: string
  lastActivity: string
  status: "active" | "inactive"
}

const userEarningsData: UserEarningsData[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "freelancer",
    totalEarnings: 25400,
    totalSpent: 0,
    projectsCompleted: 12,
    avgProjectValue: 2117,
    country: "United States",
    joinDate: "2023-03-15",
    lastActivity: "2024-01-15",
    status: "active"
  },
  {
    id: "2",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "client",
    totalEarnings: 0,
    totalSpent: 18500,
    projectsCompleted: 8,
    avgProjectValue: 2312,
    country: "United Kingdom",
    joinDate: "2023-01-10",
    lastActivity: "2024-01-14",
    status: "active"
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@design.com",
    role: "freelancer",
    totalEarnings: 19800,
    totalSpent: 0,
    projectsCompleted: 15,
    avgProjectValue: 1320,
    country: "Canada",
    joinDate: "2023-05-22",
    lastActivity: "2024-01-13",
    status: "active"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@creative.com",
    role: "freelancer",
    totalEarnings: 31200,
    totalSpent: 0,
    projectsCompleted: 18,
    avgProjectValue: 1733,
    country: "Australia",
    joinDate: "2022-11-08",
    lastActivity: "2024-01-12",
    status: "active"
  }
]

const topEarnersData = [
  { name: "Emily Davis", earnings: 31200, projects: 18 },
  { name: "Sarah Johnson", earnings: 25400, projects: 12 },
  { name: "Mike Chen", earnings: 19800, projects: 15 },
  { name: "Alex Rodriguez", earnings: 16750, projects: 9 },
  { name: "Lisa Wang", earnings: 14200, projects: 11 }
]

const topSpendersData = [
  { name: "TechCorp Inc", spent: 45600, projects: 22 },
  { name: "StartupXYZ", spent: 32400, projects: 15 },
  { name: "Digital Agency", spent: 28900, projects: 18 },
  { name: "John Smith", spent: 18500, projects: 8 },
  { name: "MediaCompany", spent: 15200, projects: 12 }
]

const earningsDistribution = [
  { range: "$0-$5k", count: 145, color: "#3B82F6" },
  { range: "$5k-$15k", count: 89, color: "#10B981" },
  { range: "$15k-$30k", count: 67, color: "#F59E0B" },
  { range: "$30k+", count: 34, color: "#EF4444" }
]

export function UserEarningsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | "freelancer" | "client">("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [sortBy, setSortBy] = useState<"earnings" | "spent" | "projects">("earnings")

  const filteredUsers = userEarningsData
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      
      return matchesSearch && matchesRole && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "earnings":
          return b.totalEarnings - a.totalEarnings
        case "spent":
          return b.totalSpent - a.totalSpent
        case "projects":
          return b.projectsCompleted - a.projectsCompleted
        default:
          return 0
      }
    })

  const totalPlatformEarnings = userEarningsData.reduce((sum, user) => sum + user.totalEarnings, 0)
  const totalPlatformSpending = userEarningsData.reduce((sum, user) => sum + user.totalSpent, 0)
  const activeFreelancers = userEarningsData.filter(u => u.role === "freelancer" && u.status === "active").length
  const activeClients = userEarningsData.filter(u => u.role === "client" && u.status === "active").length

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "freelancer":
        return <Badge className="bg-success/10 text-success border-success/20">Freelancer</Badge>
      case "client":
        return <Badge className="bg-info/10 text-info border-info/20">Client</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
      case "inactive":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">User Earnings & Spend Reports</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive financial analytics for freelancers and clients
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform Earnings</p>
                <p className="text-2xl font-bold text-card-foreground">${totalPlatformEarnings.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <ArrowUpRight className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+18.5% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform Spending</p>
                <p className="text-2xl font-bold text-card-foreground">${totalPlatformSpending.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <ArrowDownLeft className="h-5 w-5 text-info" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Total client spending</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Freelancers</p>
                <p className="text-2xl font-bold text-card-foreground">{activeFreelancers}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Earning members</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold text-card-foreground">{activeClients}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Spending members</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Earners */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Top Earners</CardTitle>
            <CardDescription>Highest earning freelancers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topEarnersData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="earnings" 
                  fill="hsl(var(--success))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Spenders */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Top Spenders</CardTitle>
            <CardDescription>Highest spending clients this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topSpendersData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="spent" 
                  fill="hsl(var(--info))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Earnings Distribution */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Earnings Distribution</CardTitle>
            <CardDescription>Freelancer earnings breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={earningsDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ range, count }) => `${range}: ${count}`}
                >
                  {earningsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Earnings Table */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-card-foreground">User Financial Reports</CardTitle>
              <CardDescription>Detailed earnings and spending data by user</CardDescription>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={(value: any) => setRoleFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="freelancer">Freelancers</SelectItem>
                  <SelectItem value="client">Clients</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earnings">Earnings</SelectItem>
                  <SelectItem value="spent">Spending</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-lg border border-card-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Total Earnings</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Avg. Value</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <span className="font-medium text-card-foreground">{user.name}</span>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-success">
                        ${user.totalEarnings.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-info">
                        ${user.totalSpent.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{user.projectsCompleted}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">${user.avgProjectValue.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.country}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}