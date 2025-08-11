import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { 
  FileText, 
  Eye, 
  Edit, 
  Plus,
  Globe,
  Mail,
  Shield,
  HelpCircle,
  Image,
  Languages
} from "lucide-react"

interface Page {
  id: string
  title: string
  slug: string
  type: "page" | "policy" | "faq" | "banner"
  status: "published" | "draft"
  lastModified: string
  views: number
}

interface Language {
  code: string
  name: string
  flag: string
  enabled: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  published: boolean
}

const samplePages: Page[] = [
  {
    id: "1",
    title: "Terms & Conditions",
    slug: "/terms",
    type: "policy",
    status: "published",
    lastModified: "2024-01-15",
    views: 1250
  },
  {
    id: "2",
    title: "Privacy Policy",
    slug: "/privacy",
    type: "policy",
    status: "published",
    lastModified: "2024-01-10",
    views: 890
  },
  {
    id: "3",
    title: "Homepage Hero Banner",
    slug: "/home-banner",
    type: "banner",
    status: "published",
    lastModified: "2024-01-20",
    views: 0
  },
  {
    id: "4",
    title: "About Us",
    slug: "/about",
    type: "page",
    status: "draft",
    lastModified: "2024-01-18",
    views: 0
  }
]

const sampleLanguages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", enabled: true },
  { code: "es", name: "Spanish", flag: "🇪🇸", enabled: false },
  { code: "fr", name: "French", flag: "🇫🇷", enabled: false },
  { code: "de", name: "German", flag: "🇩🇪", enabled: false },
  { code: "hi", name: "Hindi", flag: "🇮🇳", enabled: false }
]

const sampleFAQs: FAQ[] = [
  {
    id: "1",
    question: "How do I create a freelancer account?",
    answer: "To create a freelancer account, click on 'Sign Up' and select 'I'm a Freelancer'. Fill in your details and verify your email.",
    category: "Getting Started",
    order: 1,
    published: true
  },
  {
    id: "2",
    question: "What are the platform fees?",
    answer: "We charge a 5% service fee on completed projects for freelancers and a 3% processing fee for clients.",
    category: "Pricing",
    order: 2,
    published: true
  },
  {
    id: "3",
    question: "How does the escrow system work?",
    answer: "Funds are held securely in escrow until project milestones are completed and approved by the client.",
    category: "Payments",
    order: 3,
    published: true
  }
]

export function CMSManagementSection() {
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [languages, setLanguages] = useState(sampleLanguages)
  const [faqs, setFaqs] = useState(sampleFAQs)
  const [mailTemplate, setMailTemplate] = useState({
    welcome: "Welcome to our platform! Your account has been created successfully.",
    passwordReset: "Click here to reset your password: {{reset_link}}",
    projectCompleted: "Congratulations! Your project has been completed."
  })

  const toggleLanguage = (code: string) => {
    setLanguages(languages.map(lang => 
      lang.code === code ? { ...lang, enabled: !lang.enabled } : lang
    ))
  }

  const getStatusBadge = (status: string) => {
    return status === "published" 
      ? <Badge className="bg-success/10 text-success border-success/20">Published</Badge>
      : <Badge className="bg-warning/10 text-warning border-warning/20">Draft</Badge>
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      page: { label: "Page", icon: FileText, color: "bg-primary/10 text-primary" },
      policy: { label: "Policy", icon: Shield, color: "bg-info/10 text-info" },
      faq: { label: "FAQ", icon: HelpCircle, color: "bg-warning/10 text-warning" },
      banner: { label: "Banner", icon: Image, color: "bg-secondary/10 text-secondary" }
    }
    
    const config = typeConfig[type as keyof typeof typeConfig]
    const Icon = config.icon
    
    return (
      <Badge variant="outline" className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">CMS & Page Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage website content, pages, policies, and translations
        </p>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pages">Pages & Policies</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="mail">Mail Templates</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
        </TabsList>

        {/* Pages & Policies Tab */}
        <TabsContent value="pages" className="space-y-6">
          <Card className="border-card-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-card-foreground">Pages & Content</CardTitle>
                <CardDescription>Manage website pages, policies, and banners</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Page
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Page</DialogTitle>
                    <DialogDescription>Add a new page or content section</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Page title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">URL Slug</Label>
                        <Input id="slug" placeholder="/page-url" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea 
                        id="content" 
                        placeholder="Page content..." 
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Save as Draft</Button>
                      <Button>Publish</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-card-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {samplePages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-card-foreground">{page.title}</p>
                            <p className="text-sm text-muted-foreground">{page.slug}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(page.type)}</TableCell>
                        <TableCell>{getStatusBadge(page.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-muted-foreground" />
                            {page.views.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(page.lastModified).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-6">
          <Card className="border-card-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-card-foreground">FAQ Management</CardTitle>
                <CardDescription>Manage frequently asked questions</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="border-card-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{faq.category}</Badge>
                            <Badge variant="outline">Order: {faq.order}</Badge>
                            {faq.published && (
                              <Badge className="bg-success/10 text-success border-success/20">Published</Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-card-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Switch checked={faq.published} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mail Templates Tab */}
        <TabsContent value="mail" className="space-y-6">
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground">Email Templates</CardTitle>
              <CardDescription>Manage automated email templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="welcome">Welcome Email</Label>
                  <Textarea 
                    id="welcome"
                    value={mailTemplate.welcome}
                    onChange={(e) => setMailTemplate({...mailTemplate, welcome: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reset">Password Reset Email</Label>
                  <Textarea 
                    id="reset"
                    value={mailTemplate.passwordReset}
                    onChange={(e) => setMailTemplate({...mailTemplate, passwordReset: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completed">Project Completed Email</Label>
                  <Textarea 
                    id="completed"
                    value={mailTemplate.projectCompleted}
                    onChange={(e) => setMailTemplate({...mailTemplate, projectCompleted: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Save Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Languages Tab */}
        <TabsContent value="languages" className="space-y-6">
          <Card className="border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground">Language Settings</CardTitle>
              <CardDescription>Manage platform languages and translations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {languages.map((language) => (
                  <div key={language.code} className="flex items-center justify-between p-4 border border-card-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div>
                        <p className="font-medium text-card-foreground">{language.name}</p>
                        <p className="text-sm text-muted-foreground">{language.code.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {language.enabled && (
                        <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                      )}
                      <Switch 
                        checked={language.enabled}
                        onCheckedChange={() => toggleLanguage(language.code)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button>
                  <Languages className="h-4 w-4 mr-2" />
                  Add Language
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}