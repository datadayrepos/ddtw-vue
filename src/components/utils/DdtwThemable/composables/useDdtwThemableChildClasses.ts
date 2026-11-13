import type { FlowbiteTheme } from '/@/components/utils/DdtwThemable/types'
import type { ThemableChildrenApply } from '../types'
import { computed, type Ref } from 'vue'
import { useDdtwThemable } from './useDdtwThemable'

type UseDdtwThemableChildReturns = {
  classes: Ref<string>
}

type UseDdtwThemableChildProps = {
  apply: Ref<ThemableChildrenApply[]>
  theme?: Ref<FlowbiteTheme | undefined>
}

export function useDdtwThemableChildClasses(props: UseDdtwThemableChildProps): UseDdtwThemableChildReturns {
  const {
    backgroundClasses,
    borderClasses,
    disabledClasses,
    focusClasses,
    hoverClasses,
    isActive,
    textClasses,
  } = useDdtwThemable(props.theme?.value)

  const classes = computed(() => {
    if (!isActive.value) {
      return ''
    }

    const _classes = []
    if (props.apply.value.includes('text')) {
      _classes.push(textClasses.value)
    }

    if (props.apply.value.includes('border')) {
      _classes.push(borderClasses.value)
    }

    if (props.apply.value.includes('background')) {
      _classes.push(backgroundClasses.value)
    }

    if (props.apply.value.includes('hover')) {
      _classes.push(hoverClasses.value)
    }

    if (props.apply.value.includes('disabled')) {
      _classes.push(disabledClasses.value)
    }

    if (props.apply.value.includes('focus')) {
      _classes.push(focusClasses.value)
    }

    return _classes.join(' ')
  })

  return {
    classes,
  }
}
