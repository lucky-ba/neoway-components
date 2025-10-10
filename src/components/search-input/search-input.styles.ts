import { css } from "lit";

export default css`
  :host {
    display: block;
    --search-primary-color: #2563eb;
    --search-border-color: #d1d5db;
    --search-bg-color: #ffffff;
    --search-text-color: #374151;
    --search-placeholder-color: #9ca3af;
  }

  .search-container {
    position: relative;
    width: 100%;
  }

  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid var(--search-border-color);
    border-radius: 6px;
    background-color: var(--search-bg-color);
    transition: all 0.2s ease-in-out;
  }

  .search-wrapper.focused {
    border-color: var(--search-primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .search-icon {
    position: absolute;
    left: 12px;
    width: 20px;
    height: 20px;
    color: var(--search-placeholder-color);
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: none;
    background: transparent;
    color: var(--search-text-color);
    font-size: 14px;
    outline: none;
    border-radius: 6px;
  }

  .suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--search-border-color);
    border-radius: 6px;
    margin-top: 4px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .suggestion-item {
    padding: 8px 12px;
    cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
  }

  .suggestion-item:hover,
  .suggestion-item.selected {
    background-color: #f3f4f6;
  }

  .suggestion-item:last-child {
    border-bottom: none;
  }
`;
