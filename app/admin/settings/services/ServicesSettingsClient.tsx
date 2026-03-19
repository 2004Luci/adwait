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

interface Service {
  id: string;
  icon: string; // Stored as string (icon name)
  title: string;
  description: string;
  features: string[];
  color: string;
  slug: string;
}

interface ServicesSettingsClientProps {
  user: AdminUser;
  initialServices: Service[];
  initialServiceList: string[];
  defaultServices: Service[];
  defaultServiceList: string[];
}

export function ServicesSettingsClient({
  user,
  initialServices,
  initialServiceList,
  defaultServices,
  defaultServiceList,
}: ServicesSettingsClientProps) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [serviceList, setServiceList] = useState<string[]>(initialServiceList);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Services handlers
  const updateService = (
    index: number,
    field: keyof Service,
    value: string | string[]
  ) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
  };

  const addService = () => {
    setServices([
      ...services,
      {
        id: `service-${Date.now()}`,
        icon: "Briefcase",
        title: "New Service",
        description: "",
        features: [],
        color: "from-sage-200 to-sage-300",
        slug: "",
      },
    ]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const addFeature = (serviceIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex].features.push("");
    setServices(newServices);
  };

  const updateFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...services];
    newServices[serviceIndex].features[featureIndex] = value;
    setServices(newServices);
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...services];
    newServices[serviceIndex].features = newServices[serviceIndex].features.filter(
      (_, i) => i !== featureIndex
    );
    setServices(newServices);
  };

  // Service List handlers
  const updateServiceListItem = (index: number, value: string) => {
    const newList = [...serviceList];
    newList[index] = value;
    setServiceList(newList);
  };

  const addServiceListItem = () => {
    setServiceList([...serviceList, "New Service"]);
  };

  const removeServiceListItem = (index: number) => {
    setServiceList(serviceList.filter((_, i) => i !== index));
  };

  // Reset to defaults
  const resetServices = () => {
    setServices([...defaultServices]);
  };

  const resetServiceList = () => {
    setServiceList([...defaultServiceList]);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Save services
      const servicesResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.SERVICES,
          value: services,
          category: "services",
          description: "Service cards displayed on the homepage",
        }),
      });

      if (!servicesResponse.ok) {
        throw new Error("Failed to save services");
      }

      // Save service list
      const serviceListResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.SERVICE_LIST,
          value: serviceList,
          category: "services",
          description: "Simple list of service names",
        }),
      });

      if (!serviceListResponse.ok) {
        throw new Error("Failed to save service list");
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
                  Services Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Edit service cards and service list
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

          {/* Services */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Service Cards</CardTitle>
                  <CardDescription>
                    Service cards displayed on the homepage with icons, descriptions, and features
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetServices}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addService}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Service
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service, index) => (
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
                          <Label className="text-xs">ID</Label>
                          <Input
                            value={service.id}
                            onChange={(e) => updateService(index, "id", e.target.value)}
                            placeholder="service-id"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Slug</Label>
                          <Input
                            value={service.slug}
                            onChange={(e) => updateService(index, "slug", e.target.value)}
                            placeholder="service-slug"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={service.title}
                          onChange={(e) => updateService(index, "title", e.target.value)}
                          placeholder="Service Title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(index, "description", e.target.value)}
                          placeholder="Service description..."
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Icon Name</Label>
                          <Input
                            value={service.icon}
                            onChange={(e) => updateService(index, "icon", e.target.value)}
                            placeholder="TrendingUp, FileText, etc."
                          />
                          <p className="text-xs text-slate-500">
                            Icon name from lucide-react (e.g., TrendingUp, FileText, Scale)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Color Gradient</Label>
                          <Input
                            value={service.color}
                            onChange={(e) => updateService(index, "color", e.target.value)}
                            placeholder="from-sage-200 to-sage-300"
                          />
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Features</Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addFeature(index)}
                            className="h-7"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Feature
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex gap-2">
                              <Input
                                value={feature}
                                onChange={(e) =>
                                  updateFeature(index, featureIndex, e.target.value)
                                }
                                placeholder="Feature name..."
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFeature(index, featureIndex)}
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
                      onClick={() => removeService(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {services.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No services configured. Click &quot;Add Service&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Service List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Service List</CardTitle>
                  <CardDescription>
                    Simple list of service names (used in forms and other places)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetServiceList}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addServiceListItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {serviceList.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-slate-400">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-slate-500 w-6">{index + 1}.</span>
                  <Input
                    value={item}
                    onChange={(e) => updateServiceListItem(index, e.target.value)}
                    placeholder="Service name..."
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeServiceListItem(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {serviceList.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No items configured. Click &quot;Add Item&quot; to create one.
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
