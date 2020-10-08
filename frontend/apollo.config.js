module.exports = {
  client: {
    service: {
      name: 'quasar-app',
      // URL to the GraphQL API
      url: 'ws://localhost:5000/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}