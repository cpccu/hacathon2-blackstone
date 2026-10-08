export interface EventItem {
  id: string;
  title: string;
  club: string;
  department: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  category: 'Hackathon' | 'Sports' | 'Cultural' | 'Workshop' | 'Seminar';
  registrationFee: string;
  capacity: number;
  registeredCount: number;
  badge: string;
  scheduleItems: { time: string; activity: string }[];
  prizes?: string;
  chiefGuest?: string;
}

export interface Ticket {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  attendeeName: string;
  studentId: string;
  department: string;
  batch: string;
  email: string;
  phone: string;
  registeredAt: string;
  checkedIn: boolean;
  checkedInAt?: string;
  gateNumber: string;
  seatInfo: string;
}

export interface ResourceItem {
  id: string;
  courseCode: string;
  title: string;
  department: 'CSE' | 'EEE' | 'BBA' | 'Civil' | 'Pharmacy' | 'English' | 'Law';
  semester: string;
  category: 'Lecture Notes' | 'Past Exam Questions' | 'Lab Manuals' | 'Notices';
  faculty: string;
  uploadDate: string;
  fileSize: string;
  downloadsCount: number;
  aiSummary: {
    overview: string;
    keyFormulas: string[];
    highYieldQuestions: { question: string; answer: string }[];
    quickRevisionNotes: string[];
  };
}

export interface BusRoute {
  id: string;
  routeName: string;
  routeCode: string;
  busNumber: string;
  supervisorName: string;
  contactPhone: string;
  morningDeparture: string;
  returnDeparture: string;
  stoppages: string[];
  activeDays: string;
  status: 'On Time' | 'Departed' | 'Standby';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Examination' | 'Admit Card' | 'Grading' | 'Transport' | 'Accounts';
  importantNotice?: string;
}

export interface LostFoundItem {
  id: string;
  title: string;
  type: 'lost' | 'found';
  category: 'ID Card' | 'Electronics' | 'Bags' | 'Accessories' | 'Documents';
  location: string;
  dateReported: string;
  status: 'Pending' | 'Claimed' | 'Found';
  contactPerson: string;
  studentId: string;
  phone: string;
  description: string;
  referenceCode: string;
}

export interface ComplaintItem {
  id: string;
  trackingNumber: string;
  category: 'Academic' | 'Transport' | 'WiFi & IT' | 'Canteen' | 'Cleanliness' | 'Library';
  subject: string;
  description: string;
  complainantName: string;
  studentId: string;
  dateSubmitted: string;
  status: 'Pending' | 'Under Review' | 'Resolved';
  officialRemark?: string;
  updatedDate: string;
}

