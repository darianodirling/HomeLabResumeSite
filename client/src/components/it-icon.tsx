const ITIcon = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="200"
        cy="150"
        r="140"
        fill="none"
        stroke="hsl(160, 84%, 39%)"
        strokeWidth="2"
        opacity="0.3"
      />
      
      {/* Server rack */}
      <rect
        x="120"
        y="80"
        width="60"
        height="140"
        rx="4"
        fill="hsl(240, 10%, 10%)"
        stroke="hsl(160, 84%, 39%)"
        strokeWidth="2"
      />
      
      {/* Server units */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="125"
            y={90 + i * 25}
            width="50"
            height="20"
            rx="2"
            fill="hsl(240, 6%, 14%)"
            stroke="hsl(160, 50%, 85%)"
            strokeWidth="1"
          />
          {/* LED indicators */}
          <circle
            cx="130"
            cy={100 + i * 25}
            r="2"
            fill="hsl(160, 84%, 39%)"
          />
          <circle
            cx="138"
            cy={100 + i * 25}
            r="2"
            fill="hsl(160, 84%, 70%)"
          />
          {/* Vents */}
          {[0, 1, 2].map((j) => (
            <line
              key={j}
              x1={150 + j * 6}
              y1={95 + i * 25}
              x2={150 + j * 6}
              y2={105 + i * 25}
              stroke="hsl(240, 5%, 64%)"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}
      
      {/* Network connections */}
      <g stroke="hsl(160, 84%, 39%)" strokeWidth="2" fill="none">
        {/* Connection lines */}
        <path d="M180 120 Q220 110 250 120" opacity="0.8" />
        <path d="M180 140 Q230 130 270 140" opacity="0.8" />
        <path d="M180 160 Q220 170 250 160" opacity="0.8" />
        <path d="M180 180 Q230 190 270 180" opacity="0.8" />
      </g>
      
      {/* Network nodes */}
      {[
        { x: 250, y: 120 },
        { x: 270, y: 140 },
        { x: 250, y: 160 },
        { x: 270, y: 180 },
      ].map((node, i) => (
        <g key={i}>
          <circle
            cx={node.x}
            cy={node.y}
            r="8"
            fill="hsl(240, 10%, 10%)"
            stroke="hsl(160, 84%, 39%)"
            strokeWidth="2"
          />
          <circle
            cx={node.x}
            cy={node.y}
            r="3"
            fill="hsl(160, 84%, 39%)"
          />
        </g>
      ))}
      
      {/* Cloud symbol */}
      <g transform="translate(300, 100)">
        <path
          d="M20 30 Q10 20 20 15 Q25 10 35 15 Q45 10 50 20 Q55 15 60 20 Q65 25 60 35 Q55 40 45 35 Q35 40 25 35 Q15 40 20 30 Z"
          fill="hsl(240, 10%, 10%)"
          stroke="hsl(160, 84%, 39%)"
          strokeWidth="2"
        />
        <circle cx="35" cy="25" r="2" fill="hsl(160, 84%, 39%)" />
        <circle cx="45" cy="25" r="2" fill="hsl(160, 84%, 39%)" />
      </g>
      
      {/* Data flow particles */}
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={190 + i * 20}
          cy={120 + (i % 2) * 40}
          r="1.5"
          fill="hsl(160, 84%, 70%)"
          opacity="0.8"
        >
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            begin={`${i * 0.5}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
};

export default ITIcon;