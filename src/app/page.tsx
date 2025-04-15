'use client';
import { Quiz } from "./components/Quiz";
import { useLanguage } from "./components/LanguageContext";

export default function Page() {
    const { language, translations } = useLanguage();

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-start py-10 px-4 bg-gray-50 text-gray-900 overflow-hidden">
            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center">
                <img
                    src="/logo.png"
                    alt="Website Logo"
                    className="w-24 h-24 object-contain mb-3"
                />
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {translations[language].title}
                </h1>
                <p className="max-w-2xl mb-8 text-center text-sm bg-yellow-100 p-3 rounded border border-yellow-300">
                    {translations[language].disclaimer}
                </p>

                {/* Quiz */}
                <Quiz />
            </div>
        </main>
    );
}
