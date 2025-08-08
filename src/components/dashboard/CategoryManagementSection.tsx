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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Tag, 
  Code, 
  Palette,
  BarChart,
  Search,
  FolderPlus
} from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  subcategories: Subcategory[]
  jobCount: number
  isActive: boolean
}

interface Subcategory {
  id: string
  name: string
  description: string
  skills: string[]
  jobCount: number
}

interface Skill {
  id: string
  name: string
  category: string
  usageCount: number
  isVerified: boolean
}

const sampleCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    description: "Building websites and web applications",
    jobCount: 450,
    isActive: true,
    subcategories: [
      {
        id: "1-1",
        name: "Frontend Development",
        description: "Client-side web development",
        skills: ["React", "Vue.js", "Angular", "JavaScript", "CSS"],
        jobCount: 280
      },
      {
        id: "1-2",
        name: "Backend Development",
        description: "Server-side development",
        skills: ["Node.js", "Python", "PHP", "Java", "Go"],
        jobCount: 170
      }
    ]
  },
  {
    id: "2",
    name: "Mobile Development",
    description: "Creating mobile applications",
    jobCount: 320,
    isActive: true,
    subcategories: [
      {
        id: "2-1",
        name: "iOS Development",
        description: "Native iOS app development",
        skills: ["Swift", "Objective-C", "Xcode", "iOS SDK"],
        jobCount: 180
      },
      {
        id: "2-2",
        name: "Android Development",
        description: "Native Android app development",
        skills: ["Java", "Kotlin", "Android Studio", "Firebase"],
        jobCount: 140
      }
    ]
  },
  {
    id: "3",
    name: "Design",
    description: "Visual and user experience design",
    jobCount: 280,
    isActive: true,
    subcategories: [
      {
        id: "3-1",
        name: "UI/UX Design",
        description: "User interface and experience design",
        skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
        jobCount: 200
      },
      {
        id: "3-2",
        name: "Graphic Design",
        description: "Visual graphics and branding",
        skills: ["Photoshop", "Illustrator", "InDesign", "Branding"],
        jobCount: 80
      }
    ]
  }
]

const sampleSkills: Skill[] = [
  { id: "1", name: "React", category: "Web Development", usageCount: 150, isVerified: true },
  { id: "2", name: "Python", category: "Web Development", usageCount: 120, isVerified: true },
  { id: "3", name: "Figma", category: "Design", usageCount: 95, isVerified: true },
  { id: "4", name: "Swift", category: "Mobile Development", usageCount: 80, isVerified: true },
  { id: "5", name: "Node.js", category: "Web Development", usageCount: 110, isVerified: true }
]

export function CategoryManagementSection() {
  const [categories, setCategories] = useState<Category[]>(sampleCategories)
  const [skills, setSkills] = useState<Skill[]>(sampleSkills)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"categories" | "skills">("categories")
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryDescription, setNewCategoryDescription] = useState("")

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case "web development":
        return <Code className="h-5 w-5 text-primary" />
      case "mobile development":
        return <Code className="h-5 w-5 text-info" />
      case "design":
        return <Palette className="h-5 w-5 text-accent" />
      default:
        return <Tag className="h-5 w-5 text-muted-foreground" />
    }
  }

  const totalJobs = categories.reduce((sum, cat) => sum + cat.jobCount, 0)
  const totalSkills = skills.length
  const verifiedSkills = skills.filter(s => s.isVerified).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Category & Skill Management</h1>
        <p className="text-muted-foreground mt-2">
          Organize and manage job categories, subcategories, and skill tags
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Categories</p>
                <p className="text-2xl font-bold text-card-foreground">{categories.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FolderPlus className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold text-card-foreground">{totalJobs}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Skills</p>
                <p className="text-2xl font-bold text-card-foreground">{totalSkills}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Tag className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Skills</p>
                <p className="text-2xl font-bold text-card-foreground">{verifiedSkills}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <Tag className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-card-foreground">
                {activeTab === "categories" ? "Categories" : "Skills"} Management
              </CardTitle>
              <CardDescription>
                {activeTab === "categories" 
                  ? "Manage job categories and subcategories" 
                  : "Manage skills and tags"
                }
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "categories" ? "default" : "outline"}
                onClick={() => setActiveTab("categories")}
              >
                Categories
              </Button>
              <Button
                variant={activeTab === "skills" ? "default" : "outline"}
                onClick={() => setActiveTab("skills")}
              >
                Skills
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Add */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add {activeTab === "categories" ? "Category" : "Skill"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Add New {activeTab === "categories" ? "Category" : "Skill"}
                  </DialogTitle>
                  <DialogDescription>
                    Create a new {activeTab === "categories" ? "category" : "skill"} for the platform
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder={`Enter ${activeTab === "categories" ? "category" : "skill"} name`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCategoryDescription}
                      onChange={(e) => setNewCategoryDescription(e.target.value)}
                      placeholder="Enter description"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Add {activeTab === "categories" ? "Category" : "Skill"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Categories Table */}
          {activeTab === "categories" && (
            <div className="rounded-lg border border-card-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Subcategories</TableHead>
                    <TableHead>Jobs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(category.name)}
                          <div>
                            <p className="font-medium text-card-foreground">{category.name}</p>
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {category.subcategories.map((sub) => (
                            <Badge key={sub.id} variant="outline" className="mr-1 mb-1">
                              {sub.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-info/10 text-info border-info/20">
                          {category.jobCount} jobs
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={category.isActive 
                            ? "bg-success/10 text-success border-success/20" 
                            : "bg-muted/10 text-muted-foreground border-muted/20"
                          }
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Category
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Add Subcategory
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-warning">
                              {category.isActive ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Skills Table */}
          {activeTab === "skills" && (
            <div className="rounded-lg border border-card-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Usage Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSkills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-accent" />
                          <span className="font-medium text-card-foreground">{skill.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{skill.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-info/10 text-info border-info/20">
                          {skill.usageCount} uses
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={skill.isVerified 
                            ? "bg-success/10 text-success border-success/20" 
                            : "bg-warning/10 text-warning border-warning/20"
                          }
                        >
                          {skill.isVerified ? "Verified" : "Pending"}
                        </Badge>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Skill
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-success">
                              {skill.isVerified ? "Unverify" : "Verify"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}