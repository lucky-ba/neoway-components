import { css } from "lit";

export default css`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;
  }

  .table-container {
    border: 1px solid #e1e5e9;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: white;
  }

  .table-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 24px;
  }

  .table-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .table-subtitle {
    font-size: 14px;
    opacity: 0.9;
    margin: 4px 0 0 0;
  }

  .table {
    display: flex;
    flex-direction: column;
  }

  .header-row {
    display: flex;
    background-color: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
  }

  .header-cell:focus {
    outline-color: #2563eb;
  }

  .header-cell {
    padding: 16px 12px;
    font-weight: 600;
    font-size: 13px;
    color: #475569;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 52px;
    box-sizing: border-box;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.2s ease;
  }

  .header-cell.sortable:hover {
    background-color: #e2e8f0;
    color: #334155;
  }

  .header-cell.left {
    justify-content: flex-start;
    text-align: left;
  }
  .header-cell.center {
    justify-content: center;
    text-align: center;
  }
  .header-cell.right {
    justify-content: flex-end;
    text-align: right;
  }

  .sort-indicator {
    margin-left: 8px;
    font-size: 12px;
    opacity: 0.7;
  }

  .data-rows {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
  }

  .data-row {
    display: flex;
    border-bottom: 1px solid #f1f5f9;
    transition: all 0.2s ease;
    position: relative;
  }

  .data-row:focus {
    outline-color: #2563eb;
  }

  .data-row:last-child {
    border-bottom: none;
  }

  .data-row:hover {
    background-color: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .data-cell {
    padding: 16px 12px;
    font-size: 14px;
    color: #334155;
    display: flex;
    align-items: center;
    min-height: 52px;
    box-sizing: border-box;
    word-wrap: break-word;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .data-cell.left {
    justify-content: flex-start;
    text-align: left;
  }
  .data-cell.center {
    justify-content: center;
    text-align: center;
  }
  .data-cell.right {
    justify-content: flex-end;
    text-align: right;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 24px;
    color: #1a3355ff;
    text-align: center;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .empty-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 8px 0;
  }

  .empty-subtitle {
    font-size: 14px;
    opacity: 0.7;
    margin: 0;
  }

  /* Column width utilities */
  .width-auto {
    flex: 1;
  }
  .width-100 {
    width: 100px;
    flex: 0 0 100px;
  }
  .width-120 {
    width: 120px;
    flex: 0 0 120px;
  }
  .width-150 {
    width: 150px;
    flex: 0 0 150px;
  }
  .width-200 {
    width: 200px;
    flex: 0 0 200px;
  }
  .width-250 {
    width: 250px;
    flex: 0 0 250px;
  }
  .width-300 {
    width: 300px;
    flex: 0 0 300px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .table-container {
      border-radius: 8px;
      margin: 0 -16px;
      border-left: none;
      border-right: none;
    }

    .header-cell,
    .data-cell {
      padding: 12px 8px;
      font-size: 13px;
      min-height: 44px;
    }
  }
`;
