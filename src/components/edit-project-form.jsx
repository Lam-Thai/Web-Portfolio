"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
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

const editProjectSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(10),
  image: z.string().url(),
  link: z.string().url(),
  keywords: z.array(z.string()).default([]),
});

export default function EditProjectForm({ project, uuid }) {
  const router = useRouter();
  const [draftKeyword, setDraftKeyword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link,
      keywords: project.keywords || [],
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Updating project...");

    try {
      const response = await fetch(`/api/projects/${uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      toast.success("Project updated successfully!", {
        id: loadingToast,
      });

      router.push(`/projects/${uuid}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project", {
        id: loadingToast,
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting project...");

    try {
      const response = await fetch(`/api/projects/${uuid}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      toast.success("Project deleted successfully!", {
        id: loadingToast,
      });

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project", {
        id: loadingToast,
        description: error.message,
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
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
                <textarea
                  placeholder="A brief description of your project"
                  className="w-full min-h-[150px] px-3 py-2 text-sm rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  {...field}
                />
              </FormControl>
              <FormDescription>Describe what your project does</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.png" {...field} />
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
              const updated = currentKeywords.filter((k) => k !== keyword);
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
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/projects/${uuid}`)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
