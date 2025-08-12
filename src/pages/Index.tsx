import { useState } from "react"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { OverviewSection } from "@/components/dashboard/OverviewSection"
import { UserManagementSection } from "@/components/dashboard/UserManagementSection"
import { JobManagementSection } from "@/components/dashboard/JobManagementSection"
import { SupportTicketsSection } from "@/components/dashboard/SupportTicketsSection"
import { CategoryManagementSection } from "@/components/dashboard/CategoryManagementSection"
import { TransactionSection } from "@/components/dashboard/TransactionSection"
import { SystemSettingsSection } from "@/components/dashboard/SystemSettingsSection"
import { CMSManagementSection } from "@/components/dashboard/CMSManagementSection"
import { EscrowBalanceSection } from "@/components/dashboard/EscrowBalanceSection"
import { UserEarningsSection } from "@/components/dashboard/UserEarningsSection"
import { CommissionReportsSection } from "@/components/dashboard/CommissionReportsSection"
import { TaxReportsSection } from "@/components/dashboard/TaxReportsSection"

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      case "users":
        return <UserManagementSection />
      case "users-list":
        return <UserManagementSection />
      case "users-analytics":
        return <UserEarningsSection />
      case "users-verification":
        return <UserManagementSection />
      case "jobs":
        return <JobManagementSection />
      case "jobs-active":
        return <JobManagementSection />
      case "jobs-completed":
        return <JobManagementSection />
      case "jobs-disputes":
        return <JobManagementSection />
      case "transactions":
        return <TransactionSection />
      case "transactions-overview":
        return <TransactionSection />
      case "transactions-escrow":
        return <EscrowBalanceSection />
      case "transactions-earnings":
        return <UserEarningsSection />
      case "transactions-commission":
        return <CommissionReportsSection />
      case "transactions-tax":
        return <TaxReportsSection />
      case "categories":
        return <CategoryManagementSection />
      case "support":
        return <SupportTicketsSection />
      case "cms":
        return <CMSManagementSection />
      case "system":
        return <SystemSettingsSection />
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
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
