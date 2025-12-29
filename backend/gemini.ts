import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

export const generateServiceRecommendation = async (answers: any) => {
  if (!apiKey) return "Gemini API Key not configured.";

  const prompt = `
    You are an expert consultant for Nexa-Sphere, an AI automation agency.
    Based on the following user answers, recommend the best Nexa-Sphere service (Consulting, Automation, Agents, or Marketing) and explain why.
    
    User Answers: ${JSON.stringify(answers)}
    
    Keep the response concise, professional, and persuasive.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const answerFAQ = async (question: string) => {
  if (!apiKey) return "Gemini API Key not configured.";

  const context = `
    Nexa-Sphere is an AI consulting agency based in Fremont, CA.
    Services: AI Consulting, Business Process Automation, Custom AI Agents, AI Marketing.
    
    NEW Agency Offer Packages:
    1. Social Ignite ($120.00/month): Perfect for starters. 4 AI-edited videos, trendy hooks, basic color grading.
    2. Growth Accelerator ($350.00/month, Most Popular): Fast growth. 8 videos, advanced editing, human voiceover, scriptwriting.
    3. Market Dominator ($1,500.00/month): Aggressive scaling. 20 videos, unlimited revisions, dedicated account manager, multi-platform adaptation.
    4. SV Elite System ($2,500.00/month): Full custom production. 30+ videos, full channel management, advanced analytics, dedicated creative director.
    
    Mission: Democratize access to advanced AI.
    Contact: hello@nexa-sphere.com.
  `;

  const prompt = `
    Context: ${context}
    User Question: ${question}
    
    Answer the question based on the context. If the answer is not in the context, politely suggest contacting support.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const assistContact = async (topic: string, keyPoints: string) => {
  if (!apiKey) return "Gemini API Key not configured.";

  const prompt = `
    Draft a professional message to Nexa-Sphere regarding: ${topic}.
    Key points to include: ${keyPoints}.
    
    The message should be polite and concise.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
