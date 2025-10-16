# Neoway Lit Components Challenge

A lightweight npm package containing reusable, accessible, and performant web components built with Lit. This package includes a virtualized table, debounced search input, and an accessible modal component.

## Installation

```bash
npm install neoway-components
```

```bash
yarn add neoway-components
```

## Components

### Virtualized Table

A high-performance virtualized table component for displaying large datasets efficiently.

#### Usage

```javascript
import "neoway-components";
```

```html
<virtualized-table
  .columns="${columns}"
  .data="${data}"
  height="500"
  @row-click="${handleRowClick}"
></virtualized-table>
```

#### Properties

- `columns` (Array, required): Array of column configuration objects
  ```javascript
  const columns = [
    { key: "id", header: "ID", width: 100 },
    { key: "name", header: "Name", width: 200, align: "left" },
    { key: "status", header: "Status", sortable: true, align: "center" },
  ];
  ```
- `data` (Array, required): Array of data objects to display
- `height` (String, optional): Minimum height in pixels of the table (e.g., "500", "150")

#### Events

- `row-click`: Dispatched when a row is clicked
  ```javascript
  handleRowClick(event) {
    const rowData = event.detail;
    console.log('Clicked row:', rowData);
  }
  ```

#### Features

- **Virtualization**: Only renders visible rows for optimal performance
- **Fixed headers**: Headers remain visible while scrolling
- **Customizable columns**: Flexible column configuration
- **Click handling**: Easy row interaction

---

### Search Input

A debounced search input component with customizable delay.

#### Usage

```javascript
import "neoway-components";
```

```html
<search-input
  placeholder="Search items..."
  debounce="300"
  @search="${handleSearch}"
></search-input>
```

#### Properties

- `placeholder` (String): Placeholder text displayed in the input
- `debounce` (Number): Debounce time in milliseconds (default: 300)

#### Events

- `search`: Dispatched after debounce delay with the search query
  ```javascript
  handleSearch(event) {
    const query = event.detail;
    console.log('Search query:', query);
    // Perform search operation
  }
  ```

#### Features

- **Debounced input**: Reduces API calls and improves performance
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Flexible timing**: Customizable debounce delay

---

### Accessible Modal

A fully accessible modal dialog component with proper focus management and keyboard support.

#### Usage

```javascript
import "neoway-components";
```

```html
<accessible-modal
  title="Modal Title"
  .open="${isModalOpen}"
  @modal-close="${handleModalClose}"
>
  <p>Your modal content goes here</p>
  <button @click="${handleAction}">Action Button</button>
</accessible-modal>
```

#### Properties

- `title` (String): Title displayed in the modal header
- `open` (Boolean): Controls modal visibility

#### Events

- `modal-close`: Dispatched when user clicks outside modal, on close button or press ESC.

  ```javascript
  handleModalClose() {
    this.isModalOpen = false;
  }
  ```

#### Features

- **Focus trapping**: Keeps focus within the modal when open
- **Keyboard navigation**: ESC key to close, proper tab order
- **Backdrop click**: Click outside to close
- **Accessible**: ARIA labels, proper roles, and screen reader support
- **Animated**: Smooth open/close transitions

## Useful Commands

### Storybook

```bash
npm run storybook
```

### Tests

```bash
npm run test
npm run test:watch
npm run test:coverage
```
