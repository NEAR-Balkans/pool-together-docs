module.exports = {
  docs: [
    'overview',
    'administration',
    'architecture',
    'how-it-works',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/draw',
        'guides/pool'
      ],
    },
    {
      type: 'category',
      label: 'Contracts',
      items: [
        'contracts/draw',
        'contracts/pool'
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: ['security/bugbounty'],
    },
    'deployed-contracts',
  ],
}
