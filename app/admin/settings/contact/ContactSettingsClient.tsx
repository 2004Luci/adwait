"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "../../components/AdminSidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  RotateCcw,
  Loader2,
  GripVertical,
} from "lucide-react";
import { SETTING_KEYS } from "@/lib/db/settings";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface ContactInfo {
  icon: string; // Stored as string (icon name)
  title: string;
  details: string[];
  color: string;
  clickable?: boolean;
}

interface ContactSettingsClientProps {
  user: AdminUser;
  initialContactEmail: string;
  initialContactPhone: string;
  initialContactAddress: string;
  initialBusinessHours: string;
  initialCompanyEmails: string[];
  initialOfficeMapsUrl: string;
  initialContactInfo: ContactInfo[];
  defaultContactEmail: string;
  defaultContactPhone: string;
  defaultContactAddress: string;
  defaultBusinessHours: string;
  defaultCompanyEmails: string[];
  defaultOfficeMapsUrl: string;
  defaultContactInfo: ContactInfo[];
}

export function ContactSettingsClient({
  user,
  initialContactEmail,
  initialContactPhone,
  initialContactAddress,
  initialBusinessHours,
  initialCompanyEmails,
  initialOfficeMapsUrl,
  initialContactInfo,
  defaultContactEmail,
  defaultContactPhone,
  defaultContactAddress,
  defaultBusinessHours,
  defaultCompanyEmails,
  defaultOfficeMapsUrl,
  defaultContactInfo,
}: ContactSettingsClientProps) {
  const router = useRouter();
  const [contactEmail, setContactEmail] = useState(initialContactEmail);
  const [contactPhone, setContactPhone] = useState(initialContactPhone);
  const [contactAddress, setContactAddress] = useState(initialContactAddress);
  const [businessHours, setBusinessHours] = useState(initialBusinessHours);
  const [companyEmails, setCompanyEmails] = useState<string[]>(initialCompanyEmails);
  const [officeMapsUrl, setOfficeMapsUrl] = useState(initialOfficeMapsUrl);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(initialContactInfo);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Company Emails handlers
  const updateCompanyEmail = (index: number, value: string) => {
    const newEmails = [...companyEmails];
    newEmails[index] = value;
    setCompanyEmails(newEmails);
  };

  const addCompanyEmail = () => {
    setCompanyEmails([...companyEmails, ""]);
  };

  const removeCompanyEmail = (index: number) => {
    setCompanyEmails(companyEmails.filter((_, i) => i !== index));
  };

  // Contact Info handlers
  const updateContactInfo = (
    index: number,
    field: keyof ContactInfo,
    value: string | string[] | boolean
  ) => {
    const newContactInfo = [...contactInfo];
    newContactInfo[index] = { ...newContactInfo[index], [field]: value };
    setContactInfo(newContactInfo);
  };

  const addContactInfo = () => {
    setContactInfo([
      ...contactInfo,
      {
        icon: "Mail",
        title: "New Contact",
        details: [],
        color: "from-sage-200 to-sage-300",
        clickable: false,
      },
    ]);
  };

  const removeContactInfo = (index: number) => {
    setContactInfo(contactInfo.filter((_, i) => i !== index));
  };

  const addContactInfoDetail = (contactInfoIndex: number) => {
    const newContactInfo = [...contactInfo];
    newContactInfo[contactInfoIndex].details.push("");
    setContactInfo(newContactInfo);
  };

  const updateContactInfoDetail = (
    contactInfoIndex: number,
    detailIndex: number,
    value: string
  ) => {
    const newContactInfo = [...contactInfo];
    newContactInfo[contactInfoIndex].details[detailIndex] = value;
    setContactInfo(newContactInfo);
  };

  const removeContactInfoDetail = (contactInfoIndex: number, detailIndex: number) => {
    const newContactInfo = [...contactInfo];
    newContactInfo[contactInfoIndex].details = newContactInfo[contactInfoIndex].details.filter(
      (_, i) => i !== detailIndex
    );
    setContactInfo(newContactInfo);
  };

  // Reset to defaults
  const resetAll = () => {
    setContactEmail(defaultContactEmail);
    setContactPhone(defaultContactPhone);
    setContactAddress(defaultContactAddress);
    setBusinessHours(defaultBusinessHours);
    setCompanyEmails([...defaultCompanyEmails]);
    setOfficeMapsUrl(defaultOfficeMapsUrl);
    setContactInfo([...defaultContactInfo]);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Save all contact settings
      const settings = [
        { key: SETTING_KEYS.CONTACT_EMAIL, value: contactEmail },
        { key: SETTING_KEYS.CONTACT_PHONE, value: contactPhone },
        { key: SETTING_KEYS.CONTACT_ADDRESS, value: contactAddress },
        { key: SETTING_KEYS.BUSINESS_HOURS, value: businessHours },
        { key: SETTING_KEYS.COMPANY_EMAILS, value: companyEmails },
        { key: SETTING_KEYS.OFFICE_MAPS_URL, value: officeMapsUrl },
        { key: SETTING_KEYS.CONTACT_INFO, value: contactInfo },
      ];

      const responses = await Promise.all(
        settings.map((setting) =>
          fetch("/api/admin/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              key: setting.key,
              value: setting.value,
              category: "contact",
              description: `Contact setting: ${setting.key}`,
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
                  Contact Info Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Edit contact details and information
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetAll}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All
              </Button>
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

          {/* Basic Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Contact Information</CardTitle>
              <CardDescription>
                Primary contact details displayed throughout the site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="contact@adwaitartha.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+91 02717406485"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactAddress">Contact Address</Label>
                <Textarea
                  id="contactAddress"
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  placeholder="Full office address..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Input
                  id="businessHours"
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  placeholder="Mon - Fri: 10:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeMapsUrl">Office Maps URL</Label>
                <Input
                  id="officeMapsUrl"
                  value={officeMapsUrl}
                  onChange={(e) => setOfficeMapsUrl(e.target.value)}
                  placeholder="Google Maps URL"
                />
              </div>
            </CardContent>
          </Card>

          {/* Company Emails */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Company Emails</CardTitle>
                  <CardDescription>
                    List of company email addresses
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addCompanyEmail}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Email
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {companyEmails.map((email, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 w-6">{index + 1}.</span>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => updateCompanyEmail(index, e.target.value)}
                    placeholder="email@adwaitartha.com"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCompanyEmail(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {companyEmails.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No emails configured. Click &quot;Add Email&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Contact Info Cards */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contact Info Cards</CardTitle>
                  <CardDescription>
                    Contact information cards displayed on the contact section
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addContactInfo}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Contact Card
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-4 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-slate-400 mt-2">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Icon Name</Label>
                          <Input
                            value={info.icon}
                            onChange={(e) => updateContactInfo(index, "icon", e.target.value)}
                            placeholder="Mail, Phone, MapPin, Clock"
                          />
                          <p className="text-xs text-slate-500">
                            Icon name from lucide-react
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Title</Label>
                          <Input
                            value={info.title}
                            onChange={(e) => updateContactInfo(index, "title", e.target.value)}
                            placeholder="Email, Phone, Office, etc."
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Color Gradient</Label>
                        <Input
                          value={info.color}
                          onChange={(e) => updateContactInfo(index, "color", e.target.value)}
                          placeholder="from-sage-200 to-sage-300"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch
                          checked={info.clickable || false}
                          onCheckedChange={(checked) =>
                            updateContactInfo(index, "clickable", checked)
                          }
                        />
                        <Label className="text-xs">Clickable (e.g., opens map)</Label>
                      </div>

                      {/* Details */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Details</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addContactInfoDetail(index)}
                            className="h-7"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Detail
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {info.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex gap-2">
                              <Input
                                value={detail}
                                onChange={(e) =>
                                  updateContactInfoDetail(index, detailIndex, e.target.value)
                                }
                                placeholder="Detail line..."
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeContactInfoDetail(index, detailIndex)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContactInfo(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {contactInfo.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No contact info cards configured. Click &quot;Add Contact Card&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Preview Info */}
          <Card className="bg-slate-50 dark:bg-slate-800/50">
            <CardContent className="py-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Preview:</strong> After saving, visit the{" "}
                <Link href="/#contact" target="_blank" className="text-sage-600 hover:underline">
                  contact section
                </Link>{" "}
                on the homepage to see your changes.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
