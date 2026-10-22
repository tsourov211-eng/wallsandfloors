'use client';

import React, { FormEvent, useMemo, useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Award,
  Calculator,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Heart,
  Menu,
  RotateCcw,
  Search,
  ShoppingBasket,
  Sparkles,
  Star,
  Store,
  Truck,
  UserRound,
  X,
} from 'lucide-react';
import { CartProvider, useCart } from '@/lib/cart-context';
import { PaymentIconsGrid } from '@/components/PaymentIcons';
import {
  CATEGORIES,
  CATEGORY_IMAGE_MAP,
  CustomerInspiration,
  INSPIRATIONS,
  Product,
  PRODUCTS,
} from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { FilterState, ProductFilters } from '@/components/ProductFilters';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { ProductQuickView } from '@/components/ProductQuickView';
import { TileCalculatorModal } from '@/components/TileCalculatorModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { InspirationModal } from '@/components/InspirationModal';
import { ShowroomModal } from '@/components/ShowroomModal';
import { TradeModal } from '@/components/TradeModal';
import { HelpModal } from '@/components/HelpModal';
import { Navbar } from '@/components/Navbar';
import { AccountModal } from '@/components/AccountModal';
import { HeroCarousel } from '@/components/HeroCarousel';

export default function Home() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}

