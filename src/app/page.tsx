"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validaton";
import { Sparkles, FileText, Zap, ChevronRight } from "lucide-react";

// Dummy resume data to attract users
const sampleResumeData: ResumeValues = {
  firstName: "Jane",
  lastName: "Doe",
  jobTitle: "Senior Product Designer",
  city: "San Francisco",
  country: "US",
  email: "hello@janedoe.design",
  phone: "+1 (555) 123-4567",
  summary: "Award-winning Product Designer with 7+ years of experience specializing in UI/UX for SaaS platforms and consumer applications. Proven track record of increasing user engagement by 40% through intuitive design systems. Passionate about creating seamless user experiences that drive business growth.",
  colorHex: "#22c55e", // Green-500
  borderStyle: "10%",
  workExperiences: [
    {
      position: "Lead UI/UX Designer",
      company: "InnovateTech",
      startDate: "2020-05-01",
      endDate: "",
      description: "• Directed the comprehensive redesign of the core SaaS platform, increasing user retention by 35%.\n• Managed and expanded the design system, ensuring consistency across 4 web and mobile products.\n• Mentored a team of 4 junior designers and established UX research protocols."
    },
    {
      position: "Product Designer",
      company: "Creative Solutions Agency",
      startDate: "2017-08-01",
      endDate: "2020-04-30",
      description: "• Prototyped and delivered 20+ responsive web applications for Fortune 500 clients.\n• Conducted A/B testing that led to a 25% increase in conversion rates for e-commerce clients.\n• Collaborated closely with frontend developers to ensure pixel-perfect implementation."
    }
  ],
  educations: [
    {
      degree: "Bachelor of Fine Arts in Interaction Design",
      school: "Rhode Island School of Design",
      startDate: "2013-09-01",
      endDate: "2017-05-31",
    }
  ],
  skills: [
    "Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "User Research", "HTML/CSS", "React.js"
  ]
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden relative selection:bg-green-500/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black -z-10" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-green-600/10 blur-[120px] rounded-full point-events-none -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full point-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-8 pt-4 pb-24 lg:pt-8 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 max-w-2xl z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-gray-300 transform transition hover:scale-105 duration-300 cursor-default">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span>AI-Powered Resume Builder</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Craft Your Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                Resume in Minutes
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              Stand out from the crowd with professional, ATS-friendly resumes generated instantly by AI. Save hours of formatting and let your skills shine.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white text-black hover:bg-gray-200 transition-colors rounded-full font-semibold group">
                <Link href="/resumes">
                  Build Your Resume <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Feature points */}
            <div className="grid grid-cols-2 gap-6 pt-5 border-t border-white/10 mt-8">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-white font-medium text-lg">Lightning Fast</h3>
                <p className="text-sm text-gray-400">Generate tailored content with AI instantly.</p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-medium text-lg">ATS-Optimized</h3>
                <p className="text-sm text-gray-400">Formats designed to pass screening systems.</p>
              </div>
            </div>
          </div>

          {/* Right Content - Resume Preview */}
          <div className="relative z-10 lg:ml-auto w-full max-w-[600px] flex justify-center perspective-[1000px]">
            {/* Glow effect behind resume */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 blur-3xl rounded-full transform -rotate-6 scale-105" />
            
            {/* The Resume Preview Wrapper */}
            <div className="relative w-full max-w-[420px] aspect-[210/297] rounded-xl overflow-hidden shadow-2xl shadow-green-900/50 border border-white/20 bg-white transform transition-all hover:scale-[1.02] hover:-rotate-1 hover:shadow-green-800/60 duration-500 group">
              <ResumePreview 
                resumeData={sampleResumeData} 
                className="w-full h-full object-cover origin-top pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
              
              {/* Glassmorphism Overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-between shadow-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse" />
                  <span className="text-sm font-medium text-white">Live AI Preview</span>
                </div>
                <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-full border border-white/5">0 ms</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}