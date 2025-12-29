const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const getServiceRecommendation = async (answers: any) => {
    const response = await fetch(`${API_BASE_URL}/ai/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
    });
    return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateText(prompt: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/ai/generate-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
    });
    return response.json();
}

export const getFAQAnswer = async (question: string) => {
    const response = await fetch(`${API_BASE_URL}/ai/faq`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
    });
    return response.json();
};

export const getContactSuggestion = async (topic: string, keyPoints: string) => {
    const response = await fetch(`${API_BASE_URL}/ai/contact-assist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, keyPoints }),
    });
    return response.json();
};
