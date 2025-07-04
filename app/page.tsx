import UploadSection from '@/components/UploadSection';

export default function Home() {
  return (
     <main className="min-h-screen p-8 flex flex-col items-center bg-gray-100 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        AI Call Feedback Form
      </h1>
      <UploadSection />
    </main>
  );
}