// Initial Events
export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'cpccu-hackathon-2026',
    title: 'CPCCU Programming Camp & Hackathon 2026',
    club: 'City University Computer Club (CPCCU)',
    department: 'CSE',
    date: 'October 24 - 26, 2026',
    time: '09:00 AM - 06:00 PM (48 Hours Sprint)',
    venue: 'Main Auditorium & Engineering Lab 4, Permanent Campus, Savar',
    description: 'The premier competitive programming sprint and software innovation hackathon of City University. Teams of 3 will tackle algorithmic challenges, AI integrations, and real-world civic tech problems. Top teams qualify for regional contest sponsorships.',
    category: 'Hackathon',
    registrationFee: 'Free (CU Students)',
    capacity: 250,
    registeredCount: 194,
    badge: 'Flagship Event',
    prizes: '1st Prize: 50,000 BDT + Trophy | 2nd: 30,000 BDT | 3rd: 20,000 BDT',
    chiefGuest: 'Prof. Dr. Engineer Md. Mostafa Kamal, Vice Chancellor, City University',
    scheduleItems: [
      { time: 'Day 1 - 09:00 AM', activity: 'Registration verification & Opening Ceremony' },
      { time: 'Day 1 - 11:30 AM', activity: 'Problem Statements Release & Sprint Kickoff' },
      { time: 'Day 2 - 02:00 PM', activity: 'Mid-point Mentor Review & Evaluation' },
      { time: 'Day 3 - 03:00 PM', activity: 'Grand Finale Pitches & Prize Giving' }
    ]
  },
  {
    id: 'sports-club-meet-2026',
    title: 'City University Inter-Department Cricket & Sports Meet 2026',
    club: 'City University Sports Club (CUSC)',
    department: 'Central Sports Board',
    date: 'November 05 - 10, 2026',
    time: '10:00 AM - 04:30 PM Daily',
    venue: 'Permanent Campus Sports Arena & Cricket Oval, Savar',
    description: 'Annual inter-departmental tournament featuring T20 cricket, badminton championships, table tennis singles/doubles, and track & field athletics. Official trials for City University Varsity Team selections.',
    category: 'Sports',
    registrationFee: 'Free (CU ID Required)',
    capacity: 500,
    registeredCount: 382,
    badge: 'University Cup',
    prizes: 'Championship Trophy & Medals + Departmental Shield',
    chiefGuest: 'Director of Students Welfare (DSW), City University',
    scheduleItems: [
      { time: 'Day 1 - 10:00 AM', activity: 'Inaugural March-past & Group Stage Matches' },
      { time: 'Day 3 - 02:00 PM', activity: 'Semi-finals & Badminton Showdown' },
      { time: 'Day 5 - 03:30 PM', activity: 'Grand Final & Trophy Presentation' }
    ]
  },
  {
    id: 'cultural-night-2026',
    title: 'Spring Cultural Gala & Rabindra-Nazrul Sandhya 2026',
    club: 'City University Cultural Forum (CUCF)',
    department: 'English & GenEd',
    date: 'November 18, 2026',
    time: '05:30 PM - 09:30 PM',
    venue: 'Central Open Amphitheater, City University Campus',
    description: 'An enchanting evening celebrating Bengali poetry, classical music, dramatic arts, modern band performance, and traditional dance recitals performed exclusively by talented students and faculty members.',
    category: 'Cultural',
    registrationFee: 'Free RSVP',
    capacity: 400,
    registeredCount: 310,
    badge: 'Campus Tradition',
    prizes: 'Best Performer Accolades & Certificates',
    chiefGuest: 'Dean, Faculty of Arts & Social Sciences',
    scheduleItems: [
      { time: '05:30 PM', activity: 'Arrival & Welcome Refreshments' },
      { time: '06:15 PM', activity: 'Rabindra & Nazrul Sangeet Choral' },
      { time: '07:30 PM', activity: 'Theatrical Drama: "Roktokorobi Adaptations"' },
      { time: '08:45 PM', activity: 'Acoustic Fusion Session by City University Band' }
    ]
  },
  {
    id: 'robotics-iot-showcase-2026',
    title: 'National Robotics & Embedded IoT Showcase 2026',
    club: 'CU Robotics & Automation Society',
    department: 'EEE',
    date: 'December 02, 2026',
    time: '10:00 AM - 05:00 PM',
    venue: 'Engineering Complex, 2nd Floor Exhibition Atrium',
    description: 'Showcasing autonomous line follower bots, smart industrial agriculture prototypes, IoT healthcare devices, and drone aerodynamics designed by student researchers.',
    category: 'Workshop',
    registrationFee: 'Free Entry',
    capacity: 300,
    registeredCount: 165,
    badge: 'STEM Exhibition',
    prizes: 'Best Hardware Innovation Grant (25,000 BDT)',
    chiefGuest: 'Head of EEE Department, City University',
    scheduleItems: [
      { time: '10:00 AM', activity: 'Robotics Project Booths Open' },
      { time: '01:30 PM', activity: 'Line Follower Racing Track Showdown' },
      { time: '04:00 PM', activity: 'Industry Judges Feedback & Best Project Award' }
    ]
  },
  {
    id: 'debate-championship-2026',
    title: 'City University National Parliamentary Debate Championship',
    club: 'City University Debating Society (CUDS)',
    department: 'Law',
    date: 'December 12 - 13, 2026',
    time: '09:30 AM - 05:00 PM',
    venue: 'Senate Hall & Seminar Rooms 101-104',
    description: 'Two days of spirited parliamentary and Asian-style debate on public policy, artificial intelligence ethics, economic governance, and international diplomacy.',
    category: 'Seminar',
    registrationFee: 'Free RSVP',
    capacity: 200,
    registeredCount: 140,
    badge: 'Academic Oratory',
    prizes: 'Championship Crest & Best Speaker Awards',
    chiefGuest: 'Dean, Faculty of Law, City University',
    scheduleItems: [
      { time: 'Day 1 - 09:30 AM', activity: 'Tabulation & Round 1 Debates' },
      { time: 'Day 2 - 02:00 PM', activity: 'Grand Final Motion Announcement' },
      { time: 'Day 2 - 04:30 PM', activity: 'Speaker Adjudication & Awards' }
    ]
  }
];

