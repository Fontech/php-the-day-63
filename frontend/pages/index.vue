<template>
  <div class="flex flex-col">
    <PostList class="flex-1 overflow-y-auto" :posts="posts" />
    <PostForm class="shrink-0" @submitted="handleSubmitted" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@nuxtjs/composition-api'
  import { useQuery } from '@vue/apollo-composable'
  import { gql } from 'graphql-tag'
  import type { Post } from '~/types'

  interface PostsQuery {
    posts: Post[]
  }

  export default defineComponent({
    setup() {
      const posts = ref(<Post[]>[])
      const { onResult: onQueryResult } = useQuery<PostsQuery>(gql`
        query {
          posts {
            id
            name
            content
          }
        }
      `)

      onQueryResult((result) => {
        posts.value = posts.value.concat(result.data.posts)
      })

      function handleSubmitted(post: Post) {
        posts.value.push(post)
      }

      return { posts, handleSubmitted }
    }
  })
</script>
