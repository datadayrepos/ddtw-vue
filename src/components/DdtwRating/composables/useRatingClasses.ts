import type { RatingSize } from '../types'
import classNames from 'classnames'
import { computed, type Ref } from 'vue'

const ratingSizeClasses: Record<RatingSize, string> = {
  lg: 'w-10 h-10',
  md: 'w-7 h-7',
  sm: 'w-5 h-5',
}

export type UseRatingClassesProps = {
  size: Ref<RatingSize>
}

export function useRatingClasses(props: UseRatingClassesProps): {
  sizeClasses: Ref<string>
} {
  const sizeClasses = computed(() => classNames(
    ratingSizeClasses[props.size.value] ?? '',
  ))

  return { sizeClasses }
}
