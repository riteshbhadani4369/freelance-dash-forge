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
  Receipt, 
  DollarSign, 
  Download,
  FileText,
  Globe,
  Calculator
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

const monthlyTaxData = [
  { month: "Jul", gst: 1250, vat: 890, income: 650, total: 2790 },
  { month: "Aug", gst: 1480, vat: 1020, income: 780, total: 3280 },
  { month: "Sep", gst: 1360, vat: 950, income: 720, total: 3030 },
  { month: "Oct", gst: 1720, vat: 1200, income: 910, total: 3830 },
  { month: "Nov", gst: 1580, vat: 1100, income: 830, total: 3510 },
  { month: "Dec", gst: 1890, vat: 1320, income: 1000, total: 4210 }
]

const taxByCountryData = [
  { country: "United States", gst: 0, vat: 0, income: 2650, total: 2650, color: "#3B82F6" },
  { country: "United Kingdom", gst: 0, vat: 2340, income: 980, total: 3320, color: "#10B981" },
  { country: "Canada", gst: 1890, vat: 0, income: 890, total: 2780, color: "#F59E0B" },
  { country: "Australia", gst: 1240, vat: 0, income: 670, total: 1910, color: "#EF4444" },
  { country: "Germany", gst: 0, vat: 1890, income: 720, total: 2610, color: "#8B5CF6" }
]

const taxRateData = [
  { type: "GST", rate: 10, countries: ["Canada", "Australia"], color: "#3B82F6" },
  { type: "VAT", rate: 20, countries: ["UK", "Germany", "France"], color: "#10B981" },
  { type: "Income Tax", rate: 15, countries: ["US", "Canada", "UK"], color: "#F59E0B" },
  { type: "Other", rate: 5, countries: ["Various"], color: "#EF4444" }
]

interface TaxRecord {
  id: string
  transactionId: string
  taxType: "gst" | "vat" | "income" | "other"
  amount: number
  rate: number
  baseAmount: number
  country: string
  date: string
  status: "calculated" | "paid" | "pending"
  description: string
}

const taxRecords: TaxRecord[] = [
  {
    id: "TAX-001",
    transactionId: "TXN-5643",
    taxType: "gst",
    amount: 125.50,
    rate: 10,
    baseAmount: 1255,
    country: "Canada",
    date: "2024-01-15",
    status: "calculated",
    description: "Platform commission - Web Development"
  },
  {
    id: "TAX-002",
    transactionId: "TXN-5644",
    taxType: "vat",
    amount: 234.80,
    rate: 20,
    baseAmount: 1174,
    country: "United Kingdom",
    date: "2024-01-14",
    status: "paid",
    description: "Project payment - UI/UX Design"
  },
  {
    id: "TAX-003",
    transactionId: "TXN-5645",
    taxType: "income",
    amount: 187.50,
    rate: 15,
    baseAmount: 1250,
    country: "United States",
    date: "2024-01-13",
    status: "pending",
    description: "Freelancer earnings - Content Writing"
  }
]

export function TaxReportsSection() {
  const [timeRange, setTimeRange] = useState<"6m" | "1y" | "2y">("6m")
  const [taxTypeFilter, setTaxTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredTaxRecords = taxRecords.filter(record => {
    const matchesType = taxTypeFilter === "all" || record.taxType === taxTypeFilter
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    return matchesType && matchesStatus
  })

  const totalTaxCollected = 18650
  const pendingTax = 2340
  const avgTaxRate = 12.5
  const countriesWithTax = 8

  const getTaxTypeBadge = (type: string) => {
    switch (type) {
      case "gst":
        return <Badge className="bg-info/10 text-info border-info/20">GST</Badge>
      case "vat":
        return <Badge className="bg-success/10 text-success border-success/20">VAT</Badge>
      case "income":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Income Tax</Badge>
      case "other":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Other</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "calculated":
        return <Badge className="bg-info/10 text-info border-info/20">Calculated</Badge>
      case "paid":
        return <Badge className="bg-success/10 text-success border-success/20">Paid</Badge>
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Tax Reports & Compliance</h1>
        <p className="text-muted-foreground mt-2">
          GST, VAT, and income tax breakdown with compliance reporting
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tax Collected</p>
                <p className="text-2xl font-bold text-card-foreground">${totalTaxCollected.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <Receipt className="h-5 w-5 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">This fiscal year</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Tax</p>
                <p className="text-2xl font-bold text-card-foreground">${pendingTax.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-warning" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Requires payment</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Tax Rate</p>
                <p className="text-2xl font-bold text-card-foreground">{avgTaxRate}%</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Across all regions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tax Jurisdictions</p>
                <p className="text-2xl font-bold text-card-foreground">{countriesWithTax}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-info" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-muted-foreground">Active countries</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Tax Breakdown */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold text-card-foreground">Monthly Tax Breakdown</CardTitle>
                <CardDescription>GST, VAT, and Income Tax trends</CardDescription>
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
              <AreaChart data={monthlyTaxData}>
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
                  dataKey="gst" 
                  stackId="1"
                  stroke="hsl(var(--chart-info))" 
                  fill="hsl(var(--chart-info) / 0.3)"
                />
                <Area 
                  type="monotone" 
                  dataKey="vat" 
                  stackId="1"
                  stroke="hsl(var(--chart-success))" 
                  fill="hsl(var(--chart-success) / 0.3)"
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stackId="1"
                  stroke="hsl(var(--chart-warning))" 
                  fill="hsl(var(--chart-warning) / 0.3)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tax by Country */}
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Tax Collection by Country</CardTitle>
            <CardDescription>Geographic distribution of tax obligations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taxByCountryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="country" 
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
                  dataKey="total" 
                  fill="hsl(var(--chart-primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tax Rate Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Tax Rate Distribution</CardTitle>
            <CardDescription>Current tax rates by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={taxRateData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="rate"
                  label={({ type, rate }) => `${type}: ${rate}%`}
                >
                  {taxRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">Compliance Summary</CardTitle>
            <CardDescription>Tax filing and payment status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center">
                  <Receipt className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Q4 2023 Filings</p>
                  <p className="text-sm text-muted-foreground">Completed & Submitted</p>
                </div>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">Complete</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-warning/20 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Q1 2024 Filings</p>
                  <p className="text-sm text-muted-foreground">Due: March 31, 2024</p>
                </div>
              </div>
              <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-info/5 border border-info/20">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-info/20 flex items-center justify-center">
                  <Calculator className="h-4 w-4 text-info" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Monthly Payments</p>
                  <p className="text-sm text-muted-foreground">Auto-calculated</p>
                </div>
              </div>
              <Badge className="bg-info/10 text-info border-info/20">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Records Table */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-card-foreground">Tax Transaction Records</CardTitle>
              <CardDescription>Detailed tax calculations and payments</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={taxTypeFilter} onValueChange={setTaxTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tax Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="gst">GST</SelectItem>
                  <SelectItem value="vat">VAT</SelectItem>
                  <SelectItem value="income">Income Tax</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="calculated">Calculated</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
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
                  <TableHead>Transaction</TableHead>
                  <TableHead>Tax Type</TableHead>
                  <TableHead>Base Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Tax Amount</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTaxRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <span className="font-medium text-card-foreground">{record.id}</span>
                        <p className="text-sm text-muted-foreground">{record.description}</p>
                        <p className="text-xs text-muted-foreground">Ref: {record.transactionId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getTaxTypeBadge(record.taxType)}</TableCell>
                    <TableCell>
                      <span className="font-medium">${record.baseAmount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.rate}%</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-warning">
                        ${record.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{record.country}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
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