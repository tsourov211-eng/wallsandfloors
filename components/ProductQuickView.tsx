'use client';

import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBasket,
  Heart,
  Truck,
  CheckCircle2,
  Calculator,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator: (product: Product) => void;
}

export function ProductQuickView({
  product,
  isOpen,
  onClose,
  onOpenCalculator,
}: ProductQuickViewProps) {
  const { addToCart, isWishlisted, toggleWishlist, setCartOpen } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantityBoxes, setQuantityBoxes] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');

  // Interactive reviews state
  const [userReviews, setUserReviews] = useState<
    { id: string; author: string; rating: number; title: string; date: string; comment: string }[]
  >([
    {
      id: 'rev-1',
      author: 'Sarah Jenkins',
      rating: 5,
      date: '14 Oct 2026',
      title: 'Stunning luxury finish!',
      comment:
        'We tiled our master en-suite and the quality is outstanding. The edges are sharp and the surface cleans without streaks.',
    },
    {
      id: 'rev-2',
      author: 'David M.',
      rating: 5,
      date: '28 Sep 2026',
      title: 'Our builder was very impressed',
      comment:
        'Very consistent sizing between boxes with virtually zero breakage in delivery. Highly recommend adding the 10% wastage.',
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  if (!isOpen || !product) return null;

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const unit = product.unit || 'sq.ft';
  const price = product.price ?? product.pricePerM2;
  const originalPrice = product.originalPrice ?? product.originalPricePerM2;
  const boxPrice = Math.round(price * product.boxCoverage);
  const currentCoverage = quantityBoxes * product.boxCoverage;
  const totalPrice = Math.round(quantityBoxes * boxPrice);
  const isSaved = isWishlisted(product.id);
  const unitLabel = unit === 'pc' ? 'pc' : 'sq.ft';
  const boxLabel = unit === 'pc' ? (product.boxCoverage === 1 ? '1 pc' : `${product.boxCoverage} pcs`) : `${product.boxCoverage} sq.ft`;
  const containerLabel = unit === 'pc' ? 'pack' : 'box';

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    setUserReviews((prev) => [
      {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor.trim(),
        rating: newReviewRating,
        date: 'Today',
        title: 'Verified Customer Review',
        comment: newReviewComment.trim(),
      },
      ...prev,
    ]);

    setNewReviewAuthor('');
    setNewReviewComment('');
    toast.success('Thank you! Your review has been published.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-50 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition-all hover:bg-slate-100 hover:text-black"
        >
          <X size={18} />
        </button>

        <div className="grid flex-1 overflow-y-auto md:grid-cols-2">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col bg-slate-50 p-4 sm:p-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-200">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute left-3 top-3 rounded bg-[#d9272e] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#101a4a] ring-2 ring-[#101a4a]/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 rounded bg-white p-2 border border-slate-200/70">
                <Truck size={14} className="text-[#101a4a]" />
                <span>Free delivery over ৳5,000</span>
              </div>
              <div className="flex items-center gap-1.5 rounded bg-white p-2 border border-slate-200/70">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Lifetime Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col p-5 sm:p-7">
            {/* Category & Title */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#d9272e]">
                {product.category}
              </p>
              <h2 className="mt-1 text-xl font-black text-[#101a4a] sm:text-2xl">
                {product.name}
              </h2>
              <p className="mt-1 text-xs text-slate-600">{product.subtitle}</p>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mt-4 rounded-lg border border-slate-200 bg-[#fbfaf8] p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#101a4a]">
                  ৳{price}
                </span>
                <span className="text-xs font-bold text-slate-600">/ {unitLabel}</span>
                {originalPrice > price && (
                  <span className="text-xs text-slate-400 line-through ml-1">
                    ৳{originalPrice} / {unitLabel}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Sold in {containerLabel}s of <b>{boxLabel}</b> ={' '}
                <b className="text-slate-900">৳{boxPrice} per {containerLabel}</b>
              </p>
            </div>

            {/* Quantity Selector & Calculator Trigger */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select {unit === 'pc' ? 'Packs' : 'Boxes'}:
                </span>
                <button
                  type="button"
                  onClick={() => onOpenCalculator(product)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101a4a] hover:text-[#d9272e]"
                >
                  <Calculator size={14} /> Room Area Calculator
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded border border-slate-300 bg-white">
                  <button
                    onClick={() => setQuantityBoxes(Math.max(1, quantityBoxes - 1))}
                    className="flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-slate-100"
                  >
                    <Minus size={15} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantityBoxes}
                    onChange={(e) => setQuantityBoxes(Math.max(1, parseInt(e.target.value) || 1))}
                    className="h-10 w-12 text-center text-sm font-bold text-slate-900 outline-none"
                  />
                  <button
                    onClick={() => setQuantityBoxes(quantityBoxes + 1)}
                    className="flex h-10 w-10 items-center justify-center text-slate-600 hover:bg-slate-100"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <div className="text-xs text-slate-600">
                  Coverage: <b className="text-slate-900">~{currentCoverage} {unit === 'pc' ? 'pcs' : 'sq.ft'}</b>
                  <p className="text-[11px] text-slate-500">
                    Total: <b className="text-[#101a4a]">৳{totalPrice}</b>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  addToCart(product, quantityBoxes);
                  onClose();
                  setCartOpen(true);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded bg-[#d9272e] py-3 text-xs font-black uppercase tracking-wider text-white shadow transition-all hover:bg-[#b82026] active:scale-[0.99]"
              >
                <ShoppingBasket size={16} /> Add to Basket • ৳{totalPrice}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Save to wishlist"
                className={`flex h-12 w-12 items-center justify-center rounded border transition-colors ${
                  isSaved
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-slate-300 text-slate-600 hover:border-slate-400'
                }`}
              >
                <Heart size={20} className={isSaved ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Sample Order */}
            {product.sampleAvailable && (
              <div className="mt-3 flex items-center justify-between rounded border border-slate-200 p-2.5 text-xs">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Sparkles size={14} className="text-amber-500" />
                  Not sure? Order a full cut tile sample
                </span>
                <button
                  onClick={() => addToCart(product, 1, true)}
                  className="rounded bg-[#101a4a] px-3 py-1.5 font-bold text-white hover:bg-[#1a2b7a]"
                >
                  Order Sample ৳150
                </button>
              </div>
            )}

            {/* Details Tabs */}
            <div className="mt-6 border-t border-slate-200 pt-4">
              <div className="flex border-b border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`border-b-2 pb-2 pr-4 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-[#101a4a] text-[#101a4a]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`border-b-2 pb-2 px-4 transition-colors ${
                    activeTab === 'features'
                      ? 'border-[#101a4a] text-[#101a4a]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Key Features
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`border-b-2 pb-2 px-4 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-[#101a4a] text-[#101a4a]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Reviews ({userReviews.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-3 text-xs text-slate-600">
                {activeTab === 'specs' && (
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <dt className="text-slate-400 text-[11px]">Dimensions:</dt>
                      <dd className="font-semibold text-slate-900">{product.dimensions}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 text-[11px]">Material:</dt>
                      <dd className="font-semibold text-slate-900">{product.material}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 text-[11px]">Surface Finish:</dt>
                      <dd className="font-semibold text-slate-900">{product.finish}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 text-[11px]">Thickness:</dt>
                      <dd className="font-semibold text-slate-900">{product.thickness}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 text-[11px]">Slip Rating:</dt>
                      <dd className="font-semibold text-slate-900">{product.slipRating}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400 text-[11px]">Suitable Rooms:</dt>
                      <dd className="font-semibold text-slate-900">{product.rooms.join(', ')}</dd>
                    </div>
                  </dl>
                )}

                {activeTab === 'features' && (
                  <ul className="space-y-1.5">
                    {product.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="shrink-0 text-emerald-600 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {/* Existing reviews */}
                    <div className="space-y-3">
                      {userReviews.map((rev) => (
                        <div key={rev.id} className="rounded bg-slate-50 p-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{rev.author}</span>
                            <span className="text-[10px] text-slate-400">{rev.date}</span>
                          </div>
                          <div className="flex text-amber-500 my-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} size={11} className="fill-current" />
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-700">{rev.comment}</p>
                        </div>
                      ))}
                    </div>

                    {/* Submit Review Form */}
                    <form onSubmit={handleAddReview} className="border-t border-slate-200 pt-3">
                      <p className="font-bold text-slate-800 text-xs mb-2">Write a Customer Review</p>
                      <div className="space-y-2">
                        <input
                          placeholder="Your Name"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          className="w-full rounded border border-slate-300 p-2 text-xs outline-none focus:border-[#101a4a]"
                          required
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500">Your Rating:</span>
                          <div className="flex gap-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setNewReviewRating(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  size={15}
                                  className={star <= newReviewRating ? 'fill-current' : 'text-slate-300'}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <textarea
                          placeholder="Share your experience with this tile..."
                          rows={2}
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          className="w-full rounded border border-slate-300 p-2 text-xs outline-none focus:border-[#101a4a]"
                          required
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded bg-[#101a4a] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1a2b7a]"
                        >
                          <Send size={12} /> Post Review
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
