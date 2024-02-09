
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxt/image',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }, 
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls: {
          img: ['src', 'data-src'],
          image: ['xlink:href', 'href'],
          'v-img': ['src', 'lazy-src'],
          'v-card-media': ['src', 'lazy-src'],
          'v-carousel-item': ['src', 'src'],
        },
      },
    },
  },
  image: {
   
  }
}) 


/*
import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxt/image', // Adicione esta linha para incluir o módulo @nuxt/image
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls: {
          img: ['src', 'data-src'],
          image: ['xlink:href', 'href'],
          'v-img': ['src', 'lazy-src'],
          'v-card-media': ['src', 'lazy-src'],
          'v-carousel-item': ['src', 'src'],
        },
      },
    },
  },
  image: {
    cloudinary: {
      baseURL: 'https://i.imgur.com/qgGY4tB.png',
    },
  },
});
*/