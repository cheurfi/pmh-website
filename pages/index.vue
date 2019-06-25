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
          <li v-for="infoItem in info" :key="infoItem.title" class="w-6/12">
            <h3>{{ infoItem.title }}</h3>
            <p>{{ infoItem.desc }}</p>
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
                <h3>{{ course.title }}</h3>
                <p>{{ course.desc }}</p>
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
          <div v-for="content in contents" :key="content.title" class="flex-1 px-4">
            <img src="http://placekitten.com/g/300/200" class="my-8 rounded">
            <h3>{{ content.title }}</h3>
            <div v-html="content.body" />
            <sk-button :href="content.ctaLink" class="mt-8" reverse>
              {{ content.ctaText }}
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

  data() {
    return {
      info: [
        {
          title: 'Starts 20th July 2019',
          desc: '10 weeks, 2 hours per week'
        },
        {
          title: 'Led by female developers',
          desc: 'For girls of all abilities'
        },
        {
          title: 'Free of charge',
          desc: 'Supported by SamKnows'
        },
        {
          title: 'Central london location',
          desc: 'Nearest station London bridge'
        }
      ],
      topics: [
        {
          title: 'Coding',
          courses: [
            {
              title: 'Introduction',
              desc: 'Learn the basics of computer programming'
            },
            {
              title: 'Mobile development',
              desc: 'Create your own Instargram'
            },
            {
              title: 'Gaming',
              desc: 'Build your own teris'
            },
            {
              title: 'Voice recognition',
              desc: 'Make your machine listen to you'
            },
            {
              title: 'Website development',
              desc: 'Build you own facebook'
            }
          ]
        },
        {
          title: 'Personal develment',
          courses: [
            {
              title: 'Personal website',
              desc: 'Set up a website to showcase your work'
            },
            {
              title: 'CV writing',
              desc: 'How to write an impressive CV'
            },
            {
              title: 'Cover letter',
              desc: 'How to stand out with your cover letter'
            },
            {
              title: 'One-on-one mentoring',
              desc: 'With a professional female team…'
            }
          ]
        }

      ],
      contents: [
        {
          title: 'Samira and friends',
          img: '',
          body: `We sat down with our tennis-loving, Germanspeaking, It's always sunny in Philadelphiamad Android developer, Samira, to ask her all
about her job, why she loves working in tech,
and why she wants more women to choose
programming as a career. Samira recently set
up an exciting new project to teach young
women how to code, called Project Margaret
Hamilton.`,
          ctaText: 'Read more',
          ctaLink: 'https://www.samknows.com/blog/myth-busters-life-as-an-android-developer'
        },
        {
          title: 'SamKnows',
          img: '',
          body: `<p>We are the global leaders in broadband
performance monitoring with an ambition to
create a well balanced diverse working
enviroment.</p>
<p>After struggling to atract enough female
candidates to our open positions we decided
to do something about it…</p>`,
          ctaText: 'Open positions',
          ctaLink: 'https://www.samknows.com/careers'
        }
      ]
    }
  },

  async asyncData({ context, error, req }) {
    try {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })

      let fields = {}
      const result = await api.getSingle('homepage')
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
main {
  border-top: 5px solid;
}
</style>
