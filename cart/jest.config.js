module.exports = {
  displayName: 'cart',
  name: 'cart',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  reporters: ['default'],
  transform: {
    '^.+\\.([jt]s)$': '@swc/jest',
  },
  testRegex: '(/__unit__/.*(\\.|/)(test|spec))\\.([jt]s)$',
};