// Seed Tickets
export const INITIAL_TICKETS: Ticket[] = [
  {
    ticketId: 'CU-EVT-2026-8841',
    eventId: 'cpccu-hackathon-2026',
    eventTitle: 'CPCCU Programming Camp & Hackathon 2026',
    eventDate: 'October 24 - 26, 2026',
    eventVenue: 'Main Auditorium & Engineering Lab 4, Savar',
    attendeeName: 'Rafiqul Islam',
    studentId: '211-15-4890',
    department: 'Computer Science & Engineering',
    batch: 'Batch 54',
    email: 'rafiqul.cse54@cityuniversity.edu.bd',
    phone: '+880 1712-345678',
    registeredAt: '2026-10-06 14:22',
    checkedIn: false,
    gateNumber: 'Gate A (Main Auditorium)',
    seatInfo: 'Zone Blue - Table 14'
  },
  {
    ticketId: 'CU-EVT-2026-4019',
    eventId: 'cultural-night-2026',
    eventTitle: 'Spring Cultural Gala & Rabindra-Nazrul Sandhya 2026',
    eventDate: 'November 18, 2026',
    eventVenue: 'Central Open Amphitheater, City University',
    attendeeName: 'Rafiqul Islam',
    studentId: '211-15-4890',
    department: 'Computer Science & Engineering',
    batch: 'Batch 54',
    email: 'rafiqul.cse54@cityuniversity.edu.bd',
    phone: '+880 1712-345678',
    registeredAt: '2026-10-07 19:10',
    checkedIn: true,
    checkedInAt: '2026-10-08 18:30',
    gateNumber: 'Gate B (Amphitheater)',
    seatInfo: 'Row F - Seat 12'
  }
];

