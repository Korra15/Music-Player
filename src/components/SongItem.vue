<template>
  <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition
    duration-300 hover:bg-gray-50" :id="`song-id-${song.docId}`">
    <div>
      <router-link :to="{ name: 'song', params: { id: song.docId }}"
        class="font-bold block text-gray-600">
        {{ song.modifiedName }}
      </router-link>
      <span class="text-gray-500 text-sm">
        {{ song.displayName }}
      </span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link custom
        :to="{ name: 'song', params: { id: song.docId }, hash: '#comments'}"
        v-slot="{ navigate }">
        <!-- custom property will tell the router to give us complete control
             over the behaviour of the component -->
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.commentCount }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['song'],
};
</script>
