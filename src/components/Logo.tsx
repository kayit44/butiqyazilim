import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  white?: boolean;
}

export function Logo({ size = 'sm', className = '', white = false }: LogoProps) {
  const scale  = size === 'sm' ? 1 : size === 'md' ? 1.28 : 1.65;
  const fs     = Math.round(scale * 24);
  const subFs  = Math.round(scale * 12);
  const color  = white ? '#F5F3EF' : 'var(--color-primary)';
  const dimmed = white ? 'rgba(242,239,233,0.5)' : 'var(--color-secondary)';

  return (
    <Link
      to="/"
      className={`group inline-flex flex-col items-start select-none transition-opacity duration-200 hover:opacity-70 ${className}`}
    >
      <span
        style={{
          fontFamily:    'var(--font-display)',
          fontWeight:    900,
          fontSize:      fs,
          letterSpacing: '-0.03em',
          lineHeight:    1,
          color,
        }}
      >
        butiq
        <span style={{ color: 'var(--color-highlight)' }}>.</span>
        <span
          style={{
            fontWeight:    300,
            fontSize:      fs,
            letterSpacing: '0.04em',
            color:         dimmed,
          }}
        >
          yazılım
        </span>
      </span>

    </Link>
  );
}
