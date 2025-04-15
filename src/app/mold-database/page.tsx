'use client';

import { useState } from "react";
import { flowchart, ResultNode } from "../data/flowchart";
import { useLanguage } from "../components/LanguageContext";

/** Type guard to confirm a node is a ResultNode */
function isResultNode(node: unknown): node is ResultNode {
    return (
        typeof node === "object" &&
        node !== null &&
        "type" in node &&
        (node as any).type === "result"
    );
}

export default function MoldDatabasePage() {
    const { language, translations } = useLanguage();

    // 1) Gather all result nodes
    const allMoldResults = Object.values(flowchart).filter(isResultNode);

    // 2) State for search
    const [searchTerm, setSearchTerm] = useState("");
    // 3) State for expanded mold
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // 4) Filtered results
    const filteredMoldResults = allMoldResults.filter((node) => {
        const titleMatch = node.title.toLowerCase().includes(searchTerm.toLowerCase());
        const textMatch = translations[language][node.text]?.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || textMatch;
    });

    // 5) Toggle expand
    const handleToggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="min-h-screen py-8 px-4 bg-gray-50 text-gray-900 flex flex-col items-center">
            {/* Logo, similar to main page */}
            <img
                src="/logo.png"
                alt="Website Logo"
                className="w-20 h-20 object-contain mb-4"
            />

            <h1 className="text-2xl md:text-3xl font-bold mb-6">Mold Database</h1>

            {/* Search Bar */}
            <div className="mb-6 w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search mold types..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100 text-sm"
                />
            </div>

            {/* Mold listing */}
            <div className="w-full max-w-2xl space-y-4">
                {filteredMoldResults.map((node) => {
                    const imageSrc = node.image ? `/${node.image.replace(/\.jpeg$/, ".jpg")}` : "/default.jpg";
                    const isExpanded = node.id === expandedId;

                    return (
                        <div key={node.id} className="border rounded-md p-4 bg-white shadow-sm">
                            <button
                                onClick={() => handleToggleExpand(node.id)}
                                className="flex items-center justify-between w-full"
                            >
                                <h2 className="text-lg font-semibold text-left text-blue-700">
                                    {node.title}
                                </h2>
                                <span className="text-sm text-gray-500 ml-2">
                  {isExpanded ? "—" : "+"}
                </span>
                            </button>

                            {/* Expanded content */}
                            {isExpanded && (
                                <div className="mt-3 text-gray-800 text-sm">
                                    <img
                                        src={imageSrc}
                                        alt={`${node.title} mold`}
                                        className="max-h-40 object-contain mb-2 rounded"
                                    />
                                    <p className="leading-relaxed">
                                        {translations[language][node.text]}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}

                {filteredMoldResults.length === 0 && (
                    <p className="text-gray-500">No mold types match your search.</p>
                )}
            </div>
        </div>
    );
}
