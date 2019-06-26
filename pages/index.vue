<template>
  <main class="border-pink text-purple relative">
    <section class="bg-yellow p-20">
      <div class="max-w-2xl">
        <header class="mb-20">
          <p class="text-pink m-0">
            SamKnows
          </p>
          <p class="text-5xl leading-none w-20">
            <b>Project Margaret Hamilton.</b>
          </p>
        </header>
        <prismic-rich-text :field="fields.title" class="leading-none" />
        <prismic-rich-text :field="fields.description" />
        <ul class="flex flex-wrap">
          <li v-for="(infoItem, key) in project_information" :key="`infoItem-${key}`" class="w-6/12">
            <prismic-rich-text :field="infoItem.title1" />
            <prismic-rich-text :field="infoItem.info_description" />
          </li>
        </ul>
        <prismic-rich-text :field="fields.letter_title" />
        <prismic-rich-text :field="fields.letter_body" />
      </div>
    </section>
    <section class="p-20">
      <div class="max-w-2xl">
        <header>
          <p class="text-pink m-0">
            Course curriculum
          </p>
          <h2>What you will learn</h2>
        </header>
        <div class="flex">
          <div v-for="(topic, key) in topics" :key="`topic-${key}`" class="flex-1">
            <h3 class="text-pink">
              {{ topic.title }}
            </h3>
            <ul>
              <li v-for="course in topic.courses" :key="course.title">
                <prismic-rich-text :field="course.course_title" />
                <prismic-rich-text :field="course.course_description" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-yellow p-20">
      <div class="max-w-2xl">
        <header>
          <p class="text-pink m-0">
            Say hi
          </p>
          <h2>Meet the team</h2>
        </header>
        <div class="flex -m-4">
          <div v-for="(content, key) in meet_the_team" :key="`meet-the-team-${key}`" class="flex-1 px-4">
            <img :src="content.article_image.url" class="my-8 rounded">
            <prismic-rich-text :field="content.article_title" />
            <prismic-rich-text :field="content.article_description" />
            <sk-button :href="content.article_link.url" class="mt-8" reverse>
              {{ $prismic.richTextAsPlain(content.cta_text) }}
            </sk-button>
          </div>
        </div>
      </div>
    </section>
    <aside class="fixed top-0 right-0 max-w-sm bg-purple text-white">
      <div class="p-10">
        <sk-button href="/" color="cyan">
          Apply for a place
        </sk-button>
        <h2>Why</h2>
        <p>
          Currently, only 17% of IT professionals in the
          UK are women. This needs to change.
        </p>
        <h2>When</h2>
        <p>Monday, 22nd July, 2019, 6:00 - 8:00pm </p>
        <p>Then every following Monday for 10 weeks</p>
        <h2>Where</h2>
        <p>
          SamKnows, 135 Park Street, London.
          SE1 9EA - Get directions
        </p>
      </div>
    </aside>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import SkButton from '@/components/Button'

export default {

  components: {
    SkButton
  },

  computed: {
    topics() {
      return this.courses.reduce((topics, course) => {
        const topic = topics.find(topic => topic.title === course.topic)

        if (topic) {
          topic.courses.push(course)
        } else {
          topics.push({
            title: course.topic,
            courses: [ course ]
          })
        }
        return topics
      }, [])
    }
  },

  async asyncData({ context, error, req }) {
    try {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      let fields = {}
      const result = await api.getSingle('homepage')
      fields = result.data

      if (process.client) window.prismic.setupEditButton()

      const slices = {}

      fields.body.forEach((slice) => {
        slices[slice.slice_type] = slice.items
      })

      return {
        fields,
        documentId: result.id,
        ...slices
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style>
main {
  border-top: 5px solid;
}
</style>
