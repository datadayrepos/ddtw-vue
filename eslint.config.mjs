// @ts-check
import datadayrepos from '@antfu/eslint-config'
import sortKeys from 'eslint-plugin-sort-keys'

// Usage
export default datadayrepos(
  {
    vue: true,
    typescript: true, // Or customize the stylistic rules
    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: 'single', // or 'double'
    },
    overrides: {
      vue: {
        'vue/operator-linebreak': ['error', 'before'],
      },
      typescript: {
        'ts/consistent-type-definitions': ['error', 'type'],
      },
      yaml: {},
      // ...
    },
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/define-macros-order': ['error', {
        order: ['defineProps', 'defineEmits'],
      }],
    },
  },
  {
    ignores: [
      // eslint ignore globs paths here
      '/docs/',
      '**README.md',
    ],
  },

  // These exact event names are part of the published component API.
  {
    files: ['src/components/DdtwPagination/DdtwPagination.vue'],
    rules: {
      'vue/custom-event-name-casing': ['error', 'camelCase', { ignores: ['page-changed'] }],
    },
  },
  {
    files: ['src/components/DdtwTabs/DdtwTabs.vue'],
    rules: {
      'vue/custom-event-name-casing': ['error', 'camelCase', { ignores: ['click:pane'] }],
    },
  },

  {
    files: ['**/*.vue', '**/*.ts'], // Include both .vue and .ts files
    plugins: {
      'sort-keys': sortKeys,
    },
    rules: {
      // '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'sort-keys/sort-keys-fix': 'error',
    },
  },
  {
    rules: {
      // overrides
      'node/prefer-global/process': 'off',
    },
  },

  {
    files: ['**/*.ts'],
    rules: {

    },
  },
)
