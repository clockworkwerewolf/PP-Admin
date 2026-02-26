import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function suiCssWorkaround() {
  return {
    name: 'sui-css-workaround',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('sm-tooltip/sm-tooltip.vue')) {
        return {
          code: code.replace(
            /@import\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/node_modules\/floating-vue\/dist\/style\.css['"];?/g,
            '/* floating-vue styles imported globally in main.js */'
          ),
          map: null
        }
      }
      if (id.includes('sm-select/sm-select.vue')) {
        return {
          code: code.replace(
            /@import\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/node_modules\/vue-multiselect\/dist\/vue-multiselect\.css['"];?/g,
            '/* vue-multiselect styles imported globally in main.js */'
          ),
          map: null
        }
      }
      return null
    }
  }
}

export default defineConfig({
  plugins: [vue(), suiCssWorkaround()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@sui': resolve(__dirname, './node_modules/sui-vue3/libs/sui-core/src'),
      '@sui-icons': resolve(__dirname, './node_modules/sui-vue3/libs/sui-icons/src'),
      'lodash': 'lodash-es'
    }
  },
  optimizeDeps: {
    exclude: ['sui-vue3']
  },
  server: {
    port: 3003,
    host: true
  }
})
