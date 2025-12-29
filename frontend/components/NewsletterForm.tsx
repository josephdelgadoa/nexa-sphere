"use client";

import React, { useState } from "react";
import Button from "./Button";

const NewsletterForm = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage("Thanks for subscribing!");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Failed to connect to the server.");
        }
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur-sm"
                />
                <Button type="submit" variant="primary" disabled={status === "loading"} className="whitespace-nowrap">
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
            </form>
            {message && (
                <p className={`mt-2 text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default NewsletterForm;
