import { LitElement, html } from "lit";
import { property, query } from "lit/decorators.js";
import { customElement } from "lit/decorators.js";
import Styles from "./accessible-modal.styles";

@customElement("accessible-modal")
export class AccessibleModal extends LitElement {
  static styles = Styles;

  @property({ type: Boolean })
  open = false;

  @property({ type: String })
  title = "Modal Title";

  @property({ type: Boolean })
  closeOnOverlayClick = true;

  @property({ type: Boolean })
  closeOnEscape = true;

  @query(".modal")
  private _modalElement!: HTMLElement;

  @query(".overlay")
  private _overlayElement!: HTMLElement;

  @query(".close-button")
  private _closeButtonElement!: HTMLElement;

  private _lastFocusedElement: HTMLElement | null = null;
  private _focusableElements: HTMLElement[] = [];
  private _firstFocusableElement: HTMLElement | null = null;
  private _lastFocusableElement: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", this._handleKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeydown);
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has("open")) {
      this._handleOpenChange();
    }
  }

  private _handleOpenChange(): void {
    if (this.open) {
      this._show();
    } else {
      this._hide();
    }
  }

  private _show(): void {
    this._lastFocusedElement = document.activeElement as HTMLElement;

    // Wait for the next frame to ensure the modal is in the DOM
    requestAnimationFrame(() => {
      this._closeButtonElement.focus();
      this._updateFocusableElements();
      this._trapFocus();
    });
  }

  private _hide(): void {
    // Return focus to the previously focused element
    if (this._lastFocusedElement) {
      requestAnimationFrame(() => {
        this._lastFocusedElement?.focus();
      });
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case "Escape":
        if (this.closeOnEscape) {
          event.preventDefault();
          this._close();
        }
        break;

      case "Tab":
        this._handleTabKey(event);
        break;
    }
  }

  private _handleTabKey(event: KeyboardEvent): void {
    this._updateFocusableElements();

    if (this._focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    if (this._focusableElements.length === 1) {
      event.preventDefault();
      return;
    }

    const firstElement = this._firstFocusableElement;
    const lastElement = this._lastFocusableElement;

    if (!firstElement || !lastElement) return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  private _updateFocusableElements(): void {
    const focusableSelectors = [
      "button:not([disabled])",
      '[href]:not([aria-hidden="true"])',
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
      'details:not([aria-hidden="true"])',
      'summary:not([aria-hidden="true"])',
    ].join(",");

    this._focusableElements = Array.from(
      this._modalElement.querySelectorAll(focusableSelectors)
    ).filter((element) => {
      const style = window.getComputedStyle(element);
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        element.getAttribute("aria-hidden") !== "true"
      );
    }) as HTMLElement[];
    this._firstFocusableElement = this._focusableElements[0] || null;
    this._lastFocusableElement =
      this._focusableElements[this._focusableElements.length - 1] || null;
  }

  private _trapFocus(): void {
    this._updateFocusableElements();

    if (
      this._focusableElements.length > 0 &&
      !this._modalElement.contains(document.activeElement)
    ) {
      const firstFocusable = this._firstFocusableElement || this._modalElement;
      firstFocusable.focus();
    }
  }

  private _close(): void {
    this.dispatchEvent(
      new CustomEvent("modal-close", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleOverlayClick(event: Event): void {
    if (!this.closeOnOverlayClick) return;

    if (event.target === this._overlayElement) {
      this._close();
    }
  }

  render() {
    return this.open
      ? html`
          <div
            class="overlay"
            @click=${this._handleOverlayClick}
            role="presentation"
          >
            <!-- Focus trap start -->
            <div
              class="focus-trap"
              tabindex="0"
              aria-hidden="true"
              @focus=${() => this._lastFocusableElement?.focus()}
            ></div>

            <div
              class="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-content"
              tabindex="-1"
            >
              <div class="header">
                <h2 id="modal-title" class="title">${this.title}</h2>
                <button
                  class="close-button"
                  @click=${this._close}
                  aria-label="Close dialog"
                >
                  ×
                  <span class="sr-only">Close</span>
                </button>
              </div>

              <div id="modal-content" class="body">
                <slot></slot>
              </div>
            </div>

            <!-- Focus trap end -->
            <div
              class="focus-trap"
              tabindex="0"
              aria-hidden="true"
              @focus=${() => this._firstFocusableElement?.focus()}
            ></div>
          </div>
        `
      : null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "accessible-modal": AccessibleModal;
  }
}
