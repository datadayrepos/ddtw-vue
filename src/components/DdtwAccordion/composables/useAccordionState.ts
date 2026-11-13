import type { tState } from '../types'
import { onBeforeMount, onBeforeUnmount, reactive } from 'vue'

type AccordionProps = {
  alwaysOpen?: boolean
  openFirstItem?: boolean
  flush?: boolean
}

const accordionsStates = reactive<tState>({})

export function useAccordionState(
  id?: string,
  options?: AccordionProps,
): {
    accordionsStates: tState
  } {
  onBeforeMount(() => {
    if (!id)
      return
    accordionsStates[id] = {
      alwaysOpen: options?.alwaysOpen ?? false,
      flush: options?.flush ?? false,
      id,
      openFirstItem: options?.openFirstItem ?? true,
      panels: {},
    }
  })
  onBeforeUnmount(() => {
    if (!id)
      return
    delete accordionsStates[id]
  })

  return {
    accordionsStates,
  }
}
