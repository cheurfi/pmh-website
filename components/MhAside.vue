<template>
  <aside class="mh-aside">
    <div class="mh-aside__content">
      <base-button href="mailto:pmh@samknows.com" color="cyan">
        Apply for a place
      </base-button>
      <div v-for="(detail, key) in details" :key="`detail-${key}`">
        <prismic-rich-text :field="detail.detail_title" />
        <prismic-rich-text :field="detail.detail_description" />
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
    top: 90px;
    right: 20px;
  }

  @screen xl {
    @apply fixed max-w-sm;
    right: 5vw;
  }

  &__content {
    @apply p-5;

    @screen xl {
      @apply p-10;
    }
  }
}
</style>
