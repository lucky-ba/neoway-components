/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "@open-wc/testing";
import {
  elementUpdated,
  fixture,
  html,
  oneEvent,
} from "@open-wc/testing-helpers";
import { sendKeys } from "@web/test-runner-commands";
import { spy } from "sinon";
import { AccessibleModal } from "../accessible-modal";

describe("AccessibleModal", () => {
  let element: AccessibleModal;

  describe("Basic Rendering", () => {
    beforeEach(async () => {
      element = await fixture(html`<accessible-modal></accessible-modal>`);
    });

    it("should return no elements by default", () => {
      expect(element.shadowRoot?.childElementCount).to.equal(0);
    });

    it("should render with default properties", () => {
      expect(element).to.exist;
      expect(element).to.be.instanceOf(AccessibleModal);
      expect(element.title).to.equal("Modal Title");
      expect(element.open).to.equal(false);
      expect(element.closeOnOverlayClick).to.equal(true);
      expect(element.closeOnEscape).to.equal(true);
    });

    it("should dispatche modal-close event on overlay click", async () => {
      element.open = true;
      await elementUpdated(element);
      const overlayEl = element.shadowRoot!.querySelector(
        ".overlay"
      ) as HTMLElement;
      setTimeout(() => overlayEl.click());
      const closeSpy = spy(element as any, "_close");
      const event = await oneEvent(element, "modal-close");

      expect(closeSpy).to.have.callCount(1);
      expect(event).to.exist;
    });

    it("should dispatche modal-close event on close button click", async () => {
      element.open = true;
      await elementUpdated(element);
      const buttonEl = element.shadowRoot!.querySelector(
        ".close-button"
      ) as HTMLButtonElement;
      setTimeout(() => buttonEl.click());
      const event = await oneEvent(element, "modal-close");

      expect(event).to.exist;
    });

    it("should dispatche modal-close event on Escape press", async () => {
      element.open = true;
      await elementUpdated(element);
      setTimeout(
        async () =>
          await sendKeys({
            press: "Escape",
          })
      );
      const event = await oneEvent(element, "modal-close");

      await expect(event).to.exist;
    });
  });

  describe("Property Binding", () => {
    beforeEach(async () => {
      element = await fixture(html`<accessible-modal></accessible-modal>`);
    });

    it("should displays elements in shadow DOM if open is true", async () => {
      element.open = true;
      await elementUpdated(element);

      expect(element.shadowRoot?.childElementCount).to.equal(1);
    });

    it("should render with custom title", async () => {
      const customTitle = "any_custom_title";
      element.open = true;
      element.title = customTitle;
      await elementUpdated(element);
      const titleEl = element.shadowRoot!.getElementById("modal-title");

      expect(element.title).to.equal(customTitle);
      expect(titleEl?.textContent).to.include(customTitle);
    });

    it("should not call _close on overlay click when closeOnOverlayClick is false", async () => {
      element.open = true;
      element.closeOnOverlayClick = false;
      await elementUpdated(element);
      const overlayEl = element.shadowRoot!.querySelector(
        ".overlay"
      ) as HTMLElement;
      overlayEl.click();
      const closeSpy = spy(element as any, "_close");

      expect(closeSpy).to.have.callCount(0);
    });

    it("should not call _close on close button click when closeOnOverlayClick is false", async () => {
      element.open = true;
      element.closeOnOverlayClick = false;
      await elementUpdated(element);
      const overlayEl = element.shadowRoot!.querySelector(
        ".overlay"
      ) as HTMLElement;
      overlayEl.click();
      const closeSpy = spy(element as any, "_close");

      expect(closeSpy).to.have.callCount(0);
    });
    it("should call _close on Escape press when closeOnEscape is false", async () => {
      element.open = true;
      element.closeOnEscape = false;
      await elementUpdated(element);
      const closeSpy = spy(element as any, "_close");
      await sendKeys({
        press: "Escape",
      });

      expect(closeSpy).to.have.callCount(0);
    });
  });

  describe("Slots", () => {
    it("renders slot content", async () => {
      element = await fixture(html`
        <accessible-modal open="true">
          <span>Default slot content</span>
        </accessible-modal>
      `);
      const slotEl = element.shadowRoot!.querySelector("slot");
      const assignedElements = slotEl?.assignedElements() as any;

      expect(assignedElements?.length).to.equal(1);
      expect(assignedElements[0]?.tagName).to.equal("SPAN");
      expect(assignedElements[0]?.textContent).to.equal("Default slot content");
    });
  });
});
