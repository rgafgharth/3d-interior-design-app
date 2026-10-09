html, body, #root {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: Inter, 'Segoe UI', sans-serif;
  background: #eff5fb;
  color: #1a2430;
}

* { box-sizing: border-box; }

button { font: inherit; }

.app-shell {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 320px 1fr;
  background: radial-gradient(circle at top, #f8fbff 0%, #e8eef8 55%, #e0e9f7 100%);
}

.sidebar {
  padding: 28px 20px;
  background: rgba(255, 255, 255, 0.6);
  border-right: 1px solid rgba(25, 34, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1, h2, p { margin: 0; }

.eyebrow {
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  color: #6b7d8e;
  font-weight: 700;
}

h1 { font-size: clamp(2rem, 2vw, 2.5rem); }

.panel {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(29, 44, 60, 0.08);
  border-radius: 20px;
  padding: 18px 16px;
  box-shadow: 0 12px 25px rgba(24, 33, 46, 0.06);
}

.catalog-grid {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.catalog-item {
  border: 1px solid rgba(105, 125, 141, 0.3);
  background: linear-gradient(180deg, #ffffff, #f2f8ff);
  border-radius: 14px;
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
  transition: all 180ms ease;
}

.catalog-item.selected {
  border-color: rgba(231, 167, 79, 0.9);
  background: linear-gradient(180deg, #fff9ed, #fef2d9);
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(219, 162, 61, 0.12);
}

.catalog-item span {
  font-weight: 700;
}

.actions-panel {
  display: grid;
  gap: 10px;
}

.primary, .secondary {
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
}

.primary {
  background: linear-gradient(135deg, #2f405a, #4a6784);
  color: white;
  box-shadow: 0 12px 18px rgba(52, 74, 99, 0.2);
}

.secondary {
  background: #edf3fb;
  color: #24374b;
}

.secondary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.viewer-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px 14px;
}

.topbar h2 {
  font-size: clamp(1.3rem, 2vw, 2rem);
}

.status-pill {
  border-radius: 999px;
  padding: 10px 16px;
  background: rgba(72, 128, 104, 0.12);
  color: #2d6a55;
  font-weight: 700;
}

canvas {
  width: 100% !important;
  height: calc(100vh - 90px) !important;
  display: block;
}

@media (max-width: 900px) {
  .app-shell {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(24, 35, 44, 0.08);
  }

  canvas { height: 60vh !important; }
}
