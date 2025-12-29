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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const gemini_1 = require("./gemini");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get("/", (req, res) => {
    res.send("Nexa-Sphere API is running");
});
// AI Endpoints
app.post("/api/ai/recommend", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answers } = req.body;
        if (!answers) {
            return res.status(400).json({ error: "Missing answers" });
        }
        const recommendation = yield (0, gemini_1.generateServiceRecommendation)(answers);
        res.json({ recommendation });
    }
    catch (error) {
        console.error("Error in /recommend:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/api/ai/faq", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "Missing question" });
        }
        const answer = yield (0, gemini_1.answerFAQ)(question);
        res.json({ answer });
    }
    catch (error) {
        console.error("Error in /faq:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/api/ai/contact-assist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topic, keyPoints } = req.body;
        if (!topic) {
            return res.status(400).json({ error: "Missing topic" });
        }
        const suggestion = yield (0, gemini_1.assistContact)(topic, keyPoints);
        res.json({ suggestion });
    }
    catch (error) {
        console.error("Error in /contact-assist:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const nodemailer_1 = __importDefault(require("nodemailer"));
// ... imports ...
// Email Transporter
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not found. Skipping email send.");
        return;
    }
    try {
        yield transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log(`Email sent to ${to}`);
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
});
// ... AI endpoints ...
app.post("/api/newsletter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    try {
        // Send notification to admin (Joseph)
        yield sendEmail("josephdelgadoa@gmail.com", "New Newsletter Subscriber", `New subscriber: ${email}`);
        res.json({ message: "Subscribed successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to process subscription" });
    }
}));
app.post("/api/contact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, subject, message } = req.body;
    if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required" });
    }
    try {
        // Send contact form submission to admin (Joseph)
        yield sendEmail("josephdelgadoa@gmail.com", `Contact Form: ${subject || "General Inquiry"}`, `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        res.json({ message: "Message sent successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
}));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Ensure upload and data directories exist
const uploadDir = path_1.default.join(__dirname, "uploads");
const dataDir = path_1.default.join(__dirname, "data");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
if (!fs_1.default.existsSync(dataDir)) {
    fs_1.default.mkdirSync(dataDir, { recursive: true });
}
// Multer Config
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// Serve static files from uploads directory
app.use('/uploads', express_1.default.static(uploadDir));
// ... imports ...
app.post("/api/agency-onboarding", upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'productImages', maxCount: 10 },
    { name: 'otherImages', maxCount: 10 }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const files = req.files;
    try {
        const submission = Object.assign(Object.assign({ id: Date.now().toString(), timestamp: new Date().toISOString() }, body), { files: {
                logo: files['logo'] ? files['logo'][0].filename : null,
                productImages: files['productImages'] ? files['productImages'].map(f => f.filename) : [],
                otherImages: files['otherImages'] ? files['otherImages'].map(f => f.filename) : [],
            } });
        // Save to JSON
        const dbPath = path_1.default.join(dataDir, "submissions.json");
        let submissions = [];
        if (fs_1.default.existsSync(dbPath)) {
            const fileData = fs_1.default.readFileSync(dbPath, 'utf-8');
            try {
                submissions = JSON.parse(fileData);
            }
            catch (e) {
                console.error("Error parsing submissions.json", e);
            }
        }
        submissions.push(submission);
        fs_1.default.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
        // Send Email
        yield sendEmail("customer@nexa-sphere.com", `Agency Onboarding: ${body.businessName}`, `New Agency Client Onboarding:\n\n` +
            `Business Name: ${body.businessName}\n` +
            `Owner: ${body.businessOwner}\n` +
            `Category: ${body.businessCategory}\n` +
            `Phone: ${body.businessPhone}\n` +
            `Website: ${body.website}\n` +
            `Main Offer: ${body.offerDetails}\n\n` +
            `Social Media: ${body.socialLinks}\n` +
            `Needs Content Creation: ${body.needContentCreation ? 'Yes' : 'No'}\n` +
            `Files attached in dashboard.`);
        res.json({ message: "Onboarding information submitted successfully" });
    }
    catch (error) {
        console.error("Error processing onboarding:", error);
        res.status(500).json({ error: "Failed to submit onboarding information" });
    }
}));
app.get("/api/agency-onboarding", (req, res) => {
    const dbPath = path_1.default.join(dataDir, "submissions.json");
    if (fs_1.default.existsSync(dbPath)) {
        try {
            const data = fs_1.default.readFileSync(dbPath, 'utf-8');
            res.json(JSON.parse(data));
        }
        catch (e) {
            res.json([]);
        }
    }
    else {
        res.json([]);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
