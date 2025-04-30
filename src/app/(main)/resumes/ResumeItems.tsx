"use client"

import ResumePreview from "@/components/ResumePreview";
import { ResumeServerData } from "@/lib/types"
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import Link from "next/link";
import { format } from "path";

interface ResumeItemsProps {
    resume: ResumeServerData
}

export default function ResumeItems({resume}: ResumeItemsProps) {
    const wasUpdated = resume.updatedAt !== resume.createdAt;
    return <div className=" group border rounded-lg border-transparent hover:border-border transition-colors bg-secondary p-3">
        <div className="space-y-3">
            <Link href={`/editor?resumeId=${resume.id}`} className="inline-block w-full text center">
            <p className="font-semibold line-clamp-1">
                {resume.title || "Untitled Resume"}
                </p> 
                {resume.description && (
                    <p className="line-clamp-2 text-sm">
                        {resume.description}
                    </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                    {wasUpdated ? "Updated" : "Created"} on{" "}
                    {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
                    </p>
            </Link>
            <Link 
            className="relative inline-block w-full"
            href={`/editor?resumeId=${resume.id}`}>
                <ResumePreview 
                resumeData={mapToResumeValues(resume)}
                className="overflow-hiddenshadow-sm transition-shadow group-hover: shadow-lg" />
            </Link>
        </div>
    </div>
} 