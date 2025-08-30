import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import CreateResumeButton from "./CreateResumeButton";
import ResumeItems from "./ResumeItems";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canCreateResume } from "@/lib/permissions";

export const metadata: Metadata = {
  title: "Your Resumes",
};
export default async function Page() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const [resumes, totalCount, subscriptionLevel] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
    getUserSubscriptionLevel(userId)
  ]);

  return (
    <main className="max-w-7xl mx-auto w-full px-5 py-6 space-y-6">
      <CreateResumeButton canCreate={canCreateResume(subscriptionLevel, totalCount)} />
      <div className="space-y-1">
        <div className="text-3xl font-bold">
          <h1 className="text-3xl font-bold"> Your Resumes</h1>
          <p className="text-sm text-muted-foreground">
            {`You've ${totalCount} Resumes`}
          </p>
        </div>
        <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
          {resumes.map((resume) => (
            <ResumeItems key={resume.id} resume={resume} />
          ))}
        </div>
      </div>
    </main>
  );
}
