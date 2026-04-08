"use client"

import { ExternalLink, MapPin, CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ResearchHighlight = () => {
  return (
    <main className="h-full overflow-y-auto bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-gray-800 border-gray-700 text-gray-300 shadow-xl">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
              Research Highlight
            </p>
            <CardTitle className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              ACM SIGMETRICS 2026 Poster Presentation
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              My project, <span className="text-white font-semibold">K-Sentry</span>,
              was invited for presentation in the student poster session at ACM
              SIGMETRICS 2026.
            </p>

            <div className="grid gap-3 text-sm sm:text-base">
              <div className="flex items-center gap-3 text-gray-400">
                <CalendarDays className="w-4 h-4 text-cyan-400" />
                <span>June 8–12, 2026</span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>University of Michigan, Ann Arbor</span>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-900/70 border border-gray-700 p-4">
              <h3 className="text-white font-semibold mb-2">
                K-Sentry: A Verified Order-Sensitive Telemetry Accumulator
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                A formally verified streaming system for detecting order-sensitive
                changes in telemetry data, built with Rust and Verus.
              </p>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
            >
              <span>View Research</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ResearchHighlight
