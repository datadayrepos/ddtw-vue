import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const externalPackages = [...Object.keys(pkg.peerDependencies ?? {}), ...Object.keys(pkg.dependencies ?? {})]

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      fileName: (format) => {
        if (format === 'es')
          return 'ddtw-vue.mjs' // Use .mjs for ES modules
        if (format === 'umd')
          return 'ddtw-vue.umd.cjs' // Use .cjs for UMD (CommonJS)
        return `ddtw-vue.${format}.js` // Fallback for other formats if added
      },
      formats: ['es'],
      name: 'ddtw-vue',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // Keep explicit dependency CSS in the declared style.css asset, not vendor JS modules.
      external: id => !id.endsWith('.css') && externalPackages.some(name => id === name || id.startsWith(`${name}/`)),
      output: {
        entryFileNames: '[name].mjs',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
        // FIX: This is the magic setting. It keeps your folder structure in dist/
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    target: 'esnext',
  },
  plugins: [vue()],
  resolve: {
    alias: [{
      find: /\/@\//,
      replacement: `${pathResolve('src')}/`,
    }],
    dedupe: ['vue'],
  },
  root: '.',
})
