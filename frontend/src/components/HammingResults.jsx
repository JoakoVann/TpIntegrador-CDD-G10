import './HammingResults.css'

function BitBox({ bit, isParidad }) {
  return (
    <div className={`bit-box ${isParidad ? 'bit-box--parity' : 'bit-box--data'}`}>
      {bit}
    </div>
  )
}

function MetricCard({ value, label }) {
  return (
    <div className="hamming-metric">
      <span className="hamming-metric__value">{value}</span>
      <span className="hamming-metric__label">{label}</span>
    </div>
  )
}

function StatusBanner({ errorPos }) {
  if (errorPos === null || errorPos === undefined) return null

  const noError = errorPos === 0

  return (
    <div className={`status-banner ${noError ? 'status-banner--ok' : 'status-banner--error'}`}>
      {noError ? (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          Sin errores detectados
        </>
      ) : (
        <>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Error detectado en bit {errorPos} — corregido automáticamente
        </>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="hamming-results__empty">
      <div className="hamming-results__empty-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <p className="hamming-results__empty-text">
        Ingresá los bits y presioná <strong>Codificar</strong> o <strong>Decodificar</strong> para ver el resultado.
      </p>
    </div>
  )
}

// Parity bit positions in Hamming(7,4): positions 1,2,4 (1-indexed)
const PARITY_POSITIONS = new Set([1, 2, 4])

export default function HammingResults({ resultado, modo, error }) {
  if (error) {
    return (
      <section className="hamming-results">
        <div className="hamming-results__header">
          <h2 className="hamming-results__title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Resultado Hamming
          </h2>
        </div>
        <div className="hamming-results__body">
          <div className="hamming-results__error">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        </div>
      </section>
    )
  }

  if (!resultado) {
    return (
      <section className="hamming-results">
        <div className="hamming-results__header">
          <h2 className="hamming-results__title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Resultado Hamming
          </h2>
        </div>
        <div className="hamming-results__body">
          <EmptyState />
        </div>
      </section>
    )
  }

  // Determine what bits to display and metrics based on mode
  const esCodificar = modo === 'codificar'

  // For encoding: show the encoded bits (7 bits); for decoding: show the decoded data bits (4 bits)
  const bitsDisplay = esCodificar
    ? resultado.bits_codificados
    : resultado.bits_decodificados

  const bitsEntrada = resultado.longitud_bits_original
  const bitsSalida = esCodificar
    ? resultado.longitud_bits_codificados
    : resultado.longitud_bits_decodificados

  // Detect correction: compare decoded output with expected (only meaningful in decode mode)
  const errorPos = esCodificar ? 0 : (resultado.error_posicion ?? 0)

  const sectionLabel = esCodificar ? 'Código Generado' : 'Datos Extraídos'

  return (
    <section className="hamming-results">
      <div className="hamming-results__header">
        <h2 className="hamming-results__title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          Resultado Hamming
        </h2>
      </div>

      <div className="hamming-results__body">
        {/* Bit display */}
        <div className="hamming-results__section">
          <span className="hamming-results__section-label">{sectionLabel}</span>
          <div className="bit-display">
            {bitsDisplay?.map((bit, i) => (
              <BitBox
                key={i}
                bit={bit}
                isParidad={esCodificar && PARITY_POSITIONS.has(i + 1)}
              />
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="hamming-metrics-row">
          <MetricCard value={bitsEntrada} label="Bits entrada" />
          <MetricCard value={bitsSalida} label="Bits salida" />
        </div>

        {/* Status */}
        {!esCodificar && <StatusBanner errorPos={errorPos} />}

        {/* Encoded bits (in encode mode, also show the full sequence with parity highlighted) */}
        {esCodificar && (
          <div className="hamming-results__legend">
            <span className="legend-item legend-item--data">
              <span className="legend-dot legend-dot--data" /> Dato
            </span>
            <span className="legend-item legend-item--parity">
              <span className="legend-dot legend-dot--parity" /> Paridad
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
