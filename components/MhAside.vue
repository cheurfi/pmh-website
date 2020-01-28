<template>
  <aside class="mh-aside">
    <div class="mh-aside__content">
      <base-button href="mailto:theprojectmargarethamilton@gmail.com" color="cyan" class="mh-aside__button">
        Apply for a place
      </base-button>
      <div v-for="(detail, key) in details" :key="`detail-${key}`">
        <prismic-rich-text :field="detail.detail_title" class="mh-aside__title" />
        <prismic-rich-text :field="detail.detail_description" class="mh-aside__text" />
      </div>
    </div>
    <img src="/images/map.png" alt="">
  </aside>
</template>

<script>
export default {
  name: 'MhAside',

  props: {
    details: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.mh-aside {
  box-shadow: 0px 2px 10px rgba(90, 85, 153, 0.33);

  @apply max-w-sm bg-purple text-white rounded mx-auto mb-10;

  @screen lg {
    @apply fixed max-w-xs;
    top: 50px;
    right: 20px;
  }

  @screen xl {
    @apply fixed max-w-sm;
    right: 5vw;
  }

  &__content {
    @apply p-5;
  }

  &__title h2 {
    font-size: 2rem;
  }

  &__text p {
    @apply mb-3;
  }

  &__button {
    @apply mb-10;
  }
}
</style>
