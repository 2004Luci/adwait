"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "../../components/AdminSidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
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

interface HeroStat {
  number: number;
  suffix: string;
  label: string;
}

interface HeroSettingsClientProps {
  user: AdminUser;
  initialStats: HeroStat[];
  initialPhrases: string[];
  defaultStats: HeroStat[];
  defaultPhrases: string[];
}

export function HeroSettingsClient({
  user,
  initialStats,
  initialPhrases,
  defaultStats,
  defaultPhrases,
}: HeroSettingsClientProps) {
  const router = useRouter();
  const [stats, setStats] = useState<HeroStat[]>(initialStats);
  const [phrases, setPhrases] = useState<string[]>(initialPhrases);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Stats handlers
  const updateStat = (index: number, field: keyof HeroStat, value: string | number) => {
    const newStats = [...stats];
    if (field === "number") {
      newStats[index] = { ...newStats[index], [field]: Number(value) || 0 };
    } else {
      newStats[index] = { ...newStats[index], [field]: value };
    }
    setStats(newStats);
  };

  const addStat = () => {
    setStats([...stats, { number: 0, suffix: "", label: "New Stat" }]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  // Phrases handlers
  const updatePhrase = (index: number, value: string) => {
    const newPhrases = [...phrases];
    newPhrases[index] = value;
    setPhrases(newPhrases);
  };

  const addPhrase = () => {
    setPhrases([...phrases, "New Phrase"]);
  };

  const removePhrase = (index: number) => {
    setPhrases(phrases.filter((_, i) => i !== index));
  };

  // Reset to defaults
  const resetStats = () => {
    setStats([...defaultStats]);
  };

  const resetPhrases = () => {
    setPhrases([...defaultPhrases]);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Save stats
      const statsResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.HERO_STATS,
          value: stats,
          category: "hero",
          description: "Hero section statistics displayed on the homepage",
        }),
      });

      if (!statsResponse.ok) {
        throw new Error("Failed to save stats");
      }

      // Save phrases
      const phrasesResponse = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: SETTING_KEYS.HERO_TYPEWRITER_PHRASES,
          value: phrases,
          category: "hero",
          description: "Typewriter animation phrases in the hero section",
        }),
      });

      if (!phrasesResponse.ok) {
        throw new Error("Failed to save phrases");
      }

      setSuccess(true);
      router.refresh();

      // Clear success message after 3 seconds
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
                  Hero Section Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Edit hero stats and typewriter phrases
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

          {/* Hero Stats */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hero Stats</CardTitle>
                  <CardDescription>
                    Statistics displayed in the hero section (e.g., &quot;23+ Years of Experience&quot;)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetStats}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addStat}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Stat
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                >
                  <div className="text-slate-400">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs">Number</Label>
                      <Input
                        type="number"
                        value={stat.number}
                        onChange={(e) => updateStat(index, "number", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Suffix</Label>
                      <Input
                        value={stat.suffix}
                        onChange={(e) => updateStat(index, "suffix", e.target.value)}
                        placeholder="e.g., +, %, etc."
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(index, "label", e.target.value)}
                        placeholder="e.g., Years of Experience"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStat(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {stats.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No stats configured. Click &quot;Add Stat&quot; to create one.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Typewriter Phrases */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Typewriter Phrases</CardTitle>
                  <CardDescription>
                    Phrases that animate in the hero section (e.g., &quot;IPO & SME IPO Advisory&quot;)
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetPhrases}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={addPhrase}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Phrase
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {phrases.map((phrase, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-slate-400">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <span className="text-sm text-slate-500 w-6">{index + 1}.</span>
                  <Input
                    value={phrase}
                    onChange={(e) => updatePhrase(index, e.target.value)}
                    placeholder="Enter phrase..."
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePhrase(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {phrases.length === 0 && (
                <p className="text-center text-slate-500 py-4">
                  No phrases configured. Click &quot;Add Phrase&quot; to create one.
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
