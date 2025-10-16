/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "@open-wc/testing";
import {
  elementUpdated,
  fixture,
  html,
  oneEvent,
} from "@open-wc/testing-helpers";
import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  let element: SearchInput;

  describe("Accessibility", () => {
    it("passes the a11y audit", async () => {
      element = await fixture(html`<search-input></search-input>`);

      await expect(element).shadowDom.to.be.accessible();
    });
  });

  describe("Basic Rendering", () => {
    beforeEach(async () => {
      element = await fixture(html`<search-input></search-input>`);
    });

    it("should render with default properties", () => {
      expect(element).to.exist;
      expect(element).to.be.instanceOf(SearchInput);
      expect(element.placeholder).to.equal("Search...");
      expect(element.debounce).to.equal(300);
      expect(element.disabled).to.equal(false);
      expect(element.suggestions.length).to.equal(0);
    });
  });

  describe("Property Binding", () => {
    beforeEach(async () => {
      element = await fixture(html`<search-input></search-input>`);
    });

    it("should change placeholder", async () => {
      const anyPlaceholder = "any_placeholder";
      element.placeholder = anyPlaceholder;
      await elementUpdated(element);
      const inputPlaceholder = element
        .shadowRoot!.querySelector("input")
        ?.getAttribute("placeholder");

      expect(inputPlaceholder).to.equal(anyPlaceholder);
      expect(element.placeholder).to.equal(anyPlaceholder);
    });
  });

  describe("Actions", () => {
    beforeEach(async () => {
      element = await fixture(html`<search-input></search-input>`);
    });

    it("should dispatch search event after type", async () => {
      const anySearchText = "any_search_text";
      const inputEl = element.shadowRoot!.querySelector(
        "input"
      ) as HTMLInputElement;
      inputEl.value = anySearchText;
      inputEl.dispatchEvent(new Event("input"));
      await element.updateComplete;
      const event = await oneEvent(element, "search");

      expect(element["query"]).to.equal(anySearchText);
      expect(event).to.exist;
    });
  });
});
