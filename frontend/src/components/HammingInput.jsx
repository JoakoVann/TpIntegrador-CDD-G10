import { useRef, useState } from 'react'
import './HammingInput.css'

const EJEMPLO_CODIFICAR = '1011'       // 4 bits de datos → Hamming(7,4)
const EJEMPLO_DECODIFICAR = '0110011' // 7 bits → decodificar

export default function HammingInput({ onProcesar, loading }) {
  const [modo, setModo] = useState('decodificar') // 'codificar' | 'decodificar'
  const [bits, setBits] = useState('')
  const fileInputRef = useRef(null)

  // Solo aceptar 0 y 1
  const handleBitsChange = (e) => {
    const val = e.target.value.replace(/[^01]/g, '')
    setBits(val)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setBits(ev.target.result.trim().replace(/[^01]/g, ''))
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleEjemplo = () => {
    setBits(modo === 'codificar' ? EJEMPLO_CODIFICAR : EJEMPLO_DECODIFICAR)
  }

  const handleLimpiar = () => setBits('')

  const handleSubmit = () => {
    if (!bits || loading) return
    onProcesar({ bits, modo })
  }

  const maxBits = modo === 'codificar' ? 4 : 7
  const bitCount = bits.length

  const infoLines =
    modo === 'codificar'
      ? ['4 bits de datos', '3 bits de paridad añadidos', 'Genera código Hamming(7,4)']
      : ['4 bits de datos', '3 bits de paridad', 'Detecta y corrige 1 error']

  return (
    <aside className="hamming-panel">
      <div className="hamming-panel__header">
        <h2 className="hamming-panel__title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          Código Hamming (7,4)
        </h2>
      </div>

      <div className="hamming-panel__body">
        {/* Mode toggle */}
        <div className="mode-toggle" role="group" aria-label="Modo">
          <button
            id="btn-modo-codificar"
            className={`mode-toggle__btn ${modo === 'codificar' ? 'mode-toggle__btn--active' : ''}`}
            onClick={() => { setModo('codificar'); setBits('') }}
          >
            Codificar
          </button>
          <button
            id="btn-modo-decodificar"
            className={`mode-toggle__btn ${modo === 'decodificar' ? 'mode-toggle__btn--active' : ''}`}
            onClick={() => { setModo('decodificar'); setBits('') }}
          >
            Decodificar
          </button>
        </div>

        {/* Bit input */}
        <div className="bit-input-group">
          <label className="bit-input-group__label" htmlFor="hamming-bits-input">
            Código ({maxBits} bits)
          </label>
          <input
            id="hamming-bits-input"
            type="text"
            className="bit-input-group__input"
            value={bits}
            onChange={handleBitsChange}
            maxLength={maxBits}
            placeholder={'0'.repeat(maxBits)}
            spellCheck={false}
            autoComplete="off"
          />
          <span className={`bit-input-group__counter ${bitCount === maxBits ? 'bit-input-group__counter--full' : ''}`}>
            {bitCount} / {maxBits} bits
          </span>
        </div>

        {/* File loader */}
        <button
          id="btn-cargar-bits"
          className="btn btn--outline btn--block"
          onClick={() => fileInputRef.current?.click()}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Cargar archivo .txt
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </button>

        {/* Info box */}
        <div className="hamming-info">
          <div className="hamming-info__title">Hamming (7,4):</div>
          <ul className="hamming-info__list">
            {infoLines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hamming-panel__footer">
        <button
          id="btn-procesar-hamming"
          className="btn btn--primary btn--block"
          onClick={handleSubmit}
          disabled={bitCount !== maxBits || loading}
        >
          {loading ? (
            <>
              <span className="btn-spinner" />
              Procesando...
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="13 2 13 9 20 9" />
                <path d="M20 14v7H4V3h9" />
              </svg>
              {modo === 'codificar' ? 'Codificar' : 'Decodificar'}
            </>
          )}
        </button>

        <div className="hamming-panel__actions-row">
          <button id="btn-ejemplo-hamming" className="btn btn--ghost" onClick={handleEjemplo}>
            Ejemplo
          </button>
          <button id="btn-limpiar-hamming" className="btn btn--ghost" onClick={handleLimpiar}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Limpiar
          </button>
        </div>
      </div>
    </aside>
  )
}
