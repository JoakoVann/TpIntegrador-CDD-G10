import './ImageComparison.css'

export default function ImageComparison({ originalImage, processedImage }) {
  return (
    <section className="comparison-panel">
      <div className="comparison-panel__header">
        <h2 className="comparison-panel__title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 6H3M15 12H3M17 18H3" />
            <polyline points="17 8 21 12 17 16" />
          </svg>
          Comparación Original vs Digitalizada
        </h2>
      </div>

      <div className="comparison-panel__body">
        {/* Original */}
        <div className="image-pane">
          <div className="image-pane__header">
            <span className="image-pane__label">Original</span>
            <span className="image-pane__badge image-pane__badge--blue">Alta resolución</span>
          </div>
          <div className="image-pane__frame" id="frame-original">
            {originalImage ? (
              <img
                src={originalImage}
                alt="Imagen original"
                className="image-pane__img"
              />
            ) : (
              <div className="image-pane__empty">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Sin imagen</span>
              </div>
            )}
          </div>
        </div>

        <div className="comparison-panel__divider">
          <div className="comparison-panel__divider-line" />
        </div>

        {/* Digitalizada */}
        <div className="image-pane">
          <div className="image-pane__header">
            <span className="image-pane__label">Digitalizada</span>
            <span className="image-pane__badge image-pane__badge--green">Procesada</span>
          </div>
          <div className="image-pane__frame" id="frame-digitalizada">
            {processedImage ? (
              <img
                src={processedImage}
                alt="Imagen digitalizada"
                className="image-pane__img"
              />
            ) : (
              <div className="image-pane__empty">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Sin imagen</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
