import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const meta: Metadata = {
    title: "Design your dream resume",
    
};

export default function Page() {
    return <ResumeEditor />;
}