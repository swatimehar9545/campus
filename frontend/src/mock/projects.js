export const MOCK_PROJECTS = [
  {
    id: 'proj-101',
    userId: 'user-1',
    name: 'My Personal Blog',
    description: 'A blog about AI and Web Development',
    subdomain: 'myblog.aibuilder.app',
    status: 'Published',
    lastModified: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    content: [
      {
        id: 'header-1',
        type: 'Section',
        props: { style: { padding: '20px', borderBottom: '1px solid #eee' } },
        children: [
          { id: 'logo', type: 'Heading', props: { text: 'AI Dev Blog', style: { fontSize: '24px', fontWeight: 'bold' } } }
        ]
      }
    ]
  },
  {
    id: 'proj-102',
    userId: 'user-1',
    name: 'E-commerce Store Draft',
    description: 'Selling digital AI products',
    subdomain: null,
    status: 'Draft',
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    content: []
  }
];
