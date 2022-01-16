import { defineNuxtPlugin, onGlobalSetup, provide } from '@nuxtjs/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin(({ app }) => {
  onGlobalSetup(() => {
    provide(DefaultApolloClient, app.apolloProvider!.defaultClient)
  })
})
