import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";

import { ResumeValues } from "@/lib/validaton";
import React, { useEffect, useState } from "react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const { Width: width } = useDimension(containerRef)
  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297] ",
        className
      )}
      ref={containerRef}
    >
        <div
        className= {cn("space-y-6 p-6",!width && "invisible")}
        style={{
            zoom: (1/794)*width,
            
        }}>
            <PersonalInfoHeader resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;}

  function PersonalInfoHeader({resumeData}: ResumePreviewSectionProps) {
    const {photo, firstName, lastName, email, phone, city, country, jobTitle}= resumeData;

    const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

    useEffect(() => {
        const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
        if (objectUrl) setPhotoSrc(objectUrl);
        if (photo === null) setPhotoSrc("");
        return () => URL.revokeObjectURL(objectUrl);
      }, [photo]);

      return <div className="flex items-center">
        {
            photoSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                src={photoSrc}
                alt="Profile"
                width={100}
                height={100}
                className="aspect-square rounded-full"
                />
            )
        }

        <div className="space-y-2.5">
            <div className="space-y-1">
                <p className="text-2xl font-bold">
                    {firstName} {lastName}
                </p>
                <p className="font-medium">{jobTitle}</p>
            </div>
            <p className="text-xs text-grey-500">
                {city && country ? `${city}, ` : ""} {country}</p>
        </div>
      </div>
}