<template>
  <div class="vp-raw">
    <span class="">Select theme:</span>
    <div class="grid xs:grid-cols-5 md:grid-cols-7 mb-5 mt-2">
      <DdtwRadio
        v-model="activeTheme"
        value="blue"
      >
        Blue
      </DdtwRadio>
      <DdtwRadio
        v-model="activeTheme"
        value="green"
      >
        Green
      </DdtwRadio>
      <DdtwRadio
        v-model="activeTheme"
        value="pink"
      >
        Pink
      </DdtwRadio>
      <DdtwRadio
        v-model="activeTheme"
        value="purple"
      >
        Purple
      </DdtwRadio>
      <DdtwRadio
        v-model="activeTheme"
        value="red"
      >
        Red
      </DdtwRadio>
    </div>
    <DdtwThemable :theme="activeTheme">
      <DdtwTabs
        v-model="activeTab"
        class="p-5"
        :variant="tabsVariant"
      >
        <DdtwTab
          name="first"
          title="First"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aspernatur debitis iste libero molestiae mollitia, optio sunt? A, consectetur distinctio, eaque harum iusto laudantium, molestiae nam odio officia pariatur vitae?
        </DdtwTab>
        <DdtwTab
          name="second"
          title="Second"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores autem cupiditate, deleniti eligendi exercitationem magnam maiores, minus pariatur provident quasi qui quidem recusandae rem reprehenderit sapiente sequi sint soluta.
        </DdtwTab>
        <DdtwTab
          name="third"
          title="Third"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi aperiam assumenda consectetur, dolorem, dolores, ea eos ipsum itaque iure laudantium nostrum nulla numquam perspiciatis provident qui quod totam voluptatem.
        </DdtwTab>
        <DdtwTab
          name="fourth"
          title="Fourth"
          disabled
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis cupiditate ea error eveniet hic impedit in labore maxime, minima mollitia nam sapiente sint tempora tempore vel velit veniam, voluptatem.
        </DdtwTab>
      </DdtwTabs>
    </DdtwThemable>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { TabsVariant } from '../../../../src/components/DdtwTabs/types'
import type { FlowbiteTheme } from '../../../../src/components/utils/DdtwThemable/types'
import { ref } from 'vue'
import { DdtwRadio, DdtwTab, DdtwTabs, DdtwThemable } from '../../../../src/index'

defineProps({
  tabsVariant: {
    default: 'default',
    type: String as PropType<TabsVariant>,
  },
})

const activeTab = ref('first')

const activeTheme = ref<FlowbiteTheme>('blue')
</script>
