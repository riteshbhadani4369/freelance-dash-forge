import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Users,
  Briefcase,
  Settings,
  HeadphonesIcon,
  FileText,
  DollarSign,
  Shield,
  Home,
  Tag,
  Activity,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

interface SubItem {
  id: string
  label: string
  description: string
}

interface SidebarItem {
  id: string
  label: string
  icon: any
  description: string
  subItems?: SubItem[]
}

const sidebarItems = [
  {
    id: "overview",
    label: "Overview",
    icon: Home,
    description: "Dashboard & Analytics"
  },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    description: "Clients & Freelancers",
    subItems: [
      { id: "users-list", label: "All Users", description: "User Directory" },
      { id: "users-analytics", label: "User Analytics", description: "Engagement Metrics" },
      { id: "users-verification", label: "Verification", description: "ID & Skill Verification" }
    ]
  },
  {
    id: "jobs",
    label: "Jobs & Projects",
    icon: Briefcase,
    description: "Manage Listings",
    subItems: [
      { id: "jobs-active", label: "Active Jobs", description: "Current Projects" },
      { id: "jobs-completed", label: "Completed", description: "Finished Projects" },
      { id: "jobs-disputes", label: "Disputes", description: "Resolution Center" }
    ]
  },
  {
    id: "transactions",
    label: "Financial Reports",
    icon: DollarSign,
    description: "Transaction Analytics",
    subItems: [
      { id: "transactions-overview", label: "Overview", description: "Financial Summary" },
      { id: "transactions-escrow", label: "Escrow Balance", description: "Held Funds" },
      { id: "transactions-earnings", label: "User Earnings", description: "Spend Reports" },
      { id: "transactions-commission", label: "Commission", description: "Platform Revenue" },
      { id: "transactions-tax", label: "Tax Reports", description: "GST/VAT Breakdown" }
    ]
  },
  {
    id: "categories",
    label: "Categories",
    icon: Tag,
    description: "Skills & Tags"
  },
  {
    id: "support",
    label: "Support Tickets",
    icon: HeadphonesIcon,
    description: "Customer Support"
  },
  {
    id: "cms",
    label: "CMS & Pages",
    icon: FileText,
    description: "Content Management"
  },
  {
    id: "system",
    label: "System Health",
    icon: Activity,
    description: "Performance Metrics"
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    description: "Platform Configuration"
  }
]

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-card-border bg-card animate-slide-in-right">
      {/* Header */}
      <div className="flex h-16 items-center border-b border-card-border px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-card-foreground">FreelanceHub</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            const isExpanded = expandedItems.has(item.id)
            const hasSubItems = item.subItems && item.subItems.length > 0
            
            return (
              <div key={item.id} className="space-y-1">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-auto py-3 px-3",
                    "hover:bg-background-secondary transition-all duration-200 hover:scale-[1.02]",
                    isActive && [
                      "bg-primary text-primary-foreground shadow-sm",
                      "hover:bg-primary-hover"
                    ]
                  )}
                  onClick={() => {
                    if (hasSubItems) {
                      toggleExpanded(item.id)
                    } else {
                      onSectionChange(item.id)
                    }
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex flex-col items-start text-left flex-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className={cn(
                      "text-xs",
                      isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {item.description}
                    </span>
                  </div>
                  {hasSubItems && (
                    isExpanded ? 
                      <ChevronDown className="h-4 w-4 flex-shrink-0" /> : 
                      <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  )}
                </Button>

                {/* Sub Items */}
                {hasSubItems && isExpanded && (
                  <div className="ml-8 space-y-1 animate-fade-in">
                    {item.subItems!.map((subItem) => {
                      const isSubActive = activeSection === subItem.id
                      return (
                        <Button
                          key={subItem.id}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 h-auto py-2 px-3 text-sm",
                            "hover:bg-background-secondary transition-all duration-200 hover:translate-x-1",
                            isSubActive && [
                              "bg-primary/10 text-primary border-l-2 border-primary",
                              "hover:bg-primary/20"
                            ]
                          )}
                          onClick={() => onSectionChange(subItem.id)}
                        >
                          <div className="flex flex-col items-start text-left">
                            <span className="text-sm font-medium">{subItem.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {subItem.description}
                            </span>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-card-border p-4">
        <div className="rounded-lg bg-background-secondary p-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@freelancehub.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}