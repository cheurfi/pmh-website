import Vue from 'vue'
const requireComponent = require.context('@/components/base', false, /[\w-]+\.vue$/)

requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  const componentName = `base-${fileName.replace(/^\..*\//, '').replace(/\.\w+$/, '')}`

  // console.log('componentName', componentName)
  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})
