import type { BadgeSize, BadgeType } from '../types'
import { twMerge } from 'tailwind-merge'
import { computed, type Ref, useAttrs } from 'vue'

const defaultBadgeClasses = 'mr-2 px-2.5 py-0.5 rounded flex items-center justify-center'
const badgeLinkClasses = 'bg-blue-100 hover:bg-blue-200 text-blue-800 dark:text-blue-800 dark:hover:bg-blue-300'
const onlyIconClasses = 'p-1 rounded-full mr-2'

const badgeTextClasses: Record<BadgeType, string> = {
  complimentary: 'text-complimentary-800 dark:text-complimentary-900',
  dark: 'text-gray-800 dark:text-gray-300',
  default: 'text-blue-800 dark:text-blue-800',
  green: 'text-green-800 dark:text-green-900',
  indigo: 'text-indigo-800 dark:text-indigo-900',
  pink: 'text-pink-800 dark:text-pink-900',
  primary: 'text-primary-800 dark:text-primary-900',
  purple: 'text-purple-800 dark:text-purple-900',
  red: 'text-red-800 dark:text-red-900',
  yellow: 'text-yellow-800 dark:text-yellow-900',
}

const badgeTypeClasses: Record<BadgeType, string> = {
  complimentary: 'bg-complimentary-100 dark:bg-complimentary-200',
  dark: 'bg-gray-100 dark:bg-gray-700',
  default: 'bg-blue-100 dark:bg-blue-200',
  green: 'bg-green-100 dark:bg-green-200',
  indigo: 'bg-indigo-100 dark:bg-indigo-200',
  pink: 'bg-pink-100 dark:bg-pink-200',
  primary: 'bg-primary-100 dark:bg-primary-200',
  purple: 'bg-purple-100 dark:bg-purple-200',
  red: 'bg-red-100 dark:bg-red-200',
  yellow: 'bg-yellow-100 dark:bg-yellow-200',
}

const badgeSizeClasses: Record<BadgeSize, string> = {
  sm: 'text-sm font-medium',
  xs: 'text-xs font-semibold',
}

export type UseBadgeClassesProps = {
  type: BadgeType
  size: BadgeSize
  href: string | null
}
export type UseBadgeClassesOptions = {
  isContentEmpty: Ref<boolean>
}

export function useBadgeClasses(
  props: UseBadgeClassesProps,
  options: UseBadgeClassesOptions,
): {
    badgeClasses: Ref<string>
  } {
  const attrs = useAttrs()
  const badgeClasses = computed<string>(() => {
    return twMerge(
      badgeSizeClasses[props.size],
      props.href ? '' : badgeTypeClasses[props.type],
      props.href ? '' : badgeTextClasses[props.type],
      props.href ? badgeLinkClasses : '',
      options.isContentEmpty.value ? onlyIconClasses : defaultBadgeClasses,
      attrs.class as string,
    )
  })
  return {
    badgeClasses,
  }
}
