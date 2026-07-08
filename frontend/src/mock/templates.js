export const MOCK_TEMPLATES = [
  {
    id: 'tpl-1',
    title: 'Modern Portfolio',
    category: 'Portfolio',
    thumbnail: 'https://via.placeholder.com/300x200?text=Portfolio',
    isPremium: false,
    content: [
      {
        id: 'hero-1',
        type: 'Section',
        props: { style: { padding: '80px 20px', backgroundColor: '#1f2937', color: 'white', textAlign: 'center' } },
        children: [
          { id: 'h1', type: 'Heading', props: { text: 'Hi, I am a Developer', style: { fontSize: '48px', marginBottom: '20px' } } },
          { id: 'p1', type: 'Text', props: { text: 'Welcome to my digital portfolio built with AI.', style: { fontSize: '18px' } } }
        ]
      }
    ]
  },
  {
    id: 'tpl-2',
    title: 'Tech Startup Landing',
    category: 'Landing Page',
    thumbnail: 'https://via.placeholder.com/300x200?text=Startup',
    isPremium: true,
    content: [
      {
        id: 'hero-2',
        type: 'Section',
        props: { style: { padding: '100px 20px', backgroundColor: '#3b82f6', color: 'white', textAlign: 'center' } },
        children: [
          { id: 'h2', type: 'Heading', props: { text: 'Revolutionize Your Workflow', style: { fontSize: '56px', fontWeight: 'bold' } } },
          { id: 'btn1', type: 'Button', props: { text: 'Get Started', style: { padding: '15px 30px', backgroundColor: 'white', color: '#3b82f6', borderRadius: '8px', marginTop: '20px' } } }
        ]
      }
    ]
  }
];
