'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import {
  Search,
  MessageSquareText,
  ShoppingBasket,
  X,
  Menu,
  ChevronDown,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Product, PRODUCTS } from '@/lib/data';

interface NavbarProps {
  onSearchSubmit: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectRoom: (room: string) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenHelp: () => void;
  onOpenTrade: () => void;
  onOpenShowrooms: () => void;
  onOpenAccount: () => void;
  activeCategory: string;
}

// Custom Trowel Icon matching the reference image exactly
function TrowelIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 13.5L13.5 3L18 7.5L7.5 18L3 13.5Z" fill="white" />
      <path
        d="M13 11.5L17.5 16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 15L21.5 20"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Custom Location Pin Icon matching the reference image
function ShowroomPinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C7.58 2 4 5.58 4 10C4 15.3 12 22 12 22C12 22 20 15.3 20 10C20 5.58 16.42 2 12 2ZM12 12.8C10.45 12.8 9.2 11.55 9.2 10C9.2 8.45 10.45 7.2 12 7.2C13.55 7.2 14.8 8.45 14.8 10C14.8 11.55 13.55 12.8 12 12.8Z"
      />
    </svg>
  );
}

// Custom Solid User Silhouette Icon matching reference image
function UserSolidIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2.5c-3.33 0-10 1.67-10 5v2.5h20v-2.5c0-3.33-6.67-5-10-5z" />
    </svg>
  );
}

interface MegaMenuSubItem {
  label: string;
  category?: string;
  room?: string;
}

interface MegaMenuColumn {
  heading: string;
  items: MegaMenuSubItem[];
}

interface NavItemConfig {
  label: string;
  category?: string;
  columns: MegaMenuColumn[];
}

