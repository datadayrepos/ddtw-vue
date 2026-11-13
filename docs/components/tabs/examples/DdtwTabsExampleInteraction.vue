<template>
  <div class="vp-raw">
    <DdtwTabs
      v-model="activeTab"
      class="p-5"
      @click:pane="handlePaneClick"
    >
      <DdtwTab
        name="first"
        title="First"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto asperiores odio minima temporibus eligendi deleniti vitae illo quo, fuga nobis saepe error totam inventore ullam accusamus, deserunt unde est. Atque.
      </DdtwTab>
      <DdtwTab
        name="second"
        title="Second"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos numquam vero debitis, ex nesciunt illum distinctio, recusandae officiis nisi optio ut alias voluptatibus sint? Delectus dolores consequatur fugit dolore tempora?
      </DdtwTab>
      <DdtwTab
        name="third"
        title="Third"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis soluta consequuntur. Distinctio hic perspiciatis sunt dignissimos non nemo aspernatur eum velit sed accusantium, asperiores maiores laborum facere quibusdam placeat?
      </DdtwTab>
      <DdtwTab
        name="fourth"
        title="Fourth"
        disabled
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime natus tenetur officiis aspernatur, ipsam dolorem rerum doloribus? Maxime, aliquid accusamus ad eaque odit dolore doloremque blanditiis natus magnam possimus labore!
      </DdtwTab>
    </DdtwTabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DdtwTab, DdtwTabs } from '../../../../src/index'

const activeTab = ref('first')

function handlePaneClick() {
  // eslint-disable-next-line no-console -- Demonstrate the published click:pane event in this example.
  console.log('Click!')
}
</script>
