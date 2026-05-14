'use client';

export default function CarteClient({ name, cardUrl }: { name: string; cardUrl: string }) {
  const handleDownload = async () => {
    const res = await fetch(cardUrl);
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `carte-AEMM-${name}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div style={{
      background: '#dde1e8',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      gap: '20px',
      fontFamily: 'Segoe UI, sans-serif',
      boxSizing: 'border-box',
    }}>
      <p style={{
        color: '#1b3a6b',
        fontSize: '15px',
        fontWeight: 600,
        textAlign: 'center',
        margin: 0,
      }}>
        Carte de membre — {name}
      </p>

      <div style={{
        width: '100%',
        maxWidth: '860px',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
      }}>
        <img
          src={cardUrl}
          alt={`Carte ${name}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      <button
        onClick={handleDownload}
        style={{
          background: '#1b3a6b',
          color: 'white',
          border: 'none',
          padding: '13px 28px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Segoe UI, sans-serif',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Télécharger ma carte
      </button>
    </div>
  );
}