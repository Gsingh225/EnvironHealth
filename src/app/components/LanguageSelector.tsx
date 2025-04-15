'use client';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
    { code: 'de', name: 'Deutsch' },
];

export function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { language, setLanguage } = useLanguage();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const changeLanguage = (languageCode: string) => {
        setLanguage(languageCode as 'en' | 'es' | 'fr' | 'zh' | 'de');
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Select language"
            >
                <img src="/globe.png" alt="Language" className="w-6 h-6" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                    language === lang.code ? 'bg-gray-100 font-medium' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                onClick={() => changeLanguage(lang.code)}
                            >
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
