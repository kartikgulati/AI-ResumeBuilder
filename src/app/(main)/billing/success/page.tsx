import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Page() {
    return <main className="max-w-7xl mx-auto space-y-6 px-3 py-6 text-center">
        <h1 className="text-3xl font-bold"> Billing successful</h1>
        <p>
            Successfully subscribed to the pro account, you can start creating resumes.
        </p>
        <Button
        asChild
        className=""
        >
        <Link href="/resumes">Go to Resumes</Link>
        </Button>
    </main>;
}