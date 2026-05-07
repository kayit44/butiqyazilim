interface PhoneFrameProps {
  src: string;
  alt?: string;
  width?: number;
  lazy?: boolean;
}

export default function PhoneFrame({ src, alt = '', width = 140, lazy = true }: PhoneFrameProps) {
  const scale = width / 248;

  const btn = (style: React.CSSProperties) => (
    <div style={{
      position: 'absolute',
      background: 'linear-gradient(to right,#111,#2e2e2e)',
      boxShadow: '-1px 0 2px rgba(0,0,0,0.5)',
      ...style,
    }} />
  );

  return (
    <div style={{
      width,
      position: 'relative',
      borderRadius: 52 * scale,
      background: 'linear-gradient(170deg, #48484a 0%, #1c1c1e 45%, #2c2c2e 100%)',
      padding: `${10 * scale}px ${8 * scale}px`,
      boxShadow: [
        '0 0 0 1px rgba(255,255,255,0.13)',
        '0 0 0 3px rgba(0,0,0,0.75)',
        `0 ${32 * scale}px ${64 * scale}px rgba(0,0,0,0.32)`,
        'inset 0 1px 0 rgba(255,255,255,0.07)',
      ].join(', '),
      flexShrink: 0,
    }}>
      {/* Mute */}
      {btn({ left: -3 * scale, top: 82 * scale, width: 3.5 * scale, height: 20 * scale, borderRadius: '3px 0 0 3px' })}
      {/* Vol + */}
      {btn({ left: -3 * scale, top: 116 * scale, width: 3.5 * scale, height: 38 * scale, borderRadius: '3px 0 0 3px' })}
      {/* Vol − */}
      {btn({ left: -3 * scale, top: 164 * scale, width: 3.5 * scale, height: 38 * scale, borderRadius: '3px 0 0 3px' })}
      {/* Power */}
      {btn({ right: -3 * scale, top: 128 * scale, width: 3.5 * scale, height: 64 * scale, background: 'linear-gradient(to left,#111,#2e2e2e)', borderRadius: '0 3px 3px 0' })}

      {/* Screen */}
      <div style={{
        borderRadius: 44 * scale,
        overflow: 'hidden',
        background: '#000',
        position: 'relative',
        aspectRatio: '390 / 844',
      }}>
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          fetchPriority={lazy ? 'auto' : 'high'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
          draggable={false}
        />

        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 13 * scale, left: '50%', transform: 'translateX(-50%)',
          width: 112 * scale, height: 34 * scale,
          background: '#000', borderRadius: 20 * scale,
          zIndex: 10, pointerEvents: 'none',
        }} />

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 10 * scale, left: '50%', transform: 'translateX(-50%)',
          width: 104 * scale, height: 5 * scale,
          background: 'rgba(255,255,255,0.38)', borderRadius: 3 * scale,
          zIndex: 10, pointerEvents: 'none',
        }} />

        {/* Screen reflection */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)',
          pointerEvents: 'none', zIndex: 5,
        }} />
      </div>
    </div>
  );
}
