'use client';

import React, { useState } from 'react';
import { X, Heart, ShoppingBasket, ArrowRight, Sparkles } from 'lucide-react';
import { CustomerInspiration, PRODUCTS } from '@/lib/data';
import { useCart } from '@/lib/cart-context';

interface InspirationModalProps {
  inspiration: CustomerInspiration | null;
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (productId: string) => void;
}

export function InspirationModal({
  inspiration,
  isOpen,
  onClose,
  onProductClick,
}: InspirationModalProps) {
  const { addToCart } = useCart();
  const [likes, setLikes] = useState<number>(inspiration?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  // Sync likes when inspiration changes
  React.useEffect(() => {
    if (inspiration) {
      setLikes(inspiration.likes);
      setHasLiked(false);
    }
  }, [inspiration]);

  if (!isOpen || !inspiration) return null;

  const featuredProduct = PRODUCTS.find((p) => p.id === inspiration.productId);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-50 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close inspiration view"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black"
        >
          <X size={16} />
        </button>

        {/* Left: Big photo */}
        <div className="relative aspect-square w-full md:w-1/2">
          <img
            src={inspiration.image}
            alt={inspiration.room}
            className="h-full w-full object-cover"
          />
          <button
            onClick={handleLike}
            className={`absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md transition-transform active:scale-95 ${
              hasLiked
                ? 'bg-rose-600 text-white'
                : 'bg-white/85 text-slate-800 hover:bg-white'
            }`}
          >
            <Heart size={14} className={hasLiked ? 'fill-current' : ''} />
            <span>{likes}</span>
          </button>
        </div>

        {/* Right: Details & Product */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#d9272e]">
                {inspiration.room}
              </span>
              <span className="text-xs font-bold text-slate-500">{inspiration.handle}</span>
            </div>

            <h3 className="mt-2 text-lg font-black text-[#101a4a]">
              Real Customer Home Renovation
            </h3>

            <p className="mt-3 text-xs italic leading-relaxed text-slate-700">
              &ldquo;{inspiration.quote}&rdquo;
            </p>
          </div>

          {/* Featured Product Box */}
          {featuredProduct && (() => {
            const price = featuredProduct.price ?? featuredProduct.pricePerM2;
            const unit = featuredProduct.unit || 'sq.ft';
            const unitLabel = unit === 'pc' ? 'pc' : 'sq.ft';
            const containerLabel = unit === 'pc' ? 'Pack' : 'Box';
            return (
              <div className="mt-6 rounded-lg border border-slate-200 bg-[#f9f8f6] p-3.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#101a4a]">
                  <Sparkles size={12} className="text-amber-500" />
                  Featured In This Project:
                </div>

                <div className="mt-2 flex gap-3">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="h-14 w-14 rounded object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-1 text-xs font-bold text-[#101a4a]">
                      {featuredProduct.name}
                    </h4>
                    <p className="text-[11px] font-bold text-[#d9272e]">
                      ৳{price} / {unitLabel}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onProductClick(featuredProduct.id);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#101a4a] hover:underline"
                      >
                        View Tile <ArrowRight size={12} />
                      </button>
                      <button
                        onClick={() => addToCart(featuredProduct, 1)}
                        className="rounded bg-[#101a4a] px-2.5 py-1 text-[10px] font-bold text-white hover:bg-[#1a2b7a]"
                      >
                        Add 1 {containerLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
