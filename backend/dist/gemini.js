"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assistContact = exports.answerFAQ = exports.generateServiceRecommendation = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });
const generateServiceRecommendation = (answers) => __awaiter(void 0, void 0, void 0, function* () {
    if (!apiKey)
        return "Gemini API Key not configured.";
    const prompt = `
    You are an expert consultant for Nexa-Sphere, an AI automation agency.
    Based on the following user answers, recommend the best Nexa-Sphere service (Consulting, Automation, Agents, or Marketing) and explain why.
    
    User Answers: ${JSON.stringify(answers)}
    
    Keep the response concise, professional, and persuasive.
  `;
    const result = yield model.generateContent(prompt);
    const response = yield result.response;
    return response.text();
});
exports.generateServiceRecommendation = generateServiceRecommendation;
const answerFAQ = (question) => __awaiter(void 0, void 0, void 0, function* () {
    if (!apiKey)
        return "Gemini API Key not configured.";
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
    const result = yield model.generateContent(prompt);
    const response = yield result.response;
    return response.text();
});
exports.answerFAQ = answerFAQ;
const assistContact = (topic, keyPoints) => __awaiter(void 0, void 0, void 0, function* () {
    if (!apiKey)
        return "Gemini API Key not configured.";
    const prompt = `
    Draft a professional message to Nexa-Sphere regarding: ${topic}.
    Key points to include: ${keyPoints}.
    
    The message should be polite and concise.
  `;
    const result = yield model.generateContent(prompt);
    const response = yield result.response;
    return response.text();
});
exports.assistContact = assistContact;
