<template>
  <div>
    <header class="flex items-center justify-center h-20 bg-blue-500 text-white mb-10">
      <p class="text-xl">
        <b>Project Margaret Hamilton</b>
      </p>
    </header>
    <div class="container min-h-screen mx-auto">
      <prismic-rich-text :field="fields.title" class="text-4xl" />
      <img :src="fields.image.url" class="m-10">
      <prismic-rich-text :field="fields.body" />
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

export default {

  async asyncData({ context, error, req }) {
    try {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      let fields = {}
      const result = await api.getSingle('article')
      fields = result.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        fields,
        documentId: result.id
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style>
p {
  margin: 1rem;
}
</style>
