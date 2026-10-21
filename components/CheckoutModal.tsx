'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, grandTotal, subtotal, discountAmount, shippingFee, clearCart } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Alexander Wright',
    email: 'alex.wright@example.co.uk',
    phone: '07700 900123',
    addressLine1: '24 Richmond Road',
    addressLine2: 'Apt 4B',
    city: 'London',
    postcode: 'SW1A 1AA',
    deliveryInstructions: 'Leave in porch if no answer',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'payin3'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('883');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrder = `WF-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setStep('success');
      clearCart();
    }, 1200);
  };

  const handleFinish = () => {
    onClose();
    setStep('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => {
          if (step !== 'success') onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative z-50 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#101a4a] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#d9b67d]" />
            <h2 className="text-base font-black uppercase tracking-wider">
              {step === 'success' ? 'Order Confirmed' : 'Walls and Floors Checkout'}
            </h2>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              aria-label="Close checkout"
              className="rounded p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Stepper Progress */}
        {step !== 'success' && (
          <div className="border-b border-slate-100 bg-[#f9f8f6] px-6 py-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span
                className={`flex items-center gap-1.5 ${
                  step === 'details' ? 'text-[#101a4a]' : 'text-emerald-700'
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#101a4a] text-[10px] text-white">
                  1
                </span>{' '}
                Delivery Details
              </span>
              <div className="h-0.5 flex-1 mx-3 bg-slate-200" />
              <span
                className={`flex items-center gap-1.5 ${
                  step === 'payment' ? 'text-[#101a4a]' : 'text-slate-400'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    step === 'payment'
                      ? 'bg-[#101a4a] text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  2
                </span>{' '}
                Payment & Review
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* STEP 1: DELIVERY DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#101a4a]">Order Summary ({cart.length} items)</p>
                  <p className="text-[11px] text-slate-500">
                    Total to pay: <b className="text-slate-900">৳{grandTotal.toLocaleString()}</b> (inc. VAT)
                  </p>
                </div>
                <div className="text-right text-[11px]">
                  <span>Delivery: <b>{shippingFee === 0 ? 'FREE' : `৳${shippingFee.toLocaleString()}`}</b></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="customer-name" className="mb-1 block text-xs font-bold text-slate-700">
                    Full Name *
                  </label>
                  <input
                    id="customer-name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded border border-slate-300 p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="customer-email" className="mb-1 block text-xs font-bold text-slate-700">
                    Email Address (for order tracking) *
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded border border-slate-300 p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="customer-phone" className="mb-1 block text-xs font-bold text-slate-700">
                    Phone Number (for pallet delivery courier) *
                  </label>
                  <input
                    id="customer-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded border border-slate-300 p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="customer-postcode" className="mb-1 block text-xs font-bold text-slate-700">
                    UK Postcode *
                  </label>
                  <input
                    id="customer-postcode"
                    required
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full rounded border border-slate-300 p-2 text-xs uppercase focus:border-[#101a4a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customer-address1" className="mb-1 block text-xs font-bold text-slate-700">
                  Address Line 1 *
                </label>
                <input
                  id="customer-address1"
                  required
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="w-full rounded border border-slate-300 p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="customer-address2" className="mb-1 block text-xs font-bold text-slate-700">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    id="customer-address2"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    className="w-full rounded border border-slate-300 p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="customer-city" className="mb-1 block text-xs font-bold text-slate-700">
                    Town / City *
                  </label>
                  <input
                    id="customer-city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded border border-slate-300 p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="delivery-notes" className="mb-1 block text-xs font-bold text-slate-700">
                  Delivery Notes / Access Instructions
                </label>
                <input
                  id="delivery-notes"
                  value={formData.deliveryInstructions}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryInstructions: e.target.value })
                  }
                  className="w-full rounded border border-slate-300 p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-[#101a4a] py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-[#1a2b7a]"
              >
                Continue to Payment <ArrowRight size={15} />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT & CONFIRMATION */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-[#f9f8f6] p-4 text-xs">
                <div className="flex justify-between font-bold text-[#101a4a]">
                  <span>Delivering to:</span>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="text-[#d9272e] underline hover:text-[#b82026]"
                  >
                    Change
                  </button>
                </div>
                <p className="mt-1 text-slate-700">
                  {formData.fullName}, {formData.addressLine1}, {formData.city} ({formData.postcode})
                </p>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center rounded border p-3 text-xs font-bold transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#101a4a] bg-[#101a4a]/5 text-[#101a4a]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard size={18} className="mb-1" />
                    Credit / Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex flex-col items-center justify-center rounded border p-3 text-xs font-bold transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-[#101a4a] bg-[#101a4a]/5 text-[#101a4a]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-base font-extrabold italic text-blue-800">PayPal</span>
                    Fast & Safe
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('payin3')}
                    className={`flex flex-col items-center justify-center rounded border p-3 text-xs font-bold transition-all ${
                      paymentMethod === 'payin3'
                        ? 'border-[#101a4a] bg-[#101a4a]/5 text-[#101a4a]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-extrabold text-pink-600">Pay in 3</span>
                    0% Interest
                  </button>
                </div>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <label htmlFor="card-number" className="mb-1 block text-xs font-bold text-slate-700">
                      Card Number
                    </label>
                    <input
                      id="card-number"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded border border-slate-300 bg-white p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="card-expiry" className="mb-1 block text-xs font-bold text-slate-700">
                        Expiry Date
                      </label>
                      <input
                        id="card-expiry"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full rounded border border-slate-300 bg-white p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="card-cvc" className="mb-1 block text-xs font-bold text-slate-700">
                        CVC / CVV
                      </label>
                      <input
                        id="card-cvc"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full rounded border border-slate-300 bg-white p-2 text-xs focus:border-[#101a4a] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'payin3' && (
                <div className="rounded-lg bg-pink-50 p-3 text-xs text-pink-900 border border-pink-200">
                  <p className="font-bold">Pay in 3 interest-free instalments of ৳{Math.round(grandTotal / 3).toLocaleString()}</p>
                  <p className="mt-0.5 text-[11px] text-pink-700">
                    First instalment paid today, subsequent payments automatically taken every 30 days.
                  </p>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-900 border border-blue-200">
                  <p className="font-bold">PayPal Express Checkout</p>
                  <p className="mt-0.5 text-[11px] text-blue-700">
                    You will be securely redirected to PayPal to complete your order.
                  </p>
                </div>
              )}

              {/* Order total review */}
              <div className="space-y-1.5 border-t border-slate-200 pt-3 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#d9272e]">
                    <span>Promotional Discount</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Palletized Delivery</span>
                  <span>{shippingFee === 0 ? 'FREE' : `৳${shippingFee.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-[#101a4a]">
                  <span>Total Amount Due</span>
                  <span>৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex items-center gap-1 rounded border border-slate-300 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex flex-1 items-center justify-center gap-2 rounded bg-[#d9272e] py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-[#b82026] disabled:opacity-70"
                >
                  {isProcessing ? 'Authorising Payment...' : `Confirm & Pay ৳${grandTotal.toLocaleString()}`}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS */}
          {step === 'success' && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 animate-in zoom-in duration-300">
                <CheckCircle2 size={38} />
              </div>

              <h3 className="mt-4 text-2xl font-black text-[#101a4a]">
                Order Confirmed!
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Thank you for choosing Walls and Floors. Your order has been placed successfully.
              </p>

              <div className="mx-auto mt-6 max-w-md rounded-lg border border-slate-200 bg-[#f9f8f6] p-4 text-left text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500">Order Reference:</span>
                  <span className="font-mono font-black text-[#101a4a]">{orderNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Delivery Address:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {formData.addressLine1}, {formData.postcode}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="font-bold text-slate-500">Estimated Delivery:</span>
                  <span className="font-semibold text-emerald-700">
                    2 - 3 Working Days (Tracked)
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-500">Confirmation Sent To:</span>
                  <span className="font-semibold text-slate-800">{formData.email}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="mt-8 inline-flex items-center gap-2 rounded bg-[#101a4a] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1a2b7a]"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