// 8 Realistic City University Study Resources
export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    courseCode: 'CSE-211',
    title: 'Data Structures & Algorithms Laboratory Manual (Spring 2026 Edition)',
    department: 'CSE',
    semester: '3rd Semester',
    category: 'Lab Manuals',
    faculty: 'Dr. M. Rahman (Associate Professor, Dept. of CSE)',
    uploadDate: '2026-09-15',
    fileSize: '4.8 MB',
    downloadsCount: 1420,
    aiSummary: {
      overview: 'Official City University laboratory syllabus covering asymptotic time complexity, pointer-based Linked Lists, Doubly Linked Lists, Circular Queues, Binary Search Trees (BST), AVL balance rotations, and Dijkstra algorithm implementation in C++.',
      keyFormulas: [
        'Time Complexity: Master Theorem T(n) = aT(n/b) + f(n)',
        'Binary Search Tree Height: Best O(log n), Worst O(n)',
        'AVL Balance Factor: BF(node) = Height(LeftSubtree) - Height(RightSubtree) ∈ {-1, 0, 1}',
        'Dijkstra Shortest Path with Min-Heap: O((V + E) log V)'
      ],
      highYieldQuestions: [
        {
          question: 'Q1: What is the primary advantage of AVL tree over an unbalanced Binary Search Tree?',
          answer: 'An AVL tree strictly guarantees O(log n) worst-case lookup, insertion, and deletion time by executing single or double rotations whenever the balance factor deviates outside [-1, 1].'
        },
        {
          question: 'Q2: How does a Circular Queue eliminate memory leakage in fixed-size arrays?',
          answer: 'By computing (rear + 1) % MAX_SIZE, indices wrap around to index 0 when front elements are dequeued, avoiding artificial queue full errors.'
        },
        {
          question: 'Q3: Contrast adjacency matrix vs adjacency list space requirements for sparse graphs.',
          answer: 'An adjacency matrix takes O(V^2) memory regardless of edge count, whereas an adjacency list takes O(V + E), which is far superior for sparse campus network topologies.'
        }
      ],
      quickRevisionNotes: [
        'Always check for nullptr before dereferencing next pointers.',
        'Graph DFS uses stack/recursion; BFS uses FIFO Queue.',
        'Heapify operation runs in O(n) linear time when building bottom-up.'
      ]
    }
  },
  {
    id: 'res-2',
    courseCode: 'CSE-312',
    title: 'Database Management Systems - Mid-Term Solved Question Bank (2023-2025)',
    department: 'CSE',
    semester: '5th Semester',
    category: 'Past Exam Questions',
    faculty: 'Engr. K. Hasan (Assistant Professor, Dept. of CSE)',
    uploadDate: '2026-09-22',
    fileSize: '3.2 MB',
    downloadsCount: 980,
    aiSummary: {
      overview: 'Compilation of previous 5 semesters of City University Mid-term papers with model solutions. Heavy focus on ER-to-Relational schema mapping, Relational Algebra operators, and 1NF to BCNF normalization.',
      keyFormulas: [
        'Relational Algebra: Selection (σ), Projection (π), Cartesian Product (×), Natural Join (⋈)',
        'Armstrong Axioms: Reflexivity, Augmentation, Transitivity',
        '3NF Condition: For X -> A, either X is a superkey or A is prime attribute',
        'BCNF Condition: For X -> A, X MUST be a superkey'
      ],
      highYieldQuestions: [
        {
          question: 'Q1: Decompose R(A, B, C, D) with F={A->B, B->C, C->D} into 3NF.',
          answer: 'Candidate key is A. Functional dependencies are already minimal. Relations become R1(A,B), R2(B,C), R3(C,D). All satisfy 3NF and preserve dependencies.'
        },
        {
          question: 'Q2: Explain ACID properties in the context of banking transactions.',
          answer: 'Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent execution equivalent to serial), Durability (committed changes survive system crash).'
        }
      ],
      quickRevisionNotes: [
        'Every BCNF schema is in 3NF, but not every 3NF schema is in BCNF.',
        'Lossless join decomposition is mandatory for correct schema redesign.'
      ]
    }
  },
  {
    id: 'res-3',
    courseCode: 'EEE-121',
    title: 'Electrical Circuits I - Comprehensive Lecture Handout & Problem Sets',
    department: 'EEE',
    semester: '2nd Semester',
    category: 'Lecture Notes',
    faculty: 'Prof. Tanvir Ahmed (Head, Dept. of EEE)',
    uploadDate: '2026-08-30',
    fileSize: '6.1 MB',
    downloadsCount: 1120,
    aiSummary: {
      overview: 'Fundamentals of DC and AC circuit theory. Deep dives into Kirchhoff Laws (KCL, KVL), Mesh analysis with dependent sources, Thevenin and Norton equivalents, and Maximum Power Transfer Theorem.',
      keyFormulas: [
        'Ohm Law: V = I * R',
        'Thevenin Equivalent Voltage V_th and Resistance R_th',
        'Maximum Power Transfer Theorem: P_max occurs when R_L = R_th, where P_max = (V_th^2) / (4 * R_th)',
        'Capacitor voltage differential: i(t) = C * (dv/dt)'
      ],
      highYieldQuestions: [
        {
          question: 'Q1: State Maximum Power Transfer Theorem for DC resistive network.',
          answer: 'A resistive load will absorb maximum power from a linear two-terminal DC network when the load resistance equals the Thevenin resistance viewed from the load terminals.'
        },
        {
          question: 'Q2: How do you handle a supermesh when a current source is shared between two loops?',
          answer: 'Remove the shared current source branch temporarily to formulate a single combined KVL equation around the perimeter, then write a constraint equation relating the two mesh currents.'
        }
      ],
      quickRevisionNotes: [
        'Turn off independent voltage sources as short circuits (0V).',
        'Turn off independent current sources as open circuits (0A).',
        'Never deactivate dependent sources when calculating R_th.'
      ]
    }
  },
  {
    id: 'res-4',
    courseCode: 'BBA-204',
    title: 'Principles of Marketing & South-Asian Corporate Case Studies',
    department: 'BBA',
    semester: '4th Semester',
    category: 'Lecture Notes',
    faculty: 'Prof. Farhana Akter (Faculty of Business Administration)',
    uploadDate: '2026-09-04',
    fileSize: '5.4 MB',
    downloadsCount: 760,
    aiSummary: {
      overview: 'Foundational framework for market segmentation, targeting, positioning (STP), 4Ps of marketing mix, consumer behavior in Bangladesh retail landscapes, and digital brand equity.',
      keyFormulas: [
        'Marketing Mix (4Ps): Product, Price, Place, Promotion',
        'Customer Lifetime Value: CLV = (Avg Value of Sale * Transactions * Retention Period)',
        'SWOT Matrix: Strengths, Weaknesses, Opportunities, Threats'
      ],
      highYieldQuestions: [
        {
          question: 'Q1: Define Market Segmentation vs Product Differentiation.',
          answer: 'Market segmentation divides a heterogenous market into homogenous subsets with distinct buyer needs; product differentiation modifies offerings to stand apart from competitor alternatives.'
        },
        {
          question: 'Q2: How does FMCG branding in Bangladesh leverage rural distribution channels?',
          answer: 'FMCG leaders utilize localized tiered distributor networks, sachet packaging to reduce price barriers, and intensive trade margin incentives for neighborhood grocers (mudir dokan).'
        }
      ],
      quickRevisionNotes: [
        'Push marketing relies on distributors; Pull marketing relies on consumer advertising demand.',
        'Brand equity consists of awareness, perceived quality, brand associations, and brand loyalty.'
      ]
    }
  },
  {
    id: 'res-5',
    courseCode: 'CE-315',
    title: 'Structural Analysis & Reinforced Concrete Design (BNBC Code Pack)',
    department: 'Civil',
    semester: '6th Semester',
    category: 'Lab Manuals',
    faculty: 'Engr. T. Hossain (Assistant Professor, Dept. of Civil Engineering)',
    uploadDate: '2026-09-12',
    fileSize: '7.8 MB',
    downloadsCount: 650,
    aiSummary: {
      overview: 'Structural mechanics guidelines complying with Bangladesh National Building Code (BNBC). Analysis of indeterminate beams, moment distribution method, shear reinforcement stirrup spacing, and singly/doubly reinforced beam flexure.',
      keyFormulas: [
        'Nominal Moment Capacity: Mn = As * fy * (d - a/2), where a = (As * fy) / (0.85 * fc * b)',
        'Shear Strength of Concrete: Vc = 2 * λ * √(fc) * b_w * d',
        'Stirrup Spacing: s = (Av * fy * d) / Vs'
      ],
      highYieldQuestions: [
        {
          question: 'Q1: Why is under-reinforced beam design preferred over over-reinforced design?',
          answer: 'Under-reinforced design ensures steel yields before concrete crushes, providing ductile failure with visible crack warnings and deflections rather than sudden catastrophic brittle collapse.'
        },
        {
          question: 'Q2: Explain the significance of clear cover in RCC structures near damp environments.',
          answer: 'Clear cover protects reinforcement rebar from atmospheric carbonation, moisture, and corrosion, maintaining structural longevity and fire resistance.'
        }
      ],
      quickRevisionNotes: [
        'Check minimum steel ratio rho_min = (3 * √(fc)) / fy to prevent sudden rupture upon cracking.',
        'Factor of safety: Dead Load 1.2D + Live Load 1.6L under BNBC/ACI specifications.'
      ]
    }
  },
  {
    id: 'res-6',
    courseCode: 'PHAR-202',
    title: 'Human Anatomy, Histology & Physiology Lab Protocol (Spring 2026)',
    department: 'Pharmacy',
    semester: '3rd Semester',
    category: 'Lab Manuals',
    faculty: 'Dr. Shamim Ara (Associate Professor, Dept. of Pharmacy)',
    uploadDate: '2026-09-10',
    fileSize: '8.4 MB',
    downloadsCount: 890,
    aiSummary: {
      overview: 'Clinical laboratory protocols for blood pressure measurement, complete hemocytometer blood counts, cardiovascular ECG interpretation, renal clearance calculations, and gastrointestinal histology slide identification.',
      keyFormulas: [
        'Cardiac Output: CO = Stroke Volume (SV) * Heart Rate (HR)',
        'Mean Arterial Pressure (MAP): MAP = Diastolic BP + 1/3 (Systolic BP - Diastolic BP)',
        'Glomerular Filtration Rate (GFR): Inulin Clearance = (U_inulin * V) / P_inulin'
      ],
      highYieldQuestions: [
        {
          question: 'Q1: What are the physiological pacemakers of the human heart in sequence?',
          answer: 'SA Node (Sinoatrial node, 60-100 bpm) -> AV Node (Atrioventricular node, 40-60 bpm) -> Bundle of His -> Purkinje fibers (20-40 bpm).'
        },
        {
          question: 'Q2: Explain the mechanism of Renin-Angiotensin-Aldosterone System (RAAS).',
          answer: 'Drop in blood pressure triggers kidney juxtaglomerular cells to release Renin, converting Angiotensinogen to Angiotensin I. ACE converts it to Angiotensin II, inducing vasoconstriction and Aldosterone release for sodium retention.'
        }
      ],
      quickRevisionNotes: [
        'Normal erythrocyte count in adult human: 4.5 - 5.5 million per microliter.',
        'ECG P wave indicates atrial depolarization; QRS complex represents ventricular depolarization.'
      ]
    }
  },
  {
    id: 'res-7',
    courseCode: 'CSE-411',
    title: 'Artificial Intelligence & Heuristic Search Exam Prep Pack',
    department: 'CSE',
    semester: '7th Semester',
    category: 'Past Exam Questions',
    faculty: 'Dr. A. S. M. Touhidul (Professor, Dept. of CSE)',
    uploadDate: '2026-09-18',
    fileSize: '4.1 MB',
    downloadsCount: 1310,
    aiSummary: {
      overview: 'Comprehensive preparation for A* search, Minimax with Alpha-Beta pruning, Constraint Satisfaction Problems (CSP), Bayesian Networks, and backpropagation gradients for multilayer perceptrons.',
      keyFormulas: [
        'A* Evaluation Function: f(n) = g(n) + h(n), where h(n) must be admissible (h(n) <= h*(n))',
        'Bayes Theorem: P(A|B) = [P(B|A) * P(A)] / P(B)',
        'Alpha-Beta Pruning Condition: Prune when beta <= alpha'
      ],
      highYieldQuestions: [
        {
          question: 'Q1: When is an A* heuristic guaranteed to be optimal for tree vs graph search?',
          answer: 'A* is optimal in tree search if h(n) is admissible (never overestimates). In graph search, h(n) must also be consistent (monotonic), satisfying h(n) <= c(n, a, n) + h(n).'
        },
        {
          question: 'Q2: How does Alpha-Beta pruning reduce minimax time complexity?',
          answer: 'With optimal move ordering, Alpha-Beta pruning reduces branching factor from b to √b, halving the effective search tree depth required to compute best moves.'
        }
      ],
      quickRevisionNotes: [
        'Admissible heuristic means h(goal) = 0.',
        'Backpropagation is simply the recursive application of the chain rule of calculus.'
      ]
    }
  },
  {
    id: 'res-8',
    courseCode: 'ENG-101',
    title: 'Remedial English & Professional Academic Writing Handbook',
    department: 'English',
    semester: '1st Semester',
    category: 'Lecture Notes',
    faculty: 'Ms. Shahnaz Parvin (Senior Lecturer, Dept. of English)',
    uploadDate: '2026-08-20',
    fileSize: '2.9 MB',
    downloadsCount: 1580,
    aiSummary: {
      overview: 'Essential academic writing manual for undergraduate students at City University. Covers formal register, thesis statement formulation, APA 7th edition citation rules, avoidance of dangling modifiers, and technical memorandum structure.',
      keyFormulas: [
        'Essay Structure: Hook + Background + Thesis Statement -> Body (PEEL) -> Synthesis Conclusion',
        'APA Citation Format: Author, A. A. (Year). Title of work. Publisher.'
      ],
      highYieldQuestions: [
        {
          question: 'Q1: What is a dangling modifier? Provide an example and correction.',
          answer: 'A dangling modifier is an introductory phrase that does not clearly modify the subject that immediately follows. Incorrect: "Walking down the hall, the alarm sounded." Correct: "Walking down the hall, the student heard the alarm sounding."'
        },
        {
          question: 'Q2: Distinguish between summarizing, paraphrasing, and direct quotation in academic research.',
          answer: 'Summarizing condenses main ideas into a brief overview; paraphrasing restates specific passages in your own words while retaining depth; direct quotation copies exact words inside quotation marks with page references.'
        }
      ],
      quickRevisionNotes: [
        'Avoid informal contractions (don’t, won’t) in university research submissions.',
        'Always provide parenthetical in-text citations for borrowed claims to prevent plagiarism.'
      ]
    }
  }
];

