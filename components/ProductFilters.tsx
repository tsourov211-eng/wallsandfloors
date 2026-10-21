'use client';

import React from 'react';
import { Filter, RotateCcw, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

export interface FilterState {
  search: string;
  category: string;
  room: string;
  finish: string;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalMatches: number;
}

export function ProductFilters({
  filters,
  onChange,
  onReset,
  totalMatches,
}: ProductFiltersProps) {
  const rooms = ['All Rooms', 'Bathroom', 'Kitchen', 'Living Room', 'Hallway', 'Outdoor'];
  const finishes = ['All Finishes', 'Matt', 'Gloss', 'Polished', 'Textured'];

  const hasActiveFilters =
    filters.category !== 'All Tiles' ||
    filters.room !== 'All Rooms' ||
    filters.finish !== 'All Finishes' ||
    filters.maxPrice < 55 ||
    filters.inStockOnly ||
    filters.search !== '';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Top row: Search & Sort & Reset */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search tiles by name, finish or material..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="h-9 w-full rounded-md border border-slate-300 bg-slate-50/60 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#101a4a] focus:bg-white focus:outline-none"
          />
        </div>

        {/* Sort & Match Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">
            Showing <b className="text-slate-900">{totalMatches}</b> tiles
          </span>

          <div className="flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2 py-1">
            <ArrowUpDown size={13} className="text-slate-500" />
            <label htmlFor="filter-sort" className="sr-only">Sort products</label>
            <select
              id="filter-sort"
              value={filters.sortBy}
              onChange={(e) =>
                onChange({
                  ...filters,
                  sortBy: e.target.value as FilterState['sortBy'],
                })
              }
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Sale Discount</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#d9272e] hover:underline"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Categories Scroll Pills */}
      <div className="mt-4 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#101a4a] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary filter chips: Room, Finish, Price */}
      <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 sm:grid-cols-3">
        {/* Room Filter */}
        <div>
          <label htmlFor="filter-room" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Suitable Room:
          </label>
          <select
            id="filter-room"
            value={filters.room}
            onChange={(e) => onChange({ ...filters, room: e.target.value })}
            className="h-8 w-full rounded border border-slate-300 bg-white px-2 text-xs font-medium text-slate-800 focus:border-[#101a4a] focus:outline-none"
          >
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Finish Filter */}
        <div>
          <label htmlFor="filter-finish" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Surface Finish:
          </label>
          <select
            id="filter-finish"
            value={filters.finish}
            onChange={(e) => onChange({ ...filters, finish: e.target.value })}
            className="h-8 w-full rounded border border-slate-300 bg-white px-2 text-xs font-medium text-slate-800 focus:border-[#101a4a] focus:outline-none"
          >
            {finishes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Slider */}
        <div>
          <div className="mb-1 flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <label htmlFor="filter-max-price">Max Price: ৳{filters.maxPrice.toLocaleString()}</label>
            <span className="text-[#101a4a]">Up to ৳{filters.maxPrice.toLocaleString()}</span>
          </div>
          <input
            id="filter-max-price"
            type="range"
            min="100"
            max="3000"
            step="50"
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: parseFloat(e.target.value) })
            }
            className="h-2 w-full cursor-pointer accent-[#101a4a]"
          />
        </div>
      </div>
    </div>
  );
}
