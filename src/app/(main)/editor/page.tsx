// import { Metadata } from "next";
// import ResumeEditor from "./ResumeEditor";
// import prisma from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { resumeDataInclude } from "@/lib/types";

// // interface PageProps {
// //   searchParams?: { resumeId?: string };
// // }

// export const metadata: Metadata = {
//   title: "Design your dream resume",
// };

// export default async function Page({ searchParams }: { searchParams?: { resumeId?: string } }) {
//   const { resumeId } = searchParams || {};

//   const { userId } = await auth();

//   if (!userId) {
//     return null;
//   }

//   const resumeToEdit = resumeId
//     ? await prisma.resume.findUnique({
//         where: { id: resumeId, userId },
//         include: resumeDataInclude,
//       })
//     : null;

//   return <ResumeEditor resumeToEdit={resumeToEdit} />;
// }

import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";

export const metadata: Metadata = {
  title: "Design your dream resume",
};

interface PageProps {
  searchParams?: {
    resumeId?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const resumeId = searchParams?.resumeId;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
}