// City University Shuttle Bus Routes
export const SHUTTLE_BUS_ROUTES: BusRoute[] = [
  {
    id: 'route-savar',
    routeName: 'Savar Thana & Nabinagar Express',
    routeCode: 'BUS-01 (Savar)',
    busNumber: 'Dhaka Metro Cha-11-4092',
    supervisorName: 'Md. Monir Hossain',
    contactPhone: '+880 1711-209384',
    morningDeparture: '07:45 AM (From Savar Thana)',
    returnDeparture: '04:30 PM & 06:15 PM (From Campus)',
    stoppages: [
      'Radio Colony',
      'Savar Thana Bus Stand',
      'C&B More',
      'Jahangirnagar Dairy Gate',
      'Ashulia Bazar',
      'Birulia Bridge',
      'City University Permanent Campus'
    ],
    activeDays: 'Saturday to Thursday',
    status: 'On Time'
  },
  {
    id: 'route-mirpur',
    routeName: 'Mirpur-10 & Technical Metro Route',
    routeCode: 'BUS-02 (Mirpur)',
    busNumber: 'Dhaka Metro Cha-14-8831',
    supervisorName: 'Md. Kamal Uddin',
    contactPhone: '+880 1819-482019',
    morningDeparture: '07:15 AM (From Mirpur-10)',
    returnDeparture: '04:30 PM & 06:30 PM (From Campus)',
    stoppages: [
      'Mirpur-10 Roundabout',
      'Mirpur-1 Fire Service',
      'Mazar Road',
      'Beribadh Embankment',
      'Priyangon Abashik',
      'Birulia Checkpost',
      'City University Permanent Campus'
    ],
    activeDays: 'Saturday to Thursday',
    status: 'On Time'
  },
  {
    id: 'route-uttara',
    routeName: 'Uttara House Building & Diabari Route',
    routeCode: 'BUS-03 (Uttara)',
    busNumber: 'Dhaka Metro Cha-15-2017',
    supervisorName: 'Abdul Hannan',
    contactPhone: '+880 1912-774411',
    morningDeparture: '07:20 AM (From House Building)',
    returnDeparture: '04:30 PM & 06:15 PM (From Campus)',
    stoppages: [
      'Uttara House Building',
      'Mascot Plaza',
      'Azampur',
      'Uttara Sector 10',
      'Diabari Metro Station',
      'Panchabati More',
      'City University Permanent Campus'
    ],
    activeDays: 'Saturday to Thursday',
    status: 'On Time'
  },
  {
    id: 'route-dhanmondi',
    routeName: 'Dhanmondi & Science Lab Shuttle',
    routeCode: 'BUS-04 (Dhanmondi)',
    busNumber: 'Dhaka Metro Cha-12-9920',
    supervisorName: 'Nurul Islam Mollah',
    contactPhone: '+880 1720-334455',
    morningDeparture: '07:00 AM (From Science Lab)',
    returnDeparture: '04:30 PM & 06:15 PM (From Campus)',
    stoppages: [
      'Science Laboratory',
      'Dhanmondi 27 / Shukrabad',
      'Asad Gate',
      'Shyamoli Square',
      'Kallyanpur',
      'Gabtoli Beribadh',
      'City University Permanent Campus'
    ],
    activeDays: 'Saturday to Thursday',
    status: 'On Time'
  },
  {
    id: 'route-gazipur',
    routeName: 'Gazipur Chowrasta & Chandra Express',
    routeCode: 'BUS-05 (Gazipur)',
    busNumber: 'Dhaka Metro Cha-16-5120',
    supervisorName: 'Shahinur Rahman',
    contactPhone: '+880 1622-998877',
    morningDeparture: '06:50 AM (From Gazipur Chowrasta)',
    returnDeparture: '04:30 PM (From Campus)',
    stoppages: [
      'Gazipur Chowrasta',
      'Board Bazar',
      'Konabari Flyover',
      'Chandra Mor',
      'Baipail',
      'Zirani Bazar',
      'City University Permanent Campus'
    ],
    activeDays: 'Saturday to Thursday',
    status: 'On Time'
  }
];

