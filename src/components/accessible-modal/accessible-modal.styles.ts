import { css } from "lit";

export default css`
  :host {
    display: contents;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    padding: 20px;
    box-sizing: border-box;
  }

  .overlay.visible {
    opacity: 1;
    visibility: visible;
  }

  .modal {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: min(90vw, 600px);
    max-height: min(90vh, 800px);
    width: 100%;
    display: flex;
    flex-direction: column;
    transform: scale(0.9) translateY(-20px);
    transition: all 0.3s ease;
    outline: none;
    position: relative;
  }

  .overlay.visible .modal {
    transform: scale(1) translateY(0);
  }

  .header {
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid #e5e5e5;
    flex-shrink: 0;
    position: relative;
  }

  .title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    padding-right: 3rem;
  }

  .body {
    padding: 1.5rem;
    flex: 1;
    overflow-y: auto;
    max-height: 60vh;
  }

  .footer {
    padding: 1.5rem;
    border-top: 1px solid #e5e5e5;
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #f8f9fa;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background-color: #e9ecef;
    color: #333;
  }

  .close-button:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  .button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 80px;
  }

  .button:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  .button.primary {
    background-color: #0066cc;
    color: white;
  }

  .button.primary:hover {
    background-color: #0052a3;
  }

  .button.secondary {
    background-color: #6c757d;
    color: white;
  }

  .button.secondary:hover {
    background-color: #545b62;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus trap indicators (hidden but accessible) */
  .focus-trap {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  @media (max-width: 768px) {
    .overlay {
      padding: 10px;
    }

    .modal {
      max-width: 95vw;
    }

    .footer {
      flex-direction: column;
    }

    .button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .overlay,
    .modal {
      transition: none;
    }
  }
`;
