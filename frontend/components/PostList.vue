<template>
  <main class="bg-gray-100 py-8" ref="root">
    <ul class="container space-y-4">
      <li
        class="p-5 bg-white rounded break-all"
        v-for="{ id, name, content } in posts"
        :key="id"
      >
        <span class="font-medium underline">{{ name }}</span>
        {{ content }}
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
  import { defineComponent, PropType, watch, nextTick } from '@nuxtjs/composition-api'
  import type { Post } from '~/types'

  export default defineComponent({
    props: {
      posts: {
        type: Array as PropType<Post[]>,
        required: true,
      },
    },
    setup(props, { refs }) {
      watch(() => props.posts, () => {
        nextTick(() => {
          (<HTMLDivElement>refs.root).scrollTop = 999999999
        })
      })
    },
  })
</script>
