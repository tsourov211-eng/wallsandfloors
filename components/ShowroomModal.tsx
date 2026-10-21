'use client';

import React, { useState } from 'react';
import { X, Store, MapPin, Phone, Clock, Search, Calendar, CheckCircle2 } from 'lucide-react';
import { SHOWROOMS } from '@/lib/data';
import { toast } from 'sonner';

interface ShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShowroomModal({ isOpen, onClose }: ShowroomModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedShowroom, setBookedShowroom] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredShowrooms = SHOWROOMS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.postcode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = (name: string) => {
    setBookedShowroom(name);
    toast.success(`Design consultation booked at ${name}!`, {
      description: 'Our senior tile specialist will call you to confirm your slot.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#101a4a] px-6 py-4 text-white">
          <div className="flex items-center gap-2">
            <Store size={20} className="text-[#d9b67d]" />
            <h2 className="text-base font-black uppercase tracking-wider">
              UK Tile & Panel Showrooms
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close showrooms"
            className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="relative mb-5">
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by city, showroom name or postcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-xs focus:border-[#101a4a] focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            {filteredShowrooms.map((showroom) => (
              <div
                key={showroom.id}
                className="rounded-lg border border-slate-200 bg-[#fbfaf8] p-4 transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#101a4a]">{showroom.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin size={13} className="shrink-0 text-[#d9272e]" />
                      {showroom.address}, {showroom.city} ({showroom.postcode})
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                      <Phone size={13} className="shrink-0 text-slate-400" />
                      {showroom.phone}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Clock size={13} className="shrink-0 text-slate-400" />
                      {showroom.hours}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBookAppointment(showroom.name)}
                    className="shrink-0 rounded bg-[#101a4a] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#1a2b7a]"
                  >
                    {bookedShowroom === showroom.name ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 size={13} /> Booked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> Book Visit
                      </span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
