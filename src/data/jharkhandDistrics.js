export const JHARKHAND_DISTRICTS = [
  { id: 'ranchi', name: 'Ranchi', hq: 'Ranchi', x: 380, y: 310, openComplaintsCount: 6, neighbors: ['ramgarh', 'khunti', 'gumla', 'lohardaga', 'purulia'] },
  { id: 'east-singhbhum', name: 'East Singhbhum (Jamshedpur)', hq: 'Jamshedpur', x: 530, y: 440, openComplaintsCount: 8, neighbors: ['saraikela-kharsawan', 'purulia'] },
  { id: 'dhanbad', name: 'Dhanbad', hq: 'Dhanbad', x: 500, y: 220, openComplaintsCount: 7, neighbors: ['bokaro', 'giridih', 'jamtara'] },
  { id: 'bokaro', name: 'Bokaro', hq: 'Bokaro Steel City', x: 440, y: 240, openComplaintsCount: 4, neighbors: ['dhanbad', 'ramgarh', 'giridih', 'purulia'] },
  { id: 'giridih', name: 'Giridih', hq: 'Giridih', x: 440, y: 150, openComplaintsCount: 5, neighbors: ['deoghar', 'dhanbad', 'bokaro', 'koderma', 'hazaribagh'] },
  { id: 'hazaribagh', name: 'Hazaribagh', hq: 'Hazaribagh', x: 350, y: 190, openComplaintsCount: 4, neighbors: ['koderma', 'chatra', 'ramgarh', 'bokaro', 'giridih'] },
  { id: 'deoghar', name: 'Deoghar', hq: 'Deoghar', x: 520, y: 120, openComplaintsCount: 3, neighbors: ['dumka', 'giridih', 'jamtara'] },
  { id: 'dumka', name: 'Dumka', hq: 'Dumka', x: 600, y: 140, openComplaintsCount: 3, neighbors: ['deoghar', 'godda', 'pakur', 'jamtara'] },
  { id: 'godda', name: 'Godda', hq: 'Godda', x: 630, y: 80, openComplaintsCount: 2, neighbors: ['dumka', 'sahibganj'] },
  { id: 'sahibganj', name: 'Sahibganj', hq: 'Sahibganj', x: 670, y: 60, openComplaintsCount: 3, neighbors: ['godda', 'pakur'] },
  { id: 'pakur', name: 'Pakur', hq: 'Pakur', x: 670, y: 130, openComplaintsCount: 2, neighbors: ['dumka', 'sahibganj'] },
  { id: 'jamtara', name: 'Jamtara', hq: 'Jamtara', x: 540, y: 180, openComplaintsCount: 2, neighbors: ['dhanbad', 'dumka', 'deoghar'] },
  { id: 'koderma', name: 'Koderma', hq: 'Koderma', x: 340, y: 120, openComplaintsCount: 2, neighbors: ['hazaribagh', 'giridih', 'nawada'] },
  { id: 'chatra', name: 'Chatra', hq: 'Chatra', x: 260, y: 160, openComplaintsCount: 3, neighbors: ['hazaribagh', 'palamu', 'latehar', 'gaya'] },
  { id: 'latehar', name: 'Latehar', hq: 'Latehar', x: 230, y: 240, openComplaintsCount: 3, neighbors: ['palamu', 'chatra', 'ranchi', 'lohardaga', 'gumla'] },
  { id: 'palamu', name: 'Palamu', hq: 'Daltonganj', x: 170, y: 170, openComplaintsCount: 4, neighbors: ['garhwa', 'chatra', 'latehar'] },
  { id: 'garhwa', name: 'Garhwa', hq: 'Garhwa', x: 100, y: 140, openComplaintsCount: 5, neighbors: ['palamu'] },
  { id: 'lohardaga', name: 'Lohardaga', hq: 'Lohardaga', x: 280, y: 290, openComplaintsCount: 2, neighbors: ['latehar', 'ranchi', 'gumla'] },
  { id: 'gumla', name: 'Gumla', hq: 'Gumla', x: 250, y: 370, openComplaintsCount: 3, neighbors: ['lohardaga', 'ranchi', 'khunti', 'simdega', 'latehar'] },
  { id: 'simdega', name: 'Simdega', hq: 'Simdega', x: 240, y: 460, openComplaintsCount: 2, neighbors: ['gumla', 'khunti', 'west-singhbhum'] },
  { id: 'khunti', name: 'Khunti', hq: 'Khunti', x: 360, y: 370, openComplaintsCount: 2, neighbors: ['ranchi', 'gumla', 'simdega', 'west-singhbhum', 'saraikela-kharsawan'] },
  { id: 'west-singhbhum', name: 'West Singhbhum (Chaibasa)', hq: 'Chaibasa', x: 420, y: 480, openComplaintsCount: 5, neighbors: ['khunti', 'simdega', 'saraikela-kharsawan'] },
  { id: 'saraikela-kharsawan', name: 'Saraikela-Kharsawan', hq: 'Saraikela', x: 470, y: 400, openComplaintsCount: 3, neighbors: ['ranchi', 'khunti', 'east-singhbhum', 'west-singhbhum'] },
  { id: 'ramgarh', name: 'Ramgarh', hq: 'Ramgarh Cantonment', x: 410, y: 260, openComplaintsCount: 3, neighbors: ['ranchi', 'hazaribagh', 'bokaro', 'purulia'] }
];

export const DOMAIN_CATEGORIES = [
  'Water',
  'Healthcare',
  'Agriculture',
  'Education',
  'Environment',
  'Energy',
  'Urban Development',
  'Accessibility',
  'Public Administration',
  'Rural Livelihoods'
];
