import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - AI Resume Builder",
  description: "Terms of Service for AI Resume Builder",
};

export default function TermsOfService() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using AI Resume Builder, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Use License</h2>
          <p className="text-muted-foreground">
            Permission is granted to temporarily download one copy of AI Resume Builder for personal,
            non-commercial transitory viewing only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Disclaimer</h2>
          <p className="text-muted-foreground">
            The materials on AI Resume Builder are provided on an &apos;as is&apos; basis. AI Resume Builder
            makes no warranties, expressed or implied, and hereby disclaims and negates all other
            warranties including, without limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of intellectual property or other
            violation of rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Limitations</h2>
          <p className="text-muted-foreground">
            In no event shall AI Resume Builder or its suppliers be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to business interruption)
            arising out of the use or inability to use the materials on AI Resume Builder.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Privacy</h2>
          <p className="text-muted-foreground">
            Your use of AI Resume Builder is subject to our Privacy Policy. Please review our Privacy
            Policy, which also governs the Site and informs users of our data collection practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Governing Law</h2>
          <p className="text-muted-foreground">
            These terms and conditions are governed by and construed in accordance with the laws and
            you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        <p>Last updated: May 1, 2024</p>
        <p>If you have any questions about these Terms of Service, please contact us.</p>
      </div>
    </main>
  );
}