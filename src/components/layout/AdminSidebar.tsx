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
  Activity
} from "lucide-react"
import { useState } from "react"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
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
    description: "Clients & Freelancers"
  },
  {
    id: "jobs",
    label: "Jobs & Projects",
    icon: Briefcase,
    description: "Manage Listings"
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: DollarSign,
    description: "Reports & Logs"
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
  return (
    <div className="flex h-screen w-64 flex-col border-r border-card-border bg-card">
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
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-auto py-3 px-3",
                  "hover:bg-background-secondary transition-colors",
                  isActive && [
                    "bg-primary text-primary-foreground shadow-sm",
                    "hover:bg-primary-hover"
                  ]
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className={cn(
                    "text-xs",
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </span>
                </div>
              </Button>
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