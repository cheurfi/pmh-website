<template>
  <div class="font-body">
    <nuxt />
    <footer class="text-yellow bg-purple p-4">
      SamKnows Ltd 2019 All Right Reserved
    </footer>
  </div>
</template>

<style>
@font-face {
  font-family: 'Calibre';
  src: url('/fonts/Calibre-Regular.woff2') format('woff2'),
    url('/fonts/Calibre-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Calibre';
  src: url('/fonts/Calibre-Light.woff2') format('woff2'),
    url('/fonts/Calibre-Light.woff') format('woff');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Calibre';
  src: url('/fonts/Calibre-Semibold.woff2') format('woff2'),
    url('/fonts/Calibre-Semibold.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

html,
body {
  font-size: 18px;
  font-family: Calibre, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: $color-neutral-1; */
  margin: 0;
}

/* hr {
  border: 0;
  border-top: 1px $grey-2 solid;
  margin: 1em 0;
} */

figure {
  margin: 0;
}

/* a {
  color: $color-fruity-8;
  cursor: pointer;

  &:hover {
    color: inherit;
  }
} */

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
}

h1 {
  font-size: 36px;
  letter-spacing: -0.5px;

  /* @include breakpoint(S) {
    font-size: 48px;
    letter-spacing: -1px;
  }

  @include breakpoint(M) { */
    font-size: 96px;
    letter-spacing: -2px;
  /* } */
}

h2 {
  font-size: 24px;

  /* @include breakpoint(S) {
    font-size: 36px;
    letter-spacing: -0.5px;
  }

  @include breakpoint(M) { */
    font-size: 48px;
    letter-spacing: -1px;
  /* } */
}

h3 {
  font-size: 20px;

  /* @include breakpoint(S) {
    font-size: 24px;
  }

  @include breakpoint(M) { */
    font-size: 36px;
    letter-spacing: -0.5px;
  /* } */
}

h4 {
  font-size: 16px;

  /* @include breakpoint(S) {
    font-size: 20px;
  }

  @include breakpoint(M) { */
    font-size: 24px;
  /* } */
}

p {
  font-size: 16px;
  line-height: 1.5em;
  margin: 0 0 1.5rem;
  /* @include breakpoint(S) { */
    font-size: 20px;
  /* } */
}

</style>
