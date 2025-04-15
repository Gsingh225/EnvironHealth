'use client';

import { useState } from 'react';
import { FlowNode, flowchart, QuestionNode, ResultNode } from '@/app/data/flowchart';
import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageContext';

export function Quiz() {
    const [currentNodeId, setCurrentNodeId] = useState<string>('start');
    const router = useRouter();
    const { language, translations } = useLanguage();

    const logVisit = async (nodeId: string) => {
        try {
            await fetch('/api/log-visit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodeId }),
            });
        } catch (error) {
            console.error('Failed to log visit:', error);
        }
    };

    const handleAnswer = (nextNodeId: string) => {
        logVisit(nextNodeId);

        if (nextNodeId === 'NAVIGATE_TO_DB') {
            router.push('/mold-database');
            return;
        }

        if (nextNodeId in flowchart) {
            setCurrentNodeId(nextNodeId);
        } else {
            console.error(`Error: Node ID "${nextNodeId}" not found in flowchart.`);
            setCurrentNodeId('unknown_consult');
        }
    };

    const handleRestart = () => {
        setCurrentNodeId('start');
    };

    const currentNode: FlowNode | undefined = flowchart[currentNodeId];

    if (!currentNode) {
        return (
            <div className="max-w-xl w-full bg-white border border-gray-300 rounded-lg p-6 shadow-xl">
                <p className="mb-4 text-red-600">{translations[language].errorLoading}</p>
                <button
                    onClick={handleRestart}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                    {translations[language].restartQuiz}
                </button>
            </div>
        );
    }

    const imageSrc = currentNode.image ? `/${currentNode.image}` : null;

    return (
        <div className="max-w-xl w-full bg-white border border-gray-300 rounded-lg p-6 shadow-xl">
            {imageSrc && (
                <div className="flex justify-center mb-4">
                    <img
                        src={imageSrc}
                        alt={`${currentNode.title || currentNode.text}`}
                        className="max-h-48 object-contain rounded"
                    />
                </div>
            )}

            {currentNode.type === 'question' && (
                <>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900">
                        {translations[language][currentNode.text] || currentNode.text}
                    </h2>
                    <div className="flex flex-col gap-3 mb-4">
                        {(currentNode as QuestionNode).options.map((option) => (
                            <button
                                key={option.next}
                                onClick={() => handleAnswer(option.next)}
                                className="w-full px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 transition rounded-3xl text-sm md:text-base"
                            >
                                {translations[language][option.text] || option.text}
                            </button>
                        ))}
                    </div>

                    {currentNode.id !== 'start' && (
                        <button
                            onClick={handleRestart}
                            className="mt-2 px-3 py-1 rounded border border-gray-400 text-gray-600 hover:bg-gray-100 text-sm transition self-start"
                        >
                            {translations[language].restartQuiz}
                        </button>
                    )}
                </>
            )}

            {currentNode.type === 'result' && (
                <div className="flex flex-col gap-4 items-center">
                    <h2 className="text-2xl font-bold text-green-700 md:text-3xl text-center">
                        {currentNode.title}
                    </h2>
                    <p className="text-center text-gray-800 text-sm md:text-base">
                        {translations[language][currentNode.text] || currentNode.text}
                    </p>
                    <button
                        onClick={handleRestart}
                        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition text-sm md:text-base"
                    >
                        {translations[language].startOver}
                    </button>
                </div>
            )}
        </div>
    );
}
