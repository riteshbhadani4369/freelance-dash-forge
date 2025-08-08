import { useState } from "react"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { OverviewSection } from "@/components/dashboard/OverviewSection"
import { UserManagementSection } from "@/components/dashboard/UserManagementSection"

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      case "users":
        return <UserManagementSection />
      case "jobs":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-card-foreground">Jobs & Projects</h1>
            <p className="text-muted-foreground">Job management features coming soon...</p>
          </div>
        )
      case "transactions":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-card-foreground">Transaction Management</h1>
            <p className="text-muted-foreground">Transaction features coming soon...</p>
          </div>
        )
      case "categories":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-card-foreground">Category Management</h1>
            <p className="text-muted-foreground">Category management coming soon...</p>
          </div>
        )
      case "support":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-card-foreground">Support Tickets</h1>
            <p className="text-muted-foreground">Support ticket system coming soon...</p>
          </div>
        )
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
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-card-foreground">Platform Settings</h1>
            <p className="text-muted-foreground">Settings management coming soon...</p>
          </div>
        )
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
