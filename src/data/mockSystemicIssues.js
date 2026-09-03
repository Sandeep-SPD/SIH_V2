export const INITIAL_SYSTEMIC_ISSUES = [
  {
    id: 'SYS-JH-01',
    title: 'Severe Arsenic & Heavy Metal Leaching in Subarnarekha River Watershed',
    district: 'East Singhbhum (Jamshedpur)',
    clustersCount: 4,
    totalReports: 28,
    affectedPopulation: '45,000+ across 6 Panchayats',
    locations: ['Ghatshila Sub-Division', 'Moubhandar', 'Dahigora', 'Musabani fringe'],
    domain: 'Water',
    urgencyLevel: 'Critical',
    recommendation: 'District-level tender for decentralized solar-powered nano-membrane filtration plants with automated telemetry.',
    matchedInstitutions: ['NIT Jamshedpur', 'CSIR-NML Jamshedpur'],
    tenderStatus: 'Tender Draft Under Technical Review (DDC East Singhbhum)'
  },
  {
    id: 'SYS-JH-02',
    title: 'Uncontrolled Particulate Haze & Subsurface Fire Fumes in Jharia Coal Basin',
    district: 'Dhanbad',
    clustersCount: 5,
    totalReports: 42,
    affectedPopulation: '1,20,000+ urban and colliery settlements',
    locations: ['Bastacola', 'Lodna', 'Kusunda', 'Tisra', 'Ena Colliery'],
    domain: 'Healthcare',
    urgencyLevel: 'High',
    recommendation: 'Multi-point IoT air curtain barriers and rapid pulmonary screening clinics integrated with Ayushman Bharat kiosks.',
    matchedInstitutions: ['IIT (ISM) Dhanbad', 'BCCL Health Division'],
    tenderStatus: 'Joint Action Plan Submitted to Jharkhand State Pollution Control Board'
  },
  {
    id: 'SYS-JH-03',
    title: 'Post-Harvest Forest Perishables Spoilage in Garhwa & Latehar Hill Belts',
    district: 'Garhwa & Latehar',
    clustersCount: 3,
    totalReports: 19,
    affectedPopulation: '8,500 tribal minor forest produce gatherers',
    locations: ['Bhandaria', 'Barwadih', 'Mahuadanr plateau'],
    domain: 'Agriculture',
    urgencyLevel: 'Medium',
    recommendation: 'Micro-grid cold storage hubs under Tribal Welfare Department state grant with buy-back logistics.',
    matchedInstitutions: ['BAU Ranchi', 'BIT Mesra'],
    tenderStatus: 'Inter-Departmental Feasibility Cleared'
  }
];

export const INITIAL_VERIFICATION_QUEUE = [
  {
    id: 'ORG-REQ-001',
    orgName: 'Usha Martin University, Ranchi',
    type: 'University',
    district: 'Ranchi',
    applicantEmail: 'registrar@umu.ac.in',
    departments: ['Mining Engg', 'Applied Sciences', 'Computer Science'],
    documents: 'UGC Approval Letter & AISHE Code #C-45210',
    submissionDate: '2025-02-27',
    status: 'Pending'
  },
  {
    id: 'ORG-REQ-002',
    orgName: 'Electrosteel Castings Ltd (ESL)',
    type: 'Industry',
    district: 'Bokaro',
    applicantEmail: 'csr.projects@esl.in',
    departments: ['Water Infrastructure', 'Metallurgy', 'Renewable Energy'],
    documents: 'Corporate Affairs Certificate & CSR Registration Form CSR-1',
    submissionDate: '2025-02-28',
    status: 'Pending'
  },
  {
    id: 'ORG-REQ-003',
    orgName: 'Arka Jain University',
    type: 'University',
    district: 'Saraikela-Kharsawan',
    applicantEmail: 'research@arkajainuniversity.ac.in',
    departments: ['Health Sciences', 'Information Technology', 'Bio-Tech'],
    documents: 'State Private University Gazette Notification & AICTE Recognition',
    submissionDate: '2025-03-01',
    status: 'Pending'
  }
];
