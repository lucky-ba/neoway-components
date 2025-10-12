/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "@lit-labs/virtualizer";
import Style from "./virtualized-table.styles";

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface TableData {
  [key: string]: any;
}

@customElement("virtualized-table")
export class VirtualizedTable extends LitElement {
  static styles = Style;

  @property({ type: Array })
  columns: TableColumn[] = [];

  @property({ type: Array })
  data: TableData[] = [];

  @property({ type: String })
  title: string = "";

  @property({ type: String })
  subtitle: string = "";

  @property({ type: Number })
  height: number = 250;

  @state()
  private sortBy: string = "";

  @state()
  private sortDirection: "asc" | "desc" = "asc";

  private handleKeyDown(event: KeyboardEvent, row: any) {
    if (event.key === "Enter") {
      console.log(row);
    }
  }

  render() {
    return html`
      <div class="table-container">
        ${this.title ? this._renderHeader() : ""}
        <div class="table">
          ${this._renderTableHeader()} ${this._renderTableBody()}
        </div>
      </div>
    `;
  }

  private _renderHeader() {
    return html`
      <div class="table-header">
        <h2 class="table-title">${this.title}</h2>
        ${this.subtitle
          ? html`<p class="table-subtitle">${this.subtitle}</p>`
          : ""}
      </div>
    `;
  }

  private _renderTableHeader() {
    return html`
      <div class="header-row">
        ${this.columns.map((column) => this._renderHeaderCell(column))}
      </div>
    `;
  }

  private _renderHeaderCell(column: TableColumn) {
    const isSorted = this.sortBy === column.key;
    const sortIndicator = isSorted
      ? html`<span class="sort-indicator"
          >${this.sortDirection === "asc" ? "↑" : "↓"}</span
        >`
      : "";

    const widthClass = column.width ? `width-${column.width}` : "width-auto";
    const alignClass = column.align ? column.align : "left";

    return html`
      <div
        tabindex="0"
        class="header-cell ${column.sortable
          ? "sortable"
          : ""} ${widthClass} ${alignClass}"
        @click=${column.sortable ? () => this._handleSort(column.key) : null}
      >
        <span>${column.header}</span>
        ${sortIndicator}
      </div>
    `;
  }

  private _renderTableBody() {
    if (this.data.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <h3 class="empty-title">No data available</h3>
          <p class="empty-subtitle">There's no data to display at the moment</p>
        </div>
      `;
    }

    const sortedData = this._getSortedData();
    return html`
      <lit-virtualizer
        tabindex="-1"
        style="min-height: ${this.height}px; "
        scroller
        .items=${sortedData}
        .renderItem=${(row: TableData, index: number) => html`<div
          class="data-rows"
        >
          ${this._renderDataRow(row, index)}
        </div>`}
      ></lit-virtualizer>
    `;
  }

  private _renderDataRow(row: TableData, index: number) {
    return html`
      <div
        class="data-row"
        data-row-index="${index}"
        tabindex="0"
        @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, row)}
      >
        ${this.columns.map((column) => this._renderDataCell(row, column))}
      </div>
    `;
  }

  private _renderDataCell(row: TableData, column: TableColumn) {
    const widthClass = column.width ? `width-${column.width}` : "width-auto";
    const alignClass = `data-cell ${column.align || "left"}`;

    return html`
      <div class="${alignClass} ${widthClass}">${row[column.key] ?? "-"}</div>
    `;
  }

  private _handleSort(columnKey: string) {
    if (this.sortBy === columnKey) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortBy = columnKey;
      this.sortDirection = "asc";
    }
  }

  private _getSortedData(): TableData[] {
    if (!this.sortBy) {
      return this.data;
    }

    return [...this.data].sort((a, b) => {
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      let result = 0;
      if (aValue < bValue) result = -1;
      if (aValue > bValue) result = 1;

      return this.sortDirection === "asc" ? result : -result;
    });
  }
}
