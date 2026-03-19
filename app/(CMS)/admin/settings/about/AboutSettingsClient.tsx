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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ArrowLeft, Save, Plus, Trash2, RotateCcw, Loader2, GripVertical } from "lucide-react";
import { SETTING_KEYS } from "@/lib/db/settings";

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface Partner {
  name: string;
  role: string;
  image: string;
  tempImage: string;
  expertise: string[];
  experience: string;
  description: string;
}

interface Achievement {
  icon: string; // Stored as string (icon name)
  title: string;
  description: string;
  color: string;
}

interface AboutSettingsClientProps {
  user: AdminUser;
  initialPartners: Partner[];
  initialAchievements: Achievement[];
  initialClientLogos: string[];
  defaultPartners: Partner[];
  defaultAchievements: Achievement[];
  defaultClientLogos: string[];
}

export function AboutSettingsClient({
  user,
  initialPartners,
  initialAchievements,
  initialClientLogos,
  defaultPartners,
  defaultAchievements,
  defaultClientLogos,
}: AboutSettingsClientProps) {
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [clientLogos, setClientLogos] = useState<string[]>(initialClientLogos);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Partners handlers
  const updatePartner = (index: number, field: keyof Partner, value: string | string[]) => {
    const newPartners = [...partners];
    newPartners[index] = { ...newPartners[index], [field]: value };
    setPartners(newPartners);
  };

  const addPartner = () => {
    setPartners([
      ...partners,
      {
        name: "New Partner",
        role: "",
        image: "",
        tempImage: "",
        expertise: [],
        experience: "",
        description: "",
      },
    ]);
  };

  const removePartner = (index: number) => {
    setPartners(partners.filter((_, i) => i !== index));
  };

  const addPartnerExpertise = (partnerIndex: number) => {
    const newPartners = [...partners];
    newPartners[partnerIndex].expertise.push("");
    setPartners(newPartners);
  };

  const updatePartnerExpertise = (partnerIndex: number, expertiseIndex: number, value: string) => {
    const newPartners = [...partners];
    newPartners[partnerIndex].expertise[expertiseIndex] = value;
    setPartners(newPartners);
  };

  const removePartnerExpertise = (partnerIndex: number, expertiseIndex: number) => {
    const newPartners = [...partners];
    newPartners[partnerIndex].expertise = newPartners[partnerIndex].expertise.filter(
      (_, i) => i !== expertiseIndex
    );
    setPartners(newPartners);
  };

  // Achievements handlers
  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const newAchievements = [...achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setAchievements(newAchievements);
  };

  const addAchievement = () => {
    setAchievements([
      ...achievements,
      {
        icon: "Award",
        title: "New Achievement",
        description: "",
        color: "from-sage-200 to-sage-300",
      },
    ]);
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  // Client Logos handlers
  const updateClientLogo = (index: number, value: string) => {
    const newLogos = [...clientLogos];
    newLogos[index] = value;
    setClientLogos(newLogos);
  };

  const addClientLogo = () => {
    setClientLogos([...clientLogos, "New Client"]);
  };

  const removeClientLogo = (index: number) => {
    setClientLogos(clientLogos.filter((_, i) => i !== index));
  };

  // Reset to defaults
  const resetPartners = () => {
    setPartners([...defaultPartners]);
  };

  const resetAchievements = () => {
    setAchievements([...defaultAchievements]);
  };

  const resetClientLogos = () => {
    setClientLogos([...defaultClientLogos]);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Save partners
      const partnersResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.PARTNERS,
          value: partners,
          category: "about",
          description: "Partner profiles displayed in the about section",
        }),
      });

      if (!partnersResponse.ok) {
        throw new Error("Failed to save partners");
      }

      // Save achievements
      const achievementsResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.ACHIEVEMENTS,
          value: achievements,
          category: "about",
          description: "Company achievements displayed in the about section",
        }),
      });

      if (!achievementsResponse.ok) {
        throw new Error("Failed to save achievements");
      }

      // Save client logos
      const clientLogosResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.CLIENT_LOGOS,
          value: clientLogos,
          category: "about",
          description: "Client company names/logos displayed in the about section",
        }),
      });

      if (!clientLogosResponse.ok) {
        throw new Error("Failed to save client logos");
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
                  About & Team Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Edit partners, achievements, and client logos
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

          {/* Partners */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Partners</CardTitle>
                  <CardDescription>Partner profiles with expertise and experience</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetPartners}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addPartner}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Partner
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {partners.map((partner, index) => (
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
                          <Label className="text-xs">Name</Label>
                          <Input
                            value={partner.name}
                            onChange={(e) => updatePartner(index, "name", e.target.value)}
                            placeholder="Partner Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Role</Label>
                          <Input
                            value={partner.role}
                            onChange={(e) => updatePartner(index, "role", e.target.value)}
                            placeholder="FCS, LLb (Sp) - Founder Promoter"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Image URL</Label>
                          <Input
                            value={partner.image}
                            onChange={(e) => updatePartner(index, "image", e.target.value)}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Temp Image Path</Label>
                          <Input
                            value={partner.tempImage}
                            onChange={(e) => updatePartner(index, "tempImage", e.target.value)}
                            placeholder="/photo1.jpg"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Experience</Label>
                        <Input
                          value={partner.experience}
                          onChange={(e) => updatePartner(index, "experience", e.target.value)}
                          placeholder="23 years of experience"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={partner.description}
                          onChange={(e) => updatePartner(index, "description", e.target.value)}
                          placeholder="Partner description..."
                          rows={3}
                        />
                      </div>

                      {/* Expertise */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Expertise</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addPartnerExpertise(index)}
                            className="h-7"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Expertise
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {partner.expertise.map((exp, expIndex) => (
                            <div key={expIndex} className="flex gap-2">
                              <Input
                                value={exp}
                                onChange={(e) =>
                                  updatePartnerExpertise(index, expIndex, e.target.value)
                                }
                                placeholder="Expertise area..."
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removePartnerExpertise(index, expIndex)}
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
                      onClick={() => removePartner(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {partners.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No partners configured. Click &quot;Add Partner&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Company achievements and milestones</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetAchievements}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addAchievement}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Achievement
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
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
                            value={achievement.icon}
                            onChange={(e) => updateAchievement(index, "icon", e.target.value)}
                            placeholder="Award, Users, Building2, etc."
                          />
                          <p className="text-xs text-slate-500">Icon name from lucide-react</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Color Gradient</Label>
                          <Input
                            value={achievement.color}
                            onChange={(e) => updateAchievement(index, "color", e.target.value)}
                            placeholder="from-sage-200 to-sage-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={achievement.title}
                          onChange={(e) => updateAchievement(index, "title", e.target.value)}
                          placeholder="Achievement Title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={achievement.description}
                          onChange={(e) => updateAchievement(index, "description", e.target.value)}
                          placeholder="Achievement description..."
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {achievements.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No achievements configured. Click &quot;Add Achievement&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Client Logos */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Client Logos</CardTitle>
                  <CardDescription>List of client company names/logos</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetClientLogos}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addClientLogo}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Client
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {clientLogos.map((logo, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-slate-400">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-slate-500 w-6">{index + 1}.</span>
                  <Input
                    value={logo}
                    onChange={(e) => updateClientLogo(index, e.target.value)}
                    placeholder="Client Company Name"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeClientLogo(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {clientLogos.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No client logos configured. Click &quot;Add Client&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Preview Info */}
          <Card className="bg-slate-50 dark:bg-slate-800/50">
            <CardContent className="py-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Preview:</strong> After saving, visit the{" "}
                <Link href="/" target="_blank" className="text-sage-600 hover:underline">
                  homepage
                </Link>{" "}
                to see your changes in action.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
