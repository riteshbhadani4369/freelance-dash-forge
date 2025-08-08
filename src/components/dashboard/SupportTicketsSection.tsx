import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  Calendar,
  Send,
  Eye
} from "lucide-react"

interface Ticket {
  id: string
  subject: string
  user: string
  userType: "client" | "freelancer"
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  createdAt: string
  lastReply: string
  assignedTo?: string
  description: string
}

const sampleTickets: Ticket[] = [
  {
    id: "1",
    subject: "Payment Issue - Escrow Release",
    user: "John Smith",
    userType: "client",
    status: "open",
    priority: "urgent",
    category: "Payment",
    createdAt: "2024-01-15T10:30:00Z",
    lastReply: "2024-01-15T10:30:00Z",
    description: "Unable to release escrow payment for completed project..."
  },
  {
    id: "2",
    subject: "Account Verification Problem",
    user: "Sarah Johnson",
    userType: "freelancer",
    status: "in_progress",
    priority: "high",
    category: "Account",
    createdAt: "2024-01-14T14:20:00Z",
    lastReply: "2024-01-15T09:15:00Z",
    assignedTo: "Support Agent 1",
    description: "Documents uploaded but verification still pending..."
  },
  {
    id: "3",
    subject: "Profile Settings Not Saving",
    user: "Mike Chen",
    userType: "freelancer",
    status: "resolved",
    priority: "medium",
    category: "Technical",
    createdAt: "2024-01-13T16:45:00Z",
    lastReply: "2024-01-14T11:30:00Z",
    assignedTo: "Support Agent 2",
    description: "Changes to profile information are not being saved..."
  },
  {
    id: "4",
    subject: "Inappropriate Job Posting",
    user: "Emily Davis",
    userType: "freelancer",
    status: "open",
    priority: "medium",
    category: "Report",
    createdAt: "2024-01-15T08:15:00Z",
    lastReply: "2024-01-15T08:15:00Z",
    description: "Reporting a job posting that seems to be spam..."
  }
]

export function SupportTicketsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<"all" | "open" | "in_progress" | "resolved" | "closed">("all")
  const [selectedPriority, setSelectedPriority] = useState<"all" | "low" | "medium" | "high" | "urgent">("all")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredTickets = sampleTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Open</Badge>
      case "in_progress":
        return <Badge className="bg-warning/10 text-warning border-warning/20">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-success/10 text-success border-success/20">Resolved</Badge>
      case "closed":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-destructive text-destructive-foreground">Urgent</Badge>
      case "high":
        return <Badge className="bg-warning text-warning-foreground">High</Badge>
      case "medium":
        return <Badge className="bg-info/10 text-info border-info/20">Medium</Badge>
      case "low":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getUserTypeBadge = (userType: string) => {
    switch (userType) {
      case "client":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Client</Badge>
      case "freelancer":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Freelancer</Badge>
      default:
        return <Badge variant="secondary">{userType}</Badge>
    }
  }

  const stats = {
    total: sampleTickets.length,
    open: sampleTickets.filter(t => t.status === "open").length,
    inProgress: sampleTickets.filter(t => t.status === "in_progress").length,
    urgent: sampleTickets.filter(t => t.priority === "urgent").length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Support Ticket System</h1>
        <p className="text-muted-foreground mt-2">
          Manage customer support requests and provide assistance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tickets</p>
                <p className="text-2xl font-bold text-card-foreground">{stats.total}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold text-destructive">{stats.open}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-warning">{stats.inProgress}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                <User className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Urgent</p>
                <p className="text-2xl font-bold text-destructive">{stats.urgent}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket Management */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Support Tickets</CardTitle>
          <CardDescription>Manage and respond to customer support requests</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets by subject or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={(value: any) => setSelectedStatus(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPriority} onValueChange={(value: any) => setSelectedPriority(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="rounded-lg border border-card-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket Details</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last Reply</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-card-foreground">{ticket.subject}</p>
                        <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {ticket.user.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-card-foreground">{ticket.user}</span>
                        </div>
                        {getUserTypeBadge(ticket.userType)}
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(ticket.lastReply).toLocaleDateString()}
                        {ticket.assignedTo && (
                          <p className="text-xs">Assigned to: {ticket.assignedTo}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{ticket.subject}</DialogTitle>
                            <DialogDescription>
                              Ticket #{ticket.id} • {ticket.category} • {ticket.user}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              {getStatusBadge(ticket.status)}
                              {getPriorityBadge(ticket.priority)}
                              {getUserTypeBadge(ticket.userType)}
                            </div>
                            
                            <div className="bg-background-secondary p-4 rounded-lg">
                              <p className="text-sm">{ticket.description}</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(ticket.createdAt).toLocaleString()}
                              </div>
                            </div>

                            {/* Reply Section */}
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Reply to ticket:</label>
                              <Textarea
                                placeholder="Type your response here..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <Button size="sm">
                                  <Send className="h-4 w-4 mr-1" />
                                  Send Reply
                                </Button>
                                <Select>
                                  <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Change Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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