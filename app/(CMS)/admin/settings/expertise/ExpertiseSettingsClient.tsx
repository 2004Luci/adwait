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

interface ExpertiseArea {
  category: string;
  skills: string[];
  percentage: number;
  color: string;
}

interface ProcessStep {
  icon: string; // Stored as string (icon name)
  title: string;
  description: string;
  details: string[];
  color: string;
}

interface ProcessStepItem {
  icon: string; // Stored as string (icon name)
  number: string;
  title: string;
  description: string;
}

interface ExpertiseSettingsClientProps {
  user: AdminUser;
  initialExpertiseAreas: ExpertiseArea[];
  initialExpertiseProcessSteps: ProcessStep[];
  initialProcessSteps: ProcessStepItem[];
  defaultExpertiseAreas: ExpertiseArea[];
  defaultExpertiseProcessSteps: ProcessStep[];
  defaultProcessSteps: ProcessStepItem[];
}

export function ExpertiseSettingsClient({
  user,
  initialExpertiseAreas,
  initialExpertiseProcessSteps,
  initialProcessSteps,
  defaultExpertiseAreas,
  defaultExpertiseProcessSteps,
  defaultProcessSteps,
}: ExpertiseSettingsClientProps) {
  const router = useRouter();
  const [expertiseAreas, setExpertiseAreas] = useState<ExpertiseArea[]>(initialExpertiseAreas);
  const [expertiseProcessSteps, setExpertiseProcessSteps] = useState<ProcessStep[]>(
    initialExpertiseProcessSteps
  );
  const [processSteps, setProcessSteps] = useState<ProcessStepItem[]>(initialProcessSteps);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Expertise Areas handlers
  const updateExpertiseArea = (
    index: number,
    field: keyof ExpertiseArea,
    value: string | string[] | number
  ) => {
    const newAreas = [...expertiseAreas];
    if (field === "percentage") {
      newAreas[index] = { ...newAreas[index], [field]: Number(value) || 0 };
    } else {
      newAreas[index] = { ...newAreas[index], [field]: value };
    }
    setExpertiseAreas(newAreas);
  };

  const addExpertiseArea = () => {
    setExpertiseAreas([
      ...expertiseAreas,
      {
        category: "New Category",
        skills: [],
        percentage: 0,
        color: "from-sage-200 to-sage-300",
      },
    ]);
  };

  const removeExpertiseArea = (index: number) => {
    setExpertiseAreas(expertiseAreas.filter((_, i) => i !== index));
  };

  const addExpertiseAreaSkill = (areaIndex: number) => {
    const newAreas = [...expertiseAreas];
    newAreas[areaIndex].skills.push("");
    setExpertiseAreas(newAreas);
  };

  const updateExpertiseAreaSkill = (areaIndex: number, skillIndex: number, value: string) => {
    const newAreas = [...expertiseAreas];
    newAreas[areaIndex].skills[skillIndex] = value;
    setExpertiseAreas(newAreas);
  };

  const removeExpertiseAreaSkill = (areaIndex: number, skillIndex: number) => {
    const newAreas = [...expertiseAreas];
    newAreas[areaIndex].skills = newAreas[areaIndex].skills.filter((_, i) => i !== skillIndex);
    setExpertiseAreas(newAreas);
  };

  // Expertise Process Steps handlers
  const updateExpertiseProcessStep = (
    index: number,
    field: keyof ProcessStep,
    value: string | string[]
  ) => {
    const newSteps = [...expertiseProcessSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setExpertiseProcessSteps(newSteps);
  };

  const addExpertiseProcessStep = () => {
    setExpertiseProcessSteps([
      ...expertiseProcessSteps,
      {
        icon: "Target",
        title: "New Step",
        description: "",
        details: [],
        color: "from-sage-200 to-sage-300",
      },
    ]);
  };

  const removeExpertiseProcessStep = (index: number) => {
    setExpertiseProcessSteps(expertiseProcessSteps.filter((_, i) => i !== index));
  };

  const addExpertiseProcessStepDetail = (stepIndex: number) => {
    const newSteps = [...expertiseProcessSteps];
    newSteps[stepIndex].details.push("");
    setExpertiseProcessSteps(newSteps);
  };

  const updateExpertiseProcessStepDetail = (
    stepIndex: number,
    detailIndex: number,
    value: string
  ) => {
    const newSteps = [...expertiseProcessSteps];
    newSteps[stepIndex].details[detailIndex] = value;
    setExpertiseProcessSteps(newSteps);
  };

  const removeExpertiseProcessStepDetail = (stepIndex: number, detailIndex: number) => {
    const newSteps = [...expertiseProcessSteps];
    newSteps[stepIndex].details = newSteps[stepIndex].details.filter((_, i) => i !== detailIndex);
    setExpertiseProcessSteps(newSteps);
  };

  // Process Steps handlers
  const updateProcessStep = (
    index: number,
    field: keyof ProcessStepItem,
    value: string
  ) => {
    const newSteps = [...processSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setProcessSteps(newSteps);
  };

  const addProcessStep = () => {
    setProcessSteps([
      ...processSteps,
      {
        icon: "LampDesk",
        number: "01",
        title: "New Step",
        description: "",
      },
    ]);
  };

  const removeProcessStep = (index: number) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index));
  };

  // Reset to defaults
  const resetExpertiseAreas = () => {
    setExpertiseAreas([...defaultExpertiseAreas]);
  };

  const resetExpertiseProcessSteps = () => {
    setExpertiseProcessSteps([...defaultExpertiseProcessSteps]);
  };

  const resetProcessSteps = () => {
    setProcessSteps([...defaultProcessSteps]);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Save all expertise settings
      const settings = [
        {
          key: SETTING_KEYS.EXPERTISE_AREAS,
          value: expertiseAreas,
          category: "expertise",
          description: "Expertise areas with skills and percentages",
        },
        {
          key: SETTING_KEYS.EXPERTISE_PROCESS_STEPS,
          value: expertiseProcessSteps,
          category: "expertise",
          description: "Expertise process steps with details",
        },
        {
          key: SETTING_KEYS.PROCESS_STEPS,
          value: processSteps,
          category: "expertise",
          description: "Process steps displayed in the process section",
        },
      ];

      const responses = await Promise.all(
        settings.map((setting) =>
          fetch("/api/admin/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(setting),
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
                  Expertise Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Edit expertise areas, process steps, and workflow
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

          {/* Expertise Areas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Expertise Areas</CardTitle>
                  <CardDescription>
                    Areas of expertise with skills and proficiency percentages
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetExpertiseAreas}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addExpertiseArea}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Area
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {expertiseAreas.map((area, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-4 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-slate-400 mt-2">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Category</Label>
                          <Input
                            value={area.category}
                            onChange={(e) => updateExpertiseArea(index, "category", e.target.value)}
                            placeholder="Capital Markets"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Percentage (0-100)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={area.percentage}
                            onChange={(e) =>
                              updateExpertiseArea(index, "percentage", e.target.value)
                            }
                            placeholder="95"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Color Gradient</Label>
                          <Input
                            value={area.color}
                            onChange={(e) => updateExpertiseArea(index, "color", e.target.value)}
                            placeholder="from-sage-200 to-sage-300"
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Skills</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addExpertiseAreaSkill(index)}
                            className="h-7"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Skill
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {area.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex gap-2">
                              <Input
                                value={skill}
                                onChange={(e) =>
                                  updateExpertiseAreaSkill(index, skillIndex, e.target.value)
                                }
                                placeholder="Skill name..."
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExpertiseAreaSkill(index, skillIndex)}
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
                      onClick={() => removeExpertiseArea(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {expertiseAreas.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No expertise areas configured. Click &quot;Add Area&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Expertise Process Steps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Expertise Process Steps</CardTitle>
                  <CardDescription>
                    Process steps for the expertise section with details
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetExpertiseProcessSteps}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addExpertiseProcessStep}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {expertiseProcessSteps.map((step, index) => (
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
                            value={step.icon}
                            onChange={(e) => updateExpertiseProcessStep(index, "icon", e.target.value)}
                            placeholder="Target, Lightbulb, FileText, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Color Gradient</Label>
                          <Input
                            value={step.color}
                            onChange={(e) => updateExpertiseProcessStep(index, "color", e.target.value)}
                            placeholder="from-sage-200 to-sage-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={step.title}
                          onChange={(e) => updateExpertiseProcessStep(index, "title", e.target.value)}
                          placeholder="Step Title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={step.description}
                          onChange={(e) =>
                            updateExpertiseProcessStep(index, "description", e.target.value)
                          }
                          placeholder="Step description..."
                          rows={2}
                        />
                      </div>

                      {/* Details */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Details</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addExpertiseProcessStepDetail(index)}
                            className="h-7"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Detail
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex gap-2">
                              <Input
                                value={detail}
                                onChange={(e) =>
                                  updateExpertiseProcessStepDetail(index, detailIndex, e.target.value)
                                }
                                placeholder="Detail item..."
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExpertiseProcessStepDetail(index, detailIndex)}
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
                      onClick={() => removeExpertiseProcessStep(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {expertiseProcessSteps.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No process steps configured. Click &quot;Add Step&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Process Steps */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Process Steps</CardTitle>
                  <CardDescription>
                    Numbered process steps displayed in the process section
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetProcessSteps}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addProcessStep}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-4 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-slate-400 mt-2">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Icon Name</Label>
                          <Input
                            value={step.icon}
                            onChange={(e) => updateProcessStep(index, "icon", e.target.value)}
                            placeholder="LampDesk, Microscope, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Number</Label>
                          <Input
                            value={step.number}
                            onChange={(e) => updateProcessStep(index, "number", e.target.value)}
                            placeholder="01"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Title</Label>
                          <Input
                            value={step.title}
                            onChange={(e) => updateProcessStep(index, "title", e.target.value)}
                            placeholder="Step Title"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={step.description}
                          onChange={(e) => updateProcessStep(index, "description", e.target.value)}
                          placeholder="Step description..."
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProcessStep(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {processSteps.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No process steps configured. Click &quot;Add Step&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Preview Info */}
          <Card className="bg-slate-50 dark:bg-slate-800/50">
            <CardContent className="py-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                <strong>Preview:</strong> After saving, visit the{" "}
                <Link href="/#expertise" target="_blank" className="text-sage-600 hover:underline">
                  expertise section
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
