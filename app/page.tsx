'use client';

import { useState } from 'react';
import './globals.css';

type View = 'regionSelect' | 'lander';
type Region = 'US' | 'CA' | null;

export default function Home() {
  const [currentView, setCurrentView]     = useState<View>('regionSelect');
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const affiliateBaseLink = 'https://glstrck.com/aff_c?offer_id=1615&aff_id=139418&source=new';
  const affiliateLink     = affiliateBaseLink + (selectedRegion ? `&sub1=${selectedRegion}` : '');

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setCurrentView('lander');
  };

  // Shared styles
  const containerBaseStyle  = 'flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-[#F7F7F7] text-slate-800';
  const cardBaseStyle       = 'bg-white p-4 py-6 sm:p-6 sm:py-8 rounded-lg shadow-lg w-full max-w-sm';
  const primaryButtonStyle  = 'w-full rounded-md border border-transparent transition-colors flex items-center justify-center bg-[#008CFF] text-white gap-3 hover:bg-[#0070CC] font-semibold text-base h-11 sm:h-12 px-5 sm:px-7 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008CFF] focus:ring-offset-2';
  const stepNumberStyle     = 'flex-shrink-0 bg-[#008CFF] text-white rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center font-bold text-xs';
  const stepTitleStyle      = 'font-semibold text-sm sm:text-base text-slate-700';

  // ❶ Region selector
  if (currentView === 'regionSelect') {
    return (
      <div className={containerBaseStyle}>
        <main className={`${cardBaseStyle} text-center`}>
          <h1 className="text-lg sm:text-xl font-bold mb-3 text-[#008CFF]">Select Your Region</h1>
          <div className="flex flex-col gap-3">
            <button onClick={() => handleRegionSelect('US')} className={primaryButtonStyle}>
              <span role="img" aria-label="USA Flag">🇺🇸</span> United States
            </button>
            <button onClick={() => handleRegionSelect('CA')} className={primaryButtonStyle}>
              <span role="img" aria-label="Canada Flag">🇨🇦</span> Canada
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-5">
            We&apos;ll customize your experience based on your location.
          </p>
        </main>
        <footer className="mt-5 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy-policy" className="hover:underline">Privacy</a>
            <a href="/terms-of-service" className="hover:underline">Terms</a>
          </div>
        </footer>
      </div>
    );
  }

  // ❷ Main lander
  if (currentView === 'lander') {
    const handleClaim = async () => {
      try {
        const res = await fetch('/api/log-click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ region: selectedRegion })
        });
        const { isLikelyRealDevice } = await res.json();
        if (isLikelyRealDevice) {
          window.location.href = affiliateLink;
        } else {
          window.location.href = affiliateLink;
        }
      } catch (err) {
        console.error(err);
        alert('Unexpected error—please try again.');
      }
    };

    return (
      <div className={containerBaseStyle}>
        <main className={`${cardBaseStyle} text-left`}>
          <h1 className="text-[#008CFF] mb-4 text-2xl sm:text-3xl text-center font-extrabold">How It Works:</h1>
          <div className="space-y-3 mb-5">
            {[ 
              'Tap "Claim Now!" Button Below',
              'Enter Your Basic Information',
              'Complete 2-5 Partner Offers',
              'Receive Your Balance & Repeat'
            ].map((title, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#F0F7FF] rounded-md shadow-sm">
                <div className={stepNumberStyle}>{i+1}</div>
                <h3 className={stepTitleStyle}>{title}</h3>
              </div>
            ))}
          </div>
          <button onClick={handleClaim}
            className={`${primaryButtonStyle} w-full text-md font-bold py-3`}>
            Claim Now!
          </button>
          <p className="text-xs text-slate-500 mt-4 text-center">
            <b>Tip:</b> The more offers you complete, the more you may earn!
          </p>
        </main>
        <footer className="mt-4 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
          {selectedRegion && <p className="text-[0.7rem] mt-0.5">Region: {selectedRegion}</p>}
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy-policy" className="hover:underline">Privacy</a>
            <a href="/terms-of-service" className="hover:underline">Terms</a>
            <a href="/affiliate-disclosure" className="hover:underline">Disclosure</a>
          </div>
        </footer>
      </div>
    );
  }

  // ❸ Fallback
  return (
    <div className={containerBaseStyle}>
      <p>Loading, please wait…</p>
    </div>
  );
}
