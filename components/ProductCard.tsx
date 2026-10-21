'use client';

import React from 'react';
import { Heart, Star, ShoppingBasket, Calculator, Eye, Sparkles } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onOpenCalculator: (product: Product) => void;
}

export function ProductCard({
  product,
  onQuickView,
  onOpenCalculator,
}: ProductCardProps) {
  const { addToCart, isWishlisted, toggleWishlist, setCartOpen } = useCart();
  const isSaved = isWishlisted(product.id);
  const unit = product.unit || 'sq.ft';
  const price = product.price ?? product.pricePerM2;
  const originalPrice = product.originalPrice ?? product.originalPricePerM2;
  const boxPrice = Math.round(price * product.boxCoverage);
  const unitLabel = unit === 'pc' ? 'pc' : 'sq.ft';
  const boxLabel = unit === 'pc' ? (product.boxCoverage === 1 ? '1 pc' : `${product.boxCoverage} pcs`) : `${product.boxCoverage} sq.ft`;
  const containerLabel = unit === 'pc' ? 'pack' : 'box';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onQuickView(product)}
          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded bg-[#d9272e] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Wishlist toggle"
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all active:scale-90 ${
            isSaved
              ? 'bg-red-50 text-red-600 shadow-md'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={16} className={isSaved ? 'fill-current' : ''} />
        </button>

        {/* Hover Quick View Pill */}
        <div className="absolute inset-x-0 bottom-2.5 flex justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1.5 rounded-full bg-[#101a4a]/90 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md transition-transform hover:scale-105 hover:bg-[#101a4a]"
          >
            <Eye size={13} /> Quick View
          </button>
        </div>
      </div>

      {/* Body Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span className="font-bold uppercase tracking-wider text-[#d9272e]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={12} className="fill-current" />
            <span className="font-bold text-slate-700">{product.rating}</span>
            <span className="text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          className="mt-1 cursor-pointer line-clamp-1 text-sm font-black text-[#101a4a] hover:text-[#d9272e]"
        >
          {product.name}
        </h3>

        {/* Dimensions & Finish info */}
        <p className="mt-0.5 text-[11px] text-slate-500">
          {product.dimensions} • {product.finish}
        </p>

        {/* Price Tag */}
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-[#101a4a]">
                ৳{price}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">/ {unitLabel}</span>
              {originalPrice > price && (
                <span className="text-[10px] text-slate-400 line-through ml-1">
                  ৳{originalPrice}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400">
              (৳{boxPrice} / {containerLabel} of {boxLabel})
            </p>
          </div>

          <button
            onClick={() => onOpenCalculator(product)}
            title="Calculate boxes needed"
            className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-600 transition-colors hover:border-[#101a4a] hover:bg-slate-50 hover:text-[#101a4a]"
          >
            <Calculator size={14} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-1.5 pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              addToCart(product, 1);
            }}
            className="flex flex-1 items-center justify-center gap-1.5 rounded bg-[#101a4a] py-2 text-xs font-bold text-white transition-colors hover:bg-[#1a2b7a] active:scale-[0.98]"
          >
            <ShoppingBasket size={14} /> Add {unit === 'pc' ? 'Pack' : 'Box'}
          </button>

          {product.sampleAvailable && (
            <button
              onClick={() => {
                addToCart(product, 1, true);
              }}
              className="rounded border border-slate-200 px-2.5 py-2 text-[11px] font-bold text-slate-700 transition-colors hover:bg-slate-100"
              title="Order cut tile sample"
            >
              Sample ৳150
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
