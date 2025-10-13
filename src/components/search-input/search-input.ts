import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Styles from "./search-input.styles";

interface Suggestion {
  id: string;
  label: string;
  value: string;
}

@customElement("search-input")
export class SearchInput extends LitElement {
  @property({ type: String }) placeholder = "Search...";
  @property({ type: Number }) debounce = 300;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Array }) suggestions: Suggestion[] = [];

  @state() private query = "";
  @state() private isFocused = false;
  @state() private showSuggestions = false;
  @state() private selectedSuggestionIndex = -1;

  private debounceTimeout: number | undefined;

  static styles = Styles;

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.query = input.value;
    this.showSuggestions = true;
    this.selectedSuggestionIndex = -1;
    this.debounceSearch();
  }

  private debounceSearch() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = window.setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent("search", {
          detail: { query: this.query },
          bubbles: true,
          composed: true,
        })
      );
    }, this.debounce);
  }

  private handleFocus() {
    this.isFocused = true;
    if (this.suggestions.length > 0) {
      this.showSuggestions = true;
    }
  }

  private handleBlur() {
    this.isFocused = false;
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      this.showSuggestions = false;
    }, 150);
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        this.selectedSuggestionIndex = Math.min(
          this.selectedSuggestionIndex + 1,
          this.suggestions.length - 1
        );
        break;

      case "ArrowUp":
        event.preventDefault();
        this.selectedSuggestionIndex = Math.max(
          this.selectedSuggestionIndex - 1,
          -1
        );
        break;

      case "Enter":
        event.preventDefault();
        if (this.selectedSuggestionIndex >= 0) {
          this.selectSuggestion(this.suggestions[this.selectedSuggestionIndex]);
        }
        break;

      case "Escape":
        this.showSuggestions = false;
        this.selectedSuggestionIndex = -1;
        break;
    }
  }

  private selectSuggestion(suggestion: Suggestion) {
    this.query = suggestion.value;
    this.showSuggestions = false;
    this.selectedSuggestionIndex = -1;

    this.dispatchEvent(
      new CustomEvent("suggestion-selected", {
        detail: { suggestion },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent("search", {
        detail: { query: this.query },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const filteredSuggestions = this.suggestions.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().includes(this.query.toLowerCase()) ||
        suggestion.value.toLowerCase().includes(this.query.toLowerCase())
    );

    return html`
      <div class="search-container">
        <div class="search-wrapper ${this.isFocused ? "focused" : ""}">
          <svg
            class="search-icon"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            id="searchInput"
            class="search-input"
            type="text"
            autocomplete="off"
            placeholder=${this.placeholder}
            .value=${this.query}
            ?disabled=${this.disabled}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @keydown=${this.handleKeyDown}
          />
        </div>

        ${this.showSuggestions && filteredSuggestions.length > 0
          ? html`
              <div class="suggestions-list">
                ${filteredSuggestions.map(
                  (suggestion, index) => html`
                    <div
                      class="suggestion-item ${index ===
                      this.selectedSuggestionIndex
                        ? "selected"
                        : ""}"
                      @click=${() => this.selectSuggestion(suggestion)}
                      @mousedown=${(e: Event) => e.preventDefault()}
                    >
                      ${suggestion.label}
                    </div>
                  `
                )}
              </div>
            `
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "search-input": SearchInput;
  }
}
