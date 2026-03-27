import React, { useState } from "react";
import { saveAs } from "file-saver"
import Icon from "../assets/icon.svg"

const App: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleGenerateQRCode() {
        if (!text.trim() || loading) return

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, {
                method: "POST",
                body: JSON.stringify({ text: text }),
                headers: [["Content-Type", "application/json"]]
            });

            if (response.status === 429) {
                throw new Error("Calm down! You're generating code too fast.");

            }

            const blob = await response.blob();

            saveAs(blob, `qrcode-${Date.now()}`)
            console.log("Success: QR Code generated and downloaded.");

            setText("")

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
            setError(errorMessage);
            console.error("Fetch error:", errorMessage);
        } finally {
            setTimeout(() => setLoading(false), 2000)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex justify-center items-center p-6 font-sans">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center transition-all hover:shadow-2xl">
                {/* Header Section */}
                <header className="mb-8">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <img src={Icon} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                        Go Ghost QRCode
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Generate codes in milliseconds. Your data remains private and is never stored on our servers.
                    </p>
                </header>

                {/* Input Section */}
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={text}
                            maxLength={100}
                            minLength={1}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your link or text here..."
                            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all text-slate-700 placeholder:text-slate-400 focus:ring-2
                                ${error ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:ring-indigo-500 focus:border-indigo-500'}`}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs text-left font-medium animate-pulse">
                            ⚠️ {error}
                        </p>
                    )}

                    <button
                        onClick={handleGenerateQRCode}
                        disabled={loading}
                        className={`w-full text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center
                            ${loading
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : "Generate & Download"}
                    </button>
                </div>

                {/* Footer info */}
                <footer className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-medium hover:animate-pulse">
                        by <a href="https://github.com/rickferrdev">github/rickferrdev</a>
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;
