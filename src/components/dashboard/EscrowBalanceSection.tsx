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
  Shield, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Download,
  Filter
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
  Bar
} from "recharts"

// Monthly and Yearly Escrow Data
const monthlyEscrowData = [
  { month: "Jan", held: 125000, released: 98000, pending: 27000 },
  { month: "Feb", held: 142000, released: 118000, pending: 24000 },
  { month: "Mar", held: 158000, released: 134000, pending: 24000 },
  { month: "Apr", held: 176000, released: 152000, pending: 24000 },
  { month: "May", held: 195000, released: 168000, pending: 27000 },
  { month: "Jun", held: 218000, released: 185000, pending: 33000 }
]

const yearlyEscrowData = [
  { year: "2021", held: 1200000, released: 1100000, pending: 100000 },
  { year: "2022", held: 1850000, released: 1720000, pending: 130000 },
  { year: "2023", held: 2650000, released: 2480000, pending: 170000 },
  { year: "2024", held: 3200000, released: 2980000, pending: 220000 }
]

const escrowBreakdownData = [
  { category: "Web Development", amount: 89000, projects: 45 },
  { category: "Mobile Apps", amount: 67000, projects: 32 },
  { category: "UI/UX Design", amount: 54000, projects: 28 },
  { category: "Content Writing", amount: 23000, projects: 67 },
  { category: "Digital Marketing", amount: 18000, projects: 23 }
]

interface EscrowTransaction {
  id: string
  projectName: string
  client: string
  freelancer: string
  amount: number
  status: "held" | "released" | "disputed"
  daysHeld: number
  releaseDate: string
  category: string
}

const sampleEscrowTransactions: EscrowTransaction[] = [
  {
    id: "ESC-001",
    projectName: "E-commerce Platform Development",
    client: "John Smith",
    freelancer: "Sarah Johnson",
    amount: 5000,
    status: "held",
    daysHeld: 3,
    releaseDate: "2024-01-20",
    category: "Web Development"
  },
  {
    id: "ESC-002",
    projectName: "Mobile App UI Design",
    client: "Tech Corp",
    freelancer: "Mike Chen",
    amount: 3200,
    status: "released",
    daysHeld: 7,
    releaseDate: "2024-01-18",
    category: "UI/UX Design"
  },
  {
    id: "ESC-003",
    projectName: "Brand Identity Package",
    client: "StartupXYZ",
    freelancer: "Emily Davis",
    amount: 2800,
    status: "disputed",
    daysHeld: 12,
    releaseDate: "2024-01-25",
    category: "Design"
  }
]

export function EscrowBalanceSection() {
  const [chartPeriod, setChartPeriod] = useState<"monthly" | "yearly">("monthly")
  const [statusFilter, setStatusFilter] = useState<"all" | "held" | "released" | "disputed">("all")

  const currentData = chartPeriod === "monthly" ? monthlyEscrowData : yearlyEscrowData
  
  const filteredTransactions = sampleEscrowTransactions.filter(transaction => {
    return statusFilter === "all" || transaction.status === statusFilter
  })

  const totalHeld = 251000
  const totalReleased = 185000
  const averageHoldDays = 7.2
  const pendingRelease = 18

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "held":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Held</Badge>
      case "released":
        return <Badge className="bg-success/10 text-success border-success/20">Released</Badge>
      case "disputed":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Disputed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Escrow Balance Management</h1>
        <p className="text-muted-foreground mt-2">
          Monitor held funds, release schedules, and escrow transaction security
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Held</p>
                <p className="text-2xl font-bold text-card-foreground">${totalHeld.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+15.2% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Released</p>
                <p className="text-2xl font-bold text-card-foreground">${totalReleased.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Hold Period</p>
                <p className="text-2xl font-bold text-card-foreground">{averageHoldDays} days</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-info" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Industry standard</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Release</p>
                <p className="text-2xl font-bold text-card-foreground">{pendingRelease}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Filter className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Requires attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Escrow Balance Trend */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold text-card-foreground">Escrow Balance Trend</CardTitle>
                <CardDescription>Held vs Released funds over time</CardDescription>
              </div>
              <Select value={chartPeriod} onValueChange={(value: any) => setChartPeriod(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey={chartPeriod === "monthly" ? "month" : "year"}
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
                  dataKey="held" 
                  stroke="hsl(var(--chart-warning))" 
                  fill="hsl(var(--chart-warning) / 0.2)"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="released" 
                  stroke="hsl(var(--chart-success))" 
                  fill="hsl(var(--chart-success) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Escrow by Category */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Escrow by Category</CardTitle>
            <CardDescription>Current held amounts by project type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={escrowBreakdownData}>
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
                  dataKey="amount" 
                  fill="hsl(var(--chart-primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Transactions Table */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-card-foreground">Escrow Transactions</CardTitle>
              <CardDescription>Active and recent escrow holdings</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="held">Held</SelectItem>
                  <SelectItem value="released">Released</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
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
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Hold Duration</TableHead>
                  <TableHead>Release Date</TableHead>
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
                      <span className="font-semibold">${transaction.amount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm">{transaction.daysHeld} days</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(transaction.releaseDate).toLocaleDateString()}</span>
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