// Grounded Exam Logistics & Rules FAQs
export const EXAM_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Admit Card',
    question: 'What is the mandatory procedure to download and validate the Semester Admit Card?',
    answer: 'Students must clear all semester tuition fee installments (minimum 75% for Mid-term, 100% for Final exam) via City University Accounts Portal or designated bank booths. Once cleared, the digital admit card becomes unlocked on your Student Portal 72 hours before exams. You must carry a printed physical copy with your student photograph stamped or printed clearly.',
    importantNotice: 'Digital smartphone copies of Admit Cards are strictly NOT allowed inside the examination hall.'
  },
  {
    id: 'faq-2',
    category: 'Examination',
    question: 'Which calculator models are officially approved by the Controller of Examinations?',
    answer: 'Only non-programmable scientific calculators are permitted. Permitted models include Casio fx-991EX ClassWiz, Casio fx-991ES Plus, fx-100MS, fx-570MS, and fx-82MS. Calculators with graphic display, text storage, cellular/Bluetooth transmission, or QWERTY keyboards (e.g. Casio fx-9860G, fx-CG50, TI-84) are strictly banned and will be confiscated by invigilators.',
    importantNotice: 'Calculator covers with hand-written formulas will be treated as exam malpractice.'
  },
  {
    id: 'faq-3',
    category: 'Examination',
    question: 'What is the examination hall dress code and mobile device policy?',
    answer: 'All candidates must visibly display their genuine City University Student ID card hanging around their neck throughout the exam. Mobile phones, smartwatches, earbuds, fitness trackers, and digital recording gadgets must be switched off and placed on the designated front bag rack before the distribution of question papers. Possessing an active device at your desk incurs automatic course cancellation.',
  },
  {
    id: 'faq-4',
    category: 'Grading',
    question: 'What are the rules regarding Retake, Improvement, and Incomplete grades?',
    answer: 'A student who scores a grade lower than B (Grade Point < 3.00) can apply for an Improvement exam within the subsequent two regular semesters. Retake for an F grade is mandatory to complete graduation. The improved grade will replace the previous grade in CGPA calculation, but the transcript will indicate the attempt as per UGC and City University academic regulations.',
  },
  {
    id: 'faq-5',
    category: 'Examination',
    question: 'How do I apply for a Make-up Exam in case of severe medical emergencies?',
    answer: 'Submit a formal written application addressed to the Head of the Department within 72 hours of the missed exam, attaching certified hospitalization/medical discharge certificates from a registered medical practitioner (MBBS). Upon departmental recommendation and Dean approval, a special make-up assessment will be scheduled within 10 days of semester grade submission.'
  }
];

