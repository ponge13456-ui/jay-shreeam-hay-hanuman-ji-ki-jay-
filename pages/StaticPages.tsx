
import React, { useState } from 'react';
import { apiService } from '../services/apiService';

export const PrivacyPolicy: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
    <div className="prose prose-indigo text-gray-600 space-y-4">
      <p>Last updated: June 2024</p>
      <p>We respect your privacy and are committed to protecting your personal data. This policy explains how we handle your information when you use our platform.</p>
      <h3 className="text-xl font-bold text-gray-900">1. Data Collection</h3>
      <p>We collect information such as your name, email, phone number, and interaction history to provide better services.</p>
      <h3 className="text-xl font-bold text-gray-900">2. Usage of Data</h3>
      <p>Your data is used solely for authentication, processing applications, and personalizing your rewards experience.</p>
    </div>
  </div>
);

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiService.sendContact(formData);
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-black mb-2">Get in Touch</h1>
      <p className="text-gray-500 mb-8">Have questions? We'd love to hear from you.</p>
      
      {sent ? (
        <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center text-green-700">
          <i className="fas fa-check-circle text-4xl mb-4"></i>
          <h2 className="text-xl font-bold">Message Sent!</h2>
          <p>We will get back to you as soon as possible.</p>
          <button onClick={() => setSent(false)} className="mt-4 text-indigo-600 font-bold underline">Send another one</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
            <input required className="w-full p-3 border rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input required type="email" className="w-full p-3 border rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
            <textarea required className="w-full p-3 border rounded-xl" rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
          </div>
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};
