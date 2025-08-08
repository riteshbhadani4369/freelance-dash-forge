import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  MoreHorizontal, 
  Briefcase, 
  CheckCircle, 
  XCircle, 
  Pause,
  DollarSign,
  Calendar,
  Users,
  Flag,
  Eye
} from "lucide-react"

interface Job {
  id: string
  title: string
  client: string
  category: string
  budget: number
  deadline: string
  status: "open" | "closed" | "paused" | "in_progress"
  proposals: number
  timePosted: string
  description: string
  skills: string[]
  flagged?: boolean
}

const sampleJobs: Job[] = [
  {
    id: "1",
    title: "E-commerce Website Development",
    client: "John Smith",
    category: "Web Development",
    budget: 5000,
    deadline: "2024-02-15",
    status: "open",
    proposals: 12,
    timePosted: "2024-01-10",
    description: "Looking for a full-stack developer to build an e-commerce platform...",
    skills: ["React", "Node.js", "MongoDB"]
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    client: "Sarah Johnson",
    category: "Design",
    budget: 2500,
    deadline: "2024-02-20",
    status: "in_progress",
    proposals: 8,
    timePosted: "2024-01-12",
    description: "Need a mobile app design for iOS and Android...",
    skills: ["Figma", "UI/UX", "Mobile Design"]
  },
  {
    id: "3",
    title: "Data Analysis Project",
    client: "Mike Chen",
    category: "Data Science",
    budget: 1500,
    deadline: "2024-02-10",
    status: "paused",
    proposals: 5,
    timePosted: "2024-01-08",
    description: "Analyze customer data and create insights...",
    skills: ["Python", "Pandas", "SQL"],
    flagged: true
  },
  {
    id: "4",
    title: "WordPress Plugin Development",
    client: "Emily Davis",
    category: "Web Development",
    budget: 800,
    deadline: "2024-02-25",
    status: "closed",
    proposals: 15,
    timePosted: "2024-01-05",
    description: "Custom WordPress plugin for booking system...",
    skills: ["WordPress", "PHP", "JavaScript"]
  }
]

export function JobManagementSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<"all" | "open" | "closed" | "paused" | "in_progress">("all")
  const [selectedCategory, setSelectedCategory] = useState<"all" | "Web Development" | "Design" | "Data Science">("all")

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || job.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-success/10 text-success border-success/20">Open</Badge>
      case "in_progress":
        return <Badge className="bg-info/10 text-info border-info/20">In Progress</Badge>
      case "paused":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Paused</Badge>
      case "closed":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const stats = {
    total: sampleJobs.length,
    open: sampleJobs.filter(j => j.status === "open").length,
    inProgress: sampleJobs.filter(j => j.status === "in_progress").length,
    flagged: sampleJobs.filter(j => j.flagged).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Jobs & Project Management</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and manage all job postings and project listings
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.total}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Jobs</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.open}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.inProgress}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged Jobs</p>
                <p className="text-2xl font-bold text-destructive">{stats.flagged}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Flag className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Job Listings</CardTitle>
          <CardDescription>Manage all job postings and project requirements</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title or client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("all")}
              >
                All Status
              </Button>
              <Button
                variant={selectedStatus === "open" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("open")}
              >
                Open
              </Button>
              <Button
                variant={selectedStatus === "in_progress" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus("in_progress")}
              >
                In Progress
              </Button>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="rounded-lg border border-card-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Details</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Proposals</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-card-foreground">{job.title}</p>
                          {job.flagged && <Flag className="h-4 w-4 text-destructive" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{job.category}</p>
                        <div className="flex gap-1">
                          {job.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{job.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {job.client.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-card-foreground">{job.client}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">${job.budget.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.proposals} proposals</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            View Proposals
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-warning">
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Job
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-warning">
                            <Flag className="mr-2 h-4 w-4" />
                            Flag as Spam
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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