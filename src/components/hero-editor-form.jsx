"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
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
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const heroSchema = z.object({
  avatar: z.string().min(1, "Avatar is required"),
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must be less than 200 characters"),
  shortDescription: z
    .string()
    .min(2, "Short description must be at least 2 characters")
    .max(120, "Short description must be 120 characters or less"),
  longDescription: z
    .string()
    .min(10, "Long description must be at least 10 characters")
    .max(5000, "Long description must be less than 5000 characters"),
});

export default function HeroEditorForm() {
  const [avatarFile, setAvatarFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      avatar: "",
      fullName: "",
      shortDescription: "",
      longDescription: "",
    },
  });

  useEffect(() => {
    async function loadHero() {
      try {
        const response = await fetch("/api/hero");
        if (!response.ok) throw new Error("Failed to load hero data");
        const { data } = await response.json();

        form.reset({
          avatar: data.avatar || "",
          fullName: data.fullName || "",
          shortDescription: data.shortDescription || "",
          longDescription: data.longDescription || "",
        });
      } catch (error) {
        console.error("Error loading hero:", error);
        toast.error("Failed to load hero data");
      } finally {
        setIsLoading(false);
      }
    }
    loadHero();
  }, [form]);

  async function onSubmit(values) {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Updating hero section...");

    try {
      const formData = new FormData();
      formData.append("avatar", values.avatar);
      formData.append("fullName", values.fullName);
      formData.append("shortDescription", values.shortDescription);
      formData.append("longDescription", values.longDescription);

      if (avatarFile) {
        formData.append("avatarFile", avatarFile);
      }

      const response = await fetch("/api/hero", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update hero");
      }

      form.reset({
        avatar: result.data.avatar,
        fullName: result.data.fullName,
        shortDescription: result.data.shortDescription,
        longDescription: result.data.longDescription,
      });

      setAvatarFile(null);

      toast.success("Hero section updated successfully!", {
        id: loadingToast,
      });
    } catch (error) {
      console.error("Error updating hero:", error);
      toast.error("Failed to update hero section", {
        id: loadingToast,
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 1024 * 1024) {
        toast.error("Image must be less than 1MB");
        return;
      }
      setAvatarFile(file);

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        form.setValue("avatar", e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading hero data...</div>;
  }

  const avatarPreview = form.watch("avatar");

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Edit Hero Section</h2>
        <p className="text-muted-foreground">
          Update your homepage hero content
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {avatarPreview && (
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border">
                          <Image
                            src={avatarPreview}
                            alt="Avatar preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a profile picture (max 1MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormDescription>Your display name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full-Stack Developer | React & Next.js"
                      {...field}
                      maxLength={120}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief tagline (max 120 characters) -{" "}
                    {field.value?.length || 0}/120
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Tell visitors about yourself and your skills..."
                      className="w-full min-h-[150px] px-3 py-2 text-sm rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A detailed description of your background and expertise
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
