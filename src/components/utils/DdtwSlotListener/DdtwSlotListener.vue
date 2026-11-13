<script lang="ts">
import type { SlotListenerTrigger, TriggerEventHandlers } from '/@/components/utils/DdtwSlotListener/types'
import { pick } from 'lodash-es'
import { defineComponent, type PropType, type VNode } from 'vue'
import { getFirstSlotVNode } from '/@/utils/getFirstSlotNode'

// inspired from https://github.com/TuSimple/naive-ui/blob/main/src/popover/src/Popover.tsx

const triggerEventMap: Record<SlotListenerTrigger, string[]> = {
  click: ['onClick'],
  focus: ['onFocus', 'onBlur'],
  hover: ['onMouseenter', 'onMouseleave'],
}

function appendEvents(
  vNode: VNode,
  events: TriggerEventHandlers,
): void {
  Object.entries(triggerEventMap).forEach(([, eventNames]) => {
    eventNames.forEach((eventName) => {
      if (!vNode.props) {
        vNode.props = {}
      }
      else {
        vNode.props = Object.assign({}, vNode.props)
      }
      const originalHandler = vNode.props[eventName]
      const handler = events[eventName as keyof typeof events]
      if (!originalHandler) {
        vNode.props[eventName] = handler
      }
      else {
        vNode.props[eventName] = (...args: unknown[]) => {
          originalHandler(...args)
          ;(handler as any)(...args)
        }
      }
    })
  })
}

export default defineComponent({
  name: 'SlotListener',
  // eslint-disable-next-line sort-keys/sort-keys-fix -- Keep the component name before emits as required by Vue option ordering.
  emits: ['click', 'focus', 'blur', 'mouseenter', 'mouseleave'],
  // eslint-disable-next-line vue/order-in-components
  props: {
    trigger: {
      default: 'click',
      type: String as PropType<SlotListenerTrigger>,
    },
  },
  render() {
    const {
      $slots,
    } = this

    const handlers = {
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
    }

    const triggerVNode = getFirstSlotVNode($slots, 'default')

    const ascendantAndCurrentHandlers: TriggerEventHandlers[] = [
      handlers,
    ]
    if (triggerVNode?.props) {
      ascendantAndCurrentHandlers.push(
        pick(triggerVNode.props, 'onClick', 'onMouseenter', 'onMouseleave', 'onFocus', 'onBlur'),
      )
    }

    const mergedHandlers: TriggerEventHandlers = {
      onBlur: (e: FocusEvent) => {
        ascendantAndCurrentHandlers.forEach((_handlers) => {
          _handlers?.onBlur?.(e)
        })
      },
      onClick: (e: MouseEvent) => {
        ascendantAndCurrentHandlers.forEach((_handlers) => {
          _handlers?.onClick?.(e)
        })
      },
      onFocus: (e: FocusEvent) => {
        ascendantAndCurrentHandlers.forEach((_handlers) => {
          _handlers?.onFocus?.(e)
        })
      },
      onMouseenter: (e: MouseEvent) => {
        ascendantAndCurrentHandlers.forEach((_handlers) => {
          _handlers?.onMouseenter?.(e)
        })
      },
      onMouseleave: (e: MouseEvent) => {
        ascendantAndCurrentHandlers.forEach((_handlers) => {
          _handlers?.onMouseleave?.(e)
        })
      },
    }

    if (triggerVNode) {
      appendEvents(
        triggerVNode,
        mergedHandlers,
      )
    }

    return triggerVNode
  },
  // eslint-disable-next-line vue/order-in-components
  setup(_, { emit }) {
    const handleFocus = (e: FocusEvent) => {
      emit('focus', e)
    }
    const handleBlur = (e: FocusEvent) => {
      emit('blur', e)
    }
    const handleClick = (e: MouseEvent) => {
      emit('click', e)
    }
    const handleMouseEnter = (e: MouseEvent) => {
      emit('mouseenter', e)
    }
    const handleMouseLeave = (e: MouseEvent) => {
      emit('mouseleave', e)
    }

    return {
      handleBlur,
      handleClick,
      handleFocus,
      handleMouseEnter,
      handleMouseLeave,
    }
  },
})
</script>
