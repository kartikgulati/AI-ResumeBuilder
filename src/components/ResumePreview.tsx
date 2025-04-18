import useDimension from "@/hooks/useDimension";
import { cn } from "@/lib/utils";

import { ResumeValues } from "@/lib/validaton";
import { Space_Mono } from "next/font/google";
import { format } from "path";
import React, { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import exp from "constants";
import { Badge } from "@/components/ui/badge";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";

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
          <pre>{JSON.stringify(resumeData, null, 2)}</pre>
            <PersonalInfoHeader resumeData={resumeData} />
            <SummarySection resumeData={resumeData} />
            <WorkExperienceSection resumeData={resumeData} />
            <EducationSection resumeData={resumeData} />
            <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;}

  function PersonalInfoHeader({resumeData}: ResumePreviewSectionProps) {
    const {photo, firstName, lastName, email, phone, city, country, jobTitle, colorHex, borderStyle}= resumeData;

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
                className="aspect-square object-cover p-2"
                style={{
                  borderRadius: 
                  borderStyle === BorderStyles.SQUARE 
                  ? "0px" 
                  : borderStyle === BorderStyles.CIRCLE
                  ? "9999px"
                  : "10%",
                }}
                />
            )
        }

        <div className="space-y-2.5">
            <div className="space-y-1">
                <p className="text-2xl font-bold" 
                style={{
                    color: colorHex
                   
                }}> 
                    {firstName} {lastName}
                </p>
                <p className="font-medium" style={{
                    color: colorHex
                   
                }}>{jobTitle}</p>
            </div>
            <p className="text-xs text-grey-500">
                {city && country ? `${city}, ` : " "} 
                {country}
                {(city || country) && (phone || email) ? " • " : " "}
                {[phone, email].filter(Boolean).join(" • ")}  
                </p>
                
        </div>
      </div>
}

function SummarySection({resumeData}: ResumePreviewSectionProps) {
    const {summary,colorHex} = resumeData;
     if (!summary) return null;

     return(
      <>
     <hr className="border-2" style={{
                    borderColor: colorHex
                   
                }}/>
     <div className="space-y-3 break-inside-avoid">
      <p className="text-lg font-semibold"
      style={{
        color: colorHex
       
    }}>Profesional profile</p>
      <div className="whitespace-pre-line text-sm">{summary}</div>

     </div>
     </>
      );
}

function WorkExperienceSection ({resumeData}: ResumePreviewSectionProps) {
  
  const {workExperiences,colorHex} = resumeData
  if (!workExperiences?.length) return null;
   

   return(
    <>
   <hr className="border-2"
   style={{
    borderColor: colorHex
   
}}/>
   <div className="space-y-3 break-inside-avoid">
    <p className="text-lg font-semibold"
    style={{
      color: colorHex
     
  }}>Work Experience</p>
    <div className="space-y-3">
      {workExperiences.map((experience, index) => (
        <div key={index} className="break-inside-avoid space-y-1">
          <div className="flex items-center justify-between text-sm font-semibold ">
            <span>{experience.position}</span>
            {experience.startDate && (
              <span>
                {formatDate(experience.startDate, "MMMM yyyy")} -{" "}
                {experience.endDate ? formatDate(experience.endDate, "MMMM yyyy") : "Present"}
              </span>
            )}

          </div>
          <p className="text-xs font-semibold">{experience.company}</p>
          <div className="whitespace-pre-line text-xs">
            {experience.description}  
          </div>
        </div>
      ))}
    </div>

   </div>
   </>
    );
}


function EducationSection({ resumeData }: ResumePreviewSectionProps) {
  const { educations, colorHex } = resumeData;
    const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  )
  if (!educationsNotEmpty?.length) return null;

  return(
    <>
   <hr className="border-2" style={{
                    borderColor: colorHex
                   
                }}/>
   <div className="space-y-3 break-inside-avoid">
    <p className="text-lg font-semibold" style={{
                    color: colorHex
                   
                }}>Education</p>
    <div className="space-y-3">
      {educations.map((edu, index) => (
        <div key={index} className="break-inside-avoid space-y-1">
          <div className="flex items-center justify-between text-sm font-semibold ">
            <span>{edu.degree}</span>
            {edu.startDate && (
              <span>
                {edu.startDate &&
                `${formatDate(edu.startDate, "MMMM yyyy")} ${edu.endDate ? ` - ${formatDate(edu.endDate, "MMMM yyyy")}` : ""}`}


                
              </span>
            )}

          </div>
          <p className="text-xs font-semibold">{edu.school}</p>
          
        </div>
      ))}
    </div>

   </div>
   </>
    );

}

function SkillsSection({ resumeData }: ResumePreviewSectionProps) {
  const { skills, colorHex, borderStyle } = resumeData;
  if (!skills?.length) return null;

  return (
    <>
    <hr className="border-2" style={{
                    borderColor: colorHex
                   
                }}/>
    <div className="space-y-3 break-inside-avoid">
      <p className="text-lg font-semibold" style={{
                    color: colorHex
                   
                }}>Skills</p>
      <div className="flex flex-wrap gap-2 break-inside-avoid">
        {skills.map((skill, index) => (
          <Badge key={index} className="bg-black text-white rounded-md" style={{
            backgroundColor: colorHex,
              borderRadius: 
              borderStyle === BorderStyles.SQUARE 
              ? "0px" 
              : borderStyle === BorderStyles.CIRCLE
              ? "9999px"
              : "8px",
           
        }}>
            {skill}
          </Badge>
          
        ))}
      </div>
    </div>
    </>
  )

}

// function WorkExperienceSection({ resumeData }: ResumePreviewSectionProps) {
//   const { workExperiences } = resumeData;

//   const workExperiencesNotEmpty = workExperiences?.filter(
//     (exp) => Object.values(exp).filter(Boolean).length > 0
//   )

//   if (!workExperiencesNotEmpty?.length) return null;

//   return (
//     <>
//       <hr className="border-2"/>
//       <div
//       />
//       <div className="space-y-3">
//         <p
//           className="text-lg font-semibold"
//         >
//           Work experience
//         </p>
//         {workExperiencesNotEmpty.map((exp, index) => (
//           <div key={index} className="break-inside-avoid space-y-1">
          
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }