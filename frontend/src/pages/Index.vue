<template>
  <q-page class="flex flex-center">
    <q-list bordered>
      <q-item clickable v-ripple v-for="string in strings" :key="string.text">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ string.text }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import gql from "graphql-tag";

const ALL_STRINGS = gql`
  {
    allTestText {
      text
    }
  }
`;

export default {
  name: "PageIndex",
  data() {
    return {
      strings: [],
      huy: [],
    };
  },
  apollo: {
    strings: {
      query: ALL_STRINGS,
      update(data) {
        return data.allTestText;
      },
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped></style>
