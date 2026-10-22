'use client';

import React from 'react';

export function VisaBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-7 w-12 items-center justify-center rounded bg-white px-1 shadow-sm border border-slate-200/90 transition-transform hover:scale-105 ${className}`}
      title="Visa"
      aria-label="Visa"
    >
      <svg viewBox="0 0 36 12" className="h-3.5 w-auto">
        <path
          fill="#1A1F71"
          d="M13.8 11.5l2.3-11.2h2.9L16.7 11.5h-2.9zm11.9-11c-.7-.3-1.8-.5-3.1-.5-3.4 0-5.8 1.8-5.8 4.4 0 1.9 1.7 3 3 3.6 1.3.7 1.8 1.1 1.8 1.7 0 .9-1.1 1.4-2.2 1.4-1.5 0-2.3-.2-3.5-.8l-.5-.2-.5 2.4c.7.3 2 .6 3.4.6 3.6 0 6-1.8 6-4.5 0-1.5-.9-2.7-3-3.7-1.3-.6-2.1-1.1-2.1-1.7 0-.6.7-1.2 2.2-1.2 1.2 0 2.1.3 2.8.6l.3.2.6-2.4zm8.6.2h-2.3c-.7 0-1.2.2-1.5.9l-4.3 10.1h3.1l.6-1.7h3.8l.4 1.7h2.7l-2.5-11zm-3.8 7.1l1.6-4.3.9 4.3h-2.5zM11.9.7H9.2c-.8 0-1.4.5-1.7 1.2L3.1 11.5h3.1l.6-1.7h3.8l.4 1.7h2.7L11.9.7zm-3.8 6.7l1.6-4.3.9 4.3H8.1z"
        />
        <path
          fill="#F7B600"
          d="M4.9 1.9L2.6 11.5H0L2.3 1.9c.3-.7.9-1.2 1.7-1.2h2.7c-.8.1-1.5.6-1.8 1.2z"
        />
      </svg>
    </div>
  );
}

export function MastercardBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-7 w-12 items-center justify-center rounded bg-white px-1 shadow-sm border border-slate-200/90 transition-transform hover:scale-105 ${className}`}
      title="Mastercard"
      aria-label="Mastercard"
    >
      <svg viewBox="0 0 32 20" className="h-5 w-auto">
        <circle cx="11" cy="10" r="8" fill="#EB001B" />
        <circle cx="21" cy="10" r="8" fill="#F79E1B" />
        <path
          d="M16 4.3a7.96 7.96 0 0 0 0 11.4 7.96 7.96 0 0 0 0-11.4z"
          fill="#FF5F00"
        />
      </svg>
    </div>
  );
}

export function MaestroBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-7 w-12 items-center justify-center rounded bg-white px-1 shadow-sm border border-slate-200/90 transition-transform hover:scale-105 ${className}`}
      title="Maestro"
      aria-label="Maestro"
    >
      <svg viewBox="0 0 32 20" className="h-5 w-auto">
        <circle cx="11" cy="10" r="8" fill="#EB001B" />
        <circle cx="21" cy="10" r="8" fill="#0066B2" />
        <path
          d="M16 4.3a7.96 7.96 0 0 0 0 11.4 7.96 7.96 0 0 0 0-11.4z"
          fill="#6C65A9"
        />
      </svg>
    </div>
  );
}

export function AmexBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-7 w-12 items-center justify-center rounded bg-[#006FCF] px-1 shadow-sm border border-[#005fb3] transition-transform hover:scale-105 ${className}`}
      title="American Express"
      aria-label="American Express"
    >
      <span className="text-[10px] font-black tracking-tight text-white uppercase italic">
        AMEX
      </span>
    </div>
  );
}

export function PaypalBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-7 w-12 items-center justify-center rounded bg-white px-1 shadow-sm border border-slate-200/90 transition-transform hover:scale-105 ${className}`}
      title="PayPal"
      aria-label="PayPal"
    >
      <svg viewBox="0 0 28 20" className="h-5 w-auto">
        <path
          d="M7 17.5L9.6 1.5h6.5c3.2 0 5.4 1.4 4.9 4.3-.5 3-2.7 4.5-5.9 4.5H12l-1.6 7.2H7z"
          fill="#003087"
        />
        <path
          d="M10.8 18.5L12.8 6h5.8c2.9 0 4.8 1.3 4.4 3.9-.5 2.7-2.4 4-5.2 4H15l-1.4 6.6h-2.8z"
          fill="#0079C1"
        />
        <path
          d="M14.5 13.9H15c2.4 0 4-1 4.4-3.5.1-.6 0-1.1-.3-1.5-.4 1.8-1.9 2.8-4.3 2.8h-1.4l-.9 4.2.8-2z"
          fill="#001C64"
        />
      </svg>
    </div>
  );
}

export function ApplePayBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-7 w-12 items-center justify-center rounded bg-black px-1 shadow-sm border border-neutral-700 transition-transform hover:scale-105 ${className}`}
      title="Apple Pay"
      aria-label="Apple Pay"
    >
      <svg viewBox="0 0 36 16" className="h-3.5 w-auto fill-white">
        <path d="M5.8 7.3c-.1-1.2.7-2 1-2.2-.6-.8-1.6-1-2-1-.9-.1-1.8.5-2.3.5-.5 0-1.2-.5-1.9-.5-1 0-1.9.5-2.4 1.5-1 1.7-.2 4.3.8 5.7.5.7 1 1.4 1.8 1.4.7 0 1.1-.5 1.9-.5.8 0 1.2.5 1.9.5.8 0 1.3-.7 1.8-1.4.6-.8.8-1.6.8-1.7-.1 0-1.4-.5-1.5-2.5zM4.6 3.7c.4-.5.6-1.3.5-2-.7 0-1.5.5-2 1-.4.5-.6 1.3-.5 2 .8.1 1.6-.4 2-.9z" />
        <path d="M11.5 2.5h2.2v9h-2.2v-9zm0 2.2c.5-.9 1.5-1.6 2.8-1.6 2 0 3.3 1.4 3.3 3.6s-1.3 3.7-3.3 3.7c-1.3 0-2.3-.7-2.8-1.6v1.5H9.7v-9h1.8v3.4zm2.1 2c0 1.2.8 2.1 1.9 2.1 1.1 0 1.9-.9 1.9-2.1 0-1.2-.8-2.1-1.9-2.1-1.1 0-1.9.9-1.9 2.1z" />
        <path d="M21.2 9.5c0-.6.4-1 1.2-1.1l1.7-.2v-.6c0-.8-.5-1.2-1.4-1.2-.8 0-1.3.3-1.4.8h-1.8c.1-1.3 1.3-2.2 3.2-2.2 2 0 3.2 1 3.2 2.5v4H24v-1c-.5.7-1.4 1.2-2.3 1.2-1.4 0-2.3-.8-2.3-2.2zm2.9-.6v-.7l-1.4.2c-.5.1-.8.3-.8.7 0 .5.4.8 1 .8.7 0 1.2-.4 1.2-1z" />
        <path d="M27.5 4.5l1.8 4.7 1.7-4.7h2.1l-2.9 7-1.2 2.8h-2l1-2.3-2.7-7.5h2.2z" />
      </svg>
    </div>
  );
}

