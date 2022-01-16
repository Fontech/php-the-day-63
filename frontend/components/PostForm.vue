<template>
  <section class="py-5 shadow-black">
    <div class="container">
      <form class="form" @submit.prevent="submit">
        <div class="field">
          <label class="label" for="name">Name</label>
          <input id="name" v-model="form.name" class="input" type="text" />
        </div>
        <div class="field flex-1">
          <label class="label" for="content">Content</label>
          <input id="content" v-model="form.content" class="input" type="text" />
        </div>
        <button class="hidden" type="submit" />
      </form>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@nuxtjs/composition-api'
  import { useMutation } from '@vue/apollo-composable'
  import { gql } from 'graphql-tag'
  import type { Post } from '~/types'

  interface CreatePostMutation {
    createPost: Post
  }

  interface CreatePostInput {
    name: string
    content: string
  }

  interface CreatePostVariables {
    input: CreatePostInput
  }

  export default defineComponent({
    setup (_, { emit }) {
      const form = reactive({
        name: '',
        content: '',
      })
      const { mutate: createPost } = useMutation<CreatePostMutation, CreatePostVariables>(gql`
        mutation ($input: CreatePostInput!) {
          createPost(input: $input) {
            id
            name
            content
          }
        }
      `)

      function submit() {
        createPost({ input: form }).then((response) => {
          emit('submitted', response!.data!.createPost)

          form.content = ''
        })
      }

      return { form, submit }
    },
  })
</script>

<style scoped>
  .form {
    @apply items-center space-y-2 md:flex md:space-x-4 md:space-y-0;
  }

  .field {
    @apply flex flex-col space-y-3;
  }

  .label {
    @apply text-gray-500 text-sm underline decoration-fontech decoration-4;
  }

  .input {
    @apply border border-gray-300 rounded-lg p-2;
  }
</style>
