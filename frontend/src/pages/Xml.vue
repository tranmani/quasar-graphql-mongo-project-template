<template>
  <q-page class="flex flex-center">
    <q-table
      title="XML Objects"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </q-page>
</template>

<script>
import gql from "graphql-tag";

const ALL_XML = gql`
  {
    allXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

const REAL_TIME_XML = gql`
  subscription {
    newXML {
      name
      xmin
      ymin
      xmax
      ymax
    }
  }
`;

export default {
  name: "PageIndex",
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Lable name",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
        },
        {
          name: "xmin",
          align: "center",
          label: "X min",
          field: "xmin",
          sortable: true,
        },
        {
          name: "ymin",
          align: "center",
          label: "Y min",
          field: "ymin",
          sortable: true,
        },
        {
          name: "xmax",
          align: "center",
          label: "X max",
          field: "xmax",
          sortable: true,
        },
        {
          name: "ymax",
          align: "center",
          label: "Y max",
          field: "ymax",
          sortable: true,
        },
      ],
      data: [],
    };
  },
  apollo: {
    data: {
      query: ALL_XML,
      update(data) {
        return data.allXML;
      },
      subscribeToMore: {
        document: REAL_TIME_XML,
        updateQuery: (previousResult, { subscriptionData }) => {
          if (previousResult) {
            return {
              data: previousResult.allXML.push(subscriptionData.data.newXML),
            };
          }
        },
      },
    },
  },
  methods: {},
  mounted() {
    const this_ = this;
  },
};
</script>

<style scoped></style>