export function GooglePayBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-7 w-12 items-center justify-center rounded bg-white px-1 shadow-sm border border-slate-200/90 transition-transform hover:scale-105 ${className}`}
      title="Google Pay"
      aria-label="Google Pay"
    >
      <svg viewBox="0 0 38 16" className="h-3.5 w-auto">
        <path
          d="M8.7 7.2v2.2H6.5a3.2 3.2 0 0 1-.1 1.1 3.3 3.3 0 0 1-3.2 2.3c-2 0-3.6-1.7-3.6-3.7s1.6-3.7 3.6-3.7c.9 0 1.8.4 2.4 1l1.6-1.6A5.5 5.5 0 0 0 3.2 3.4C1.4 3.4 0 4.8 0 6.6s1.4 3.3 3.2 3.3c1.9 0 3.1-1.3 3.1-3.2 0-.3 0-.5-.1-.7l2.5 1.2z"
          fill="#4285F4"
        />
        <path
          d="M13.8 3.5h2.8c1.3 0 2.3.4 3 1.1.7.7 1.1 1.7 1.1 2.9 0 1.2-.4 2.1-1.1 2.8-.7.7-1.7 1.1-3 1.1h-1.3v3.2h-1.5V3.5zm2.7 6.6c.9 0 1.5-.2 2-.7.5-.5.7-1.1.7-1.9 0-.8-.2-1.4-.7-1.9-.5-.5-1.1-.7-2-.7h-1.2v5.2h1.2z"
          fill="#5F6368"
        />
        <path
          d="M23.1 9.4c0-.7.3-1.3.9-1.7.6-.4 1.4-.6 2.4-.6.8 0 1.5.1 2 .4v-.4c0-.6-.2-1.1-.6-1.4-.4-.3-1-.5-1.6-.5-.8 0-1.4.2-1.8.6l-.8-.9c.6-.6 1.5-.9 2.7-.9 1.1 0 2 .3 2.6.9.6.6.9 1.4.9 2.4v4.3h-1.4v-1c-.5.7-1.3 1.1-2.3 1.1-.9 0-1.6-.2-2.1-.7-.6-.5-.9-1.1-.9-1.9zm5.3-.4v-.6c-.5-.3-1.1-.4-1.8-.4-.7 0-1.2.1-1.6.4-.3.3-.5.6-.5 1.1 0 .4.2.8.5 1 .4.3.8.4 1.4.4.8 0 1.4-.3 1.8-.8.2-.3.2-.7.2-1.1z"
          fill="#5F6368"
        />
        <path
          d="M32.2 6.5l1.7 4.1 1.6-4.1h1.6l-2.6 6.1-1.5 3.4h-1.6l.6-1.3-2.5-8.2h1.7z"
          fill="#5F6368"
        />
      </svg>
    </div>
  );
}

export function KlarnaBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-7 w-12 items-center justify-center rounded bg-[#FFB3C7] px-1 shadow-sm border border-[#f59eb5] transition-transform hover:scale-105 ${className}`}
      title="Klarna"
      aria-label="Klarna"
    >
      <span className="text-[10px] font-black tracking-tighter text-black">
        Klarna.
      </span>
    </div>
  );
}

export function PaymentIconsGrid({
  className = '',
  itemClassName = '',
}: {
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={`grid grid-cols-4 gap-1.5 ${className}`}>
      <VisaBadge className={itemClassName} />
      <MastercardBadge className={itemClassName} />
      <MaestroBadge className={itemClassName} />
      <AmexBadge className={itemClassName} />
      <PaypalBadge className={itemClassName} />
      <ApplePayBadge className={itemClassName} />
      <GooglePayBadge className={itemClassName} />
      <KlarnaBadge className={itemClassName} />
    </div>
  );
}

export function PaymentIconsRow({
  className = '',
  itemClassName = '',
}: {
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <VisaBadge className={itemClassName} />
      <MastercardBadge className={itemClassName} />
      <MaestroBadge className={itemClassName} />
      <AmexBadge className={itemClassName} />
      <PaypalBadge className={itemClassName} />
      <ApplePayBadge className={itemClassName} />
      <GooglePayBadge className={itemClassName} />
      <KlarnaBadge className={itemClassName} />
    </div>
  );
}
