import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { 
  Settings, 
  Globe, 
  DollarSign, 
  Shield, 
  Mail, 
  Users,
  AlertTriangle,
  Save,
  RefreshCw
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SystemSettingsSection() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "FreelanceHub",
    siteDescription: "Professional freelance marketplace",
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    
    // Commission Settings
    platformCommission: 5,
    paymentProcessingFee: 2.9,
    withdrawalFee: 25,
    minimumWithdrawal: 50,
    
    // Security Settings
    passwordMinLength: 8,
    sessionTimeout: 30,
    twoFactorRequired: false,
    maxLoginAttempts: 5,
    
    // Email Settings
    smtpHost: "smtp.freelancehub.com",
    smtpPort: 587,
    fromEmail: "noreply@freelancehub.com",
    fromName: "FreelanceHub",
    
    // Content Settings
    maxProjectBudget: 100000,
    projectBidDeadline: 14,
    automaticPaymentRelease: 7,
    disputeResolutionTime: 10
  })

  const handleSaveSettings = () => {
    toast({
      title: "Settings Updated",
      description: "Platform settings have been successfully updated.",
    })
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-card-foreground">Platform Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure platform-wide settings and preferences
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance Mode</p>
                <p className="text-lg font-semibold text-card-foreground">
                  {settings.maintenanceMode ? "Enabled" : "Disabled"}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">User Registration</p>
                <p className="text-lg font-semibold text-card-foreground">
                  {settings.allowRegistration ? "Open" : "Closed"}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform Commission</p>
                <p className="text-lg font-semibold text-card-foreground">
                  {settings.platformCommission}%
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Level</p>
                <p className="text-lg font-semibold text-card-foreground">
                  {settings.twoFactorRequired ? "High" : "Standard"}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Card className="border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">Platform Configuration</CardTitle>
          <CardDescription>Manage all platform settings and configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => handleSettingChange('siteName', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable to make the site unavailable to users
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow User Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to create accounts
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowRegistration}
                      onCheckedChange={(checked) => handleSettingChange('allowRegistration', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Email Verification</Label>
                      <p className="text-sm text-muted-foreground">
                        Users must verify their email address
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Financial Settings */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="platformCommission">Platform Commission (%)</Label>
                    <Input
                      id="platformCommission"
                      type="number"
                      value={settings.platformCommission}
                      onChange={(e) => handleSettingChange('platformCommission', parseFloat(e.target.value))}
                      min="0"
                      max="20"
                      step="0.1"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Percentage commission taken from each transaction
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="paymentProcessingFee">Payment Processing Fee (%)</Label>
                    <Input
                      id="paymentProcessingFee"
                      type="number"
                      value={settings.paymentProcessingFee}
                      onChange={(e) => handleSettingChange('paymentProcessingFee', parseFloat(e.target.value))}
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="withdrawalFee">Withdrawal Fee ($)</Label>
                    <Input
                      id="withdrawalFee"
                      type="number"
                      value={settings.withdrawalFee}
                      onChange={(e) => handleSettingChange('withdrawalFee', parseFloat(e.target.value))}
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="minimumWithdrawal">Minimum Withdrawal Amount ($)</Label>
                    <Input
                      id="minimumWithdrawal"
                      type="number"
                      value={settings.minimumWithdrawal}
                      onChange={(e) => handleSettingChange('minimumWithdrawal', parseFloat(e.target.value))}
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                      min="6"
                      max="20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                      min="15"
                      max="120"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                      min="3"
                      max="10"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Force all users to enable 2FA
                      </p>
                    </div>
                    <Switch
                      checked={settings.twoFactorRequired}
                      onCheckedChange={(checked) => handleSettingChange('twoFactorRequired', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Email Settings */}
            <TabsContent value="email" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => handleSettingChange('smtpPort', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fromEmail">From Email Address</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={settings.fromEmail}
                      onChange={(e) => handleSettingChange('fromEmail', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={settings.fromName}
                      onChange={(e) => handleSettingChange('fromName', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Content Settings */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maxProjectBudget">Maximum Project Budget ($)</Label>
                    <Input
                      id="maxProjectBudget"
                      type="number"
                      value={settings.maxProjectBudget}
                      onChange={(e) => handleSettingChange('maxProjectBudget', parseInt(e.target.value))}
                      min="1000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectBidDeadline">Project Bid Deadline (days)</Label>
                    <Input
                      id="projectBidDeadline"
                      type="number"
                      value={settings.projectBidDeadline}
                      onChange={(e) => handleSettingChange('projectBidDeadline', parseInt(e.target.value))}
                      min="1"
                      max="30"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="automaticPaymentRelease">Automatic Payment Release (days)</Label>
                    <Input
                      id="automaticPaymentRelease"
                      type="number"
                      value={settings.automaticPaymentRelease}
                      onChange={(e) => handleSettingChange('automaticPaymentRelease', parseInt(e.target.value))}
                      min="1"
                      max="30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="disputeResolutionTime">Dispute Resolution Time (days)</Label>
                    <Input
                      id="disputeResolutionTime"
                      type="number"
                      value={settings.disputeResolutionTime}
                      onChange={(e) => handleSettingChange('disputeResolutionTime', parseInt(e.target.value))}
                      min="3"
                      max="30"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-card-border">
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}