// Comprehensive Mega Menu Data matching the user's reference screenshot structure
const MEGA_MENUS: NavItemConfig[] = [
  {
    label: 'Shop by Room',
    columns: [
      {
        heading: 'Bathroom',
        items: [
          { label: 'Bathroom Tiles', category: 'Wall Tiles', room: 'Bathroom' },
          { label: 'Shower Panels', category: 'Shower Panels', room: 'Bathroom' },
          { label: 'Vinyl Flooring', category: 'Floor Tiles', room: 'Bathroom' },
        ],
      },
      {
        heading: 'Kitchen',
        items: [
          { label: 'Kitchen Tiles', category: 'Metro Tiles', room: 'Kitchen' },
          { label: 'Wall Panels', category: 'Wall Tiles', room: 'Kitchen' },
          { label: 'Vinyl Flooring', category: 'Floor Tiles', room: 'Kitchen' },
        ],
      },
      {
        heading: 'Living Room',
        items: [
          { label: 'Living Room Tiles', category: 'Wood Effect Tiles', room: 'Living Room' },
          { label: 'Wall Panels', category: 'Acoustic Panels', room: 'Living Room' },
          { label: 'Vinyl Flooring', category: 'Floor Tiles', room: 'Living Room' },
          { label: 'Media Wall', category: 'Acoustic Panels', room: 'Living Room' },
        ],
      },
      {
        heading: 'Outdoor',
        items: [
          { label: 'Porcelain Paving', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Fencing', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Cladding', category: 'Acoustic Panels', room: 'Outdoor' },
          { label: 'Garden Gates', category: 'Outdoor Tiles', room: 'Outdoor' },
        ],
      },
      {
        heading: 'Hallway',
        items: [
          { label: 'Hallway Tiles', category: 'Pattern Tiles', room: 'Hallway' },
          { label: 'Wall Panels', category: 'Wall Tiles', room: 'Hallway' },
          { label: 'Vinyl Flooring', category: 'Floor Tiles', room: 'Hallway' },
        ],
      },
      {
        heading: 'Bedroom',
        items: [
          { label: 'Bedroom Tiles', category: 'Wood Effect Tiles', room: 'Living Room' },
          { label: 'Wall Panels', category: 'Acoustic Panels', room: 'Living Room' },
          { label: 'Vinyl Flooring', category: 'Floor Tiles', room: 'Living Room' },
        ],
      },
    ],
  },
  {
    label: 'Tiles',
    category: 'All Tiles',
    columns: [
      {
        heading: 'Floor Tiles',
        items: [
          { label: 'All Floor Tiles', category: 'Floor Tiles' },
          { label: 'Wood Effect Planks', category: 'Wood Effect Tiles' },
          { label: 'Stone Effect Porcelain', category: 'Stone Effect Tiles' },
          { label: 'Terrazzo Tiles', category: 'Floor Tiles' },
          { label: 'Large Format 600x600', category: 'Floor Tiles' },
        ],
      },
      {
        heading: 'Wall Tiles',
        items: [
          { label: 'All Wall Tiles', category: 'Wall Tiles' },
          { label: 'Metro & Subway Tiles', category: 'Metro Tiles' },
          { label: 'Ribbed & Reeded 3D', category: 'Wall Tiles' },
          { label: 'Kitchen Splashbacks', category: 'Metro Tiles' },
          { label: 'Bathroom Feature Walls', category: 'Wall Tiles' },
        ],
      },
      {
        heading: 'Marble Effect',
        items: [
          { label: 'Calacatta White & Gold', category: 'Marble Effect Tiles' },
          { label: 'Polished Mirror Finish', category: 'Marble Effect Tiles' },
          { label: 'Honed Satin Marble', category: 'Marble Effect Tiles' },
          { label: 'Large Format Slabs', category: 'Marble Effect Tiles' },
        ],
      },
      {
        heading: 'By Material',
        items: [
          { label: 'Durable Porcelain', category: 'All Tiles' },
          { label: 'Glazed Ceramic', category: 'Wall Tiles' },
          { label: 'Natural Cleft Slate', category: 'Natural Slate Tiles' },
          { label: 'Outdoor 20mm Paver', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Pattern & Metro',
        items: [
          { label: 'Valencia Encaustic', category: 'Pattern Tiles' },
          { label: 'Porto Blue Azulejo', category: 'Pattern Tiles' },
          { label: 'Kensington Sage Metro', category: 'Metro Tiles' },
          { label: 'Geometric Vintage', category: 'Pattern Tiles' },
        ],
      },
      {
        heading: 'Natural Stone',
        items: [
          { label: 'Natural Welsh Slate', category: 'Natural Slate Tiles' },
          { label: 'Cotswold Limestone', category: 'Stone Effect Tiles' },
          { label: 'Rustic Flagstones', category: 'Stone Effect Tiles' },
          { label: 'Sample Service (৳150)', category: 'All Tiles' },
        ],
      },
    ],
  },
  {
    label: 'Paving Slabs',
    category: 'Outdoor Tiles',
    columns: [
      {
        heading: '20mm Porcelain',
        items: [
          { label: 'Matterhorn Charcoal Slate', category: 'Outdoor Tiles' },
          { label: 'Limestone Soft Ivory', category: 'Outdoor Tiles' },
          { label: 'Smoked Oak Outdoor', category: 'Outdoor Tiles' },
          { label: 'R11 Anti-Slip Pavers', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Natural Stone Slabs',
        items: [
          { label: 'Quarry Split Slate', category: 'Natural Slate Tiles' },
          { label: 'English Limestone Look', category: 'Stone Effect Tiles' },
          { label: 'Granite & Sandstone', category: 'Outdoor Tiles' },
          { label: 'Hand Dressed Edges', category: 'Stone Effect Tiles' },
        ],
      },
      {
        heading: 'By Space',
        items: [
          { label: 'Garden Dining Patios', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Garden Pathways', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Driveway Paving', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Balcony & Terraces', category: 'Outdoor Tiles', room: 'Outdoor' },
        ],
      },
      {
        heading: 'Features & Benefits',
        items: [
          { label: 'R11 High Grip Surface', category: 'Outdoor Tiles' },
          { label: '100% Frost Proof', category: 'Outdoor Tiles' },
          { label: 'Zero Moss or Algae', category: 'Outdoor Tiles' },
          { label: 'Barbecue Grease Resistant', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Installation & Pedestals',
        items: [
          { label: 'Pedestal Support Systems', category: 'Outdoor Tiles' },
          { label: 'Exterior Slurry Primer', category: 'Outdoor Tiles' },
          { label: 'Brush-In Patio Grout', category: 'Outdoor Tiles' },
          { label: 'Outdoor Cleaner & Sealer', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Offers & Delivery',
        items: [
          { label: 'Autumn 20% Off Sale', category: 'Outdoor Tiles' },
          { label: 'Free Delivery Over ৳5,000', category: 'Outdoor Tiles' },
          { label: 'Order Full Cut Sample', category: 'Outdoor Tiles' },
        ],
      },
    ],
  },
  {
    label: 'Outdoor',
    category: 'Outdoor Tiles',
    columns: [
      {
        heading: 'Outdoor Tiles',
        items: [
          { label: '20mm Porcelain Pavers', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Anti-Slip Patio Slabs', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Slate Garden Flags', category: 'Natural Slate Tiles', room: 'Outdoor' },
        ],
      },
      {
        heading: 'Garden Cladding',
        items: [
          { label: 'Split Face Slate Wall', category: 'Natural Slate Tiles', room: 'Outdoor' },
          { label: 'Exterior Composite Slat', category: 'Acoustic Panels', room: 'Outdoor' },
          { label: 'Garden Feature Walls', category: 'Outdoor Tiles', room: 'Outdoor' },
        ],
      },
      {
        heading: 'Fencing & Gates',
        items: [
          { label: 'Composite Modular Fence', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Aluminium Garden Posts', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Garden Gates', category: 'Outdoor Tiles', room: 'Outdoor' },
        ],
      },
      {
        heading: 'Outdoor Inspiration',
        items: [
          { label: 'Modern Courtyard', category: 'Outdoor Tiles', room: 'Outdoor' },
          { label: 'Cottage Garden Terrace', category: 'Stone Effect Tiles', room: 'Outdoor' },
          { label: 'Contemporary Pergola', category: 'Outdoor Tiles', room: 'Outdoor' },
        ],
      },
      {
        heading: 'Installation Supplies',
        items: [
          { label: 'Jointing Sand & Mortar', category: 'Outdoor Tiles' },
          { label: 'Sub-base Geotextiles', category: 'Outdoor Tiles' },
          { label: 'Heavy Duty Pedestals', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Specialist Advice',
        items: [
          { label: 'Calculate Outdoor Area', category: 'Outdoor Tiles' },
          { label: 'UK Tail-Lift Pallet Drop', category: 'Outdoor Tiles' },
          { label: 'Trade Discounts 15%', category: 'Outdoor Tiles' },
        ],
      },
    ],
  },
  {
    label: 'Wall Panels',
    category: 'Shower Panels',
    columns: [
      {
        heading: 'Acoustic Slatwall',
        items: [
          { label: 'Natural Smoked Walnut', category: 'Acoustic Panels' },
          { label: 'Scandinavian Oak Slats', category: 'Acoustic Panels' },
          { label: 'Charcoal Black Slats', category: 'Acoustic Panels' },
          { label: 'Sound Absorbing PET Felt', category: 'Acoustic Panels' },
        ],
      },
      {
        heading: 'Waterproof Panels',
        items: [
          { label: 'AquaShield Slate Grey', category: 'Shower Panels' },
          { label: 'Calacatta Luxe Marble', category: 'Shower Panels' },
          { label: 'Concrete Industrial Look', category: 'Shower Panels' },
          { label: '100% Mould Resistant', category: 'Shower Panels' },
        ],
      },
      {
        heading: 'By Room',
        items: [
          { label: 'Media Wall TV Surround', category: 'Acoustic Panels', room: 'Living Room' },
          { label: 'Shower Enclosures', category: 'Shower Panels', room: 'Bathroom' },
          { label: 'Hallway Panelling', category: 'Acoustic Panels', room: 'Hallway' },
          { label: 'Kitchen Feature Walls', category: 'Shower Panels', room: 'Kitchen' },
        ],
      },
      {
        heading: 'Finishes & Textures',
        items: [
          { label: 'Real Timber Veneer', category: 'Acoustic Panels' },
          { label: 'Silk Satin Matt', category: 'Shower Panels' },
          { label: 'Textured 3D Reeded', category: 'Wall Tiles' },
          { label: 'Fluted Architectural', category: 'Wall Tiles' },
        ],
      },
      {
        heading: 'Fixings & Trims',
        items: [
          { label: 'Aluminium End Caps', category: 'Shower Panels' },
          { label: 'Internal Corner Joints', category: 'Shower Panels' },
          { label: 'Panel Grab Adhesive', category: 'Shower Panels' },
          { label: 'Colour Matched Screws', category: 'Acoustic Panels' },
        ],
      },
      {
        heading: 'Why Panels?',
        items: [
          { label: 'Grout-Free Cleaning', category: 'Shower Panels' },
          { label: 'Fit Over Existing Tiles', category: 'Shower Panels' },
          { label: 'Class A Sound Dampening', category: 'Acoustic Panels' },
          { label: '15-Year Guarantee', category: 'Shower Panels' },
        ],
      },
    ],
  },
  {
    label: 'Shower Panels',
    category: 'Shower Panels',
    columns: [
      {
        heading: 'AquaShield Panels',
        items: [
          { label: 'AquaShield Slate Grey', category: 'Shower Panels' },
          { label: 'Calacatta White Shower Wall', category: 'Shower Panels' },
          { label: 'Micro-Cement Concrete', category: 'Shower Panels' },
          { label: 'Pure Chalk White', category: 'Shower Panels' },
        ],
      },
      {
        heading: 'Panel Sizes',
        items: [
          { label: '1000 x 2400 mm Large', category: 'Shower Panels' },
          { label: '1200 x 2400 mm Enclosure', category: 'Shower Panels' },
          { label: 'Click-Fit Hydrolock Joint', category: 'Shower Panels' },
          { label: '10mm Solid Core', category: 'Shower Panels' },
        ],
      },
      {
        heading: 'Enclosure Styles',
        items: [
          { label: 'Walk-In Wet Rooms', category: 'Shower Panels', room: 'Bathroom' },
          { label: 'Corner Shower Cabins', category: 'Shower Panels', room: 'Bathroom' },
          { label: 'Over-Bath Shower Walls', category: 'Shower Panels', room: 'Bathroom' },
          { label: 'En-Suite Compact Showers', category: 'Shower Panels', room: 'Bathroom' },
        ],
      },
      {
        heading: 'Installation Trims',
        items: [
          { label: 'Internal Corner Profile', category: 'Shower Panels' },
          { label: 'End Finishing Caps', category: 'Shower Panels' },
          { label: 'Bottom Seal Trims', category: 'Shower Panels' },
          { label: 'Waterproof Sealant', category: 'Shower Panels' },
        ],
      },
      {
        heading: 'Key Benefits',
        items: [
          { label: 'No Mouldy Grout Ever', category: 'Shower Panels' },
          { label: 'Wipe Clean Satin Surface', category: 'Shower Panels' },
          { label: 'Fast 1-Day DIY Fitting', category: 'Shower Panels' },
          { label: '100% Watertight Guarantee', category: 'Shower Panels' },
        ],
      },
      {
        heading: 'Samples & Orders',
        items: [
          { label: 'Order Cut Sample (৳150)', category: 'Shower Panels' },
          { label: 'Free Delivery Over ৳5,000', category: 'Shower Panels' },
          { label: 'Trade Bulk Quotation', category: 'Shower Panels' },
        ],
      },
    ],
  },
  {
    label: 'Fencing',
    category: 'Outdoor Tiles',
    columns: [
      {
        heading: 'Composite Fencing',
        items: [
          { label: 'Modular Slatted Panels', category: 'Outdoor Tiles' },
          { label: 'Graphite Charcoal Grey', category: 'Outdoor Tiles' },
          { label: 'Warm Teak Woodgrain', category: 'Outdoor Tiles' },
          { label: 'Double Sided Privacy', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Aluminium Posts',
        items: [
          { label: 'Heavy Duty 2.4m Posts', category: 'Outdoor Tiles' },
          { label: 'Bolt-Down Base Plates', category: 'Outdoor Tiles' },
          { label: 'Finishing Post Caps', category: 'Outdoor Tiles' },
          { label: 'Corner Post Systems', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Decorative Screens',
        items: [
          { label: 'Laser Cut Garden Screens', category: 'Outdoor Tiles' },
          { label: 'Botanical Leaf Pattern', category: 'Outdoor Tiles' },
          { label: 'Geometric Trellis Tops', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Garden Gates',
        items: [
          { label: 'Matching Composite Gates', category: 'Outdoor Tiles' },
          { label: 'Heavy Duty Hinges', category: 'Outdoor Tiles' },
          { label: 'Key-Locking Drop Bolts', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Durability',
        items: [
          { label: 'Zero Rot or Warping', category: 'Outdoor Tiles' },
          { label: 'No Staining or Painting', category: 'Outdoor Tiles' },
          { label: 'High Wind Certified', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Support',
        items: [
          { label: 'Fence Calculator Guide', category: 'Outdoor Tiles' },
          { label: 'Trade Contractor Account', category: 'Outdoor Tiles' },
          { label: 'Direct Site Delivery', category: 'Outdoor Tiles' },
        ],
      },
    ],
  },
  {
    label: 'Cladding',
    category: 'Acoustic Panels',
    columns: [
      {
        heading: 'Exterior Cladding',
        items: [
          { label: 'Composite Exterior Slats', category: 'Outdoor Tiles' },
          { label: 'Charcoal Weatherboard', category: 'Outdoor Tiles' },
          { label: 'Natural Stone Veneer', category: 'Natural Slate Tiles' },
          { label: 'Garden Room Cladding', category: 'Outdoor Tiles' },
        ],
      },
      {
        heading: 'Interior Feature Walls',
        items: [
          { label: 'AcoustiSlat Real Walnut', category: 'Acoustic Panels', room: 'Living Room' },
          { label: 'Oak Slatted Timber', category: 'Acoustic Panels', room: 'Living Room' },
          { label: 'Split Face Quartzite', category: 'Natural Slate Tiles', room: 'Living Room' },
          { label: 'Brick Slip Feature Wall', category: 'Metro Tiles', room: 'Kitchen' },
        ],
      },
      {
        heading: 'By Room',
        items: [
          { label: 'TV Media Walls', category: 'Acoustic Panels', room: 'Living Room' },
          { label: 'Fireside Surrounds', category: 'Natural Slate Tiles', room: 'Living Room' },
          { label: 'Bedroom Headboard Wall', category: 'Acoustic Panels', room: 'Living Room' },
          { label: 'Dining Area Panelling', category: 'Acoustic Panels', room: 'Kitchen' },
        ],
      },
      {
        heading: 'Installation',
        items: [
          { label: 'Starter Clips & Fixings', category: 'Acoustic Panels' },
          { label: 'Ventilation Trim Profiles', category: 'Outdoor Tiles' },
          { label: 'Panel Adhesive Tubes', category: 'Shower Panels' },
          { label: 'Installation Guides', category: 'Acoustic Panels' },
        ],
      },
      {
        heading: 'Sound & Acoustic',
        items: [
          { label: 'Class A Sound Absorption', category: 'Acoustic Panels' },
          { label: 'Recycled PET Eco Felt', category: 'Acoustic Panels' },
          { label: 'Cinema Room Acoustics', category: 'Acoustic Panels' },
        ],
      },
      {
        heading: 'Delivery & Trade',
        items: [
          { label: 'UK Nationwide Pallet Drop', category: 'Acoustic Panels' },
          { label: 'Trade Discount (15%)', category: 'Acoustic Panels' },
          { label: 'Sample Box Order', category: 'Acoustic Panels' },
        ],
      },
    ],
  },
  {
    label: 'Vinyl Flooring',
    category: 'Floor Tiles',
    columns: [
      {
        heading: 'Luxury Vinyl (LVT)',
        items: [
          { label: 'Click-Lock Rigid Core Planks', category: 'Floor Tiles' },
          { label: 'Herringbone Parquet LVT', category: 'Floor Tiles' },
          { label: 'Stone Effect Vinyl Tiles', category: 'Stone Effect Tiles' },
          { label: 'Terrazzo Vinyl Look', category: 'Floor Tiles' },
        ],
      },
      {
        heading: 'Wood Planks',
        items: [
          { label: 'Nordic Smoked Oak', category: 'Wood Effect Tiles' },
          { label: 'Golden Natural Honey Oak', category: 'Wood Effect Tiles' },
          { label: 'Weathered Grey Timber', category: 'Wood Effect Tiles' },
          { label: 'Rustic Walnut Effect', category: 'Wood Effect Tiles' },
        ],
      },
      {
        heading: 'By Room',
        items: [
          { label: '100% Waterproof Bathroom', category: 'Floor Tiles', room: 'Bathroom' },
          { label: 'Heavy Traffic Kitchen', category: 'Floor Tiles', room: 'Kitchen' },
          { label: 'Open Plan Living Room', category: 'Wood Effect Tiles', room: 'Living Room' },
          { label: 'Hallway & Entrance', category: 'Floor Tiles', room: 'Hallway' },
        ],
      },
      {
        heading: 'Underlay & Accessories',
        items: [
          { label: 'Integrated Acoustic Underlay', category: 'Floor Tiles' },
          { label: 'Door Threshold Strips', category: 'Floor Tiles' },
          { label: 'Expansion Gap Spacers', category: 'Floor Tiles' },
          { label: 'Vinyl Floor Care & Cleaner', category: 'Floor Tiles' },
        ],
      },
      {
        heading: 'Key Benefits',
        items: [
          { label: 'Warm & Quiet Underfoot', category: 'Floor Tiles' },
          { label: 'Scratch & Pet Claw Proof', category: 'Floor Tiles' },
          { label: 'Safe for Underfloor Heating', category: 'Floor Tiles' },
          { label: 'Lifetime Domestic Warranty', category: 'Floor Tiles' },
        ],
      },
      {
        heading: 'Calculate & Sample',
        items: [
          { label: 'Room Area Calculator', category: 'Floor Tiles' },
          { label: 'Order Full Plank Sample', category: 'Floor Tiles' },
          { label: 'Free Delivery Over ৳5,000', category: 'Floor Tiles' },
        ],
      },
    ],
  },
  {
    label: 'Fixing, Tools & Accessories',
    category: 'All Tiles',
    columns: [
      {
        heading: 'Tile Adhesives',
        items: [
          { label: 'Rapid Set Flexible S1', category: 'All Tiles' },
          { label: 'Ready-Mixed Wall Paste', category: 'Wall Tiles' },
          { label: 'Standard Set Floor Adhesive', category: 'Floor Tiles' },
          { label: 'Substrate Primer (1L & 5L)', category: 'All Tiles' },
        ],
      },
      {
        heading: 'Grout & Silicones',
        items: [
          { label: 'Anti-Mould Wall Grout', category: 'Wall Tiles' },
          { label: 'Flexible Floor Tile Grout', category: 'Floor Tiles' },
          { label: 'Sanitary Silicone Sealant', category: 'Shower Panels' },
          { label: 'Epoxy Grout for Wet Rooms', category: 'Shower Panels' },
        ],
      },
      {
        heading: 'Tile Tools',
        items: [
          { label: 'Professional Tile Cutters', category: 'All Tiles' },
          { label: 'Notched Trowels (6mm/10mm)', category: 'All Tiles' },
          { label: 'Rubber Grout Floats', category: 'All Tiles' },
          { label: 'Spirit Levels & Spacers', category: 'All Tiles' },
        ],
      },
      {
        heading: 'Levelling Systems',
        items: [
          { label: 'Tile Levelling Clips (1mm)', category: 'Floor Tiles' },
          { label: 'Reusable Wedges Pack', category: 'Floor Tiles' },
          { label: 'Specialist Levelling Pliers', category: 'Floor Tiles' },
          { label: 'Silicone Profiling Kit', category: 'Shower Panels' },
        ],
      },
      {
        heading: 'Tile Trims & Edges',
        items: [
          { label: 'Brushed Chrome Edge Trim', category: 'Wall Tiles' },
          { label: 'Matt Black Box Angle', category: 'Wall Tiles' },
          { label: 'Brushed Brass Luxury Trim', category: 'Wall Tiles' },
          { label: 'External Corner Caps', category: 'Wall Tiles' },
        ],
      },
      {
        heading: 'Underfloor Heating',
        items: [
          { label: 'Electric Heating Wire Mats', category: 'Floor Tiles' },
          { label: 'WiFi Touch Thermostats', category: 'Floor Tiles' },
          { label: 'Thermal Insulation Boards', category: 'Floor Tiles' },
          { label: 'Free Technical Advice', category: 'All Tiles' },
        ],
      },
    ],
  },
];

export function Navbar({
  onSearchSubmit,
  onSelectCategory,
  onSelectRoom,
  onOpenQuickView,
  onOpenHelp,
  onOpenTrade,
  onOpenShowrooms,
  onOpenAccount,
  activeCategory,
}: NavbarProps) {
  const { totalItemsCount, setCartOpen, wishlist, setWishlistOpen } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active hovered mega menu state
  const [hoveredNavLabel, setHoveredNavLabel] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Hover handlers with debounce to prevent accidental flicker
  const handleMouseEnterNav = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredNavLabel(label);
  };

  const handleMouseLeaveNav = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredNavLabel(null);
    }, 180);
  };

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

  // Live search suggestions
  const suggestions = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.finish.toLowerCase().includes(q) ||
        p.rooms.some((r) => r.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
      setSearchFocused(false);
    }
  };

  // Active mega menu data
  const currentMegaMenu = MEGA_MENUS.find((m) => m.label === hoveredNavLabel);

  const handleSubItemClick = (item: MegaMenuSubItem) => {
    setHoveredNavLabel(null);
    if (item.room) {
      onSelectRoom(item.room);
    } else if (item.category) {
      onSelectCategory(item.category);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* 1. TOP NAV BAR (NAVY BLUE) */}
      <div className="bg-[#101a4a] text-white">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-4 sm:gap-6">
          {/* Left: Mobile Menu & Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden text-white hover:text-[#d9b67d] transition-colors p-1"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <a
              href="#top"
              className="group flex items-center gap-2.5 whitespace-nowrap transition-all"
              aria-label="Your Site Name"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-[#d9272e] to-[#b82026] text-white shadow-sm ring-1 ring-white/20 transition-transform group-hover:scale-105">
                <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8L18.2 12 12 18.2 5.8 12 12 5.8z" />
                </svg>
              </span>
              <span className="text-[17px] sm:text-[19px] lg:text-[20px] font-black uppercase tracking-[0.18em] text-white transition-colors group-hover:text-[#d9b67d]">
                YOUR <span className="text-[#d9b67d]">SITE</span> NAME
              </span>
            </a>
          </div>

          {/* Center-Left: White Search Bar */}
          <div
            ref={searchContainerRef}
            className="relative hidden flex-1 max-w-[420px] md:block"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <label htmlFor="navbar-search" className="sr-only">
                What Are You Looking For?
              </label>
              <input
                id="navbar-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="What Are You Looking For?"
                className="h-[38px] w-full rounded-[1px] bg-white pl-3.5 pr-10 text-[13px] text-slate-800 placeholder:text-slate-400 outline-none"
              />
              <button
                type="submit"
                aria-label="Search store"
                className="absolute right-0 top-0 bottom-0 flex w-10 items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-[42px] z-50 rounded-b border border-slate-200 bg-white p-2 shadow-2xl animate-in fade-in-50 duration-150">
                {suggestions.length === 0 ? (
                  <p className="p-3 text-center text-xs text-slate-500">
                    No products found for &ldquo;{searchQuery}&rdquo;
                  </p>
                ) : (
                  <div>
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Suggested Products
                    </div>
                    <div className="divide-y divide-slate-100">
                      {suggestions.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            setSearchFocused(false);
                            onOpenQuickView(prod);
                          }}
                          className="flex cursor-pointer items-center gap-2.5 p-2 rounded hover:bg-slate-50 transition-colors"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-1 text-xs font-bold text-slate-900">
                              {prod.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {prod.category} • ৳{prod.price ?? prod.pricePerM2} / {prod.unit || 'sq.ft'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleSearchSubmit}
                      className="mt-1 flex w-full items-center justify-center gap-1 rounded bg-slate-100 py-1.5 text-[11px] font-bold text-[#101a4a] hover:bg-slate-200"
                    >
                      View all results for &ldquo;{searchQuery}&rdquo; <ArrowRight size={12} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-5 sm:gap-6 lg:gap-7">
            {/* Need Help? */}
            <button
              onClick={onOpenHelp}
              className="hidden lg:flex items-center gap-2 text-white hover:text-[#d9b67d] transition-colors"
            >
              <MessageSquareText size={20} className="shrink-0" />
              <span className="text-[13px] font-medium tracking-tight">Need Help?</span>
            </button>

            {/* Trade (Trowel icon) */}
            <button
              onClick={onOpenTrade}
              className="hidden sm:flex flex-col items-center gap-0.5 text-white hover:text-[#d9b67d] transition-colors"
            >
              <TrowelIcon className="h-5 w-6 text-white" />
              <span className="text-[11px] font-medium tracking-tight">Trade</span>
            </button>

            {/* Showrooms (Pin icon) */}
            <button
              onClick={onOpenShowrooms}
              className="hidden sm:flex flex-col items-center gap-0.5 text-white hover:text-[#d9b67d] transition-colors"
            >
              <ShowroomPinIcon className="h-5 w-5 text-white" />
              <span className="text-[11px] font-medium tracking-tight">Showrooms</span>
            </button>

            {/* Saved / Wishlist icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative hidden md:flex items-center justify-center text-white hover:text-[#d9b67d] transition-colors"
              title="Saved Items"
            >
              <Heart
                size={20}
                className={wishlist.length > 0 ? 'fill-[#d9272e] text-[#d9272e]' : 'text-white'}
              />
              {wishlist.length > 0 && (
                <b className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#d9272e] text-[9px] font-bold text-white shadow">
                  {wishlist.length}
                </b>
              )}
            </button>

            {/* Account (User icon) */}
            <button
              onClick={onOpenAccount}
              aria-label="Account"
              className="flex items-center justify-center text-white hover:text-[#d9b67d] transition-colors"
              title="My Account"
            >
              <UserSolidIcon className="h-6 w-5 text-white" />
            </button>

            {/* Basket icon */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Basket"
              className="relative flex items-center justify-center text-white hover:text-[#d9b67d] transition-colors"
              title="Shopping Basket"
            >
              <ShoppingBasket size={22} className="text-white" />
              {totalItemsCount > 0 && (
                <b className="absolute -right-2.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#d9272e] text-[9px] font-bold text-white shadow">
                  {totalItemsCount}
                </b>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY NAV BAR (LIGHT WARM GREY WITH HOVER MEGA MENU) */}
      <div
        className="relative border-b border-[#dad9d6] bg-[#eae9e7] text-[#2d2c2a]"
        onMouseLeave={handleMouseLeaveNav}
      >
        <div className="mx-auto flex h-[44px] max-w-[1400px] items-center justify-between">
          {/* Scrollable links row */}
          <nav className="flex h-full items-center gap-1 sm:gap-2 lg:gap-3 overflow-x-auto px-4 sm:px-6 lg:px-8 scrollbar-none whitespace-nowrap text-[13px] font-medium">
            {MEGA_MENUS.map((item) => {
              const isHovered = hoveredNavLabel === item.label;
              const isCurrent = activeCategory === item.category;

              return (
                <button
                  key={item.label}
                  onMouseEnter={() => handleMouseEnterNav(item.label)}
                  onClick={() => {
                    if (item.category) onSelectCategory(item.category);
                  }}
                  className={`h-full flex items-center px-2.5 sm:px-3 transition-colors ${
                    isHovered
                      ? 'bg-white text-[#101a4a] font-bold'
                      : isCurrent
                      ? 'text-[#d9272e] font-bold'
                      : 'text-[#2d2c2a] hover:text-[#d9272e]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Flush Solid Red Sale Button */}
          <button
            onClick={() => {
              onSelectCategory('All Tiles');
              const el = document.getElementById('products-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex h-full shrink-0 items-center justify-center bg-[#cc0000] px-7 sm:px-9 text-[14px] font-bold text-white transition-colors hover:bg-[#b00000] active:scale-[0.99]"
          >
            Sale
          </button>
        </div>

        {/* 3. HOVER MEGA MENU DROPDOWN (EXACTLY MATCHING USER'S SCREENSHOT) */}
        {currentMegaMenu && (
          <div
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
            }}
            onMouseLeave={handleMouseLeaveNav}
            className="absolute left-0 right-0 top-[44px] z-50 border-b border-slate-200 bg-white shadow-2xl animate-in fade-in-50 duration-150"
          >
            <div className="mx-auto max-w-[1400px] px-6 py-7 sm:px-8">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6 lg:gap-8">
                {currentMegaMenu.columns.map((column, colIdx) => (
                  <div key={colIdx} className="flex flex-col">
                    {/* Column Heading with Bottom Border Line as in screenshot */}
                    <div className="border-b border-slate-200 pb-2 mb-2.5">
                      <h4 className="text-[13.5px] font-bold text-[#1f2024] tracking-tight">
                        {column.heading}
                      </h4>
                    </div>

                    {/* Column Links List */}
                    <ul className="space-y-2 text-[12.5px] text-[#4a4947]">
                      {column.items.map((subItem, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleSubItemClick(subItem)}
                            className="block text-left hover:text-[#d9272e] hover:underline transition-colors py-0.5 leading-snug w-full"
                          >
                            {subItem.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. MOBILE COLLAPSIBLE MENU */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-5 py-4 lg:hidden animate-in slide-in-from-top-2 duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="mb-4 flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What Are You Looking For?"
              className="h-10 w-full rounded-l border border-slate-300 px-3 text-xs text-slate-800 outline-none"
            />
            <button
              type="submit"
              className="flex h-10 w-12 items-center justify-center rounded-r bg-[#101a4a] text-white"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Mobile Navigation Accordions */}
          <div className="space-y-3">
            {MEGA_MENUS.map((menu) => (
              <details key={menu.label} className="group rounded border border-slate-200 p-2.5">
                <summary className="cursor-pointer text-xs font-bold text-slate-800 flex items-center justify-between list-none">
                  <span>{menu.label}</span>
                  <ChevronDown size={14} className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-2 text-[11px]">
                  {menu.columns.map((col, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="font-bold text-slate-900 border-b border-slate-100 pb-0.5">{col.heading}</p>
                      {col.items.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            handleSubItemClick(sub);
                            setMobileMenuOpen(false);
                          }}
                          className="block text-left text-slate-600 hover:text-[#d9272e] py-0.5 w-full"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 text-xs">
            <button
              onClick={() => {
                onOpenHelp();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-slate-50 text-slate-700 font-medium"
            >
              <MessageSquareText size={16} /> Need Help? (Technical Advice)
            </button>
            <button
              onClick={() => {
                onOpenTrade();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-slate-50 text-slate-700 font-medium"
            >
              <TrowelIcon className="h-4 w-4 text-slate-700" /> Trade Account (15% Off)
            </button>
            <button
              onClick={() => {
                onOpenShowrooms();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-slate-50 text-slate-700 font-medium"
            >
              <ShowroomPinIcon className="h-4 w-4 text-slate-700" /> Find a UK Showroom
            </button>
            <button
              onClick={() => {
                onOpenAccount();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-slate-50 text-slate-700 font-medium"
            >
              <UserSolidIcon className="h-4 w-4 text-slate-700" /> My Account / Orders
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
