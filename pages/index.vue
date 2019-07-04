<template>
  <main class="border-pink text-purple relative">
    <section class="bg-yellow p-20 ">
      <div class="max-w-2xl">
        <header class="mb-20 flex justify-between">
          <div>
            <p class="text-pink m-0">
              SamKnows
            </p>
            <p class="text-5xl leading-none">
              <b>Project <br> Margaret <br> Hamilton.</b>
            </p>
          </div>
          <img src="/images/logo.svg" alt="">
        </header>
        <prismic-rich-text :field="fields.title" class="leading-none mb-5" />
        <prismic-rich-text :field="fields.description" />

        <ul class="flex flex-wrap mt-10 mb-20">
          <li v-for="(infoItem, key) in project_information" :key="`infoItem-${key}`" class="w-6/12 flex">
            <div class="bg-white rounded-full flex items-center justify-center mr-4 info-item__circle">
              <img class="" src="/images/tick.svg">
            </div>
            <div>
              <h3 class="text-2xl">
                {{ $prismic.richTextAsPlain(infoItem.title1) }}
              </h3>
              <prismic-rich-text :field="infoItem.info_description" />
            </div>
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
          <div v-for="(topic, key) in topics" :key="`topic-${key}`" class="flex-1" :class="{ 'ml-10' : key === 1 }">
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
    <section class="bg-yellow p-20 flex justify-between">
      <div class="max-w-2xl">
        <header>
          <p class="text-pink m-0">
            Say hi
          </p>
          <h2>Meet the team</h2>
        </header>
        <div class="flex -m-4">
          <div v-for="(content, key) in meet_the_team" :key="`meet-the-team-${key}`" class="flex-1 px-4">
            <img :src="content.article_image.url" class="my-8 rounded meet-team__image">
            <prismic-rich-text :field="content.article_title" />
            <prismic-rich-text :field="content.article_description" />
            <sk-button :href="content.article_link.url" class="mt-8" reverse>
              {{ $prismic.richTextAsPlain(content.cta_text) }}
            </sk-button>
          </div>
        </div>
      </div>
      <div>
        <img src="/images/mh-rocket.svg" alt="">
      </div>
    </section>

    <aside class="fixed max-w-sm bg-purple text-white home__aside rounded">
      <div class="p-10">
        <sk-button href="mailto:pmh@samknows.com" color="cyan">
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
      <img src="/images/map.png" alt="">
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

.info-item__circle {
  width: 40px;
  height: 40px;;
}

.home__aside {
  top: 90px;
  right: 200px;
  box-shadow: 0px 2px 10px rgba(90, 85, 153, 0.33);
}

.meet-team__image {
  box-shadow: 0px 2px 4px rgba(40, 64, 78, 0.33);
}
</style>
