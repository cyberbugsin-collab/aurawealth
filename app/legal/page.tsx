import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function GenericPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 mb-6">
            Legal & Compliance
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            This is a placeholder for our legal documents, including our Terms of Service, Privacy Policy, and Cookie Policy.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