function StoreApp() {
  const {
    totalItemsCount,
    setCartOpen,
    wishlist,
    setWishlistOpen,
  } = useCart();

  // Navigation & Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(true);

  // Search input & live dropdown
  const [headerSearch, setHeaderSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Product Filters State
  const initialFilterState: FilterState = {
    search: '',
    category: 'All Tiles',
    room: 'All Rooms',
    finish: 'All Finishes',
    maxPrice: 3000,
    inStockOnly: false,
    sortBy: 'featured',
  };
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorProduct, setCalculatorProduct] = useState<Product | null>(null);

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [inspirationModalOpen, setInspirationModalOpen] = useState(false);
  const [activeInspiration, setActiveInspiration] = useState<CustomerInspiration | null>(null);

  const [showroomsOpen, setShowroomsOpen] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // Close live search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered live search suggestions
  const searchSuggestions = useMemo(() => {
    const q = headerSearch.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.finish.toLowerCase().includes(q) ||
        p.rooms.some((r) => r.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [headerSearch]);

  // Main Filtered & Sorted Product List
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== 'All Tiles' && product.category !== filters.category) {
        return false;
      }

      // Room filter
      if (filters.room !== 'All Rooms' && !product.rooms.includes(filters.room)) {
        return false;
      }

      // Finish filter
      if (filters.finish !== 'All Finishes' && product.finish !== filters.finish) {
        return false;
      }

      // Price filter
      const price = product.price ?? product.pricePerM2;
      if (price > filters.maxPrice) {
        return false;
      }

      // In stock
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // Text search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        const matchesRoom = product.rooms.some((r) => r.toLowerCase().includes(query));
        if (!matchesName && !matchesCat && !matchesMaterial && !matchesRoom) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.price ?? a.pricePerM2;
      const priceB = b.price ?? b.pricePerM2;
      if (filters.sortBy === 'price-asc') return priceA - priceB;
      if (filters.sortBy === 'price-desc') return priceB - priceA;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'discount') {
        const origA = a.originalPrice ?? a.originalPricePerM2;
        const origB = b.originalPrice ?? b.originalPricePerM2;
        const discountA = origA - priceA;
        const discountB = origB - priceB;
        return discountB - discountA;
      }
      return 0; // 'featured' keep original order
    });
  }, [filters]);

  const handleHeaderSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      setFilters((prev) => ({ ...prev, search: headerSearch.trim() }));
      setSearchFocused(false);
      scrollToSection('products-catalog');
    }
  };

  const handleSelectCategory = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat, search: '' }));
    scrollToSection('products-catalog');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openProductQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const openProductCalculator = (product: Product) => {
    setCalculatorProduct(product);
    setCalculatorOpen(true);
  };

  const openInspiration = (insp: CustomerInspiration) => {
    setActiveInspiration(insp);
    setInspirationModalOpen(true);
  };

  const handleProductFromOtherModal = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      openProductQuickView(found);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f4f3] text-[#24211f]">
      {/* Top Banner Strip */}
      <div className="top-strip flex items-center justify-center gap-2">
        <Sparkles size={12} className="text-[#d9b67d]" />
        <span>BIG AUTUMN SALE: 20% OFF HUNDREDS OF TILES & PANELS — USE CODE <b>AUTUMN20</b></span>
      </div>

      {/* Redesigned Two-Tier Navbar */}
      <Navbar
        onSearchSubmit={(q) => {
          setFilters((prev) => ({ ...prev, search: q }));
          scrollToSection('products-catalog');
        }}
        onSelectCategory={(cat) => handleSelectCategory(cat)}
        onSelectRoom={(room) => {
          setFilters((prev) => ({ ...prev, room, search: '' }));
          scrollToSection('products-catalog');
        }}
        onOpenQuickView={openProductQuickView}
        onOpenHelp={() => setHelpModalOpen(true)}
        onOpenTrade={() => setTradeModalOpen(true)}
        onOpenShowrooms={() => setShowroomsOpen(true)}
        onOpenAccount={() => setAccountModalOpen(true)}
        activeCategory={filters.category}
      />

      {/* Digital Image Hero Carousel */}
      <HeroCarousel
        onShopSale={() => {
          setFilters({ ...initialFilterState, sortBy: 'discount' });
          scrollToSection('products-catalog');
        }}
        onOpenCalculator={() => {
          setCalculatorProduct(null);
          setCalculatorOpen(true);
        }}
        onSelectCategory={(cat) => handleSelectCategory(cat)}
        onScrollToSection={(sectionId) => scrollToSection(sectionId)}
      />

      {/* Trust Row */}
      <div className="trust-row">
        <div className="trust-item trust-delivery-item">
          <div className="truck-track" title="Fast Free Delivery over ৳5,000">
            <div className="truck-road-line" />
            <Truck size={21} className="truck-vehicle" />
          </div>
          <span>Free Delivery Over ৳5,000</span>
        </div>
        <div
          onClick={() => scrollToSection('customer-inspiration')}
          className="trust-item cursor-pointer hover:text-[#d9272e] transition-colors"
          title="Click to view customer reviews"
        >
          <Star size={20} className="text-amber-500 fill-amber-500 flex-shrink-0" />
          <span>Over 44,000 Verified Reviews</span>
        </div>
        <div className="trust-item">
          <CreditCard size={20} className="text-[#101a4a] flex-shrink-0" />
          <span>
            <strong className="font-bold text-[#101a4a]">Pay in 3</strong>{' '}
            <span>Choose PayPal / Klarna at Checkout</span>
          </span>
        </div>
        <div className="trust-item">
          <Award size={21} className="text-[#d9272e] flex-shrink-0" />
          <span>Quality Service Since 1987</span>
        </div>
      </div>

      {/* Shop By Category Section */}
      <section id="categories" className="mx-auto max-w-[1240px] px-4 py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="section-kicker">Curated Collections</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <button
            onClick={() => handleSelectCategory('All Tiles')}
            className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#101a4a] hover:text-[#d9272e] sm:flex"
          >
            Explore all {PRODUCTS.length} products <ArrowRight size={15} />
          </button>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((category) => {
            const count =
              category === 'All Tiles'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === category).length;
            const imgSrc = CATEGORY_IMAGE_MAP[category] || PRODUCTS[0].image;
            const isCurrent = filters.category === category;

            return (
              <button
                key={category}
                onClick={() => handleSelectCategory(category)}
                className={`category-card group text-left ${
                  isCurrent ? 'ring-4 ring-[#101a4a]' : ''
                }`}
              >
                <img src={imgSrc} alt={`${category} inspiration`} />
                <span className="category-copy">
                  <small>20% OFF SALE • {count} STYLES</small>
                  <strong>{category}</strong>
                  <em>SHOP NOW</em>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Calculator Interactive Callout Banner */}
      <section className="mx-auto max-w-[1240px] px-4 pb-12">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#101a4a] to-[#1c2c77] p-6 text-white shadow-xl sm:p-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#d9b67d]">
              <Calculator size={13} /> Free Room Planning Tool
            </div>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl">
              Calculate Exactly How Many Boxes You Need
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
              Input your room length and width in metres, and our tile calculator automatically factors in
              recommended 10% wastage for edge cuts and corner breaks.
            </p>
            <button
              onClick={() => {
                setCalculatorProduct(null);
                setCalculatorOpen(true);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded bg-[#d9272e] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow transition-transform hover:scale-105 hover:bg-[#b82026]"
            >
              Open Tile Calculator <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Products Catalog Section */}
      <section id="products-catalog" className="mx-auto max-w-[1240px] px-4 pb-16">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Live Catalog</p>
            <h2 className="section-title">
              {filters.category === 'All Tiles' ? 'All Tiles & Panels' : filters.category}
            </h2>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-8">
          <ProductFilters
            filters={filters}
            onChange={(newFilters) => setFilters(newFilters)}
            onReset={() => setFilters(initialFilterState)}
            totalMatches={filteredProducts.length}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={28} />
            </div>
            <h3 className="mt-4 text-base font-bold text-[#101a4a]">No tiles matched your filters</h3>
            <p className="mt-1 text-xs text-slate-500">
              Try adjusting your price range or clearing search keywords.
            </p>
            <button
              onClick={() => setFilters(initialFilterState)}
              className="mt-5 inline-flex items-center gap-1.5 rounded bg-[#101a4a] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1a2b7a]"
            >
              <RotateCcw size={14} /> Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={openProductQuickView}
                onOpenCalculator={openProductCalculator}
              />
            ))}
          </div>
        )}
      </section>

      {/* Customer Inspiration Section */}
      <section id="customer-inspiration" className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="section-kicker">Real Homes, Real Style</p>
            <h2 className="text-xl font-black text-[#101a4a] sm:text-2xl">
              Customer Gallery & Reviews
            </h2>
          </div>
          <p className="hidden text-xs text-slate-500 sm:block">
            Click any project to see customer review &amp; featured tiles
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INSPIRATIONS.map((insp) => (
            <div
              key={insp.id}
              onClick={() => openInspiration(insp)}
              className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={insp.image}
                  alt={insp.room}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
                  {insp.room}
                </span>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-bold text-slate-800">{insp.handle}</p>
                <p className="line-clamp-1 text-[10px] text-slate-500">{insp.productName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Brand Section */}
      <section id="about" className="mx-auto max-w-[960px] px-5 pb-16 text-center">
        <p className="section-kicker">Why Shop With Us</p>
        <h2 className="section-title">The UK&apos;s Leading Tile & Panelling Company</h2>
        <p className="mx-auto mt-4 max-w-[840px] text-xs leading-relaxed text-[#5d5b59] sm:text-sm">
          Since our establishment in 1987, Walls and Floors has grown into the UK’s premier destination for porcelain, ceramic, natural slate tiles and waterproof shower wall panels. With over 20 million square metres delivered nationwide, our award-winning British customer care team provides specialist advice, fast pallet delivery and a guaranteed price promise.
        </p>
        <div className="mt-5 flex justify-center gap-4">
          <button
            onClick={() => setShowroomsOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101a4a] underline underline-offset-4 hover:text-[#d9272e]"
          >
            Visit Our UK Showrooms <ArrowRight size={14} />
          </button>
          <button
            onClick={() => setTradeModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101a4a] underline underline-offset-4 hover:text-[#d9272e]"
          >
            Open Trade Account <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Service Highlights Bar */}
      <section className="service-bar">
        <div>
          <Truck size={22} className="text-[#d9b67d]" />
          <span>
            <b>Free Delivery Over ৳5,000</b>
            <small>Tracked pallet delivery on selected products</small>
          </span>
        </div>
        <div onClick={() => setHelpModalOpen(true)} className="cursor-pointer hover:bg-white/5 transition-colors">
          <CircleHelp size={22} className="text-[#d9b67d]" />
          <span>
            <b>Need Technical Help?</b>
            <small>Direct advice from qualified tile specialists</small>
          </span>
        </div>
        <div onClick={() => scrollToSection('customer-inspiration')} className="cursor-pointer hover:bg-white/5 transition-colors">
          <Star size={22} className="text-[#d9b67d]" />
          <span>
            <b>4.9 / 5 Trustpilot Reviews</b>
            <small>Trusted by thousands of British homeowners</small>
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5c5c5c] px-5 pb-28 pt-12 text-white sm:px-10">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-6 sm:gap-9 lg:grid-cols-4">
          <div>
            <h3 className="footer-title">Customer Services</h3>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <button onClick={() => setHelpModalOpen(true)} className="hover:text-white hover:underline text-left">
                  Contact Us & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setHelpModalOpen(true)} className="hover:text-white hover:underline text-left">
                  Delivery Information
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectCategory('All Tiles')} className="hover:text-white hover:underline text-left">
                  Sample Service (৳150)
                </button>
              </li>
              <li>
                <button onClick={() => setHelpModalOpen(true)} className="hover:text-white hover:underline text-left">
                  Returns and Refunds
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Here to Help</h3>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <button onClick={() => setCalculatorOpen(true)} className="hover:text-white hover:underline text-left">
                  Tile & Box Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setHelpModalOpen(true)} className="hover:text-white hover:underline text-left">
                  Underfloor Heating
                </button>
              </li>
              <li>
                <button onClick={() => setHelpModalOpen(true)} className="hover:text-white hover:underline text-left">
                  Anti-Slip R-Rating Guide
                </button>
              </li>
              <li>
                <button onClick={() => setShowroomsOpen(true)} className="hover:text-white hover:underline text-left">
                  Showroom Visits
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Company</h3>
            <ul className="space-y-2 text-xs text-white/75">
              <li>
                <button onClick={() => setTradeModalOpen(true)} className="hover:text-white hover:underline text-left">
                  Trade Account (15% Off)
                </button>
              </li>
              <li>
                <button onClick={() => setShowroomsOpen(true)} className="hover:text-white hover:underline text-left">
                  Showroom Locations
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-white hover:underline text-left">
                  About Walls & Floors
                </a>
              </li>
              <li>
                <button onClick={() => setHelpModalOpen(true)} className="hover:text-white hover:underline text-left">
                  Price Match Promise
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Trade & Connect</h3>
            <button
              onClick={() => setTradeModalOpen(true)}
              className="flex w-full items-center justify-between rounded border border-white/25 bg-white/10 px-3.5 py-2.5 text-xs transition-colors hover:bg-white/20"
            >
              <span>Trade Account</span>
              <span className="font-bold text-[#d9b67d]">Apply / Login</span>
            </button>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-white/75">
              Accepted Cards &amp; Payment
            </p>
            <div className="mt-2">
              <PaymentIconsGrid itemClassName="h-6 w-10 text-[9px]" />
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM BAR */}
        <div className="mx-auto mt-10 max-w-[1240px] border-t border-white/20 pt-5 text-[11px] text-white/60">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Walls and Floors Ltd. All rights reserved. Beautiful spaces start here.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70">
              <a href="#privacy" className="hover:text-white hover:underline transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#terms" className="hover:text-white hover:underline transition-colors">
                Terms of Sale
              </a>
              <span>•</span>
              <button
                type="button"
                onClick={() => setCookieVisible(true)}
                className="hover:text-white hover:underline transition-colors"
              >
                Cookie Preferences
              </button>
              <span>•</span>
              <a href="#security" className="hover:text-white hover:underline transition-colors">
                Security & Fraud Protection
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {cookieVisible && (
        <div className="cookie-banner">
          <p>
            We use cookies to deliver a tailored shopping experience and free sample service.
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              className="cookie-secondary"
              onClick={() => setCookieVisible(false)}
            >
              Manage
            </button>
            <button
              className="cookie-primary"
              onClick={() => setCookieVisible(false)}
            >
              Accept All
            </button>
          </div>
        </div>
      )}

      {/* Back to Top Floating Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#101a4a] shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-50"
      >
        <ChevronDown className="rotate-180" size={20} />
      </button>

      {/* ALL MODALS & DRAWERS */}
      <CartDrawer
        onCheckoutClick={() => setCheckoutOpen(true)}
        onExploreClick={() => scrollToSection('products-catalog')}
      />

      <WishlistDrawer onProductClick={handleProductFromOtherModal} />

      <ProductQuickView
        product={quickViewProduct}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        onOpenCalculator={(p) => {
          setQuickViewOpen(false);
          openProductCalculator(p);
        }}
      />

      <TileCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        initialProduct={calculatorProduct}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      <InspirationModal
        inspiration={activeInspiration}
        isOpen={inspirationModalOpen}
        onClose={() => setInspirationModalOpen(false)}
        onProductClick={handleProductFromOtherModal}
      />

      <ShowroomModal
        isOpen={showroomsOpen}
        onClose={() => setShowroomsOpen(false)}
      />

      <TradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />

      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
      />
    </main>
  );
}
