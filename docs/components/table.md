<script setup>
import DdtwTableDynamicExample from './table/examples/DdtwTableDynamicExample.vue'
import DdtwTableExample from './table/examples/DdtwTableExample.vue'
import DdtwTableExampleHoverable from './table/examples/DdtwTableExampleHoverable.vue'
import DdtwTableExampleStriped from './table/examples/DdtwTableExampleStriped.vue'
import DdtwTableExampleStripedColumns from './table/examples/DdtwTableExampleStripedColumns.vue'
</script>
# Vue Table

#### Tables are built on HTML5 basics building blocks

We have two main versons:

**Dynamic:** This generates the table from data. Usefull for when we get data from an api. We generate headers and rows.
We can also insert other components into the cells, whether images, icons or active components with on-submit handlers.

**Static:** The table is "hardcoded" by its tailwind building blocks for rows and cells.

For both types, we can shade stripes by rows, or columns. Or we can make the rows shade on hover
---

:::tip
Original reference: [https://flowbite.com/docs/components/tables/](https://flowbite.com/docs/components/tables/)
:::

## Dynamic basic example
<DdtwTableDynamicExample />

This differs principally in that
```vue
<template>
  <DdtwTableDynamic
    :headers="headers" :data-rows="allRows"
    @click="handleClick"
    @update:model-value="handleUpdate"
  />
</template>

<script setup lang="ts">
import type { TableRowType } from '../../../../src/components/DdtwTable/types' // Adjust the import path to your project structure
import { CloseCircleOutlineIcon } from '@datadayrepos/icons'
import { markRaw, ref } from 'vue'
import {
  DdtwButton,
  DdtwInput,
  DdtwTableDynamic,
} from '../../../../src/index'

// Define the headers for the table
const headers = ref(['Fruit', 'Quantity', 'Price per Unit', 'Supplier'])

// Define the rows for the table using the TextCell type
const allRows = ref<TableRowType[]>([
  [
    { text: 'Apples', type: 'text' },
    { text: '100', type: 'text' },
    { text: '$0.50', type: 'text' },
    { text: 'Fresh Farms', type: 'text' },
  ],
  [
    { text: 'Oranges', type: 'text' },
    { text: '80', type: 'text' },
    { text: '$0.60', type: 'text' },
    { text: 'Citrus Co.', type: 'text' },
  ],
  [
    { text: 'Bananas', type: 'text' },
    { text: '150', type: 'text' },
    { text: '$0.30', type: 'text' },
    { text: 'Tropical Fruits', type: 'text' },
  ],
  [
    { text: 'Grapes', type: 'text' },
    { text: '50', type: 'text' },
    { text: '$2.00', type: 'text' },
    {
      component: markRaw(DdtwInput), // Use the actual component name
      props: {
        data: 'row', // returns the full data of the row
        label: 'test input event',
        modelValue: 'red',
        placeholder: 'test input event',
      },
      // Append the custom component to the end of each row
      type: 'component',
    },
  ],
  [
    { text: 'Pineapples', type: 'text' },
    { text: '30', type: 'text' },
    { text: '$1.50', type: 'text' },
    {
      component: markRaw(DdtwButton), // Use the actual component name
      props: {
        color: 'red',
        data: 'row', // returns the full data of the row
        outline: true,
        text: 'Close',
      },
      slot: {
        component: markRaw(CloseCircleOutlineIcon),
        location: 'prefix',
      },
      // Append the custom component to the end of each row
      type: 'component',
    },
  ],
])

// Function to handle table actions (this can be expanded based on your needs)
function handleClick(value: any) {
  console.log('Table CLICK:', value)
}
function handleUpdate(value: any) {
  console.log('Table UPDATE:', value)
}
</script>
```

## Static Basic example

<ddtw-table-example />
```vue
<template>
  <ddtw-table>
    <ddtw-table-head>
      <ddtw-table-head-cell>Product name</ddtw-table-head-cell>
      <ddtw-table-head-cell>Color</ddtw-table-head-cell>
      <ddtw-table-head-cell>Category</ddtw-table-head-cell>
      <ddtw-table-head-cell>Price</ddtw-table-head-cell>
      <ddtw-table-head-cell>
        <span class="sr-only">Edit</span>
      </ddtw-table-head-cell>
    </ddtw-table-head>
    <ddtw-table-body>
      <ddtw-table-row>
        <ddtw-table-cell>Apple MacBook Pro 17"</ddtw-table-cell>
        <ddtw-table-cell>Sliver</ddtw-table-cell>
        <ddtw-table-cell>Laptop</ddtw-table-cell>
        <ddtw-table-cell>$2999</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
      <ddtw-table-row>
        <ddtw-table-cell>Microsoft Surface Pro</ddtw-table-cell>
        <ddtw-table-cell>White</ddtw-table-cell>
        <ddtw-table-cell>Laptop PC</ddtw-table-cell>
        <ddtw-table-cell>$1999</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
      <ddtw-table-row>
        <ddtw-table-cell>Magic Mouse 2</ddtw-table-cell>
        <ddtw-table-cell>Black</ddtw-table-cell>
        <ddtw-table-cell>Accessories</ddtw-table-cell>
        <ddtw-table-cell>$99</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
    </ddtw-table-body>
  </ddtw-table>
</template>

<script setup>
import {
  DdtwA,
  DdtwTable,
  DdtwTableBody,
  DdtwTableCell,
  DdtwTableHead,
  DdtwTableHeadCell,
  DdtwTableRow,
} from '@datadayrepos/ddtw-vue'
</script>
```

## Striped example

<ddtw-table-example-striped />
```vue
<template>
  <ddtw-table striped> <!-- pass prp for stripes -->
    <ddtw-table-head>
      <ddtw-table-head-cell>Product name</ddtw-table-head-cell>
      <ddtw-table-head-cell>Color</ddtw-table-head-cell>
      <ddtw-table-head-cell>Category</ddtw-table-head-cell>
      <ddtw-table-head-cell>Price</ddtw-table-head-cell>
      <ddtw-table-head-cell>
        <span class="sr-only">Edit</span>
      </ddtw-table-head-cell>
    </ddtw-table-head>
    <ddtw-table-body>
      <ddtw-table-row>
        <ddtw-table-cell>Apple MacBook Pro 17"</ddtw-table-cell>
        <ddtw-table-cell>Sliver</ddtw-table-cell>
        <ddtw-table-cell>Laptop</ddtw-table-cell>
        <ddtw-table-cell>$2999</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
      <ddtw-table-row>
        <ddtw-table-cell>Microsoft Surface Pro</ddtw-table-cell>
        <ddtw-table-cell>White</ddtw-table-cell>
        <ddtw-table-cell>Laptop PC</ddtw-table-cell>
        <ddtw-table-cell>$1999</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
      <ddtw-table-row>
        <ddtw-table-cell>Magic Mouse 2</ddtw-table-cell>
        <ddtw-table-cell>Black</ddtw-table-cell>
        <ddtw-table-cell>Accessories</ddtw-table-cell>
        <ddtw-table-cell>$99</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
    </ddtw-table-body>
  </ddtw-table>
</template>

<script setup>
import {
  DdtwA,
  DdtwTable,
  DdtwTableBody,
  DdtwTableCell,
  DdtwTableHead,
  DdtwTableHeadCell,
  DdtwTableRow,
} from '@datadayrepos/ddtw-vue'
</script>

```

## Striped columns example

<ddtw-table-example-striped-columns />
```vue
<template>
  <ddtw-table striped-columns> <!-- pass prp for stripes -->
    <ddtw-table-head>
      <ddtw-table-head-cell>Product name</ddtw-table-head-cell>
      <ddtw-table-head-cell>Color</ddtw-table-head-cell>
      <ddtw-table-head-cell>Category</ddtw-table-head-cell>
      <ddtw-table-head-cell>Price</ddtw-table-head-cell>
      <ddtw-table-head-cell><span class="sr-only">Edit</span></ddtw-table-head-cell>
    </ddtw-table-head>
    <ddtw-table-body>
      <ddtw-table-row>
        <ddtw-table-cell>Apple MacBook Pro 17"</ddtw-table-cell>
        <ddtw-table-cell>Sliver</ddtw-table-cell>
        <ddtw-table-cell>Laptop</ddtw-table-cell>
        <ddtw-table-cell>$2999</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
      <ddtw-table-row>
        <ddtw-table-cell>Microsoft Surface Pro</ddtw-table-cell>
        <ddtw-table-cell>White</ddtw-table-cell>
        <ddtw-table-cell>Laptop PC</ddtw-table-cell>
        <ddtw-table-cell>$1999</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
      <ddtw-table-row>
        <ddtw-table-cell>Magic Mouse 2</ddtw-table-cell>
        <ddtw-table-cell>Black</ddtw-table-cell>
        <ddtw-table-cell>Accessories</ddtw-table-cell>
        <ddtw-table-cell>$99</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
    </ddtw-table-body>
  </ddtw-table>
</template>

<script setup>
import {
  DdtwA,
  DdtwTable,
  DdtwTableBody,
  DdtwTableCell,
  DdtwTableHead,
  DdtwTableHeadCell,
  DdtwTableRow,
} from '@datadayrepos/ddtw-vue'
</script>
```

## Hoverable example

<ddtw-table-example-hoverable />
```vue
<template>
  <ddtw-table hoverable> <!-- pass prp for hoverable -->
    <ddtw-table-head>
      <ddtw-table-head-cell>Product name</ddtw-table-head-cell>
      <ddtw-table-head-cell>Color</ddtw-table-head-cell>
      <ddtw-table-head-cell>Category</ddtw-table-head-cell>
      <ddtw-table-head-cell>Price</ddtw-table-head-cell>
      <ddtw-table-head-cell>
        <span class="sr-only">Edit</span>
      </ddtw-table-head-cell>
    </ddtw-table-head>
    <ddtw-table-body>
      <ddtw-table-row>
        <ddtw-table-cell>Apple MacBook Pro 17"</ddtw-table-cell>
        <ddtw-table-cell>Sliver</ddtw-table-cell>
        <ddtw-table-cell>Laptop</ddtw-table-cell>
        <ddtw-table-cell>$2999</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
      <ddtw-table-row>
        <ddtw-table-cell>Microsoft Surface Pro</ddtw-table-cell>
        <ddtw-table-cell>White</ddtw-table-cell>
        <ddtw-table-cell>Laptop PC</ddtw-table-cell>
        <ddtw-table-cell>$1999</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
      <ddtw-table-row>
        <ddtw-table-cell>Magic Mouse 2</ddtw-table-cell>
        <ddtw-table-cell>Black</ddtw-table-cell>
        <ddtw-table-cell>Accessories</ddtw-table-cell>
        <ddtw-table-cell>$99</ddtw-table-cell>
        <ddtw-table-cell>
          <ddtw-a href="#">
            Edit
          </ddtw-a>
        </ddtw-table-cell>
      </ddtw-table-row>
    </ddtw-table-body>
  </ddtw-table>
</template>

<script setup>
import {
  DdtwA,
  DdtwTable,
  DdtwTableBody,
  DdtwTableCell,
  DdtwTableHead,
  DdtwTableHeadCell,
  DdtwTableRow,
} from '@datadayrepos/ddtw-vue'
</script>
```
