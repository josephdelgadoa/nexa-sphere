import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateServiceRecommendation, answerFAQ, assistContact } from "./gemini";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.send("Nexa-Sphere API is running");
});

// AI Endpoints
app.post("/api/ai/recommend", async (req, res) => {
    try {
        const { answers } = req.body;
        if (!answers) {
            return res.status(400).json({ error: "Missing answers" });
        }
        const recommendation = await generateServiceRecommendation(answers);
        res.json({ recommendation });
    } catch (error) {
        console.error("Error in /recommend:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/ai/faq", async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "Missing question" });
        }
        const answer = await answerFAQ(question);
        res.json({ answer });
    } catch (error) {
        console.error("Error in /faq:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/ai/contact-assist", async (req, res) => {
    try {
        const { topic, keyPoints } = req.body;
        if (!topic) {
            return res.status(400).json({ error: "Missing topic" });
        }
        const suggestion = await assistContact(topic, keyPoints);
        res.json({ suggestion });
    } catch (error) {
        console.error("Error in /contact-assist:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

import nodemailer from "nodemailer";

// ... imports ...

// Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to: string, subject: string, text: string) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials not found. Skipping email send.");
        return;
    }
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

// ... AI endpoints ...

app.post("/api/newsletter", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Send notification to admin (Joseph)
        await sendEmail(
            "josephdelgadoa@gmail.com",
            "New Newsletter Subscriber",
            `New subscriber: ${email}`
        );
        res.json({ message: "Subscribed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to process subscription" });
    }
});

app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required" });
    }

    try {
        // Send contact form submission to admin (Joseph)
        await sendEmail(
            "josephdelgadoa@gmail.com",
            `Contact Form: ${subject || "General Inquiry"}`,
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        res.json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
});

import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure upload and data directories exist
const uploadDir = path.join(__dirname, "uploads");
const dataDir = path.join(__dirname, "data");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadDir));


// ... imports ...

app.post("/api/agency-onboarding", upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'productImages', maxCount: 10 },
    { name: 'otherImages', maxCount: 10 }
]), async (req, res) => {
    const body = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    try {
        const submission = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...body,
            files: {
                logo: files['logo'] ? files['logo'][0].filename : null,
                productImages: files['productImages'] ? files['productImages'].map(f => f.filename) : [],
                otherImages: files['otherImages'] ? files['otherImages'].map(f => f.filename) : [],
            }
        };

        // Save to JSON
        const dbPath = path.join(dataDir, "submissions.json");
        let submissions = [];
        if (fs.existsSync(dbPath)) {
            const fileData = fs.readFileSync(dbPath, 'utf-8');
            try {
                submissions = JSON.parse(fileData);
            } catch (e) {
                console.error("Error parsing submissions.json", e);
            }
        }
        submissions.push(submission);
        fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));

        // Send Email
        await sendEmail(
            "customer@nexa-sphere.com",
            `Agency Onboarding: ${body.businessName}`,
            `New Agency Client Onboarding:\n\n` +
            `Business Name: ${body.businessName}\n` +
            `Owner: ${body.businessOwner}\n` +
            `Category: ${body.businessCategory}\n` +
            `Phone: ${body.businessPhone}\n` +
            `Website: ${body.website}\n` +
            `Main Offer: ${body.offerDetails}\n\n` +
            `Social Media: ${body.socialLinks}\n` +
            `Needs Content Creation: ${body.needContentCreation ? 'Yes' : 'No'}\n` +
            `Files attached in dashboard.`
        );
        res.json({ message: "Onboarding information submitted successfully" });
    } catch (error) {
        console.error("Error processing onboarding:", error);
        res.status(500).json({ error: "Failed to submit onboarding information" });
    }
});

app.get("/api/agency-onboarding", (req, res) => {
    const dbPath = path.join(dataDir, "submissions.json");
    if (fs.existsSync(dbPath)) {
        try {
            const data = fs.readFileSync(dbPath, 'utf-8');
            res.json(JSON.parse(data));
        } catch (e) {
            res.json([]);
        }
    } else {
        res.json([]);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
