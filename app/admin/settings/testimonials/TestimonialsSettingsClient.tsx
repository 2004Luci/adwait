"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "../../components/AdminSidebar";
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

interface Testimonial {
  name: string;
  position: string;
  company: string;
  rating: number;
  content: string;
  image: string;
  tempImage: string;
}

interface CaseStudy {
  title: string;
  company: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: string[];
  color: string;
}

interface TestimonialsSettingsClientProps {
  user: AdminUser;
  initialTestimonials: Testimonial[];
  initialCaseStudies: CaseStudy[];
  defaultTestimonials: Testimonial[];
  defaultCaseStudies: CaseStudy[];
}

export function TestimonialsSettingsClient({
  user,
  initialTestimonials,
  initialCaseStudies,
  defaultTestimonials,
  defaultCaseStudies,
}: TestimonialsSettingsClientProps) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Testimonials handlers
  const updateTestimonial = (
    index: number,
    field: keyof Testimonial,
    value: string | number
  ) => {
    const newTestimonials = [...testimonials];
    if (field === "rating") {
      newTestimonials[index] = { ...newTestimonials[index], [field]: Number(value) || 0 };
    } else {
      newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    }
    setTestimonials(newTestimonials);
  };

  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      {
        name: "New Testimonial",
        position: "",
        company: "",
        rating: 5,
        content: "",
        image: "",
        tempImage: "",
      },
    ]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  // Case Studies handlers
  const updateCaseStudy = (
    index: number,
    field: keyof CaseStudy,
    value: string | string[]
  ) => {
    const newCaseStudies = [...caseStudies];
    newCaseStudies[index] = { ...newCaseStudies[index], [field]: value };
    setCaseStudies(newCaseStudies);
  };

  const addCaseStudy = () => {
    setCaseStudies([
      ...caseStudies,
      {
        title: "New Case Study",
        company: "",
        challenge: "",
        solution: "",
        result: "",
        metrics: [],
        color: "from-sage-200 to-sage-300",
      },
    ]);
  };

  const removeCaseStudy = (index: number) => {
    setCaseStudies(caseStudies.filter((_, i) => i !== index));
  };

  const addCaseStudyMetric = (caseStudyIndex: number) => {
    const newCaseStudies = [...caseStudies];
    newCaseStudies[caseStudyIndex].metrics.push("");
    setCaseStudies(newCaseStudies);
  };

  const updateCaseStudyMetric = (
    caseStudyIndex: number,
    metricIndex: number,
    value: string
  ) => {
    const newCaseStudies = [...caseStudies];
    newCaseStudies[caseStudyIndex].metrics[metricIndex] = value;
    setCaseStudies(newCaseStudies);
  };

  const removeCaseStudyMetric = (caseStudyIndex: number, metricIndex: number) => {
    const newCaseStudies = [...caseStudies];
    newCaseStudies[caseStudyIndex].metrics = newCaseStudies[caseStudyIndex].metrics.filter(
      (_, i) => i !== metricIndex
    );
    setCaseStudies(newCaseStudies);
  };

  // Reset to defaults
  const resetTestimonials = () => {
    setTestimonials([...defaultTestimonials]);
  };

  const resetCaseStudies = () => {
    setCaseStudies([...defaultCaseStudies]);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Save testimonials
      const testimonialsResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.TESTIMONIALS,
          value: testimonials,
          category: "testimonials",
          description: "Customer testimonials displayed on the homepage",
        }),
      });

      if (!testimonialsResponse.ok) {
        throw new Error("Failed to save testimonials");
      }

      // Save case studies
      const caseStudiesResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.CASE_STUDIES,
          value: caseStudies,
          category: "testimonials",
          description: "Case studies displayed on the homepage",
        }),
      });

      if (!caseStudiesResponse.ok) {
        throw new Error("Failed to save case studies");
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
                  Testimonials Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Edit testimonials and case studies
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

          {/* Testimonials */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Testimonials</CardTitle>
                  <CardDescription>
                    Customer testimonials with ratings and quotes
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetTestimonials}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addTestimonial}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Testimonial
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {testimonials.map((testimonial, index) => (
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
                            value={testimonial.name}
                            onChange={(e) => updateTestimonial(index, "name", e.target.value)}
                            placeholder="Customer Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Position</Label>
                          <Input
                            value={testimonial.position}
                            onChange={(e) => updateTestimonial(index, "position", e.target.value)}
                            placeholder="CEO, Accent Microcell"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Company</Label>
                        <Input
                          value={testimonial.company}
                          onChange={(e) => updateTestimonial(index, "company", e.target.value)}
                          placeholder="Accent Microcell (NSE Emerge)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Rating (1-5)</Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={testimonial.rating}
                          onChange={(e) => updateTestimonial(index, "rating", e.target.value)}
                          placeholder="5"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Content/Quote</Label>
                        <Textarea
                          value={testimonial.content}
                          onChange={(e) => updateTestimonial(index, "content", e.target.value)}
                          placeholder="Testimonial content..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Image URL</Label>
                          <Input
                            value={testimonial.image}
                            onChange={(e) => updateTestimonial(index, "image", e.target.value)}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Temp Image Path</Label>
                          <Input
                            value={testimonial.tempImage}
                            onChange={(e) => updateTestimonial(index, "tempImage", e.target.value)}
                            placeholder="/photo3.jpg"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTestimonial(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No testimonials configured. Click "Add Testimonial" to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Case Studies */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Case Studies</CardTitle>
                  <CardDescription>
                    Success stories and case studies with metrics
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetCaseStudies}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addCaseStudy}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Case Study
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseStudies.map((caseStudy, index) => (
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
                          <Label className="text-xs">Title</Label>
                          <Input
                            value={caseStudy.title}
                            onChange={(e) => updateCaseStudy(index, "title", e.target.value)}
                            placeholder="Case Study Title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Company</Label>
                          <Input
                            value={caseStudy.company}
                            onChange={(e) => updateCaseStudy(index, "company", e.target.value)}
                            placeholder="Company Name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Challenge</Label>
                        <Textarea
                          value={caseStudy.challenge}
                          onChange={(e) => updateCaseStudy(index, "challenge", e.target.value)}
                          placeholder="Challenge description..."
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Solution</Label>
                        <Textarea
                          value={caseStudy.solution}
                          onChange={(e) => updateCaseStudy(index, "solution", e.target.value)}
                          placeholder="Solution description..."
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Result</Label>
                        <Textarea
                          value={caseStudy.result}
                          onChange={(e) => updateCaseStudy(index, "result", e.target.value)}
                          placeholder="Result description..."
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Color Gradient</Label>
                        <Input
                          value={caseStudy.color}
                          onChange={(e) => updateCaseStudy(index, "color", e.target.value)}
                          placeholder="from-sage-200 to-sage-300"
                        />
                      </div>

                      {/* Metrics */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Metrics</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addCaseStudyMetric(index)}
                            className="h-7"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Metric
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {caseStudy.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="flex gap-2">
                              <Input
                                value={metric}
                                onChange={(e) =>
                                  updateCaseStudyMetric(index, metricIndex, e.target.value)
                                }
                                placeholder="Metric (e.g., ₹250 Cr Raised)"
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCaseStudyMetric(index, metricIndex)}
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
                      onClick={() => removeCaseStudy(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {caseStudies.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No case studies configured. Click "Add Case Study" to create one.
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
