module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'style', // Style changes
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'build', // Changes that affect the build system or external dependencies
        'test', // Adding missing tests
        'chore', // Changes to the build process or auxiliary tools and libraries such as documentation generation
        'revert', // Revert to a commit
        'wip' // Work in progress
      ]
    ]
  }
};
