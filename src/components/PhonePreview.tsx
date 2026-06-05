import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Star, Users, MessageCircle, ChevronRight, Camera, Heart } from 'lucide-react';

interface PhonePreviewProps {
  type: 'profile' | 'feed' | 'chat' | 'redesign';
}

function WarningPin({ top, left, label }: { top: string; left: string; label: string }) {
  return (
    <div className="absolute z-10 flex items-start gap-1" style={{ top, left }}>
      <motion.div
        className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AlertTriangle className="h-2.5 w-2.5 text-white" />
      </motion.div>
      <div className="bg-red-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md whitespace-nowrap shadow-lg mt-0.5 hidden xl:block">
        {label}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="h-full bg-gray-50 overflow-hidden">
      {/* Nav bar */}
      <div className="bg-white px-3 pt-8 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <ChevronRight className="h-4 w-4 text-gray-400 rotate-180" />
          <span className="text-xs font-semibold">Edit Profile</span>
          <span className="text-xs text-[#3157F6] font-semibold">Save</span>
        </div>
      </div>
      {/* Avatar */}
      <div className="flex flex-col items-center py-4 bg-white border-b border-gray-100">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#3157F6] rounded-full flex items-center justify-center">
            <Camera className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
        <span className="text-xs font-semibold mt-2">Sarah Mitchell</span>
        <span className="text-[10px] text-gray-400">@sarahm</span>
      </div>
      {/* Fields */}
      <div className="p-3 space-y-2 relative">
        {[
          { label: 'Name', value: 'Sarah Mitchell', ok: true },
          { label: 'City', value: 'San Francisco', ok: true },
          { label: 'Interests', value: 'Music, Food, Outdoors', ok: true },
          { label: 'Birthday Month', value: 'August', ok: false, new: true },
          { label: 'Dietary Tags', value: 'Vegetarian, GF', ok: false, new: true },
          { label: 'Device ID', value: 'A1B2C3…', ok: false, new: true },
        ].map(field => (
          <div key={field.label} className={`rounded-lg px-2.5 py-2 border text-[10px] ${field.ok ? 'bg-white border-gray-100' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">{field.label}</span>
              {field.new && <span className="text-[8px] bg-red-500 text-white px-1 py-0.5 rounded font-bold">NEW</span>}
            </div>
            <div className={`font-medium mt-0.5 ${field.ok ? 'text-gray-800' : 'text-red-700'}`}>{field.value}</div>
          </div>
        ))}
      </div>
      <WarningPin top="158px" left="3px" label="Unapproved fields" />
    </div>
  );
}

function FeedScreen() {
  const events = [
    { name: 'Jazz Night at Mojo', distance: '0.4 mi', score: 98, friends: 3 },
    { name: 'Sunday Farmer\'s Market', distance: '1.2 mi', score: 94, friends: 1 },
    { name: 'Rooftop Yoga', distance: '2.1 mi', score: 91, friends: 0 },
  ];
  return (
    <div className="h-full bg-gray-50 overflow-hidden">
      <div className="bg-white px-3 pt-8 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">Nearby for you</span>
          <MapPin className="h-3.5 w-3.5 text-[#3157F6]" />
        </div>
      </div>
      <div className="p-3 space-y-2">
        {events.map((ev, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-2.5 relative">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[11px] font-semibold text-gray-800">{ev.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="h-2.5 w-2.5 text-gray-400" />
                  <span className="text-[9px] text-gray-400">{ev.distance}</span>
                  {ev.friends > 0 && (
                    <span className="text-[9px] text-violet-600 font-medium flex items-center gap-0.5">
                      <Users className="h-2.5 w-2.5" />{ev.friends} friends
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-[10px] text-[#3157F6] font-bold shrink-0">
                <Star className="h-2.5 w-2.5 fill-[#3157F6]" />{ev.score}
              </div>
            </div>
            {i === 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                <span className="text-[8px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded font-medium">Age: 25-34</span>
                <span className="text-[8px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded font-medium">Nightlife signal</span>
                <span className="text-[8px] bg-red-100 text-red-700 px-1 py-0.5 rounded font-bold">UNAPPROVED</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <WarningPin top="70px" left="3px" label="Unapproved features" />
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="h-full bg-gray-50 overflow-hidden flex flex-col">
      <div className="bg-white px-3 pt-8 pb-3 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
            <MessageCircle className="h-3 w-3 text-white" />
          </div>
          <span className="text-xs font-bold">Plan Assistant</span>
          <span className="ml-auto text-[9px] text-[#3157F6] bg-blue-50 px-1.5 py-0.5 rounded-full font-medium">AI</span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-2 overflow-hidden">
        <div className="flex justify-end">
          <div className="bg-[#3157F6] text-white text-[10px] rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[80%]">
            Plan a Saturday night for 4 people in SF
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white border border-gray-100 text-gray-800 text-[10px] rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
            I've found the perfect evening! Here's your plan: dinner at Nopa (8pm), then jazz at The Jazz Bar (10pm)...
            <div className="mt-1.5 pt-1.5 border-t border-red-200">
              <span className="text-red-600 font-bold text-[9px]">⚠ "I booked this for you at Nopa" — DRAFT ONLY</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#3157F6] text-white text-[10px] rounded-xl rounded-tr-sm px-2.5 py-1.5">
            Looks great!
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white border border-red-200 text-gray-800 text-[10px] rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
            <span className="text-red-600 font-bold text-[9px] block mb-1">⚠ GUARDRAIL REMOVED IN v7</span>
            Based on your group's patterns, I notice some health preferences — you might want to try a quieter venue...
          </div>
        </div>
      </div>
      <div className="px-3 pb-3 shrink-0">
        <div className="bg-white rounded-xl border border-gray-100 px-3 py-2 text-[10px] text-gray-400">
          Ask about plans, restaurants, events...
        </div>
      </div>
      <WarningPin top="116px" left="3px" label="False booking claim" />
    </div>
  );
}

function RedesignScreen() {
  return (
    <div className="h-full bg-gray-50 overflow-hidden">
      <div className="bg-white px-3 pt-8 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold">For You</span>
          <span className="text-[9px] text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">Privacy link removed ⚠</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {/* Sponsored card */}
        <div className="bg-white rounded-xl border border-red-200 p-2.5 relative">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-semibold">Rooftop Pool Party · Sponsored</div>
              <div className="text-[9px] text-gray-400 mt-0.5">Tonight · SoMa District</div>
            </div>
            <span className="text-[8px] text-gray-400 border border-gray-200 rounded px-1 py-0.5">···</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="flex -space-x-1">
              {[1,2,3].map(n => (
                <div key={n} className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-red-400 border border-white flex items-center justify-center">
                  <span className="text-white text-[7px] font-bold">{n}</span>
                </div>
              ))}
            </div>
            <span className="text-[9px] text-violet-600 font-medium">Friends may be interested</span>
          </div>
          <div className="mt-1 text-[8px] text-red-600 font-bold bg-red-50 rounded px-1.5 py-0.5">
            ⚠ "Sponsored" label hidden in menu · Unconfirmed attendance shown
          </div>
        </div>

        {/* Regular cards */}
        {[
          { name: 'Farmers Market', tag: 'Recommended for you' },
          { name: 'Evening Run Club', tag: 'Recommended for you' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold">{item.name}</span>
              <Heart className="h-3 w-3 text-gray-300" />
            </div>
            <div className="text-[9px] text-gray-400 mt-0.5">{item.tag}</div>
            <div className="text-[8px] text-orange-600 mt-1">Long press for "Why am I seeing this?" ⚠</div>
          </div>
        ))}
      </div>
      <WarningPin top="60px" left="3px" label="Sponsored label hidden" />
    </div>
  );
}

export function PhonePreview({ type }: PhonePreviewProps) {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative w-[180px] mx-auto">
        <div className="bg-gray-900 rounded-[28px] p-[6px] shadow-2xl">
          <div className="bg-gray-800 rounded-[22px] overflow-hidden relative" style={{ height: '360px' }}>
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-black/50 z-20 flex items-center px-4">
              <span className="text-white text-[9px] font-medium">9:41</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-3 h-1.5 border border-white/60 rounded-sm"><div className="w-2/3 h-full bg-white/60 rounded-sm" /></div>
              </div>
            </div>
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl z-30" />
            {/* Screen content */}
            <div className="h-full overflow-hidden pt-6">
              {type === 'profile' && <ProfileScreen />}
              {type === 'feed' && <FeedScreen />}
              {type === 'chat' && <ChatScreen />}
              {type === 'redesign' && <RedesignScreen />}
            </div>
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-14 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
