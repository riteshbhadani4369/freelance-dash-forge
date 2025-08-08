import { useState } from "react"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { OverviewSection } from "@/components/dashboard/OverviewSection"
import { UserManagementSection } from "@/components/dashboard/UserManagementSection"
import { JobManagementSection } from "@/components/dashboard/JobManagementSection"
import { SupportTicketsSection } from "@/components/dashboard/SupportTicketsSection"
import { CategoryManagementSection } from "@/components/dashboard/CategoryManagementSection"
import { TransactionSection } from "@/components/dashboard/TransactionSection"
import { SystemSettingsSection } from "@/components/dashboard/SystemSettingsSection"

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      case "users":
        return <UserManagementSection />
      case "jobs":
        return <JobManagementSection />
      case "transactions":
        return <TransactionSection />
      case "categories":
        return <CategoryManagementSection />
      case "support":
        return <SupportTicketsSection />
      case "cms":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-card-foreground">CMS & Page Management</h1>
            <p className="text-muted-foreground">Content management features coming soon...</p>
          </div>
        )
      case "system":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-card-foreground">System Health</h1>
            <p className="text-muted-foreground">System monitoring features coming soon...</p>
          </div>
        )
      case "settings":
        return <SystemSettingsSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="flex min-h-screen bg-background-secondary">
      <AdminSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
