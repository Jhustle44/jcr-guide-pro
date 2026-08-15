import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, X, Save, Eye } from "lucide-react";
import { useLocation } from "wouter";

const createGuideSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  deviceType: z.enum(["laptop", "desktop"]),
  category: z.enum(["hardware", "software", "cleaning", "upgrades"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  estimatedTime: z.string().min(5, "Please provide estimated time"),
  imageUrl: z.string().url("Please provide a valid image URL"),
});

const stepSchema = z.object({
  stepNumber: z.number(),
  title: z.string().min(5, "Step title required"),
  description: z.string().min(10, "Step description required"),
  notes: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
});

type CreateGuideForm = z.infer<typeof createGuideSchema>;
type RepairStep = z.infer<typeof stepSchema>;

export default function CreateGuide() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [steps, setSteps] = useState<RepairStep[]>([]);
  const [toolsRequired, setToolsRequired] = useState<string[]>([]);
  const [safetyWarnings, setSafetyWarnings] = useState<string[]>([]);
  const [alternativeSolutions, setAlternativeSolutions] = useState("");
  const [currentTool, setCurrentTool] = useState("");
  const [currentSafety, setCurrentSafety] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const form = useForm<CreateGuideForm>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: {
      deviceType: "laptop",
      category: "hardware",
      difficulty: "easy",
    },
  });

  const createGuideMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/user-guides", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your repair guide has been created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/repair-guides"] });
      setLocation("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create repair guide. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addStep = () => {
    const newStep: RepairStep = {
      stepNumber: steps.length + 1,
      title: "",
      description: "",
      notes: [],
      warnings: [],
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (index: number, field: keyof RepairStep, value: any) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const removeStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    // Renumber remaining steps
    const renumberedSteps = updatedSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1,
    }));
    setSteps(renumberedSteps);
  };

  const addTool = () => {
    if (currentTool.trim() && !toolsRequired.includes(currentTool.trim())) {
      setToolsRequired([...toolsRequired, currentTool.trim()]);
      setCurrentTool("");
    }
  };

  const addSafetyWarning = () => {
    if (currentSafety.trim() && !safetyWarnings.includes(currentSafety.trim())) {
      setSafetyWarnings([...safetyWarnings, currentSafety.trim()]);
      setCurrentSafety("");
    }
  };

  const onSubmit = (data: CreateGuideForm) => {
    if (steps.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one step to your guide.",
        variant: "destructive",
      });
      return;
    }

    if (toolsRequired.length === 0) {
      toast({
        title: "Error", 
        description: "Please add at least one required tool.",
        variant: "destructive",
      });
      return;
    }

    const guideData = {
      ...data,
      steps,
      toolsRequired,
      safetyWarnings,
      alternativeSolutions: alternativeSolutions || "No alternative solutions provided",
    };

    createGuideMutation.mutate(guideData);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  if (previewMode) {
    const formData = form.getValues();
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Guide Preview</h1>
            <Button onClick={() => setPreviewMode(false)} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Back to Edit
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{formData.title}</CardTitle>
                  <CardDescription className="mt-2">{formData.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(formData.difficulty)}>
                    {formData.difficulty}
                  </Badge>
                  <Badge variant="secondary">{formData.category}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>📱 {formData.deviceType}</span>
                <span>⏱️ {formData.estimatedTime}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Guide preview" className="w-full h-64 object-cover rounded-lg" />
              )}

              <div>
                <h3 className="font-semibold mb-2">Tools Required</h3>
                <div className="flex flex-wrap gap-2">
                  {toolsRequired.map((tool, index) => (
                    <Badge key={index} variant="outline">{tool}</Badge>
                  ))}
                </div>
              </div>

              {safetyWarnings.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-red-600">Safety Warnings</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {safetyWarnings.map((warning, index) => (
                      <li key={index} className="text-sm text-red-600">{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-4">Repair Steps</h3>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Step {step.stepNumber}: {step.title}</h4>
                        <p className="text-sm mb-2">{step.description}</p>
                        {step.notes && step.notes.length > 0 && (
                          <div className="text-xs text-blue-600">
                            <strong>Notes:</strong> {step.notes.join(", ")}
                          </div>
                        )}
                        {step.warnings && step.warnings.length > 0 && (
                          <div className="text-xs text-red-600">
                            <strong>Warnings:</strong> {step.warnings.join(", ")}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {alternativeSolutions && (
                <div>
                  <h3 className="font-semibold mb-2">Alternative Solutions</h3>
                  <p className="text-sm">{alternativeSolutions}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Create Repair Guide</h1>
            <p className="text-muted-foreground">Share your repair knowledge with the community</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setPreviewMode(true)} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Guide Title</Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="e.g., How to Replace a Laptop Screen"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-600">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Detailed description of what this guide covers..."
                  rows={3}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Device Type</Label>
                  <Select onValueChange={(value) => form.setValue("deviceType", value as "laptop" | "desktop")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select device" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Category</Label>
                  <Select onValueChange={(value) => form.setValue("category", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="upgrades">Upgrades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Difficulty</Label>
                  <Select onValueChange={(value) => form.setValue("difficulty", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="estimatedTime">Time Required</Label>
                  <Input
                    id="estimatedTime"
                    {...form.register("estimatedTime")}
                    placeholder="e.g., 30-45 min"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="imageUrl">Guide Image URL</Label>
                <Input
                  id="imageUrl"
                  {...form.register("imageUrl")}
                  placeholder="https://example.com/image.jpg"
                />
                {form.formState.errors.imageUrl && (
                  <p className="text-sm text-red-600">{form.formState.errors.imageUrl.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tools & Safety</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Required Tools</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTool}
                    onChange={(e) => setCurrentTool(e.target.value)}
                    placeholder="Add a required tool..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTool())}
                  />
                  <Button type="button" onClick={addTool}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {toolsRequired.map((tool, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer" onClick={() => setToolsRequired(toolsRequired.filter((_, i) => i !== index))}>
                      {tool} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Safety Warnings</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentSafety}
                    onChange={(e) => setCurrentSafety(e.target.value)}
                    placeholder="Add a safety warning..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSafetyWarning())}
                  />
                  <Button type="button" onClick={addSafetyWarning}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {safetyWarnings.map((warning, index) => (
                    <Badge key={index} variant="destructive" className="cursor-pointer" onClick={() => setSafetyWarnings(safetyWarnings.filter((_, i) => i !== index))}>
                      {warning} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Repair Steps</CardTitle>
                <Button type="button" onClick={addStep}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Step {step.stepNumber}</h4>
                        <Button type="button" variant="destructive" size="sm" onClick={() => removeStep(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Input
                          placeholder="Step title..."
                          value={step.title}
                          onChange={(e) => updateStep(index, "title", e.target.value)}
                        />
                        <Textarea
                          placeholder="Step description..."
                          value={step.description}
                          onChange={(e) => updateStep(index, "description", e.target.value)}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {steps.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No steps added yet. Click "Add Step" to get started.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="alternatives">Alternative Solutions (Optional)</Label>
                <Textarea
                  id="alternatives"
                  value={alternativeSolutions}
                  onChange={(e) => setAlternativeSolutions(e.target.value)}
                  placeholder="Any alternative approaches or solutions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setLocation("/")}>
              Cancel
            </Button>
            <Button type="submit" disabled={createGuideMutation.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {createGuideMutation.isPending ? "Creating..." : "Create Guide"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}