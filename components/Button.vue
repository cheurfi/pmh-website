<template>
  <a :class="btnClasses" :href="href" target="_blank">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    btnClasses() {
      let classes = 'btn ${}'

      if (this.color) {
        classes = `${classes} btn--${this.color}`
      }

      if (this.reverse) {
        classes = `${classes} btn--reverse`
      }

      return classes
    }
  }
}
</script>

<style>
.btn {
  display: block;
  text-align: center;
  @apply rounded p-2 w-full;
}

.btn--cyan {
  @apply bg-cyan text-purple;
}

.btn--reverse {
  @apply border border-purple text-purple;
}
</style>
