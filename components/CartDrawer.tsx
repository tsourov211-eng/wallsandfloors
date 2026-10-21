'use client';

import React, { useState } from 'react';
import {
  ShoppingBasket,
  X,
  Plus,
  Minus,
  Trash2,
  Truck,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface CartDrawerProps {
  onCheckoutClick: () => void;
  onExploreClick: () => void;
}

export function CartDrawer({ onCheckoutClick, onExploreClick }: CartDrawerProps) {
  const {
    cart,
    cartOpen,
    setCartOpen,
    totalItemsCount,
    subtotal,
    discountAmount,
    shippingFee,
    freeShippingRemaining,
    freeShippingProgress,
    grandTotal,
    updateQuantity,
    removeFromCart,
    appliedPromo,
    promoDiscountPercent,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!cartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#101a4a] px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBasket size={20} className="text-[#d9b67d]" />
            <h2 className="text-base font-black uppercase tracking-wider">Your Basket</h2>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
              {totalItemsCount}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close basket"
            className="rounded p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="border-b border-slate-100 bg-[#f9f8f6] px-5 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#24211f]">
            <Truck size={16} className="shrink-0 text-[#101a4a]" />
            {freeShippingRemaining === 0 ? (
              <span className="font-bold text-emerald-700">
                🎉 Congratulations! You unlocked FREE Delivery
              </span>
            ) : (
              <span>
                Add <b className="text-[#d9272e]">৳{freeShippingRemaining.toLocaleString()}</b> more for{' '}
                <b>FREE Delivery</b>
              </span>
            )}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full transition-all duration-500 ${
                freeShippingRemaining === 0 ? 'bg-emerald-600' : 'bg-[#d9272e]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items Scroll Area */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <ShoppingBasket size={32} />
              </div>
              <p className="mt-4 text-base font-bold text-[#101a4a]">Your basket is empty</p>
              <p className="mt-1 text-xs text-slate-500">
                Explore our Autumn Tile Sale for high quality tiles and panels.
              </p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  onExploreClick();
                }}
                className="mt-5 inline-flex items-center gap-2 rounded bg-[#101a4a] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1a2b7a]"
              >
                Shop Sale Now <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0">
                  <div className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 shrink-0 rounded object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="line-clamp-1 text-xs font-bold text-[#101a4a]">
                            {item.product.name}
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            {item.isSample
                              ? 'Cut Sample'
                              : `${item.product.dimensions} • ~${item.coverageM2} ${item.product.unit === 'pc' ? 'pcs' : 'sq.ft'} total`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                          className="text-slate-400 hover:text-[#d9272e]"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center rounded border border-slate-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-slate-600 hover:bg-slate-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-slate-600 hover:bg-slate-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xs font-extrabold text-[#101a4a]">
                            ৳{(item.unitPrice * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {item.isSample ? '৳150 ea' : `৳${item.unitPrice.toLocaleString()} / ${item.product.unit === 'pc' ? 'pack' : 'box'}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 bg-white p-5">
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="mb-4">
              <label htmlFor="drawer-promo" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Discount Code / Voucher
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    id="drawer-promo"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. AUTUMN20"
                    className="h-8 w-full rounded border border-slate-300 pl-8 pr-2 text-xs uppercase placeholder:normal-case focus:border-[#101a4a] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded bg-slate-800 px-3 text-xs font-bold text-white hover:bg-black"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-2 flex items-center justify-between rounded bg-emerald-50 px-2 py-1 text-xs text-emerald-800">
                  <span className="flex items-center gap-1 font-bold">
                    <Check size={13} /> {appliedPromo} ({promoDiscountPercent}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-xs text-emerald-900 underline hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoMessage && !appliedPromo && (
                <p className={`mt-1 text-[11px] ${promoMessage.isError ? 'text-red-600' : 'text-emerald-600'}`}>
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">৳{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#d9272e]">
                  <span>Discount ({appliedPromo})</span>
                  <span className="font-bold">-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-slate-900">
                  {shippingFee === 0 ? (
                    <b className="text-emerald-700 uppercase">Free</b>
                  ) : (
                    `৳${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-[#101a4a]">
                <span>Total (inc. VAT)</span>
                <span>৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                setCartOpen(false);
                onCheckoutClick();
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-[#d9272e] py-3 text-xs font-black uppercase tracking-wider text-white shadow transition-all hover:bg-[#b82026] active:scale-[0.99]"
            >
              Secure Checkout • ৳{grandTotal.toLocaleString()} <ArrowRight size={15} />
            </button>

            {/* Trust badge */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>SSL 256-bit Encrypted Checkout • 14-day Hassle-free Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
