
import React from 'react';

const iconProps = {
  className: "w-5 h-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

export const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
     <path d="M15 4V2m0 14v-2m-7.5-10.5L6 4m9 1.5L16.5 4M3 12h2m14 0h2m-9.5 7.5L11 18m-6.5-5L3 11.5m18 0L19.5 13M6 20l-2 2 4-4 2 2-4 4-2-2m10-10l4-4-2-2-4 4 2 2z"/>
  </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`animate-spin ${className || 'h-5 w-5'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
