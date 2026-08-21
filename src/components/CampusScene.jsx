// Ilustrasi kampus flat (outline tebal) untuk latar Home
export default function CampusScene({ className = '' }) {
  const S = { stroke: '#141414', strokeWidth: 6, strokeLinejoin: 'round' }
  return (
    <svg
      viewBox="0 0 1200 272"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* pohon kiri */}
      <g {...S}>
        <rect x="120" y="210" width="14" height="60" fill="#8a5a30" />
        <circle cx="127" cy="196" r="42" fill="#5aa843" />
      </g>

      {/* gedung 1 */}
      <g {...S}>
        <rect x="190" y="150" width="150" height="120" fill="#ffffff" />
        <rect x="210" y="170" width="26" height="26" fill="#6ec6f2" />
        <rect x="252" y="170" width="26" height="26" fill="#6ec6f2" />
        <rect x="294" y="170" width="26" height="26" fill="#6ec6f2" />
        <rect x="210" y="210" width="26" height="26" fill="#6ec6f2" />
        <rect x="252" y="210" width="26" height="26" fill="#6ec6f2" />
        <rect x="294" y="210" width="26" height="26" fill="#6ec6f2" />
      </g>

      {/* gedung utama (tengah) dengan atap runcing + bendera */}
      <g {...S}>
        <rect x="470" y="90" width="260" height="180" fill="#ffffff" />
        <path d="M455 90 L600 30 L745 90 Z" fill="#ff7a59" />
        <line x1="600" y1="30" x2="600" y2="4" />
        <path d="M600 6 L636 14 L600 24 Z" fill="#ff7a59" />
        {/* jam */}
        <circle cx="600" cy="130" r="22" fill="#ffd451" />
        <path d="M600 130 L600 116 M600 130 L611 135" strokeWidth="4" />
        {/* jendela */}
        <rect x="500" y="170" width="34" height="34" fill="#6ec6f2" />
        <rect x="560" y="170" width="34" height="34" fill="#6ec6f2" />
        <rect x="620" y="170" width="34" height="34" fill="#6ec6f2" />
        <rect x="680" y="170" width="34" height="34" fill="#6ec6f2" />
        {/* pintu */}
        <rect x="576" y="220" width="48" height="50" rx="6" fill="#ff7a59" />
      </g>

      {/* gedung 3 */}
      <g {...S}>
        <rect x="800" y="160" width="150" height="110" fill="#ffffff" />
        <rect x="820" y="180" width="28" height="28" fill="#6ec6f2" />
        <rect x="864" y="180" width="28" height="28" fill="#6ec6f2" />
        <rect x="908" y="180" width="28" height="28" fill="#6ec6f2" />
        <rect x="820" y="222" width="28" height="28" fill="#6ec6f2" />
        <rect x="864" y="222" width="28" height="28" fill="#6ec6f2" />
        <rect x="908" y="222" width="28" height="28" fill="#6ec6f2" />
      </g>

      {/* pohon kanan */}
      <g {...S}>
        <rect x="1050" y="205" width="14" height="65" fill="#8a5a30" />
        <circle cx="1057" cy="190" r="46" fill="#5aa843" />
      </g>

      {/* papan Telkom */}
      <g {...S}>
        <rect x="360" y="228" width="90" height="42" rx="8" fill="#ffd451" />
      </g>
      <text
        x="405"
        y="255"
        textAnchor="middle"
        fontFamily="Fredoka, sans-serif"
        fontSize="16"
        fontWeight="700"
        fill="#141414"
      >
        TEL-U
      </text>
    </svg>
  )
}
