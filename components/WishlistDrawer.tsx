'use client';

import React from 'react';
import { Heart, X, ShoppingBasket, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { PRODUCTS } from '@/lib/data';
import { toast } from 'sonner';

interface WishlistDrawerProps {
  onProductClick: (productId: string) => void;
}

export function WishlistDrawer({ onProductClick }: WishlistDrawerProps) {
  const {
    wishlist,
    wishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
    setCartOpen,
  } = useCart();

  if (!wishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    if (wishlistedProducts.length === 0) return;
    wishlistedProducts.forEach((p) => {
      addToCart(p, 1);
    });
    toast.success(`Moved ${wishlistedProducts.length} items to your basket!`);
    setWishlistOpen(false);
    setCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setWishlistOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#101a4a] px-5 py-4 text-white">
          <div className="flex items-center gap-2">
            <Heart size={20} className="fill-[#d9272e] text-[#d9272e]" />
            <h2 className="text-base font-black uppercase tracking-wider">Saved Items</h2>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={() => setWishlistOpen(false)}
            aria-label="Close wishlist"
            className="rounded p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {wishlistedProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-400">
                <Heart size={32} />
              </div>
              <p className="mt-4 text-base font-bold text-[#101a4a]">No saved items yet</p>
              <p className="mt-1 text-xs text-slate-500">
                Tap the heart on any tile to save it for your renovation moodboard.
              </p>
              <button
                onClick={() => setWishlistOpen(false)}
                className="mt-5 inline-flex items-center gap-2 rounded bg-[#101a4a] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1a2b7a]"
              >
                Browse Tiles & Panels <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-slate-100">
              {wishlistedProducts.map((product) => {
                const price = product.price ?? product.pricePerM2;
                const unit = product.unit || 'sq.ft';
                const boxPrice = Math.round(price * product.boxCoverage);
                const unitLabel = unit === 'pc' ? 'pc' : 'sq.ft';
                const containerLabel = unit === 'pc' ? 'pack' : 'box';
                return (
                  <div key={product.id} className="pt-4 first:pt-0">
                    <div className="flex gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => {
                          setWishlistOpen(false);
                          onProductClick(product.id);
                        }}
                        className="h-20 w-20 cursor-pointer shrink-0 rounded object-cover transition-opacity hover:opacity-90"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-1">
                          <h3
                            onClick={() => {
                              setWishlistOpen(false);
                              onProductClick(product.id);
                            }}
                            className="cursor-pointer line-clamp-1 text-xs font-bold text-[#101a4a] hover:underline"
                          >
                            {product.name}
                          </h3>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            aria-label="Remove from wishlist"
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {product.dimensions} • {product.finish} Finish
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-sm font-black text-[#101a4a]">
                            ৳{price} / {unitLabel}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            (৳{boxPrice}/{containerLabel})
                          </span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => {
                              addToCart(product, 1);
                            }}
                            className="flex flex-1 items-center justify-center gap-1.5 rounded bg-[#101a4a] py-1.5 text-[11px] font-bold text-white hover:bg-[#1a2b7a]"
                          >
                            <ShoppingBasket size={13} /> Add to Basket
                          </button>
                          {product.sampleAvailable && (
                            <button
                              onClick={() => {
                                addToCart(product, 1, true);
                              }}
                              className="rounded border border-slate-200 px-2 py-1.5 text-[10px] font-bold text-slate-700 hover:bg-slate-100"
                            >
                              Sample ৳150
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="border-t border-slate-200 bg-white p-5">
            <button
              onClick={handleMoveAllToCart}
              className="flex w-full items-center justify-center gap-2 rounded bg-[#101a4a] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1a2b7a]"
            >
              <ShoppingBasket size={15} /> Move All to Basket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
