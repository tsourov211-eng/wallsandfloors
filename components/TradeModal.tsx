'use client';

import React, { useState } from 'react';
import { X, Truck, CheckCircle2, Shield, Percent, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TradeModal({ isOpen, onClose }: TradeModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [tradeType, setTradeType] = useState('Tile Fixer / Installer');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Trade Account Application Received!', {
      description: 'Your 15% trade code TRADE15 is now activated!',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#101a4a] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-[#d9b67d]" />
            <h2 className="text-base font-black uppercase tracking-wider">
              Walls and Floors Trade Account
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close trade modal"
            className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900">
                <p className="flex items-center gap-1.5 font-bold">
                  <Percent size={15} /> Exclusive Trade Perks:
                </p>
                <ul className="mt-1.5 list-disc pl-5 space-y-1 text-[11px] text-amber-800">
                  <li>Up to 15% discount across all tiles, panels, trims & adhesives</li>
                  <li>Dedicated account manager & priority sample dispatch</li>
                  <li>Direct pallet drop to site with tail-lift offload</li>
                </ul>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Business / Trading Name *
                </label>
                <input
                  required
                  placeholder="e.g. Apex Tiling & Refurbishment Ltd"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2.5 text-xs focus:border-[#101a4a] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Trade Profession *
                  </label>
                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value)}
                    className="w-full rounded border border-slate-300 p-2.5 text-xs focus:border-[#101a4a] focus:outline-none"
                  >
                    <option>Tile Fixer / Installer</option>
                    <option>General Builder / Contractor</option>
                    <option>Architect / Interior Designer</option>
                    <option>Bathroom Fitter / Plumber</option>
                    <option>Property Developer / Landlord</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Contact Name *
                  </label>
                  <input
                    required
                    placeholder="e.g. James Miller"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full rounded border border-slate-300 p-2.5 text-xs focus:border-[#101a4a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="james@apextiling.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2.5 text-xs focus:border-[#101a4a] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-[#101a4a] py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1a2b7a]"
              >
                Apply for Trade Account <ArrowRight size={15} />
              </button>
            </form>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="mt-4 text-xl font-black text-[#101a4a]">Welcome to Walls & Floors Trade!</h3>
              <p className="mt-1 text-xs text-slate-600">
                Your application has been verified. Use promo code <b className="text-[#d9272e]">TRADE15</b> at checkout for 15% off orders.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded bg-[#101a4a] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1a2b7a]"
              >
                Return to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
