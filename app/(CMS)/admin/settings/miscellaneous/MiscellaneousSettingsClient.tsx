"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "@/app/(CMS)/admin/components/AdminSidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ArrowLeft,
  Save,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SETTING_KEYS } from "@/lib/db/settings";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinks {
  services: FooterLink[];
  company: FooterLink[];
  resources: string[];
  legal: string[];
}

interface OpenPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface MiscellaneousSettingsClientProps {
  user: AdminUser;
  initialSettings: Record<string, unknown>;
  defaultSettings: Record<string, unknown>;
}

export function MiscellaneousSettingsClient({
  user,
  initialSettings,
  defaultSettings,
}: MiscellaneousSettingsClientProps) {
  void defaultSettings; // Reserved for future reset-to-defaults feature
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["site-config", "navigation", "footer"])
  );

  // State for all settings
  const [siteUrl, setSiteUrl] = useState(initialSettings.siteUrl as string);
  const [navItems, setNavItems] = useState(initialSettings.navItems as Array<{ name: string; href: string; icon: string }>);
  const [footerLinks, setFooterLinks] = useState(initialSettings.footerLinks as FooterLinks);
  const [openPositions, setOpenPositions] = useState(initialSettings.openPositions as OpenPosition[]);
  const [benefits, setBenefits] = useState(initialSettings.benefits as Benefit[]);
  const [timeSlots, setTimeSlots] = useState(initialSettings.timeSlots as string[]);

  // Service page data - stored as arrays/objects
  const [corporateLawServices, setCorporateLawServices] = useState(
    initialSettings.corporateLawServices as string[]
  );
  const [corporateLawMeetingServices, setCorporateLawMeetingServices] = useState(
    initialSettings.corporateLawMeetingServices as Array<{ title: string; description: string; features: string[] }>
  );
  const [corporateLawComplianceAreas, setCorporateLawComplianceAreas] = useState(
    initialSettings.corporateLawComplianceAreas as string[]
  );
  const [ipoFeatures, setIpoFeatures] = useState(initialSettings.ipoFeatures as string[]);
  const [ipoProcessSteps, setIpoProcessSteps] = useState(
    initialSettings.ipoProcessSteps as Array<{ step: string; title: string; description: string; icon: string }>
  );
  const [ipoBenefits, setIpoBenefits] = useState(initialSettings.ipoBenefits as string[]);
  const [legalDraftingServices, setLegalDraftingServices] = useState(
    initialSettings.legalDraftingServices as string[]
  );
  const [legalDraftingDocumentTypes, setLegalDraftingDocumentTypes] = useState(
    initialSettings.legalDraftingDocumentTypes as string[]
  );
  const [legalDraftingAuditServices, setLegalDraftingAuditServices] = useState(
    initialSettings.legalDraftingAuditServices as Array<{ title: string; description: string; features: string[] }>
  );
  const [lawTribunalsServices, setLawTribunalsServices] = useState(
    initialSettings.lawTribunalsServices as string[]
  );
  const [lawTribunals, setLawTribunals] = useState(
    initialSettings.lawTribunals as Array<{ name: string; description: string; cases: string[] }>
  );
  const [lawTribunalsExpertise, setLawTribunalsExpertise] = useState(
    initialSettings.lawTribunalsExpertise as string[]
  );
  const [loanSyndicationServices, setLoanSyndicationServices] = useState(
    initialSettings.loanSyndicationServices as string[]
  );
  const [loanSyndicationFinanceTypes, setLoanSyndicationFinanceTypes] = useState(
    initialSettings.loanSyndicationFinanceTypes as Array<{ title: string; description: string; features: string[] }>
  );
  const [loanSyndicationProjectTypes, setLoanSyndicationProjectTypes] = useState(
    initialSettings.loanSyndicationProjectTypes as string[]
  );
  const [financialAdvisoryServices, setFinancialAdvisoryServices] = useState(
    initialSettings.financialAdvisoryServices as string[]
  );
  const [financialAdvisoryAreas, setFinancialAdvisoryAreas] = useState(
    initialSettings.financialAdvisoryAreas as Array<{ title: string; description: string; features: string[] }>
  );
  const [financialAdvisoryBenefits, setFinancialAdvisoryBenefits] = useState(
    initialSettings.financialAdvisoryBenefits as string[]
  );

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Save all settings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const allSettings = [
        { key: SETTING_KEYS.SITE_URL, value: siteUrl },
        { key: SETTING_KEYS.NAV_ITEMS, value: navItems },
        { key: SETTING_KEYS.FOOTER_LINKS, value: footerLinks },
        { key: SETTING_KEYS.OPEN_POSITIONS, value: openPositions },
        { key: SETTING_KEYS.BENEFITS, value: benefits },
        { key: SETTING_KEYS.TIME_SLOTS, value: timeSlots },
        { key: SETTING_KEYS.CORPORATE_LAW_SERVICES, value: corporateLawServices },
        { key: SETTING_KEYS.CORPORATE_LAW_MEETING_SERVICES, value: corporateLawMeetingServices },
        { key: SETTING_KEYS.CORPORATE_LAW_COMPLIANCE_AREAS, value: corporateLawComplianceAreas },
        { key: SETTING_KEYS.IPO_FEATURES, value: ipoFeatures },
        { key: SETTING_KEYS.IPO_PROCESS_STEPS, value: ipoProcessSteps },
        { key: SETTING_KEYS.IPO_BENEFITS, value: ipoBenefits },
        { key: SETTING_KEYS.LEGAL_DRAFTING_SERVICES, value: legalDraftingServices },
        { key: SETTING_KEYS.LEGAL_DRAFTING_DOCUMENT_TYPES, value: legalDraftingDocumentTypes },
        { key: SETTING_KEYS.LEGAL_DRAFTING_AUDIT_SERVICES, value: legalDraftingAuditServices },
        { key: SETTING_KEYS.LAW_TRIBUNALS_SERVICES, value: lawTribunalsServices },
        { key: SETTING_KEYS.LAW_TRIBUNALS, value: lawTribunals },
        { key: SETTING_KEYS.LAW_TRIBUNALS_EXPERTISE, value: lawTribunalsExpertise },
        { key: SETTING_KEYS.LOAN_SYNDICATION_SERVICES, value: loanSyndicationServices },
        { key: SETTING_KEYS.LOAN_SYNDICATION_FINANCE_TYPES, value: loanSyndicationFinanceTypes },
        { key: SETTING_KEYS.LOAN_SYNDICATION_PROJECT_TYPES, value: loanSyndicationProjectTypes },
        { key: SETTING_KEYS.FINANCIAL_ADVISORY_SERVICES, value: financialAdvisoryServices },
        { key: SETTING_KEYS.FINANCIAL_ADVISORY_AREAS, value: financialAdvisoryAreas },
        { key: SETTING_KEYS.FINANCIAL_ADVISORY_BENEFITS, value: financialAdvisoryBenefits },
      ];

      const responses = await Promise.all(
        allSettings.map((setting) =>
          fetch("/api/admin/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              key: setting.key,
              value: setting.value,
              category: "general",
              description: `Miscellaneous setting: ${setting.key}`,
            }),
          })
        )
      );

      const errors = responses.filter((r) => !r.ok);
      if (errors.length > 0) {
        throw new Error("Failed to save some settings");
      }

      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/settings">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="font-semibold text-slate-900 dark:text-white">
                  Miscellaneous Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Edit site configuration, navigation, footer, careers, and service page data
                </p>
              </div>
            </div>

            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800">
              Settings saved successfully!
            </div>
          )}

          {/* Note */}
          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="py-4">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>Note:</strong> This page contains advanced settings. Most of these are used
                in service detail pages and other specialized sections. Edit with caution.
              </p>
            </CardContent>
          </Card>

          {/* Site Configuration */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("site-config")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Site Configuration</CardTitle>
                {expandedSections.has("site-config") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("site-config") && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="https://adwaitartha.com"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Navigation */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("navigation")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Navigation Items</CardTitle>
                {expandedSections.has("navigation") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("navigation") && (
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-500">
                  Navigation items are stored as JSON. Edit the navItems array structure in the
                  database directly or use a JSON editor.
                </p>
                <Textarea
                  value={JSON.stringify(navItems, null, 2)}
                  onChange={(e) => {
                    try {
                      setNavItems(JSON.parse(e.target.value));
                    } catch {
                      // Invalid JSON, ignore
                    }
                  }}
                  rows={10}
                  className="font-mono text-xs"
                />
              </CardContent>
            )}
          </Card>

          {/* Footer Links */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("footer")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Footer Links</CardTitle>
                {expandedSections.has("footer") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("footer") && (
              <CardContent>
                <Textarea
                  value={JSON.stringify(footerLinks, null, 2)}
                  onChange={(e) => {
                    try {
                      setFooterLinks(JSON.parse(e.target.value));
                    } catch {
                      // Invalid JSON, ignore
                    }
                  }}
                  rows={15}
                  className="font-mono text-xs"
                />
              </CardContent>
            )}
          </Card>

          {/* Careers */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("careers")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Careers (Open Positions & Benefits)</CardTitle>
                {expandedSections.has("careers") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("careers") && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Open Positions (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(openPositions, null, 2)}
                    onChange={(e) => {
                      try {
                        setOpenPositions(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={20}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Benefits (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(benefits, null, 2)}
                    onChange={(e) => {
                      try {
                        setBenefits(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={10}
                    className="font-mono text-xs"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Time Slots */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("time-slots")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Time Slots</CardTitle>
                {expandedSections.has("time-slots") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("time-slots") && (
              <CardContent>
                <Textarea
                  value={JSON.stringify(timeSlots, null, 2)}
                  onChange={(e) => {
                    try {
                      setTimeSlots(JSON.parse(e.target.value));
                    } catch { }
                  }}
                  rows={8}
                  className="font-mono text-xs"
                />
              </CardContent>
            )}
          </Card>

          {/* Corporate Law Service Data */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("corporate-law")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Corporate Law Service Data</CardTitle>
                {expandedSections.has("corporate-law") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("corporate-law") && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Services (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(corporateLawServices, null, 2)}
                    onChange={(e) => {
                      try {
                        setCorporateLawServices(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meeting Services (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(corporateLawMeetingServices, null, 2)}
                    onChange={(e) => {
                      try {
                        setCorporateLawMeetingServices(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={12}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Compliance Areas (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(corporateLawComplianceAreas, null, 2)}
                    onChange={(e) => {
                      try {
                        setCorporateLawComplianceAreas(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* IPO Service Data */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("ipo")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>IPO Service Data</CardTitle>
                {expandedSections.has("ipo") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("ipo") && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Features (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(ipoFeatures, null, 2)}
                    onChange={(e) => {
                      try {
                        setIpoFeatures(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Process Steps (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(ipoProcessSteps, null, 2)}
                    onChange={(e) => {
                      try {
                        setIpoProcessSteps(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={15}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Benefits (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(ipoBenefits, null, 2)}
                    onChange={(e) => {
                      try {
                        setIpoBenefits(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Legal Drafting Service Data */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("legal-drafting")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Legal Drafting Service Data</CardTitle>
                {expandedSections.has("legal-drafting") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("legal-drafting") && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Services (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(legalDraftingServices, null, 2)}
                    onChange={(e) => {
                      try {
                        setLegalDraftingServices(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Document Types (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(legalDraftingDocumentTypes, null, 2)}
                    onChange={(e) => {
                      try {
                        setLegalDraftingDocumentTypes(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Audit Services (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(legalDraftingAuditServices, null, 2)}
                    onChange={(e) => {
                      try {
                        setLegalDraftingAuditServices(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={12}
                    className="font-mono text-xs"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Law Tribunals Service Data */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("law-tribunals")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Law Tribunals Service Data</CardTitle>
                {expandedSections.has("law-tribunals") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("law-tribunals") && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Services (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(lawTribunalsServices, null, 2)}
                    onChange={(e) => {
                      try {
                        setLawTribunalsServices(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tribunals (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(lawTribunals, null, 2)}
                    onChange={(e) => {
                      try {
                        setLawTribunals(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={15}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expertise (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(lawTribunalsExpertise, null, 2)}
                    onChange={(e) => {
                      try {
                        setLawTribunalsExpertise(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={6}
                    className="font-mono text-xs"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Loan Syndication Service Data */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("loan-syndication")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Loan Syndication Service Data</CardTitle>
                {expandedSections.has("loan-syndication") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("loan-syndication") && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Services (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(loanSyndicationServices, null, 2)}
                    onChange={(e) => {
                      try {
                        setLoanSyndicationServices(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Finance Types (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(loanSyndicationFinanceTypes, null, 2)}
                    onChange={(e) => {
                      try {
                        setLoanSyndicationFinanceTypes(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={12}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project Types (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(loanSyndicationProjectTypes, null, 2)}
                    onChange={(e) => {
                      try {
                        setLoanSyndicationProjectTypes(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Financial Advisory Service Data */}
          <Card>
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection("financial-advisory")}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Financial Advisory Service Data</CardTitle>
                {expandedSections.has("financial-advisory") ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {expandedSections.has("financial-advisory") && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Services (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(financialAdvisoryServices, null, 2)}
                    onChange={(e) => {
                      try {
                        setFinancialAdvisoryServices(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Advisory Areas (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(financialAdvisoryAreas, null, 2)}
                    onChange={(e) => {
                      try {
                        setFinancialAdvisoryAreas(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={12}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Benefits (JSON)</Label>
                  <Textarea
                    value={JSON.stringify(financialAdvisoryBenefits, null, 2)}
                    onChange={(e) => {
                      try {
                        setFinancialAdvisoryBenefits(JSON.parse(e.target.value));
                      } catch { }
                    }}
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