// Initial Lost & Found Items
export const INITIAL_LOST_FOUND: LostFoundItem[] = [
  {
    id: 'lf-1',
    referenceCode: 'LF-2026-091',
    title: 'Student ID Card - Batch 58 (CSE)',
    type: 'found',
    category: 'ID Card',
    location: 'Central Cafeteria, Table 8 near water counter',
    dateReported: '2026-10-07',
    status: 'Pending',
    contactPerson: 'Canteen Staff (Subrata)',
    studentId: '232-15-5821 (Belongs to Tanvir Anam)',
    phone: '+880 1833-112233',
    description: 'Plastic City University identity card found on cafeteria bench after lunch hours. ID card holder is green.'
  },
  {
    id: 'lf-2',
    referenceCode: 'LF-2026-088',
    title: 'Casio fx-991EX ClassWiz Calculator',
    type: 'lost',
    category: 'Electronics',
    location: 'Engineering Building, Room 402 (After CSE-211 lab)',
    dateReported: '2026-10-06',
    status: 'Pending',
    contactPerson: 'Farhan Shakil',
    studentId: '221-15-4912',
    phone: '+880 1744-889900',
    description: 'Black scientific calculator with a small neon yellow sticker on the back cover. Left behind on the front corner bench.'
  },
  {
    id: 'lf-3',
    referenceCode: 'LF-2026-074',
    title: 'HP Navy Blue Laptop Backpack with 64GB Pendrive',
    type: 'found',
    category: 'Bags',
    location: 'Central Library, 2nd Floor Quiet Study Section',
    dateReported: '2026-10-04',
    status: 'Claimed',
    contactPerson: 'Assistant Librarian (Mr. Anwar)',
    studentId: '213-11-4011',
    phone: '+880 1911-556677',
    description: 'Contains lecture spiral notebook, Sandisk 64GB metallic flash drive, and water bottle. Handed over to security desk.'
  },
  {
    id: 'lf-4',
    referenceCode: 'LF-2026-065',
    title: 'Silver Steel Thermos Water Bottle (Milton)',
    type: 'found',
    category: 'Accessories',
    location: 'Mirpur Bus #02 (Left on seat 14)',
    dateReported: '2026-10-03',
    status: 'Pending',
    contactPerson: 'Bus Supervisor Kamal',
    studentId: 'Campus Transport Desk',
    phone: '+880 1819-482019',
    description: 'Stainless steel 750ml water bottle with silver carabiner clip.'
  },
  {
    id: 'lf-5',
    referenceCode: 'LF-2026-059',
    title: 'Brown Leather Wallet with National ID Card',
    type: 'lost',
    category: 'Documents',
    location: 'Campus Playground Pavilion during football practice',
    dateReported: '2026-10-02',
    status: 'Pending',
    contactPerson: 'Mahmudul Hasan',
    studentId: '222-18-5003',
    phone: '+880 1788-332211',
    description: 'Brown Wildhorn leather wallet containing NID, City Bank ATM card, and passport-size photographs.'
  }
];

// Initial Campus Grievance / Complaints
export const INITIAL_COMPLAINTS: ComplaintItem[] = [
  {
    id: 'cmp-1',
    trackingNumber: 'CU-TKT-9042',
    category: 'WiFi & IT',
    subject: 'Library 3rd Floor Wi-Fi Access Point Frequent Disconnection',
    description: 'The Wi-Fi access point "CityUni-Student-3F" continuously drops connection during online research work and assignments. Signal oscillates between 1 bar and disconnecting.',
    complainantName: 'Rafiqul Islam',
    studentId: '211-15-4890',
    dateSubmitted: '2026-10-05',
    status: 'Under Review',
    officialRemark: 'ICT Cell has dispatched a network technician to inspect router AP-03 in the East Wing. Firmware reboot scheduled tonight.',
    updatedDate: '2026-10-07'
  },
  {
    id: 'cmp-2',
    trackingNumber: 'CU-TKT-8980',
    category: 'Transport',
    subject: 'Request for Additional Return Trip for Uttara Route at 06:30 PM',
    description: 'Evening lab classes for 7th semester students conclude at 05:45 PM, but the last scheduled bus for Uttara leaves at 06:15 PM, leaving students rushing or missing transport.',
    complainantName: 'Sadia Sultana',
    studentId: '212-15-4200',
    dateSubmitted: '2026-10-01',
    status: 'Resolved',
    officialRemark: 'Transport Committee approved a 15-minute departure buffer on Tuesdays and Thursdays. Bus #03 will now depart at 06:25 PM.',
    updatedDate: '2026-10-04'
  },
  {
    id: 'cmp-3',
    trackingNumber: 'CU-TKT-9055',
    category: 'Canteen',
    subject: 'Pricing & Fresh Food Hygiene Audit at Academic Building Canteen',
    description: 'The drinking water dispenser on ground floor cafeteria requires filter replacement. Please inspect sanitation standards.',
    complainantName: 'Siam Ahmed',
    studentId: '231-11-7019',
    dateSubmitted: '2026-10-08',
    status: 'Pending',
    officialRemark: 'Grievance assigned to Campus Health & Sanitation Inspector. Visit planned for Oct 10.',
    updatedDate: '2026-10-08'
  }
];
