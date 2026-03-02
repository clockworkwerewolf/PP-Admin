import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import globalComponents from './plugins/global-components'
import './shared/styles/reset.scss'
import './shared/styles/utilities.css'
import './shared/styles/sui-overrides.scss'
import 'vue-multiselect/dist/vue-multiselect.css'
import 'floating-vue/dist/style.css'
import 'sui-vue3/libs/sui-core/src/app/common/sui-core.scss'
import 'sui-vue3/libs/sui-core/src/app/common/typography/index.scss'

import { setup as setupSuiI18n } from '../node_modules/sui-vue3/libs/sui-core/src/app/libs/vue-i18n'

try {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en: {} }
  })

  setupSuiI18n(i18n)

  const app = createApp(App)
  app.use(i18n)
  app.use(globalComponents)
  app.config.errorHandler = (err) => {
    document.body.innerHTML = `<pre style="color:red;padding:20px">Vue error: ${err.message}\n${err.stack}</pre>`
  }
  app.mount('#app')
} catch (e) {
  document.body.innerHTML = `<pre style="color:red;padding:20px">Startup error: ${e.message}\n${e.stack}</pre>`
}
