<template>
  <div class="font-body">
    <nuxt />
    <footer class="text-yellow bg-purple p-4">
      SamKnows Ltd 2019 All Right Reserved
    </footer>
  </div>
</template>

<style lang="scss">
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
  margin: 0;
}

figure {
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  line-height: 1;
  margin-bottom: 0.5em;
}

h1 {
  font-size: 36px;
  letter-spacing: -0.5px;

  @screen sm {
    font-size: 48px;
    letter-spacing: -1px;
  }

  @screen md {
    font-size: 96px;
    letter-spacing: -2px;
  }
}

h2 {
  font-size: 24px;

  @screen sm {
    font-size: 36px;
    letter-spacing: -0.5px;
  }

  @screen md {
    font-size: 48px;
    letter-spacing: -1px;
  }
}

h3 {
  font-size: 20px;

  @screen sm {
    font-size: 24px;
  }

  @screen md {
    font-size: 30px;
    letter-spacing: -0.5px;
  }
}

h4 {
  font-size: 16px;

  @screen sm {
    font-size: 20px;
  }

  @screen md {
    font-size: 24px;
  }
}

p {
  font-size: 1rem;
  line-height: 1.5em;
  margin: 0 0 1.5rem;

  @screen sm {
    font-size: 1.2rem;
  }
}

</style>
