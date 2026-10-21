'use client';

import React, { useState } from 'react';
import { X, CircleHelp, ChevronDown, ChevronUp, MessageSquare, Phone, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQS = [
  {
    q: 'How does your delivery service work?',
    a: 'Orders placed before 1pm are dispatched for standard 2-3 working day delivery. Due to tile weight, orders over 25kg are delivered on wooden pallets by tail-lift vehicle. Free delivery applies to orders over ৳5,000.',
  },
  {
    q: 'Can I order a tile sample first?',
    a: 'Yes! We encourage ordering cut tile samples for just ৳150 each with fast free delivery. This allows you to evaluate color, texture, and light reflection directly in your home.',
  },
  {
    q: 'Are your porcelain tiles suitable for underfloor heating?',
    a: 'Yes, porcelain and natural stone tiles are exceptional thermal conductors and work seamlessly with both wet piped and electric mat underfloor heating systems up to 27°C.',
  },
  {
    q: 'How much wastage should I add when calculating boxes?',
    a: 'We strongly recommend adding 10% to your room area (or 15% for complex herringbone or diagonal patterns) to account for cuts, corners, sockets and potential cuts breakage.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 14-day hassle-free return guarantee on all unopened, undamaged full boxes of tiles in their original packaging.',
  },
];

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [questionInput, setQuestionInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [sentMessage, setSentMessage] = useState(false);

  if (!isOpen) return null;

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    setSentMessage(true);
    toast.success('Message Sent to Customer Care!', {
      description: 'Our technical support team will reply within 2 hours.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#101a4a] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <CircleHelp size={20} className="text-[#d9b67d]" />
            <h2 className="text-base font-black uppercase tracking-wider">
              Customer Help & Advice
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close help"
            className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Direct Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f9f8f6] p-3 text-xs">
              <Phone size={18} className="text-[#101a4a] shrink-0" />
              <div>
                <p className="font-bold text-[#101a4a]">Call Tile Experts</p>
                <p className="text-slate-600">01536 314 730 (8am - 6pm)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f9f8f6] p-3 text-xs">
              <Mail size={18} className="text-[#d9272e] shrink-0" />
              <div>
                <p className="font-bold text-[#101a4a]">Email Customer Support</p>
                <p className="text-slate-600">help@wallsandfloors.co.uk</p>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Frequently Asked Questions:
          </h3>
          <div className="space-y-2 mb-6">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 overflow-hidden text-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between bg-slate-50 p-3.5 text-left font-bold text-slate-800 hover:bg-slate-100"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-200 bg-white p-3.5 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Instant Query Form */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-xs font-bold text-[#101a4a] mb-1 flex items-center gap-1.5">
              <MessageSquare size={14} /> Still need help with your project?
            </h4>
            <p className="text-[11px] text-slate-500 mb-3">
              Leave your inquiry below and our tiling specialists will get straight back to you.
            </p>

            {!sentMessage ? (
              <form onSubmit={handleSendQuestion} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2 text-xs outline-none focus:border-[#101a4a]"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="What can we help you calculate or choose?"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2 text-xs outline-none focus:border-[#101a4a]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded bg-[#101a4a] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a2b7a]"
                >
                  <Send size={13} /> Send Inquiry
                </button>
              </form>
            ) : (
              <div className="rounded bg-emerald-50 p-3 text-xs text-emerald-800">
                ✓ Message received! A tile specialist has been assigned to your ticket.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
