import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
    <main className="flex justify-center h-screen p-3 items-center">
        <SignUp/>
    </main>
    );
}