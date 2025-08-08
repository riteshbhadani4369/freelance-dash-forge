import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  DollarSign, 
  TrendingUp, 
  Download, 
  Calendar,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
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

interface Transaction {
  id: string
  type: "payment" | "withdrawal" | "commission" | "refund"
  amount: number
  fee: number
  netAmount: number
  from: string
  to: string
  description: string
  status: "completed" | "pending" | "failed"
  date: string
  jobId?: string
  currency: string
}

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    type: "payment",
    amount: 5000,
    fee: 250,
    netAmount: 4750,
    from: "John Smith",
    to: "Sarah Johnson",
    description: "E-commerce website development",
    status: "completed",
    date: "2024-01-15T10:30:00Z",
    jobId: "JOB-001",
    currency: "USD"
  },
  {
    id: "2",
    type: "commission",
    amount: 250,
    fee: 0,
    netAmount: 250,
    from: "Platform",
    to: "FreelanceHub",
    description: "Platform commission (5%)",
    status: "completed",
    date: "2024-01-15T10:31:00Z",
    jobId: "JOB-001",
    currency: "USD"
  },
  {
    id: "3",
    type: "withdrawal",
    amount: 2500,
    fee: 25,
    netAmount: 2475,
    from: "Mike Chen",
    to: "Bank Account",
    description: "Earnings withdrawal",
    status: "pending",
    date: "2024-01-14T16:20:00Z",
    currency: "USD"
  },
  {
    id: "4",
    type: "refund",
    amount: 800,
    fee: 0,
    netAmount: 800,
    from: "FreelanceHub",
    to: "Emily Davis",
    description: "Cancelled project refund",
    status: "completed",
    date: "2024-01-13T14:15:00Z",
    jobId: "JOB-004",
    currency: "USD"
  }
]

const monthlyRevenueData = [
  { month: "Jul", revenue: 45000, commission: 2250, transactions: 180 },
  { month: "Aug", revenue: 52000, commission: 2600, transactions: 210 },
  { month: "Sep", revenue: 48000, commission: 2400, transactions: 195 },
  { month: "Oct", revenue: 61000, commission: 3050, transactions: 245 },
  { month: "Nov", revenue: 55000, commission: 2750, transactions: 220 },
  { month: "Dec", revenue: 67000, commission: 3350, transactions: 270 }
]

const transactionTypeData = [
  { type: "Payments", count: 456, amount: 234000 },
  { type: "Withdrawals", count: 234, amount: 156000 },
  { type: "Commissions", count: 456, amount: 11700 },
  { type: "Refunds", count: 23, amount: 8900 }
]

export function TransactionSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "payment" | "withdrawal" | "commission" | "refund">("all")
  const [selectedStatus, setSelectedStatus] = useState<"all" | "completed" | "pending" | "failed">("all")
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "1y">("30d")

  const filteredTransactions = sampleTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.to.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || transaction.type === selectedType
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "payment":
        return <Badge className="bg-success/10 text-success border-success/20">Payment</Badge>
      case "withdrawal":
        return <Badge className="bg-info/10 text-info border-info/20">Withdrawal</Badge>
      case "commission":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Commission</Badge>
      case "refund":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Refund</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
      case "failed":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
      case "commission":
        return <ArrowUpRight className="h-4 w-4 text-success" />
      case "withdrawal":
      case "refund":
        return <ArrowDownLeft className="h-4 w-4 text-info" />
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />
    }
  }

  const totalRevenue = sampleTransactions.reduce((sum, t) => sum + t.amount, 0)
  const totalCommission = sampleTransactions.filter(t => t.type === "commission").reduce((sum, t) => sum + t.amount, 0)
  const pendingTransactions = sampleTransactions.filter(t => t.status === "pending").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Transaction Logs & Reports</h1>
        <p className="text-muted-foreground mt-2">
          Monitor financial transactions, earnings, and platform commission
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-card-foreground">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform Commission</p>
                <p className="text-2xl font-bold text-card-foreground">${totalCommission.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">5% average commission</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Transactions</p>
                <p className="text-2xl font-bold text-card-foreground">{pendingTransactions}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-info" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Awaiting processing</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Transactions</p>
                <p className="text-2xl font-bold text-card-foreground">1,169</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs text-success">+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Revenue & Commission Trend</CardTitle>
            <CardDescription>Monthly revenue and commission over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenueData}>
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
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.2)"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="commission" 
                  stroke="hsl(var(--warning))" 
                  fill="hsl(var(--warning) / 0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Types */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Transaction Types</CardTitle>
            <CardDescription>Breakdown by transaction type and volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="type" 
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
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--accent))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Logs */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-card-foreground">Transaction Logs</CardTitle>
              <CardDescription>Detailed transaction history and reports</CardDescription>
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
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="payment">Payments</SelectItem>
                  <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  <SelectItem value="commission">Commissions</SelectItem>
                  <SelectItem value="refund">Refunds</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={(value: any) => setSelectedStatus(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="rounded-lg border border-card-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Net Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTransactionIcon(transaction.type)}
                          <span className="font-medium text-card-foreground">
                            {transaction.description}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {transaction.from} → {transaction.to}
                        </p>
                        {transaction.jobId && (
                          <Badge variant="outline" className="text-xs">
                            {transaction.jobId}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getTransactionBadge(transaction.type)}</TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${transaction.amount.toLocaleString()} {transaction.currency}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        ${transaction.fee.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-success">
                        ${transaction.netAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                      </div>
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