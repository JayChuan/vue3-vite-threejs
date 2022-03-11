import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'

export default defineConfig(({mode}) => {
  // const env = loadEnv(mode, process.cwd())
  return {
    // base: mode === 'production' ? `${env.VITE_BASE_URL}${env.VITE_APP_PROJECT_NAME}/`: env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@':  path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: { // scss config
          charset: false,
          additionalData: `@import './src/assets/scss/variable.scss';`
        }
      }
    },
    plugins: [
      vue(),
      vueJsx()
    ],
    build: {
      target: 'es2015', // esbuild target
      assetsInlineLimit: 0, // source size limit
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (/\.css$/.test(assetInfo.name)) { // output css files to css directory
              return '[ext]/[name]-[hash].[ext]'
            }
            if (/\.(jpg|png|gif|jpeg|svg)$/.test(assetInfo.name)) { // output image files to images
              return 'images/[name].[ext]'
            }
            return '[name]-[hash].[ext]'
          }
        }
      }
    }
  }
})