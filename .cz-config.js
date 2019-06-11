const glob = require('glob');

/**
 * @param {string} pattern
 * @param {Function} [fn]
 */
const globMap = (pattern, fn) =>
  glob
    .sync(pattern)
    .map(fn || (path => path))
    .map(path => path.replace(/\/$/, ''));

/**
 * Check `path` to not include substring in `variants`
 * @param {string[]} variants
 * @return {function(*): *}
 */

const exclude = variants => path => variants.every(variant => !path.includes(variant));

module.exports = {
  types: [
    { value: 'feat', name: '🎸 feat:     A new feature' },
    { value: 'fix', name: '🐛 fix:      A bug fix' },
    { value: 'refactor', name: '💡 refactor: A code change that neither fixes a bug or adds a feature' },
    { value: 'style', name: '💄 style:    Markup, white-space, formatting, missing semi-colons...' },
    { value: 'test', name: '💍 test:     Adding missing tests' },
    { value: 'chore', name: '🤖 chore:    Build process or auxiliary tool changes' },
    { value: 'wip', name: '🕯 wip:      Work in progress' },
    { value: 'docs', name: '✏️ docs:     Documentation only changes' },
    { value: 'revert', name: '🐰 revert:   Revert to a commit' },
    { value: 'perf', name: '💪 perf:     A code change that improves performance"' }
  ],
  allowCustomScopes: true,
  skipQuestions: ['footer'],
  allowBreakingChanges: ['fix', 'feat', 'revert', 'refactor'],
  scopes: [].concat(
    'client',
    globMap('src/client/*/', path => path.replace(/src\//, '')),
    'core',
    globMap('src/core/*/', path => path.replace(/src\//, '')).filter(exclude(['core/features', 'core/ui'])),
    'core/features',
    globMap('src/core/features/*/', path => path.replace(/src\//, '')),
    'core/ui',
    globMap('src/core/ui/*/', path => path.replace(/src\//, '')),
    'server',
    globMap('src/server/*/', path => path.replace(/src\//, '')),
    'types',
    globMap('types/*/')
  )
};
