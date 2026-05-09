import React, { useEffect, useState, useRef } from 'react'
import { getLightColorFromImage } from '../../utils/helper';
import { useHoverTilt } from '../../animations/useGSAPAnimations';
import { LuEllipsis } from 'react-icons/lu';

export default function ResumeSummaryCard({ imgUrl, title, lastUpdated, onSelect }) {
  const cardRef = useRef(null);
  useHoverTilt(cardRef);

  const [bgColor, setBgColor] = useState(null);
  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then(setBgColor)
        .catch(() => setBgColor(null));
    }
  }, [imgUrl]);

  return (
    <div
      ref={cardRef}
      className="h-[280px] flex flex-col items-center justify-between glassmorphism rounded-xl overflow-hidden cursor-pointer premium-shadow premium-hover card-glow transition-all duration-500 relative z-10"
      style={{
        backgroundColor: bgColor || 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
      }}
      onClick={onSelect}
    >
      <div className="p-4 w-full flex-1">
        {imgUrl ? (
          <img src={imgUrl} alt="" className="w-full h-[180px] rounded object-cover border"
               style={{ borderColor: 'var(--border-light)' }} />
        ) : (
          <div className="w-full h-[180px] rounded flex items-center justify-center text-sm font-medium tracking-wider"
               style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-faint)' }}>
            NO PREVIEW
          </div>
        )}
      </div>

      <div className="w-full px-4 py-3.5 flex items-center justify-between"
           style={{ borderTop: '1px solid var(--border-light)', backgroundColor: 'var(--bg-overlay)' }}>
        <div>
          <h5 className="text-[14px] font-semibold truncate overflow-hidden whitespace-nowrap"
              style={{ color: 'var(--text-heading)' }}>
            {title}
          </h5>
          <p className="text-[11px] font-medium mt-1 uppercase tracking-wide"
             style={{ color: 'var(--text-muted)' }}>
            Last Updated: {lastUpdated}
          </p>
        </div>
        <button
          className="p-2 rounded-full transition-colors"
          style={{ color: 'var(--text-faint)' }}
          onClick={onSelect}
        >
          <LuEllipsis className="text-lg" />
        </button>
      </div>
    </div>
  );
}
