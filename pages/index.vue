<template>
  <main class="border-pink text-purple relative">
    <section class="home__section home__section--yellow">
      <div class="home__inner-content">
        <header class="mb-20 home__header">
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

        <ul class="home__project-info">
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

        <MhAside :details="details" />

        <prismic-rich-text :field="fields.letter_title" />
        <prismic-rich-text :field="fields.letter_body" />
      </div>
    </section>

    <section class="home__section">
      <div class="home__inner-content">
        <header>
          <p class="text-pink m-0">
            Course curriculum
          </p>
          <h2>What you will learn</h2>
        </header>
        <div class="home__courses">
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

    <section class="home__section home__section--yellow home__team">
      <div class="home__inner-content">
        <header>
          <p class="text-pink m-0">
            Say hi
          </p>
          <h2>Meet the team</h2>
        </header>
        <div class="meet-team -m-4">
          <div v-for="(content, key) in meet_the_team" :key="`meet-the-team-${key}`" class="flex-1 px-4">
            <img :src="content.article_image.url" class="my-8 rounded meet-team__image">
            <prismic-rich-text :field="content.article_title" />
            <prismic-rich-text :field="content.article_description" />
            <base-button :href="content.article_link.url" class="mt-8" reverse>
              {{ $prismic.richTextAsPlain(content.cta_text) }}
            </base-button>
          </div>
        </div>
      </div>
      <div>
        <img src="/images/mh-rocket.svg" alt="" class="home__mh-image">
      </div>
    </section>
  </main>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import MhAside from '@/components/MhAside'

export default {

  components: {
    MhAside
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

<style lang="scss">
main {
  border-top: 5px solid;
}

.home {

  &__header {
    @screen md {
      @apply flex justify-between;
    }
  }

  &__inner-content {
    @screen lg {
      @apply max-w-lg;
    }

    @screen xl {
      @apply max-w-2xl;
    }
  }

  &__section {
    @apply p-5;

    @screen lg {
      @apply p-10;
    }

    @screen xl {
      @apply p-20;
    }

    &--yellow {
      @apply bg-yellow;
    }
  }

  &__project-info {
    @apply  mt-5 mb-10;

    @screen lg {
      @apply flex flex-wrap mt-10 mb-20;
    }
  }

   &__courses {
    @screen md {
      @apply flex;
    }
  }

  &__team {
    @screen lg {
      @apply flex justify-between;
    }
  }

  &__mh-image {
    @apply mt-20 mx-auto;

    @screen lg {
      @apply mt-0;
    }
  }
}

.info-item__circle {
  width: 40px;
  height: 40px;;
}

.meet-team {
  @screen md {
    @apply flex;
  }

  &__image {
    box-shadow: 0px 2px 4px rgba(40, 64, 78, 0.33);
  }
}
</style>
