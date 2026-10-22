export interface SkillTopicLevel {
  level_number: number;
  topic: string;
}

export interface SkillTopicRoadmap {
  skill_set_id: number;
  skill_set_name: string;
  levels: SkillTopicLevel[];
}

export const SKILL_TOPICS_ROADMAP: Record<number, SkillTopicLevel[]> = {
  // 1: Data Structures & Algorithms
  1: [
    { level_number: 1, topic: "Time & Space Complexity analysis (Big-O, Omega, Theta notation)" },
    { level_number: 2, topic: "Linear data structures: Arrays, Strings, and basic operations" },
    { level_number: 3, topic: "Singly, Doubly, and Circular Linked Lists implementation" },
    { level_number: 4, topic: "Stack and Queue operations with array and linked list variants" },
    { level_number: 5, topic: "Recursion, Backtracking, and Divide & Conquer fundamentals" },
    { level_number: 6, topic: "Searching, Sorting algorithms (Merge, Quick, Heap sort) & Two Pointers" },
    { level_number: 7, topic: "Binary Trees, BSTs, and traversal techniques (BFS, DFS, Inorder)" },
    { level_number: 8, topic: "Heaps, Priority Queues, Hashing collision resolution & Trie trees" },
    { level_number: 9, topic: "Graph representations, Dijkstra, Bellman-Ford & Minimum Spanning Trees" },
    { level_number: 10, topic: "Dynamic Programming (1D, 2D, DP on trees) and Segment Trees" }
  ],
  // 2: Object-Oriented Programming
  2: [
    { level_number: 1, topic: "Classes, Objects, Constructors, and variable scopes" },
    { level_number: 2, topic: "Encapsulation, Getters/Setters, and Data Hiding" },
    { level_number: 3, topic: "Inheritance types, Super keyword, and Method Overriding" },
    { level_number: 4, topic: "Polymorphism (Compile-time vs Runtime) and dynamic binding" },
    { level_number: 5, topic: "Abstract Classes, Interfaces, and multiple inheritance patterns" },
    { level_number: 6, topic: "Exception handling, custom exceptions, and resource management" },
    { level_number: 7, topic: "SOLID Design Principles with real-world code architecture" },
    { level_number: 8, topic: "Creational & Structural Patterns: Factory, Singleton, Adapter, Decorator" },
    { level_number: 9, topic: "Behavioral Patterns: Observer, Strategy, Command & State machine" },
    { level_number: 10, topic: "Domain-Driven Design (DDD), clean architecture & modular decoupling" }
  ],
  // 3: SQL & Databases
  3: [
    { level_number: 1, topic: "Relational database concepts, tables, primary and foreign keys" },
    { level_number: 2, topic: "Basic CRUD queries, WHERE clauses, and filtering operators" },
    { level_number: 3, topic: "Aggregate functions, GROUP BY, and HAVING clause filters" },
    { level_number: 4, topic: "Joins: INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins" },
    { level_number: 5, topic: "Subqueries, nested queries, and Correlated Subqueries" },
    { level_number: 6, topic: "Database Normalization (1NF, 2NF, 3NF, BCNF) and schema design" },
    { level_number: 7, topic: "Indexes (B-Trees, Hash), Execution Plans & Query optimization" },
    { level_number: 8, topic: "Transactions, ACID properties, and concurrency isolation levels" },
    { level_number: 9, topic: "Views, Stored Procedures, Triggers, and Common Table Expressions (CTEs)" },
    { level_number: 10, topic: "Database sharding, partitioning, replication, and NoSQL trade-offs" }
  ],
  // 4: Cloud Fundamentals (AWS/Azure)
  4: [
    { level_number: 1, topic: "Cloud computing paradigms (IaaS, PaaS, SaaS) and public vs private cloud" },
    { level_number: 2, topic: "Core compute services: Virtual Machines, EC2, and compute sizing" },
    { level_number: 3, topic: "Object and block storage services: AWS S3, Azure Blob, and lifecycle rules" },
    { level_number: 4, topic: "Networking basics: VPCs, Subnets, Security Groups & Route Tables" },
    { level_number: 5, topic: "Identity & Access Management (IAM), roles, policies, and least privilege" },
    { level_number: 6, topic: "Cloud databases: Managed SQL (RDS), DynamoDB, and automated backups" },
    { level_number: 7, topic: "Serverless compute: AWS Lambda, Azure Functions, and event triggers" },
    { level_number: 8, topic: "Load Balancers (ALB), Auto Scaling groups, and high availability design" },
    { level_number: 9, topic: "Cloud monitoring, logging (CloudWatch, CloudTrail), and cost optimization" },
    { level_number: 10, topic: "Multi-region disaster recovery, Infrastructure as Code (Terraform), and CI/CD" }
  ],
  // 5: Operating Systems
  5: [
    { level_number: 1, topic: "OS architecture, Kernel vs User space, and system call interfaces" },
    { level_number: 2, topic: "Process lifecycle, PCB structure, and process creation (fork, exec)" },
    { level_number: 3, topic: "Threads vs Processes, multithreading models, and context switching" },
    { level_number: 4, topic: "CPU scheduling algorithms: FCFS, SJF, Round Robin, and Priority" },
    { level_number: 5, topic: "Inter-Process Communication (IPC): Pipes, Sockets, and Shared Memory" },
    { level_number: 6, topic: "Synchronization primitives: Mutex, Semaphores, and Race conditions" },
    { level_number: 7, topic: "Deadlock detection, prevention, avoidance (Banker's algorithm) & recovery" },
    { level_number: 8, topic: "Memory Management: Paging, Segmentation, and TLB mechanisms" },
    { level_number: 9, topic: "Virtual Memory, Page Replacement algorithms (LRU, FIFO, Optimal)" },
    { level_number: 10, topic: "File Systems (inode, ext4), disk scheduling, and OS virtualization" }
  ],
  // 6: Computer Networks
  6: [
    { level_number: 1, topic: "OSI 7-layer and TCP/IP 4-layer network architectural models" },
    { level_number: 2, topic: "Physical & Data Link layers: MAC addresses, Framing & Error detection" },
    { level_number: 3, topic: "IP addressing: IPv4 vs IPv6, Subnet masks, and CIDR notation" },
    { level_number: 4, topic: "Network layer routing protocols: OSPF, BGP, and ARP resolution" },
    { level_number: 5, topic: "Transport layer: TCP 3-way handshake, connection teardown & UDP" },
    { level_number: 6, topic: "TCP flow control (Sliding Window) and congestion control algorithms" },
    { level_number: 7, topic: "Application protocols: HTTP/1.1 vs HTTP/2 vs HTTP/3, and DNS resolution" },
    { level_number: 8, topic: "Network security: TLS/SSL handshake, HTTPS, Certificates & Firewalls" },
    { level_number: 9, topic: "Sockets programming, NAT traversal, and WebSocket persistent connections" },
    { level_number: 10, topic: "Content Delivery Networks (CDNs), proxies, and edge network caching" }
  ],
  // 7: Aptitude & Logical Reasoning
  7: [
    { level_number: 1, topic: "Basic arithmetic: Percentages, Ratios, Proportions, and Averages" },
    { level_number: 2, topic: "Time, Speed, Distance, and Relative Speed problems" },
    { level_number: 3, topic: "Time & Work, Pipes & Cisterns, and collaborative efficiency" },
    { level_number: 4, topic: "Number systems, Divisibility rules, LCM/HCF, and Remainder theorems" },
    { level_number: 5, topic: "Permutations, Combinations, and probability basics" },
    { level_number: 6, topic: "Logical deductions: Syllogisms, Venn Diagrams, and statement analysis" },
    { level_number: 7, topic: "Seating arrangements (Linear, Circular) and complex conditional puzzles" },
    { level_number: 8, topic: "Blood relations, Direction sense, and Coding-Decoding puzzles" },
    { level_number: 9, topic: "Data Interpretation: Bar graphs, Pie charts, and Tabular analysis" },
    { level_number: 10, topic: "Advanced Critical Reasoning, assumption testing, and problem-solving under pressure" }
  ],
  // 8: Communication & Behavioral
  8: [
    { level_number: 1, topic: "Professional email etiquette, clear formatting, and structured messaging" },
    { level_number: 2, topic: "Active listening techniques and paraphrasing for alignment" },
    { level_number: 3, topic: "Verbal clarity, concise articulation, and avoiding fillers" },
    { level_number: 4, topic: "STAR method formulation for behavioral and situational interview questions" },
    { level_number: 5, topic: "Delivering constructive feedback and receiving peer reviews gracefully" },
    { level_number: 6, topic: "Cross-cultural workplace communication and remote collaboration norms" },
    { level_number: 7, topic: "Technical presentation skills and explaining complex systems to stakeholders" },
    { level_number: 8, topic: "Conflict resolution, empathy, and constructive negotiation strategies" },
    { level_number: 9, topic: "Crisis communication, managing expectations, and incident debriefs" },
    { level_number: 10, topic: "Executive presence, strategic storytelling, and leadership articulation" }
  ],
  // 9: Web Development Basics
  9: [
    { level_number: 1, topic: "Semantic HTML5 tags, document structures, and accessibility standards (a11y)" },
    { level_number: 2, topic: "CSS fundamentals: Box model, Flexbox layouts, and CSS Grid systems" },
    { level_number: 3, topic: "Responsive design, Media queries, and mobile-first CSS architecture" },
    { level_number: 4, topic: "JavaScript basics: ES6+ syntax, scope, closures, and DOM manipulation" },
    { level_number: 5, topic: "Asynchronous JavaScript: Promises, async/await, and Fetch API" },
    { level_number: 6, topic: "Frontend frameworks (React/Vue): Components, Props, and State hooks" },
    { level_number: 7, topic: "RESTful API client consumption, error boundaries, and loading states" },
    { level_number: 8, topic: "Browser storage: LocalStorage, SessionStorage, and Cookie management" },
    { level_number: 9, topic: "Web performance: Lazy loading, code splitting, and Lighthouse metrics" },
    { level_number: 10, topic: "Web security essentials: CORS, XSS prevention, CSRF tokens & CSP headers" }
  ],
  // 10: System Design (Intro)
  10: [
    { level_number: 1, topic: "Client-server architecture, monolithic vs distributed systems overview" },
    { level_number: 2, topic: "Horizontal vs Vertical scaling and stateless application design" },
    { level_number: 3, topic: "Load balancing strategies (Round Robin, Least Connections, IP Hash)" },
    { level_number: 4, topic: "Caching layers: In-memory caches (Redis/Memcached) and cache eviction policies" },
    { level_number: 5, topic: "Database replication (Master-Slave), read replicas, and write scalability" },
    { level_number: 6, topic: "CAP Theorem, Eventual Consistency, and ACID vs BASE comparisons" },
    { level_number: 7, topic: "Message Queues: Asynchronous task queues (RabbitMQ, Kafka, SQS)" },
    { level_number: 8, topic: "Microservices design: API Gateways, Service Discovery, and Circuit Breakers" },
    { level_number: 9, topic: "Designing a URL Shortener or Pastebin service end-to-end" },
    { level_number: 10, topic: "High-scale architectural trade-offs: Rate limiting, telemetry & observability" }
  ],
  // 11: Git & Version Control
  11: [
    { level_number: 1, topic: "Git initialization, tracking files, staging area, and commits" },
    { level_number: 2, topic: "Inspecting history: git status, git log, git diff, and .gitignore rules" },
    { level_number: 3, topic: "Branching strategies: Creating, switching, and deleting feature branches" },
    { level_number: 4, topic: "Remote repositories: git remote, push, fetch, and pulling upstream changes" },
    { level_number: 5, topic: "Merging techniques: Fast-forward vs 3-way merge and conflict resolution" },
    { level_number: 6, topic: "Git Stash for saving uncommitted work and managing dirty working trees" },
    { level_number: 7, topic: "Rebasing: git rebase vs git merge, and interactive rebasing (squash/fixup)" },
    { level_number: 8, topic: "Undoing changes safely: git revert, reset (soft/mixed/hard), and reflog" },
    { level_number: 9, topic: "Git workflow models: Git Flow, Trunk-based development & Pull Requests" },
    { level_number: 10, topic: "Git hooks, CI/CD automation triggers, and signed GPG commits" }
  ],
  // 12: Generative AI Basics
  12: [
    { level_number: 1, topic: "Intro to Artificial Intelligence: ML, Deep Learning, and GenAI distinctions" },
    { level_number: 2, topic: "Transformer architecture overview: Self-attention and tokens" },
    { level_number: 3, topic: "Prompt engineering fundamentals: Zero-shot, Few-shot, and Chain-of-Thought" },
    { level_number: 4, topic: "LLM parameters: Temperature, Top-P, Top-K, and repetition penalties" },
    { level_number: 5, topic: "Embeddings, vector representations, and semantic similarity search" },
    { level_number: 6, topic: "Retrieval-Augmented Generation (RAG) architecture and vector databases" },
    { level_number: 7, topic: "LLM APIs integration in modern applications (REST endpoints & SDKs)" },
    { level_number: 8, topic: "Function calling and structured JSON outputs from AI models" },
    { level_number: 9, topic: "AI safety, hallucinations, red-teaming, and content moderation safeguards" },
    { level_number: 10, topic: "Fine-tuning vs RAG trade-offs, agentic workflows, and future AI directions" }
  ]
};
