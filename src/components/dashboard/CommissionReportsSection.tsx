import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  DollarSign, 
  TrendingUp, 
  Download,
  Percent,
  Target,
  Calendar
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
  LineChart,
  Line
} from "recharts"

const monthlyCommissionData = [
  { month: "Jul", commission: 3250, revenue: 65000, rate: 5.0, transactions: 180 },
  { month: "Aug", commission: 3890, revenue: 77800, rate: 5.0, transactions: 210 },
  { month: "Sep", commission: 3620, revenue: 72400, rate: 5.0, transactions: 195 },
  { month: "Oct", commission: 4575, revenue: 91500, rate: 5.0, transactions: 245 },
  { month: "Nov", commission: 4125, revenue: 82500, rate: 5.0, transactions: 220 },
  { month: "Dec", commission: 5025, revenue: 100500, rate: 5.0, transactions: 270 }
]

const categoryCommissionData = [
  { category: "Web Development", commission: 12400, rate: 5.0, projects: 156 },
  { category: "Mobile Apps", commission: 8900, rate: 5.0, projects: 89 },
  { category: "UI/UX Design", commission: 7200, rate: 5.0, projects: 120 },
  { category: "Content Writing", commission: 3800, rate: 4.5, projects: 203 },
  { category: "Digital Marketing", commission: 2900, rate: 5.5, projects: 78 },
  { category: "Data Science", commission: 6700, rate: 5.0, projects: 45 }
]

const commissionRateData = [
  { month: "Jul", standard: 5.0, premium: 3.5, enterprise: 2.5 },
  { month: "Aug", standard: 5.0, premium: 3.5, enterprise: 2.5 },
  { month: "Sep", standard: 5.0, premium: 3.5, enterprise: 2.5 },
  { month: "Oct", standard: 5.0, premium: 3.5, enterprise: 2.5 },
  { month: "Nov", standard: 5.0, premium: 3.5, enterprise: 2.5 },
  { month: "Dec", standard: 5.0, premium: 3.5, enterprise: 2.5 }
]

interface CommissionTransaction {
  id: string
  projectName: string
  client: string
  freelancer: string
  projectValue: number
  commissionRate: number
  commissionAmount: number
  category: string
  date: string
  tier: "standard" | "premium" | "enterprise"
}

const commissionTransactions: CommissionTransaction[] = [
  {
    id: "COM-001",
    projectName: "E-commerce Platform Development",
    client: "John Smith",
    freelancer: "Sarah Johnson",
    projectValue: 5000,
    commissionRate: 5.0,
    commissionAmount: 250,
    category: "Web Development",
    date: "2024-01-15",
    tier: "standard"
  },
  {
    id: "COM-002",
    projectName: "Mobile App UI Design",
    client: "Tech Corp",
    freelancer: "Mike Chen",
    projectValue: 3200,
    commissionRate: 3.5,
    commissionAmount: 112,
    category: "UI/UX Design",
    date: "2024-01-14",
    tier: "premium"
  },
  {
    id: "COM-003",
    projectName: "Enterprise Software Solution",
    client: "BigCompany Inc",
    freelancer: "Emily Davis",
    projectValue: 12000,
    commissionRate: 2.5,
    commissionAmount: 300,
    category: "Web Development",
    date: "2024-01-13",
    tier: "enterprise"
  }
]

export function CommissionReportsSection() {
  const [timeRange, setTimeRange] = useState<"6m" | "1y" | "2y">("6m")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredTransactions = commissionTransactions.filter(transaction => {
    return categoryFilter === "all" || transaction.category === categoryFilter
  })

  const totalCommission = 28485
  const avgCommissionRate = 4.8
  const monthlyGrowth = 15.3
  const projectedAnnual = 65840

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "standard":
        return <Badge className="bg-info/10 text-info border-info/20">Standard</Badge>
      case "premium":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Premium</Badge>
      case "enterprise":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Enterprise</Badge>
      default:
        return <Badge variant="secondary">{tier}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Platform Commission Reports</h1>
        <p className="text-muted-foreground mt-2">
          Monitor commission earnings, rates, and revenue analytics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Commission</p>
                <p className="text-2xl font-bold text-card-foreground">${totalCommission.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+{monthlyGrowth}% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Commission Rate</p>
                <p className="text-2xl font-bold text-card-foreground">{avgCommissionRate}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Percent className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Across all tiers</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projected Annual</p>
                <p className="text-2xl font-bold text-card-foreground">${projectedAnnual.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Based on current trend</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-card-foreground">$5,025</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-info" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">270 transactions</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Trend */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold text-card-foreground">Commission Trend</CardTitle>
                <CardDescription>Monthly commission earnings over time</CardDescription>
              </div>
              <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6m">6M</SelectItem>
                  <SelectItem value="1y">1Y</SelectItem>
                  <SelectItem value="2y">2Y</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyCommissionData}>
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
                  dataKey="commission" 
                  stroke="hsl(var(--chart-primary))" 
                  fill="hsl(var(--chart-primary) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Commission Rates by Tier */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Commission Rates by Tier</CardTitle>
            <CardDescription>Rate comparison across membership tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={commissionRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={[0, 6]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="standard" 
                  stroke="hsl(var(--chart-info))" 
                  strokeWidth={2}
                  name="Standard"
                />
                <Line 
                  type="monotone" 
                  dataKey="premium" 
                  stroke="hsl(var(--chart-warning))" 
                  strokeWidth={2}
                  name="Premium"
                />
                <Line 
                  type="monotone" 
                  dataKey="enterprise" 
                  stroke="hsl(var(--chart-primary))" 
                  strokeWidth={2}
                  name="Enterprise"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Commission by Category */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Commission by Category</CardTitle>
          <CardDescription>Breakdown of commission earnings by project category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryCommissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={80}
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
              <Bar 
                dataKey="commission" 
                fill="hsl(var(--chart-success))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Commission Transactions Table */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-card-foreground">Recent Commission Transactions</CardTitle>
              <CardDescription>Detailed commission breakdown by transaction</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Mobile Apps">Mobile Apps</SelectItem>
                  <SelectItem value="Content Writing">Content Writing</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-card-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client → Freelancer</TableHead>
                  <TableHead>Project Value</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <span className="font-medium text-card-foreground">
                          {transaction.projectName}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {transaction.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{transaction.client}</p>
                        <p className="text-xs text-muted-foreground">→ {transaction.freelancer}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">${transaction.projectValue.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.commissionRate}%</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-success">
                        ${transaction.commissionAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{getTierBadge(transaction.tier)}</TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(transaction.date).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
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