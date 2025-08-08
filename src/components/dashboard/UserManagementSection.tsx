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
  Filter, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Shield, 
  Mail,
  MapPin,
  Calendar
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "client" | "freelancer"
  status: "active" | "inactive" | "banned"
  country: string
  joinDate: string
  totalSpent?: number
  totalEarned?: number
  avatar?: string
}

const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    role: "client",
    status: "active",
    country: "United States",
    joinDate: "2024-01-15",
    totalSpent: 15420
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "freelancer",
    status: "active",
    country: "United Kingdom",
    joinDate: "2024-02-03",
    totalEarned: 8950
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    role: "freelancer",
    status: "inactive",
    country: "Canada",
    joinDate: "2024-01-28",
    totalEarned: 12300
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    role: "client",
    status: "banned",
    country: "Australia",
    joinDate: "2024-03-10",
    totalSpent: 2100
  },
  {
    id: "5",
    name: "Alex Rodriguez",
    email: "alex.r@email.com",
    role: "freelancer",
    status: "active",
    country: "Spain",
    joinDate: "2024-02-20",
    totalEarned: 6750
  }
]

export function UserManagementSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<"all" | "client" | "freelancer">("all")
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "inactive" | "banned">("all")

  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
      case "inactive":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Inactive</Badge>
      case "banned":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Banned</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "client":
        return <Badge className="bg-info/10 text-info border-info/20">Client</Badge>
      case "freelancer":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Freelancer</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage clients and freelancers on your platform
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-card-foreground">8,756</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <p className="text-2xl font-bold text-card-foreground">3,421</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Freelancers</p>
                <p className="text-2xl font-bold text-card-foreground">5,335</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Banned Users</p>
                <p className="text-2xl font-bold text-destructive">12</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <UserX className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">User Directory</CardTitle>
          <CardDescription>Search and manage all platform users</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedRole === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRole("all")}
              >
                All Users
              </Button>
              <Button
                variant={selectedRole === "client" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRole("client")}
              >
                Clients
              </Button>
              <Button
                variant={selectedRole === "freelancer" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRole("freelancer")}
              >
                Freelancers
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-lg border border-card-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Financial</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-card-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{user.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {user.role === "client" && user.totalSpent && (
                          <span className="text-card-foreground">Spent: ${user.totalSpent.toLocaleString()}</span>
                        )}
                        {user.role === "freelancer" && user.totalEarned && (
                          <span className="text-card-foreground">Earned: ${user.totalEarned.toLocaleString()}</span>
                        )}
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
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-warning">
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Ban User
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