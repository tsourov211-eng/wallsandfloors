'use client';

import React, { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('alex.wright@example.co.uk');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    toast.success(
      mode === 'login' ? 'Successfully signed in!' : 'Account created successfully!',
      {
        description: `Welcome back, ${mode === 'login' ? 'Alexander' : name || 'Customer'}!`,
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#101a4a] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <User size={18} className="text-[#d9b67d]" />
            <h2 className="text-base font-black uppercase tracking-wider">
              {isLoggedIn ? 'My Account' : mode === 'login' ? 'Customer Sign In' : 'Create an Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close account modal"
            className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {!isLoggedIn ? (
            <div>
              {/* Tab selector */}
              <div className="mb-5 grid grid-cols-2 gap-2 rounded bg-slate-100 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`rounded py-1.5 transition-all ${
                    mode === 'login'
                      ? 'bg-white text-[#101a4a] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`rounded py-1.5 transition-all ${
                    mode === 'register'
                      ? 'bg-white text-[#101a4a] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">
                      Full Name *
                    </label>
                    <input
                      required
                      placeholder="e.g. Alexander Wright"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded border border-slate-300 p-2.5 text-xs focus:border-[#101a4a] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border border-slate-300 py-2.5 pl-9 pr-3 text-xs focus:border-[#101a4a] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs font-bold text-slate-700">
                    <label>Password *</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => toast.info('Password reset link sent to ' + email)}
                        className="text-[11px] font-normal text-[#d9272e] hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded border border-slate-300 py-2.5 pl-9 pr-3 text-xs focus:border-[#101a4a] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-[#101a4a] py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1a2b7a]"
                >
                  {mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}{' '}
                  <ArrowRight size={15} />
                </button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Protected by 256-bit SSL encryption</span>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="mt-3 text-lg font-black text-[#101a4a]">Welcome, Alexander!</h3>
              <p className="mt-1 text-xs text-slate-500">
                Logged in as <b>{email}</b>
              </p>

              <div className="mt-5 space-y-2 text-left text-xs">
                <div className="rounded border border-slate-200 bg-slate-50 p-3">
                  <p className="font-bold text-[#101a4a]">Recent Orders</p>
                  <p className="text-[11px] text-slate-500">Order #WF-849204 • 12 boxes Calacatta Luxe (Dispatched)</p>
                </div>
                <div className="rounded border border-slate-200 bg-slate-50 p-3">
                  <p className="font-bold text-[#101a4a]">Saved Addresses</p>
                  <p className="text-[11px] text-slate-500">24 Richmond Road, London SW1A 1AA</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex-1 rounded border border-slate-300 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Sign Out
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 rounded bg-[#101a4a] py-2 text-xs font-bold text-white hover:bg-[#1a2b7a]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
