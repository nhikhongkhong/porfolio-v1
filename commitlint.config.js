export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // ✨
        'fix',  // 🐛
        'docs', // 📚
        'style',// 🎨
        'refactor', // 🔧
        'test', // 🧪
        'chore', // 🧹
        'ci', // ⚙️
      ],
    ],
  },
  prompt: {
    messages: {
      type: "Select the type of change you're committing:",
    },
  },
}
