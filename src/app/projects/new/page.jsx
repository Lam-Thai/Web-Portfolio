"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const newProjectSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(200),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  img: z.string().url({ message: "Must be a valid URL" }),
  link: z.string().url({ message: "Must be a valid URL" }),
  keywords: z.array(z.string()).default([]),
});

export default function NewProjectPage() {
  const router = useRouter();
  const [draftKeyword, setDraftKeyword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      img: "https://placehold.co/300x300.png",
      link: "",
      keywords: [],
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("img", values.img);
      formData.append("link", values.link);
      formData.append("keywords", JSON.stringify(values.keywords));

      const response = await fetch("/api/projects/new", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();
      console.log("Project created:", data);

      alert("Project created successfully!");
      router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground">
            Add a new project to your portfolio
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Project" {...field} />
                    </FormControl>
                    <FormDescription>The title of your project</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="A brief description of your project"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe what your project does
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.png"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL to your project thumbnail image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/project"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Link to your project (GitHub, live demo, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => {
                  const currentKeywords = field.value ?? [];

                  const handleAddKeyword = () => {
                    const value = draftKeyword.trim();
                    if (!value || currentKeywords.includes(value)) return;

                    const updated = [...currentKeywords, value];
                    field.onChange(updated);
                    setDraftKeyword("");
                  };

                  const handleRemoveKeyword = (keyword) => {
                    const updated = currentKeywords.filter(
                      (k) => k !== keyword
                    );
                    field.onChange(updated);
                  };

                  const handleKeyDown = (event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddKeyword();
                    }
                  };

                  return (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            value={draftKeyword}
                            onChange={(e) => setDraftKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add a keyword and press Enter"
                          />
                          <Button
                            type="button"
                            onClick={handleAddKeyword}
                            variant="secondary"
                          >
                            Add
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Tag your project for easier filtering
                      </FormDescription>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentKeywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {keyword}
                            <button
                              type="button"
                              className="ml-1 text-xs hover:text-destructive"
                              onClick={() => handleRemoveKeyword(keyword)}
                              aria-label={`Remove ${keyword}`}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Project"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/projects")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
