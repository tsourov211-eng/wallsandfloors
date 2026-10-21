'use client';

import React, { useState } from 'react';
import { Calculator, X, ShoppingBasket, Info } from 'lucide-react';
import { Product, PRODUCTS } from '@/lib/data';
import { useCart } from '@/lib/cart-context';

interface TileCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

export function TileCalculatorModal({
  isOpen,
  onClose,
  initialProduct,
}: TileCalculatorModalProps) {
  const { addToCart, setCartOpen } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    initialProduct || PRODUCTS[0]
  );
  const [calcMode, setCalcMode] = useState<'dimensions' | 'area'>('dimensions');
  const [lengthFt, setLengthFt] = useState<number>(12);
  const [widthFt, setWidthFt] = useState<number>(10);
  const [directSqft, setDirectSqft] = useState<number>(120);
  const [wastePercent, setWastePercent] = useState<number>(10); // 10% standard

  if (!isOpen) return null;

  // Active product
  const product = initialProduct || selectedProduct;
  const unit = product.unit || 'sq.ft';
  const price = product.price ?? product.pricePerM2;
  const originalPrice = product.originalPrice ?? product.originalPricePerM2;
  const unitLabel = unit === 'pc' ? 'pc' : 'sq.ft';
  const containerLabel = unit === 'pc' ? 'Pack' : 'Box';

  // Calculations
  const baseArea = calcMode === 'dimensions' ? Math.max(1, lengthFt * widthFt) : Math.max(1, directSqft);
  const wasteArea = Math.round((baseArea * wastePercent) / 100);
  const totalAreaRequired = baseArea + wasteArea;
  const boxesNeeded = Math.ceil(totalAreaRequired / product.boxCoverage);
  const totalCoverageSupplied = Math.round(boxesNeeded * product.boxCoverage * 10) / 10;
  const boxPrice = Math.round(price * product.boxCoverage);
  const totalCost = boxesNeeded * boxPrice;
  const standardCost = Math.round(boxesNeeded * originalPrice * product.boxCoverage);
  const totalSavings = standardCost > totalCost ? standardCost - totalCost : 0;

  const handleAddBoxesToCart = () => {
    addToCart(product, boxesNeeded);
    onClose();
    setCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-50 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#101a4a] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <Calculator size={20} className="text-[#d9b67d]" />
            <h2 className="text-base font-black uppercase tracking-wider">
              Tile & {containerLabel} Area Calculator
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close calculator"
            className="rounded p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Tile Selector if not fixed */}
          {!initialProduct && (
            <div className="mb-5">
              <label htmlFor="product-select" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Tile or Panel:
              </label>
              <select
                id="product-select"
                value={selectedProduct.id}
                onChange={(e) => {
                  const found = PRODUCTS.find((p) => p.id === e.target.value);
                  if (found) setSelectedProduct(found);
                }}
                className="w-full rounded border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-800 focus:border-[#101a4a] focus:outline-none"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ৳{p.price} / {p.unit} ({p.boxCoverage} {p.unit === 'pc' ? 'pcs' : 'sq.ft'}/{p.unit === 'pc' ? 'pack' : 'box'})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Active Product Banner */}
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f9f8f6] p-3">
            <img
              src={product.image}
              alt={product.name}
              className="h-14 w-14 rounded object-cover shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 text-xs font-bold text-[#101a4a]">
                {product.name}
              </h3>
              <p className="text-[11px] text-slate-500">
                Coverage: <b>{product.boxCoverage} {unitLabel}</b> | Dimensions: <b>{product.dimensions}</b>
              </p>
              <p className="text-xs font-extrabold text-[#d9272e]">
                ৳{price} / {unitLabel}{' '}
                <span className="text-[11px] font-normal text-slate-500">
                  (৳{boxPrice} per {containerLabel.toLowerCase()})
                </span>
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="mb-5 grid grid-cols-2 gap-2 rounded bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setCalcMode('dimensions')}
              className={`rounded py-1.5 text-xs font-bold transition-all ${
                calcMode === 'dimensions'
                  ? 'bg-white text-[#101a4a] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Enter Dimensions (Feet)
            </button>
            <button
              type="button"
              onClick={() => setCalcMode('area')}
              className={`rounded py-1.5 text-xs font-bold transition-all ${
                calcMode === 'area'
                  ? 'bg-white text-[#101a4a] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Enter Total {unitLabel} Directly
            </button>
          </div>

          {/* Input Fields */}
          {calcMode === 'dimensions' ? (
            <div className="mb-5 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="room-length" className="mb-1 block text-xs font-bold text-slate-700">
                  Room Length (Feet):
                </label>
                <div className="flex items-center rounded border border-slate-300">
                  <input
                    id="room-length"
                    type="number"
                    step="0.5"
                    min="1"
                    value={lengthFt}
                    onChange={(e) => setLengthFt(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  />
                  <span className="px-3 text-xs font-medium text-slate-400">ft</span>
                </div>
              </div>
              <div>
                <label htmlFor="room-width" className="mb-1 block text-xs font-bold text-slate-700">
                  Room Width (Feet):
                </label>
                <div className="flex items-center rounded border border-slate-300">
                  <input
                    id="room-width"
                    type="number"
                    step="0.5"
                    min="1"
                    value={widthFt}
                    onChange={(e) => setWidthFt(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                  />
                  <span className="px-3 text-xs font-medium text-slate-400">ft</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-5">
              <label htmlFor="direct-area" className="mb-1 block text-xs font-bold text-slate-700">
                Total Wall or Floor Area:
              </label>
              <div className="flex items-center rounded border border-slate-300">
                <input
                  id="direct-area"
                  type="number"
                  step="1"
                  min="1"
                  value={directSqft}
                  onChange={(e) => setDirectSqft(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs font-bold text-slate-800 outline-none"
                />
                <span className="px-3 text-xs font-medium text-slate-400">{unitLabel}</span>
              </div>
            </div>
          )}

          {/* Waste Allowance */}
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50/60 p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Info size={14} className="text-amber-700" />
                <span className="text-xs font-bold text-amber-900">
                  Add 10% for cuts & wastage (Recommended)
                </span>
              </div>
              <div className="flex gap-1.5">
                {[0, 5, 10, 15].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setWastePercent(pct)}
                    className={`rounded px-2 py-0.5 text-xs font-bold transition-colors ${
                      wastePercent === pct
                        ? 'bg-[#101a4a] text-white'
                        : 'bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-1 text-[11px] text-amber-800/80">
              Professional tilers always advise adding 10% to accommodate cuts around corners, doorways, sockets and pattern matching.
            </p>
          </div>

          {/* Calculation Results Card */}
          <div className="rounded-lg bg-[#101a4a] p-5 text-white">
            <div className="grid grid-cols-2 gap-4 border-b border-white/15 pb-4 text-xs">
              <div>
                <p className="text-white/60">Actual Room Area</p>
                <p className="text-lg font-bold">{baseArea} {unitLabel}</p>
              </div>
              <div>
                <p className="text-white/60">Waste Allowance ({wastePercent}%)</p>
                <p className="text-lg font-bold">+{wasteArea} {unitLabel}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#d9b67d]">
                  Total {containerLabel}s Required:
                </p>
                <p className="text-3xl font-black">{boxesNeeded} {containerLabel}s</p>
                <p className="text-[11px] text-white/70">
                  Provides <b>{totalCoverageSupplied} {unitLabel}</b> total coverage
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-white/60">
                  Estimated Total:
                </p>
                <p className="text-2xl font-black text-[#d9b67d]">
                  ৳{totalCost.toLocaleString()}
                </p>
                {totalSavings > 0 && (
                  <p className="text-[11px] font-bold text-emerald-400">
                    You save ৳{totalSavings.toLocaleString()} (Autumn Sale)
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleAddBoxesToCart}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-[#d9272e] py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#b82026] active:scale-[0.99]"
            >
              <ShoppingBasket size={16} /> Add {boxesNeeded} {containerLabel}s To Basket • ৳{totalCost.toLocaleString()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
