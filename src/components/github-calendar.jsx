"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function GitHubCalendar({ username = "Lam-Thai" }) {
  useEffect(() => {
    // Initialize the calendar when the script loads
    if (typeof window !== "undefined" && window.GitHubCalendar) {
      window.GitHubCalendar(".calendar", username, {
        responsive: true,
        tooltips: true,
      });
    }
  }, [username]);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold">GitHub Activity</h3>
        <p className="text-sm text-muted-foreground">
          My contribution calendar for the past year
        </p>
      </CardHeader>
      <CardContent>
        <div className="calendar">
          {/* GitHub calendar will be rendered here */}
        </div>
        <div className="mt-4 text-center">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            View GitHub Profile →
          </a>
        </div>

        <Script
          src="https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js"
          strategy="lazyOnload"
          onLoad={() => {
            if (window.GitHubCalendar) {
              window.GitHubCalendar(".calendar", username, {
                responsive: true,
                tooltips: true,
              });
            }
          }}
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css"
        />
      </CardContent>
    </Card>
  );
}
