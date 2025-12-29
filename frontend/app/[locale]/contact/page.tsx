"use client";

import React, { useState } from "react";
import Section from "@/components/Section";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ContactHelper from "@/components/ai/ContactHelper";

import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, message }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("");
        setFormData({ name: "", email: "", subject: "General Inquiry" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Section className="relative pt-40 pb-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/contact_hero_bg.png"
            alt="Contact Nexa-Sphere Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/50 dark:bg-black/80 backdrop-blur-[2px]" />
        </div>

        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 dark:opacity-10 z-0" />

        <div className="text-center max-w-4xl mx-auto relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-gray-900 dark:text-white drop-shadow-sm">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto font-medium">
            {t('heroDesc')}
          </p>
        </div>


      </Section>

      <Section background="gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold font-heading mb-6 text-gray-900 dark:text-white">
              {t('infoTitle')}
            </h2>
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('headquarters')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fremont, CA<br />
                    Silicon Valley
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 flex-shrink-0">
                  📧
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{t('email')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    info@nexa-sphere.com
                  </p>
                </div>
              </div>
            </div>


          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder={t('form.namePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder={t('form.emailPlaceholder')}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('form.subject')}
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="General Inquiry">{t('form.subjects.general')}</option>
                  <option value="Consulting Services">{t('form.subjects.consulting')}</option>
                  <option value="Partnership">{t('form.subjects.partnership')}</option>
                  <option value="Careers">{t('form.subjects.careers')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('form.message')}
                </label>
                <ContactHelper onSuggestion={setMessage} />
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={t('form.messagePlaceholder')}
                  required
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? t('form.btnLoading') : t('form.btn')}
              </Button>
              {status === "success" && <p className="text-green-500 text-center">{t('form.success')}</p>}
              {status === "error" && <p className="text-red-500 text-center">{t('form.error')}</p>}
            </form>
          </Card>
        </div>
      </Section>
    </div>
  );
}
