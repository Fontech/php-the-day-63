<template>
  <div class="flex flex-col">
    <PostList class="flex-1 overflow-y-auto" :posts="posts" />
    <PostForm class="shrink-0" @submitted="handleSubmitted" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@nuxtjs/composition-api'
  import { useQuery, useSubscription } from '@vue/apollo-composable'
  import { gql } from 'graphql-tag'
  import type { Post } from '~/types'

  interface PostsQuery {
    posts: Post[]
  }

  interface PostCreatedSubscription {
    postCreated: Post
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

      const { onResult: onSubscriptionResult } = useSubscription<PostCreatedSubscription>(gql`
        subscription {
          postCreated {
            id
            name
            content
          }
        }
      `)

      onSubscriptionResult((result) => {
        const post = result!.data!.postCreated

        if (posts.value.find(({ id }) => id === post.id)) {
          return
        }

        posts.value.push(post)
      })

      return { posts, handleSubmitted }
    }
  })
</script>
