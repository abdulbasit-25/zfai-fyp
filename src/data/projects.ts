export type Difficulty = "Intermediate" | "Advanced" | "Expert";

export type Phase = {
  name: string;
  weeks: string;
  startWeek: number;
  endWeek: number;
  description: string;
  goals: string[];
};

export type TechStack = {
  frontend: string[];
  backend: string[];
  aiml: string[];
  infra: string[];
};

export type Project = {
  id: string;
  title: string;
  hook: string;
  domain: Domain;
  difficulty: Difficulty;
  timelineWeeks: number;
  timelineLabel: string;
  teamSize: string;
  teamCount: number;
  featured?: boolean;
  description: string;
  features: string[];
  stack: TechStack;
  roadmap: Phase[];
  data: string;
  challenges: string[];
  trending: string;
  keywords: string[];
};

export const DOMAINS = [
  "AI Agents",
  "DevTools",
  "RAG",
  "Automation",
  "HR-Tech",
  "Insurtech",
  "Trust & Safety",
  "Edge AI",
  "Generative Media",
  "Health-Tech",
  "Cybersecurity",
  "Mobile Dev",
  "Web Dev",
  "Blockchain",
  "IoT",
  "Distributed Systems",
  "Game Dev",
  "AR/VR",
  "Networking",
  "Systems Programming",
  "Enterprise Systems",
] as const;

export type Domain = (typeof DOMAINS)[number];

/** Consistent accent color per domain, referenced everywhere. */
export const DOMAIN_COLOR: Record<Domain, string> = {
  "AI Agents": "var(--domain-agents)",
  DevTools: "var(--domain-devtools)",
  RAG: "var(--domain-rag)",
  Automation: "var(--domain-automation)",
  "HR-Tech": "var(--domain-hrtech)",
  Insurtech: "var(--domain-insurtech)",
  "Trust & Safety": "var(--domain-trust)",
  "Edge AI": "var(--domain-edge)",
  "Generative Media": "var(--domain-genmedia)",
  "Health-Tech": "var(--domain-health)",
  Cybersecurity: "var(--domain-cyber)",
  "Mobile Dev": "var(--domain-mobile)",
  "Web Dev": "var(--domain-webdev)",
  Blockchain: "var(--domain-blockchain)",
  IoT: "var(--domain-iot)",
  "Distributed Systems": "var(--domain-distsys)",
  "Game Dev": "var(--domain-game)",
  "AR/VR": "var(--domain-arvr)",
  Networking: "var(--domain-networking)",
  "Systems Programming": "var(--domain-sysprog)",
  "Enterprise Systems": "var(--domain-enterprise)",
};

const p = (
  name: string,
  weeks: string,
  startWeek: number,
  endWeek: number,
  description: string,
  goals: string[],
): Phase => ({ name, weeks, startWeek, endWeek, description, goals });

export const PROJECTS: Project[] = [
  {
    id: "ai-co-founder",
    title: "AI Co-Founder",
    hook: "A multi-agent partner that takes a raw startup idea to a validated, costed, buildable plan.",
    domain: "AI Agents",
    difficulty: "Expert",
    timelineWeeks: 24,
    timelineLabel: "24 weeks",
    teamSize: "3–4 students",
    teamCount: 4,
    featured: true,
    description:
      "A workspace where a founder describes an idea in plain language and a crew of specialised agents — market analyst, product strategist, technical architect, finance modeller and critic — debate, research and converge on a concrete venture plan. The system persists a living 'company memory' so every later question is answered in the context of earlier decisions, and every claim is traced back to a retrieved source.",
    features: [
      "Multi-agent debate loop with an adversarial critic agent that must approve any final recommendation",
      "Live market and competitor research over web search with per-claim citation trails",
      "Auto-generated lean canvas, MVP scope, and 12-month financial model with editable assumptions",
      "Technical architecture proposal with build-vs-buy tradeoffs and a cost estimate per component",
      "Persistent company memory: decisions, pivots and rejected options stay in context across sessions",
      "Investor-ready export — deck outline, one-pager and a risk register — as PDF or Markdown",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "TanStack Router", "Recharts"],
      backend: ["FastAPI", "PostgreSQL", "Redis", "Celery", "WebSockets"],
      aiml: ["LangGraph", "OpenAI / Claude APIs", "pgvector", "Tavily Search API", "Instructor"],
      infra: ["Docker", "Fly.io", "Langfuse", "GitHub Actions", "Sentry"],
    },
    roadmap: [
      p(
        "Discovery & scoping",
        "Weeks 1–3",
        1,
        3,
        "Interview founders, define the agent roles and the exact artefacts the system must output.",
        [
          "Literature review on multi-agent systems",
          "5 founder interviews",
          "Agent role specification",
          "Success metrics defined",
        ],
      ),
      p(
        "Architecture & spike",
        "Weeks 4–6",
        4,
        6,
        "Prove the orchestration loop works end to end on one narrow idea.",
        [
          "LangGraph orchestration spike",
          "Schema for company memory",
          "Cost/latency budget per run",
        ],
      ),
      p(
        "Core agents",
        "Weeks 7–12",
        7,
        12,
        "Build market, product, technical and finance agents with structured outputs.",
        [
          "Structured output schemas",
          "Research agent + citations",
          "Finance model generator",
          "Agent unit evals",
        ],
      ),
      p(
        "Critic loop & memory",
        "Weeks 13–16",
        13,
        16,
        "Add the adversarial critic and persistent vector-backed memory.",
        ["Critic agent + rubric", "pgvector memory store", "Cross-session recall tests"],
      ),
      p(
        "Frontend workspace",
        "Weeks 17–20",
        17,
        20,
        "Streaming UI, editable assumptions, artefact exports.",
        ["Streaming agent transcript UI", "Editable canvas + model", "PDF / Markdown export"],
      ),
      p(
        "Evaluation & write-up",
        "Weeks 21–24",
        21,
        24,
        "Human evaluation against consultant baselines and the dissertation.",
        ["Blind eval with 10 judges", "Ablation of critic agent", "Dissertation + demo video"],
      ),
    ],
    data: "No single public dataset. Use Crunchbase Open Data and YC company directories for grounding, SEC/Companies House filings for financial benchmarks, and hand-build a gold-set of 30 startup ideas with expert-written plans for evaluation.",
    challenges: [
      "Agents confidently hallucinating market sizes — every number needs a traced source",
      "Cost and latency: a full run can hit dozens of LLM calls, needs caching and budget caps",
      "Evaluating 'plan quality' objectively when there is no ground truth",
      "Preventing the debate loop from converging on bland consensus",
      "Long-context memory drift over multi-session use",
    ],
    trending:
      "Agent orchestration moved from demo to production in 2025–26, and structured tool-calling plus cheap long-context models finally make multi-agent debate affordable. Investors and accelerators are actively piloting AI-assisted diligence, so the problem is live rather than hypothetical.",
    keywords: ["agents", "langgraph", "startup", "multi-agent", "rag", "critic"],
  },
  {
    id: "pr-review-copilot",
    title: "Repo-Aware PR Review Copilot",
    hook: "A reviewer that reads your whole repo's conventions, not just the diff.",
    domain: "DevTools",
    difficulty: "Advanced",
    timelineWeeks: 20,
    timelineLabel: "20 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A GitHub App that indexes an entire repository — call graph, tests, past reviews and style conventions — and posts review comments that reference the project's own precedents instead of generic lint advice. It learns which comments maintainers accept and suppresses categories they consistently dismiss.",
    features: [
      "Static call-graph and symbol index built with tree-sitter, refreshed incrementally per push",
      "Diff-scoped retrieval that pulls in callers, callees and related tests before reviewing",
      "Convention mining from merged PR history to learn repo-specific style rules",
      "Feedback loop: accepted vs. dismissed comments retrain the suppression classifier",
      "Severity-ranked inline comments with a single summary comment per PR",
      "Self-hostable via GitHub App with per-repo configuration file",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      backend: ["Node.js", "Hono", "PostgreSQL", "BullMQ", "Octokit"],
      aiml: ["tree-sitter", "Claude / GPT code models", "Qdrant", "CodeBERT embeddings"],
      infra: ["Docker", "Railway", "GitHub Actions", "OpenTelemetry"],
    },
    roadmap: [
      p(
        "Problem framing",
        "Weeks 1–2",
        1,
        2,
        "Survey maintainers on review pain and pick target languages.",
        ["Maintainer survey", "Language scope decision", "Baseline tools compared"],
      ),
      p(
        "Repo indexing",
        "Weeks 3–7",
        3,
        7,
        "Build the tree-sitter index and incremental update pipeline.",
        ["tree-sitter parsers wired", "Symbol + call graph store", "Incremental reindex on push"],
      ),
      p("Review engine", "Weeks 8–13", 8, 13, "Diff-scoped retrieval and comment generation.", [
        "Context assembly for a diff",
        "Comment generation prompts",
        "Severity ranking",
      ]),
      p("Feedback learning", "Weeks 14–16", 14, 16, "Learn from accepted/dismissed comments.", [
        "Reaction capture webhook",
        "Suppression classifier",
        "Per-repo config",
      ]),
      p(
        "Evaluation",
        "Weeks 17–20",
        17,
        20,
        "Measure precision against real merged PRs and write up.",
        ["Benchmark on 200 PRs", "Precision/recall report", "Dissertation"],
      ),
    ],
    data: "Mine public GitHub PR history via the GitHub REST/GraphQL API; use the CodeSearchNet corpus for embedding warm-up and the Defects4J bug set to test whether real defects are caught.",
    challenges: [
      "False positives destroy trust faster than missed bugs earn it",
      "Indexing large monorepos within CI time and memory budgets",
      "Multi-language support explodes parser and prompt maintenance",
      "Deciding what counts as a 'correct' review comment for evaluation",
    ],
    trending:
      "Code review is the highest-friction step left in most teams, and 2026-era long-context code models can finally hold enough repository context to say something specific rather than generic.",
    keywords: ["github", "code review", "tree-sitter", "static analysis", "devtools"],
  },
  {
    id: "grounded-rag-audit",
    title: "Grounded RAG with Answer Auditing",
    hook: "A retrieval system that scores and refuses its own ungrounded answers.",
    domain: "RAG",
    difficulty: "Advanced",
    timelineWeeks: 18,
    timelineLabel: "18 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A document QA platform for regulated document sets (policies, standards, course handbooks) where every sentence of an answer is attributed to a span in a source document, and an auditor model scores groundedness before the answer is shown. Below a confidence threshold the system refuses and shows the closest supporting passages instead.",
    features: [
      "Hybrid BM25 + dense retrieval with a cross-encoder reranker",
      "Sentence-level attribution: each output sentence links to a highlighted source span",
      "Groundedness auditor that scores and can block an answer before display",
      "Configurable refusal threshold with a 'here's what I did find' fallback view",
      "Evaluation dashboard tracking faithfulness, recall@k and refusal rate over time",
      "Document ingestion for PDF, DOCX and HTML with layout-aware chunking",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "PDF.js"],
      backend: ["FastAPI", "PostgreSQL", "pgvector", "Elasticsearch"],
      aiml: ["sentence-transformers", "bge-reranker", "Ragas", "unstructured.io"],
      infra: ["Docker Compose", "MLflow", "GitHub Actions"],
    },
    roadmap: [
      p(
        "Corpus & baseline",
        "Weeks 1–3",
        1,
        3,
        "Pick the corpus and stand up a naive RAG baseline to beat.",
        ["Corpus selected + licensed", "Naive RAG baseline", "Eval harness with Ragas"],
      ),
      p("Retrieval quality", "Weeks 4–8", 4, 8, "Hybrid search, chunking strategy and reranking.", [
        "Layout-aware chunker",
        "Hybrid BM25 + dense",
        "Cross-encoder rerank",
      ]),
      p(
        "Attribution layer",
        "Weeks 9–12",
        9,
        12,
        "Sentence-level source linking and highlighting.",
        ["Span alignment algorithm", "PDF highlight viewer", "Attribution accuracy test"],
      ),
      p("Auditor & refusal", "Weeks 13–15", 13, 15, "Groundedness scoring and threshold tuning.", [
        "Auditor model + rubric",
        "Threshold sweep",
        "Refusal UX",
      ]),
      p("Evaluation & write-up", "Weeks 16–18", 16, 18, "Full benchmark run and dissertation.", [
        "Faithfulness benchmark",
        "Ablations",
        "Dissertation",
      ]),
    ],
    data: "Use public regulated corpora: EU AI Act and GDPR texts, NHS clinical guidelines, university handbooks. Benchmark on Natural Questions, HotpotQA and the RAGTruth hallucination dataset.",
    challenges: [
      "Chunking decisions dominate retrieval quality more than model choice",
      "Sentence-to-span alignment is fiddly when the model paraphrases",
      "Calibrating refusal so the system is cautious but still useful",
      "Auditor and generator sharing the same blind spots",
    ],
    trending:
      "Hallucination liability is now a compliance problem, not a UX annoyance. Regulated sectors will only adopt RAG that can show its work and decline to answer.",
    keywords: ["rag", "retrieval", "citations", "hallucination", "evaluation"],
  },
  {
    id: "browser-task-agent",
    title: "Self-Healing Browser Task Agent",
    hook: "Records a workflow once, then keeps it running when the UI changes underneath it.",
    domain: "Automation",
    difficulty: "Advanced",
    timelineWeeks: 20,
    timelineLabel: "20 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A browser automation tool where users demonstrate a task once and the system generates a durable script. When a selector breaks, a vision-plus-DOM agent re-locates the element by intent ('the submit button under the payment form') and rewrites the step, logging every self-heal for review.",
    features: [
      "Record-by-demonstration capture of clicks, inputs and navigation",
      "Intent-based element descriptors instead of brittle CSS selectors",
      "Self-healing repair agent combining screenshot vision with accessibility tree",
      "Dry-run sandbox with diffed before/after screenshots for every repair",
      "Scheduled runs with failure alerts and a full audit log",
      "Human-in-the-loop approval gate for destructive actions",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Chrome Extension MV3"],
      backend: ["Node.js", "Playwright", "PostgreSQL", "Redis"],
      aiml: ["GPT-4o / Claude vision", "DOM + a11y tree embeddings", "set-of-mark prompting"],
      infra: ["Docker", "Browserless", "Grafana", "Fly.io"],
    },
    roadmap: [
      p("Scoping", "Weeks 1–2", 1, 2, "Choose target workflows and define what 'healed' means.", [
        "Workflow taxonomy",
        "Failure mode catalogue",
      ]),
      p("Recorder", "Weeks 3–7", 3, 7, "Extension that captures demonstrations into a step IR.", [
        "MV3 extension",
        "Step intermediate representation",
        "Replay engine",
      ]),
      p("Healing agent", "Weeks 8–13", 8, 13, "Vision + a11y relocation of broken steps.", [
        "Set-of-mark screenshots",
        "Relocation prompts",
        "Repair confidence score",
      ]),
      p("Safety & scheduling", "Weeks 14–16", 14, 16, "Approval gates, dry runs and cron.", [
        "Destructive-action detector",
        "Dry-run diffs",
        "Scheduler",
      ]),
      p("Evaluation", "Weeks 17–20", 17, 20, "Mutation-test real sites and write up.", [
        "UI mutation test suite",
        "Heal success rate report",
        "Dissertation",
      ]),
    ],
    data: "Build a mutation harness over cloned open-source web apps to synthesise UI changes; benchmark against WebArena and Mind2Web trajectories.",
    challenges: [
      "Distinguishing a moved button from a genuinely removed feature",
      "Anti-bot defences and rate limits on real sites",
      "Vision model latency making runs slow and expensive",
      "Safety: an agent that self-heals into the wrong button can cause real damage",
    ],
    trending:
      "Computer-use models shipped broadly in 2025, but production automation still breaks on UI drift — durability, not capability, is the open problem.",
    keywords: ["playwright", "automation", "agent", "browser", "vision"],
  },
  {
    id: "bias-aware-screening",
    title: "Bias-Aware Candidate Screening",
    hook: "Skills-based CV screening with a fairness audit built into the pipeline.",
    domain: "HR-Tech",
    difficulty: "Intermediate",
    timelineWeeks: 16,
    timelineLabel: "16 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A screening tool that extracts a structured skills profile from CVs, matches it against a role's requirement graph, and continuously measures disparate impact across protected attributes. Recruiters see an explanation for every ranking and a live fairness dashboard rather than an opaque score.",
    features: [
      "Structured CV parsing into a skills/experience graph with normalisation to ESCO taxonomy",
      "Requirement-to-evidence matching with per-requirement justification snippets",
      "Blind mode that strips name, gender, age and institution signals before scoring",
      "Continuous disparate-impact monitoring with four-fifths rule alerts",
      "Counterfactual test harness: flip an attribute, see if the ranking moves",
      "Audit log and exportable fairness report for compliance",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
      backend: ["FastAPI", "PostgreSQL", "Celery"],
      aiml: ["spaCy", "sentence-transformers", "Fairlearn", "AIF360", "SHAP"],
      infra: ["Docker", "MLflow", "GitHub Actions"],
    },
    roadmap: [
      p(
        "Ethics & framing",
        "Weeks 1–3",
        1,
        3,
        "Ethics approval, fairness metric selection, legal review.",
        ["Ethics application", "Metric selection rationale", "Data handling plan"],
      ),
      p("Parsing pipeline", "Weeks 4–7", 4, 7, "CV extraction and skill normalisation.", [
        "Resume parser",
        "ESCO skill mapping",
        "Parsing accuracy eval",
      ]),
      p("Matching engine", "Weeks 8–11", 8, 11, "Requirement matching with explanations.", [
        "Requirement graph",
        "Evidence snippets",
        "Ranking model",
      ]),
      p("Fairness layer", "Weeks 12–14", 12, 14, "Bias measurement and counterfactual tests.", [
        "Disparate impact dashboard",
        "Counterfactual harness",
        "Blind mode",
      ]),
      p("Study & write-up", "Weeks 15–16", 15, 16, "Recruiter study and dissertation.", [
        "Recruiter usability study",
        "Dissertation",
      ]),
    ],
    data: "Use synthetic and public CV corpora (Kaggle resume datasets, ESCO occupation taxonomy). Never use real applicant data without ethics approval; generate counterfactual pairs programmatically.",
    challenges: [
      "Proxy variables leak protected attributes even in blind mode",
      "Fairness metrics conflict — you cannot satisfy all of them at once",
      "Ethics approval timelines can eat weeks of the schedule",
      "Explanations that sound convincing but do not reflect the actual ranking",
    ],
    trending:
      "The EU AI Act classes employment screening as high-risk, with transparency and bias-testing duties phasing in — fairness tooling is now a legal requirement rather than a nice-to-have.",
    keywords: ["fairness", "hr", "nlp", "resume", "ai act", "bias"],
  },
  {
    id: "claims-triage",
    title: "Multimodal Claims Triage",
    hook: "Photos plus policy text, triaged into a settlement recommendation with fraud flags.",
    domain: "Insurtech",
    difficulty: "Advanced",
    timelineWeeks: 20,
    timelineLabel: "20 weeks",
    teamSize: "3 students",
    teamCount: 3,
    description:
      "An insurance claims pipeline that ingests damage photos, an incident description and the policy document, then produces a severity estimate, a coverage decision grounded in policy clauses, and a fraud risk score with the specific signals that triggered it. Low-risk small claims can be auto-approved; everything else is routed to a human with a prepared brief.",
    features: [
      "Damage severity estimation from photos with a vision model plus cost lookup",
      "Policy clause retrieval so coverage decisions cite the exact wording",
      "Image forensics: EXIF consistency, reverse-image duplicate detection, splice heuristics",
      "Fraud risk scoring with per-signal contribution breakdown",
      "Auto-approve / route / escalate decision engine with configurable thresholds",
      "Adjuster console with the full evidence pack in one screen",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "react-dropzone"],
      backend: ["FastAPI", "PostgreSQL", "MinIO / S3", "Celery"],
      aiml: ["CLIP", "YOLO / Detectron2", "vision LLM", "XGBoost", "pgvector"],
      infra: ["Docker", "MLflow", "Grafana", "AWS"],
    },
    roadmap: [
      p(
        "Domain study",
        "Weeks 1–3",
        1,
        3,
        "Understand the claims lifecycle and fraud typologies.",
        ["Adjuster interviews", "Fraud typology review", "Decision policy draft"],
      ),
      p("Vision pipeline", "Weeks 4–9", 4, 9, "Damage detection and severity estimation.", [
        "Damage detector trained",
        "Severity calibration",
        "Cost lookup table",
      ]),
      p("Policy grounding", "Weeks 10–13", 10, 13, "Clause retrieval and coverage reasoning.", [
        "Policy ingestion",
        "Clause-cited decisions",
        "Coverage eval set",
      ]),
      p("Fraud signals", "Weeks 14–17", 14, 17, "Forensics and risk scoring.", [
        "EXIF + duplicate checks",
        "Risk model",
        "Signal explanations",
      ]),
      p("Console & write-up", "Weeks 18–20", 18, 20, "Adjuster UI and dissertation.", [
        "Adjuster console",
        "End-to-end eval",
        "Dissertation",
      ]),
    ],
    data: "CarDD and Kaggle vehicle damage datasets for severity; public insurance fraud datasets for the risk model; synthesise policy wordings from publicly available IPID documents.",
    challenges: [
      "Severe class imbalance — real fraud is rare and labels are noisy",
      "Photo quality varies wildly; models overfit to clean studio images",
      "Regulatory requirement to explain any automated adverse decision",
      "Cost estimates need region-specific pricing data that is hard to obtain",
    ],
    trending:
      "Insurers are under margin pressure and multimodal models are finally accurate enough for first-notice-of-loss triage, which is the single biggest cost centre in claims handling.",
    keywords: ["vision", "insurance", "fraud", "multimodal", "claims"],
  },
  {
    id: "coordinated-abuse-detector",
    title: "Coordinated Abuse Detection",
    hook: "Finds networks of accounts acting together, not just individual bad posts.",
    domain: "Trust & Safety",
    difficulty: "Advanced",
    timelineWeeks: 18,
    timelineLabel: "18 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A platform-integrity system that models accounts, content and timing as a graph and surfaces coordinated inauthentic behaviour: brigading, review farms and synchronised amplification. Content classifiers feed the graph rather than deciding alone, and moderators get a narrative explanation of why a cluster looks coordinated.",
    features: [
      "Heterogeneous graph of accounts, posts, devices and timing signals",
      "Community detection plus a GNN scorer for coordination likelihood",
      "Content classifier for abuse categories used as node features, not verdicts",
      "Cluster explanation generator: what these accounts share and when they acted",
      "Moderator queue with bulk actions and appeal tracking",
      "Drift monitoring so tactics changing over time raise an alert",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Cytoscape.js"],
      backend: ["FastAPI", "Neo4j", "PostgreSQL", "Kafka"],
      aiml: ["PyTorch Geometric", "DeBERTa classifier", "Louvain / Leiden", "scikit-learn"],
      infra: ["Docker", "Kubernetes", "Grafana", "GitHub Actions"],
    },
    roadmap: [
      p(
        "Threat modelling",
        "Weeks 1–3",
        1,
        3,
        "Catalogue coordination tactics and define labels.",
        ["Tactic taxonomy", "Labelling guide", "Ethics review"],
      ),
      p("Data & graph", "Weeks 4–8", 4, 8, "Ingest and build the heterogeneous graph.", [
        "Ingestion pipeline",
        "Graph schema in Neo4j",
        "Timing features",
      ]),
      p("Detection models", "Weeks 9–13", 9, 13, "Community detection and GNN scoring.", [
        "Baseline clustering",
        "GNN trained",
        "Precision@k eval",
      ]),
      p("Moderator tooling", "Weeks 14–16", 14, 16, "Explanations and review queue.", [
        "Cluster explanations",
        "Review queue",
        "Appeal flow",
      ]),
      p("Evaluation", "Weeks 17–18", 17, 18, "Red-team the detector and write up.", [
        "Adversarial red team",
        "Dissertation",
      ]),
    ],
    data: "Twitter/X information-operations archives, Reddit Pushshift dumps, and the SNAP graph collections. Augment with a simulator that generates synthetic coordinated campaigns for controlled evaluation.",
    challenges: [
      "Ground truth for coordination is scarce and contested",
      "Adversaries adapt as soon as a signal is used",
      "False positives on legitimate fan communities and activism",
      "Graph scale: billions of edges will not fit a naive pipeline",
    ],
    trending:
      "Generative models made large-scale inauthentic content cheap, so integrity teams have shifted from judging single posts to detecting coordination patterns.",
    keywords: ["graph", "gnn", "moderation", "trust and safety", "networks"],
  },
  {
    id: "on-device-vision-guard",
    title: "On-Device Vision Guard",
    hook: "Real-time safety monitoring on a €60 board with no video ever leaving the device.",
    domain: "Edge AI",
    difficulty: "Advanced",
    timelineWeeks: 18,
    timelineLabel: "18 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A privacy-preserving edge vision system for sites like workshops or care homes: it detects hazard events (falls, PPE violations, restricted-zone entry) entirely on-device and transmits only structured events, never frames. The project's contribution is the quantisation and distillation work needed to hit real-time frame rates on constrained hardware.",
    features: [
      "Quantised INT8 detection and pose models running at 15+ FPS on a Raspberry Pi 5 / Jetson Orin Nano",
      "Event-only telemetry — frames never leave the device, optional on-device blurred clip buffer",
      "Knowledge distillation pipeline from a large teacher model to the deployed student",
      "Zone editor for defining restricted regions and per-zone rules",
      "Offline-first operation with store-and-forward event sync",
      "Power and thermal benchmarking harness reported alongside accuracy",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "WebRTC preview"],
      backend: ["FastAPI", "SQLite (edge)", "MQTT", "PostgreSQL (cloud)"],
      aiml: ["YOLO11n", "MoveNet", "ONNX Runtime", "TensorRT", "PyTorch quantisation"],
      infra: ["Raspberry Pi 5 / Jetson Orin Nano", "Docker", "Balena", "Prometheus"],
    },
    roadmap: [
      p("Hardware & baseline", "Weeks 1–3", 1, 3, "Procure boards, benchmark unoptimised models.", [
        "Hardware procured",
        "FP32 baseline FPS",
        "Accuracy baseline",
      ]),
      p("Model compression", "Weeks 4–9", 4, 9, "Quantisation, pruning and distillation.", [
        "INT8 quantisation",
        "Distilled student model",
        "Accuracy/FPS tradeoff curve",
      ]),
      p("Event logic", "Weeks 10–13", 10, 13, "Hazard rules, zones and temporal smoothing.", [
        "Fall detection logic",
        "Zone editor",
        "False alarm suppression",
      ]),
      p("Fleet & privacy", "Weeks 14–16", 14, 16, "Sync, OTA updates and privacy guarantees.", [
        "MQTT event sync",
        "OTA update path",
        "Privacy threat model",
      ]),
      p("Benchmarks & write-up", "Weeks 17–18", 17, 18, "Power/thermal study and dissertation.", [
        "Power benchmark",
        "Dissertation",
      ]),
    ],
    data: "COCO and CrowdHuman for detection, UP-Fall and Le2i fall datasets for events, plus a self-recorded consented site dataset for domain adaptation.",
    challenges: [
      "Accuracy collapse after aggressive quantisation on small objects",
      "Thermal throttling silently halving frame rate during long runs",
      "Fall detection false alarms from sitting or bending",
      "Consent and GDPR obligations even when frames stay local",
    ],
    trending:
      "Cheap NPUs and mature INT8 toolchains made edge inference practical exactly as privacy regulation made cloud video ingestion expensive and risky.",
    keywords: ["edge", "quantisation", "yolo", "jetson", "privacy", "vision"],
  },
  {
    id: "provenance-media-studio",
    title: "Provenance-First Generative Studio",
    hook: "Generate assets that carry signed, verifiable provenance from the first pixel.",
    domain: "Generative Media",
    difficulty: "Intermediate",
    timelineWeeks: 16,
    timelineLabel: "16 weeks",
    teamSize: "2 students",
    teamCount: 2,
    description:
      "A creative tool for image and short-video generation where every asset is embedded with C2PA content credentials and an invisible watermark, and every edit appends to a signed provenance chain. A companion verifier page lets anyone check an asset's history and detect tampering.",
    features: [
      "Prompt-to-image and prompt-to-short-clip generation with a consistent style-lock feature",
      "C2PA manifest signing on export, including model, prompt and edit history",
      "Invisible watermarking with robustness testing against crops, compression and resizing",
      "Public verifier that reads credentials and reports what has changed",
      "Non-destructive edit chain — each operation appends a signed assertion",
      "Brand kit: locked palettes, fonts and reference images for consistent output",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Canvas API", "Framer Motion"],
      backend: ["FastAPI", "PostgreSQL", "S3-compatible storage", "Redis queue"],
      aiml: [
        "Stable Diffusion / SDXL",
        "ControlNet",
        "IP-Adapter",
        "invisible-watermark",
        "c2pa-python",
      ],
      infra: ["Docker", "Modal / RunPod GPU", "Cloudflare R2"],
    },
    roadmap: [
      p(
        "Standards study",
        "Weeks 1–2",
        1,
        2,
        "Learn the C2PA spec and pick the watermarking scheme.",
        ["C2PA spec notes", "Watermark scheme chosen"],
      ),
      p("Generation core", "Weeks 3–7", 3, 7, "Generation pipeline with style lock.", [
        "SDXL pipeline",
        "Style-lock via IP-Adapter",
        "Queue + GPU workers",
      ]),
      p("Provenance layer", "Weeks 8–11", 8, 11, "Signing, manifests and edit chain.", [
        "Manifest signing",
        "Edit assertions",
        "Key management",
      ]),
      p("Verifier & robustness", "Weeks 12–14", 12, 14, "Public verifier and attack testing.", [
        "Verifier page",
        "Crop/compress attack suite",
        "Robustness report",
      ]),
      p("Polish & write-up", "Weeks 15–16", 15, 16, "UX pass and dissertation.", [
        "Brand kit UX",
        "Dissertation",
      ]),
    ],
    data: "LAION-derived public prompt sets for generation testing, plus a self-built tamper corpus (crops, re-encodes, screenshots) to evaluate watermark survival.",
    challenges: [
      "Watermarks that survive screenshots without visibly degrading the image",
      "Key management and trust anchoring for signatures in a student project",
      "GPU cost control for video generation",
      "Provenance is only useful if verifiers exist — adoption is part of the problem",
    ],
    trending:
      "Content credentials moved from proposal to shipped standard across major cameras and platforms in 2025–26, and synthetic-media labelling duties in the EU AI Act arrive on a fixed timetable.",
    keywords: ["c2pa", "watermark", "diffusion", "provenance", "generative"],
  },
  {
    id: "clinical-summary-safety",
    title: "Clinical Handover Summariser with Safety Net",
    hook: "Summarises clinical notes and flags anything it might have dropped.",
    domain: "Health-Tech",
    difficulty: "Expert",
    timelineWeeks: 22,
    timelineLabel: "22 weeks",
    teamSize: "3 students",
    teamCount: 3,
    description:
      "A shift-handover tool that condenses a patient's recent notes into a structured SBAR summary, while a separate omission detector checks the summary against the source for dropped red-flag facts — allergies, deteriorating observations, pending results. Clinicians see the summary with any omissions surfaced rather than hidden.",
    features: [
      "Structured SBAR summary generation from unstructured clinical notes",
      "Omission detector that compares extracted clinical entities in source vs. summary",
      "Red-flag rules for allergies, sepsis criteria, medication interactions and pending results",
      "Full de-identification pipeline before any model call, with re-identification risk report",
      "Clinician feedback capture on every summary for continuous evaluation",
      "Provenance view linking each summary line back to its source note",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      backend: ["FastAPI", "PostgreSQL", "FHIR API client", "Celery"],
      aiml: [
        "Med-PaLM-class or open clinical LLM",
        "scispaCy",
        "Philter de-identification",
        "MedCAT",
      ],
      infra: ["Docker", "On-prem / private VPC", "MLflow", "Audit logging"],
    },
    roadmap: [
      p(
        "Governance",
        "Weeks 1–4",
        1,
        4,
        "Ethics, information governance and clinical supervisor onboarding.",
        ["Ethics approval", "IG review", "Clinical advisor secured"],
      ),
      p("De-identification", "Weeks 5–8", 5, 8, "Robust PHI removal and risk assessment.", [
        "PHI pipeline",
        "Recall on i2b2 set",
        "Re-id risk report",
      ]),
      p("Summarisation", "Weeks 9–14", 9, 14, "SBAR generation and provenance.", [
        "SBAR schema",
        "Summary generator",
        "Line-level provenance",
      ]),
      p("Omission detector", "Weeks 15–18", 15, 18, "Entity comparison and red-flag rules.", [
        "Entity extraction",
        "Omission scoring",
        "Red-flag rule engine",
      ]),
      p("Clinical evaluation", "Weeks 19–22", 19, 22, "Clinician review study and dissertation.", [
        "Blinded clinician review",
        "Safety incident analysis",
        "Dissertation",
      ]),
    ],
    data: "MIMIC-IV-Note and n2c2/i2b2 de-identification challenge corpora under their data use agreements. Never touch live patient data without formal approval; synthesise handover scenarios with Synthea.",
    challenges: [
      "Omission of a single red-flag fact is a patient-safety event, so recall must be near-perfect",
      "Data access agreements (MIMIC credentialing) take weeks",
      "Clinical language is dense with abbreviations that vary by ward",
      "Evaluating safety requires clinician time, which is scarce",
    ],
    trending:
      "Ambient clinical documentation is the fastest-adopted health AI category, but regulators and clinicians are now focused on omission and safety-netting rather than fluency.",
    keywords: ["clinical", "nlp", "summarisation", "safety", "mimic", "fhir"],
  },
  {
    id: "llm-appsec-redteam",
    title: "LLM App Security Red-Team Harness",
    hook: "Continuously attacks your own AI features and regression-tests the fixes.",
    domain: "Cybersecurity",
    difficulty: "Advanced",
    timelineWeeks: 18,
    timelineLabel: "18 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A CI-integrated harness that probes an LLM application for prompt injection, tool misuse, data exfiltration and jailbreaks using an evolving attack library plus a generator that mutates successful attacks. Every confirmed break becomes a permanent regression test, so fixes are proven and stay fixed.",
    features: [
      "Attack library covering direct and indirect prompt injection, tool abuse and exfiltration",
      "Evolutionary attack generator that mutates successful payloads into variants",
      "Automatic judge that verifies whether a policy was actually violated",
      "Confirmed breaks converted into permanent regression tests in CI",
      "Severity scoring mapped to the OWASP LLM Top 10",
      "Report export with reproduction steps and suggested mitigations",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Monaco Editor"],
      backend: ["FastAPI", "PostgreSQL", "Redis", "OpenAPI target adapters"],
      aiml: ["Attacker LLM", "Judge LLM", "garak", "PyRIT", "genetic mutation loop"],
      infra: ["Docker", "GitHub Actions", "Grafana", "Sandboxed runners"],
    },
    roadmap: [
      p(
        "Threat model",
        "Weeks 1–3",
        1,
        3,
        "Map the OWASP LLM Top 10 to concrete testable behaviours.",
        ["Threat model doc", "Policy definitions", "Target adapter spec"],
      ),
      p("Attack library", "Weeks 4–8", 4, 8, "Curate and implement seed attacks.", [
        "Seed attack corpus",
        "Adapter for a demo app",
        "Baseline break rate",
      ]),
      p("Mutation engine", "Weeks 9–12", 9, 12, "Evolve attacks automatically.", [
        "Genetic mutation loop",
        "Diversity metric",
        "Budgeted search",
      ]),
      p("Judge & regression", "Weeks 13–15", 13, 15, "Verification and CI integration.", [
        "Judge calibration",
        "Regression test generation",
        "GitHub Action",
      ]),
      p(
        "Evaluation",
        "Weeks 16–18",
        16,
        18,
        "Test against real open-source AI apps and write up.",
        ["Case studies on 3 apps", "Responsible disclosure", "Dissertation"],
      ),
    ],
    data: "Public jailbreak collections (JailbreakBench, AdvBench), garak probe sets, and self-authored indirect-injection corpora embedded in documents and web pages.",
    challenges: [
      "Judge models disagreeing on whether a policy was actually broken",
      "Attack search space is enormous — needs a smart budget, not brute force",
      "Responsible disclosure obligations when you break someone else's app",
      "Defences that overfit to your own attack library and fail on novel ones",
    ],
    trending:
      "Agentic apps with tool access turned prompt injection into a real exfiltration path, and the OWASP LLM Top 10 plus AI Act security duties made continuous red-teaming an expected control.",
    keywords: ["security", "prompt injection", "red team", "owasp", "jailbreak"],
  },

  // ---------------------------------------------------------------------
  // Non-AI additions: core CS / SE, mobile, systems, networking, games,
  // blockchain, IoT and AR/VR final-year-project-level ideas.
  // ---------------------------------------------------------------------
  {
    id: "campus-marketplace-app",
    title: "Campus Marketplace App",
    hook: "A cross-platform buy/sell/rent app built for a single university campus, with in-app chat and escrow-style payment holds.",
    domain: "Mobile Dev",
    difficulty: "Intermediate",
    timelineWeeks: 16,
    timelineLabel: "16 weeks",
    teamSize: "2 students",
    teamCount: 2,
    description:
      "A native-feeling mobile marketplace scoped to one university: students list textbooks, furniture, hostel sublets and services, chat in real time, and arrange safe on-campus meetups. Listings are geofenced to campus buildings and a lightweight reputation system discourages no-shows and scams.",
    features: [
      "Listing creation with camera capture, category tagging and price suggestion from similar past listings",
      "Real-time chat per listing with read receipts and image sharing",
      "Campus-building geofencing so listings and meetup points map to real locations",
      "Simple escrow-style flow: buyer marks 'paid', seller marks 'handed over', both confirm before the listing closes",
      "Push notifications for new messages, price drops on saved items, and nearby listings",
      "Lightweight reputation score from completed-transaction ratings",
    ],
    stack: {
      frontend: ["Flutter", "Dart", "Riverpod", "Google Maps SDK"],
      backend: ["Node.js", "Express", "PostgreSQL", "Socket.IO"],
      aiml: [],
      infra: ["Firebase Auth", "Firebase Cloud Messaging", "Docker", "Railway"],
    },
    roadmap: [
      p("Requirements & UX", "Weeks 1–2", 1, 2, "Survey students, wireframe core flows.", [
        "Student needs survey (50+ responses)",
        "Wireframes for listing, chat, meetup",
        "Information architecture",
      ]),
      p("Core app shell", "Weeks 3–6", 3, 6, "Auth, navigation and listing CRUD.", [
        "Campus email auth",
        "Listing create/edit/delete",
        "Search + filter",
      ]),
      p("Chat & notifications", "Weeks 7–10", 7, 10, "Real-time messaging and push alerts.", [
        "Socket.IO chat",
        "Image attachments",
        "Push notification pipeline",
      ]),
      p("Maps & trust", "Weeks 11–13", 11, 13, "Geofencing and the reputation/escrow flow.", [
        "Building geofences",
        "Meetup point picker",
        "Escrow confirm flow + ratings",
      ]),
      p("Testing & launch", "Weeks 14–16", 14, 16, "Beta on campus and dissertation.", [
        "Closed beta with 30+ users",
        "Crash/perf monitoring",
        "Dissertation",
      ]),
    ],
    data: "No external dataset needed — seed with synthetic listings for demoing, then a closed beta on one campus generates real usage data for the evaluation chapter.",
    challenges: [
      "Bootstrapping enough real listings/users for a meaningful beta",
      "Preventing spam and duplicate/scam listings without heavy moderation staff",
      "Real-time chat reliability on flaky campus wifi",
      "Getting Google Maps/geofencing accuracy right inside multi-storey buildings",
    ],
    trending:
      "Campus-scoped marketplaces consistently outperform generic classifieds apps for trust and speed, and they remain one of the most approachable full end-to-end mobile FYPs: real users, a real database, and a real deployment story.",
    keywords: ["flutter", "mobile", "marketplace", "real-time", "geofencing"],
  },
  {
    id: "realtime-arena-game",
    title: "Real-Time Multiplayer Arena Game",
    hook: "A browser-playable top-down arena shooter with authoritative server netcode and lag compensation.",
    domain: "Game Dev",
    difficulty: "Advanced",
    timelineWeeks: 18,
    timelineLabel: "18 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A small-scale multiplayer arena game (think a stripped-down battle royale or team deathmatch) that teaches the real engineering problem of networked games: an authoritative server simulation, client-side prediction, server reconciliation and lag compensation, wrapped in a matchmaking lobby.",
    features: [
      "Authoritative server tick loop simulating movement, hit detection and game state",
      "Client-side prediction with server reconciliation to hide latency",
      "Lag-compensated hit registration (rewind-time hit checks) for fairer shooting",
      "Lobby and matchmaking with simple skill-based pairing",
      "Spectator mode and match replay recorded from server snapshots",
      "In-game voice-free text chat and post-match stats screen",
    ],
    stack: {
      frontend: ["TypeScript", "Phaser 3", "WebSockets", "Vite"],
      backend: [
        "Node.js",
        "Colyseus (authoritative game server)",
        "Redis (matchmaking queue)",
        "PostgreSQL (stats)",
      ],
      aiml: [],
      infra: ["Docker", "Fly.io", "Prometheus", "GitHub Actions"],
    },
    roadmap: [
      p(
        "Netcode research",
        "Weeks 1–3",
        1,
        3,
        "Study client prediction, reconciliation and lag compensation.",
        [
          "Literature review of netcode models",
          "Prototype tick-based server loop",
          "Latency simulation harness",
        ],
      ),
      p("Core gameplay", "Weeks 4–8", 4, 8, "Movement, combat and hit detection.", [
        "Authoritative movement sim",
        "Weapon/hit detection",
        "Client prediction + reconciliation",
      ]),
      p("Lag compensation", "Weeks 9–11", 9, 11, "Server-side rewind for fair hit registration.", [
        "Snapshot history buffer",
        "Rewind hit-check algorithm",
        "Fairness testing under artificial latency",
      ]),
      p("Matchmaking & lobby", "Weeks 12–14", 12, 14, "Queueing, lobbies and skill pairing.", [
        "Matchmaking queue",
        "Lobby UI",
        "Skill rating (Elo-style)",
      ]),
      p("Polish & evaluation", "Weeks 15–18", 15, 18, "Spectator mode, replays and write-up.", [
        "Match replay system",
        "Playtest with 20+ players",
        "Dissertation with latency benchmarks",
      ]),
    ],
    data: "No external dataset — the project generates its own evaluation data via controlled latency/packet-loss testing (using tools like `tc netem`) and playtester sessions logged from the server.",
    challenges: [
      "Getting client-side prediction to feel smooth without desyncing from the server",
      "Lag compensation can make hits feel 'unfair' from the victim's perspective — needs careful tuning",
      "Testing network code realistically requires simulating latency and packet loss, not just localhost",
      "Scaling the authoritative server tick loop under concurrent matches",
    ],
    trending:
      "Real-time multiplayer remains one of the few FYP tracks that forces genuine systems-level engineering — concurrency, networking and simulation — rather than gluing together APIs, which makes it a strong pick for students aiming at systems or game-engineering roles.",
    keywords: ["multiplayer", "netcode", "game dev", "websockets", "authoritative server"],
  },
  {
    id: "blockchain-land-registry",
    title: "Blockchain-Based Land Registry",
    hook: "A tamper-evident land title system where ownership transfers are recorded on-chain and disputes are auditable.",
    domain: "Blockchain",
    difficulty: "Advanced",
    timelineWeeks: 18,
    timelineLabel: "18 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A permissioned-blockchain land registry prototype where property records, ownership history and transfer approvals are stored as smart-contract state instead of a mutable central database. A registrar portal handles KYC and approval workflow off-chain while the ownership chain itself stays tamper-evident and independently verifiable.",
    features: [
      "Smart contracts for property registration, ownership transfer and lien/mortgage flags",
      "Multi-signature approval flow requiring registrar + buyer + seller sign-off before a transfer finalises",
      "Full on-chain provenance: every past owner and transfer is queryable and verifiable",
      "Off-chain KYC/document store (IPFS) linked to on-chain records via content hashes",
      "Public verification portal to check a title's authenticity without trusting a single server",
      "Dispute-flagging mechanism that freezes a title pending registrar review",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "ethers.js", "wagmi"],
      backend: ["Node.js", "Express", "PostgreSQL (off-chain index)", "IPFS (via web3.storage)"],
      aiml: [],
      infra: ["Hardhat", "Polygon / a permissioned Besu network", "Docker", "GitHub Actions"],
    },
    roadmap: [
      p(
        "Domain & legal study",
        "Weeks 1–3",
        1,
        3,
        "Understand real registry workflows and pick a chain model.",
        ["Registrar process interviews", "Permissioned vs public chain decision", "Threat model"],
      ),
      p("Smart contracts", "Weeks 4–8", 4, 8, "Registration, transfer and multisig logic.", [
        "Property registry contract",
        "Multisig transfer contract",
        "Unit tests + Hardhat coverage",
      ]),
      p("Off-chain services", "Weeks 9–12", 9, 12, "KYC portal, IPFS docs and indexing.", [
        "Registrar KYC portal",
        "IPFS document linking",
        "Event-indexer for fast queries",
      ]),
      p("Verification & disputes", "Weeks 13–15", 13, 15, "Public verifier and dispute flow.", [
        "Public title verifier page",
        "Dispute freeze mechanism",
        "Gas cost benchmarking",
      ]),
      p("Evaluation & write-up", "Weeks 16–18", 16, 18, "Security review and dissertation.", [
        "Self-run security audit checklist",
        "Load test of transfer throughput",
        "Dissertation",
      ]),
    ],
    data: "No sensitive real data — use publicly available anonymised property-record formats (e.g. sample datasets from open land-registry portals) purely to shape realistic schemas, and synthesise all test titles and transfers.",
    challenges: [
      "Gas costs and transaction throughput limits on public chains for a use case with many small transfers",
      "Smart contract bugs are effectively irreversible — needs disciplined testing before any 'live' demo",
      "Reconciling legal reality (courts can override records) with an immutable ledger",
      "Key management: what happens when a citizen loses their private key",
    ],
    trending:
      "Several national and state governments piloted blockchain land registries in 2024–26 specifically to address record tampering and duplicate-title fraud, making this a well-grounded, non-hype application of the technology.",
    keywords: ["blockchain", "smart contracts", "solidity", "land registry", "ipfs"],
  },
  {
    id: "smart-home-iot-hub",
    title: "Smart Home Automation Hub",
    hook: "A local-first IoT hub that automates a house from cheap ESP32 sensors, with no cloud dependency required to keep working.",
    domain: "IoT",
    difficulty: "Intermediate",
    timelineWeeks: 16,
    timelineLabel: "16 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A home-automation hub running on a Raspberry Pi that talks to a network of ESP32-based sensor/actuator nodes (temperature, motion, door contacts, relays) over MQTT, applies rule-based and scheduled automations locally, and only touches the cloud for optional remote access — so the lights and locks keep working even if the internet is down.",
    features: [
      "Custom ESP32 firmware for sensor nodes (temperature/humidity, motion, door/window contact) and actuator nodes (relays, smart plugs)",
      "Local MQTT broker with a rules engine (if motion + after sunset -> lights on) evaluated entirely on the hub",
      "Scheduling engine for time- and sunrise/sunset-based automations",
      "Local-first web dashboard for live sensor state, manual overrides and automation editing",
      "Optional encrypted remote-access tunnel with no dependency for core automation to keep running",
      "Energy usage logging per smart plug with daily/weekly reports",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "MQTT.js (WebSocket bridge)"],
      backend: ["Node.js", "Mosquitto MQTT broker", "SQLite", "node-cron"],
      aiml: [],
      infra: [
        "ESP32 (Arduino/PlatformIO)",
        "Raspberry Pi 4",
        "Docker",
        "WireGuard (remote access)",
      ],
    },
    roadmap: [
      p(
        "Hardware bring-up",
        "Weeks 1–3",
        1,
        3,
        "Prototype and flash the first sensor/actuator nodes.",
        ["ESP32 firmware for one sensor node", "Relay actuator node", "MQTT topic schema"],
      ),
      p("Hub core", "Weeks 4–7", 4, 7, "Broker, rules engine and persistence.", [
        "Local MQTT broker deployed",
        "Rules engine v1",
        "Sensor history storage",
      ]),
      p("Dashboard", "Weeks 8–11", 8, 11, "Live web UI and automation editor.", [
        "Live state dashboard (WebSocket)",
        "Visual automation editor",
        "Manual override controls",
      ]),
      p(
        "Scheduling & remote access",
        "Weeks 12–14",
        12,
        14,
        "Time-based automations and secure remote access.",
        ["Sunrise/sunset scheduler", "WireGuard remote tunnel", "Offline-resilience testing"],
      ),
      p("Energy logging & write-up", "Weeks 15–16", 15, 16, "Usage reports and dissertation.", [
        "Per-device energy logging",
        "Weekly report generation",
        "Dissertation",
      ]),
    ],
    data: "No external dataset — the project generates its own sensor time-series through real hardware deployment in a test house/flat over several weeks for the evaluation chapter.",
    challenges: [
      "Wifi range and node power consumption in a real multi-room deployment",
      "Keeping automations reliable when the broker or a node briefly disconnects",
      "Securing MQTT and the remote-access tunnel against unauthorised control of relays/locks",
      "Debugging intermittent hardware issues (brownouts, sensor noise) is far slower than debugging pure software",
    ],
    trending:
      "Matter/Thread standardisation pushed the industry toward local-first, interoperable smart homes instead of siloed cloud apps, and privacy-conscious buyers increasingly prefer hubs that keep working — and keep data local — without internet.",
    keywords: ["iot", "esp32", "mqtt", "home automation", "raspberry pi"],
  },
  {
    id: "distributed-kv-store",
    title: "Distributed Key-Value Store with Raft Consensus",
    hook: "Build your own fault-tolerant, replicated database from scratch and prove it survives node failure.",
    domain: "Distributed Systems",
    difficulty: "Expert",
    timelineWeeks: 20,
    timelineLabel: "20 weeks",
    teamSize: "2 students",
    teamCount: 2,
    description:
      "A from-scratch distributed key-value store that implements the Raft consensus algorithm for leader election and log replication, giving linearizable reads/writes across a cluster of nodes that keeps serving requests through leader crashes, network partitions and node restarts. The dissertation centres on formally reasoning about and empirically testing the system's fault-tolerance guarantees.",
    features: [
      "Full Raft implementation: leader election, log replication, and safety guarantees",
      "Snapshotting and log compaction so replicas can catch up without replaying full history",
      "Linearizable client API (GET/PUT/DELETE) with configurable read consistency (leader-only vs follower reads)",
      "Chaos-testing harness that kills nodes, partitions the network and injects latency mid-test",
      "Cluster membership changes (adding/removing nodes) without downtime",
      "Metrics dashboard showing leader elections, replication lag and throughput under fault injection",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Recharts (metrics dashboard)"],
      backend: ["Go", "gRPC", "BoltDB / custom on-disk log"],
      aiml: [],
      infra: [
        "Docker Compose (multi-node cluster)",
        "Toxiproxy (network fault injection)",
        "Prometheus + Grafana",
      ],
    },
    roadmap: [
      p(
        "Consensus theory",
        "Weeks 1–4",
        1,
        4,
        "Deep study of the Raft paper and formal safety properties.",
        ["Raft paper study + notes", "State machine spec", "Test plan for safety properties"],
      ),
      p(
        "Leader election & log replication",
        "Weeks 5–10",
        5,
        10,
        "Core Raft protocol implementation.",
        [
          "Leader election implemented",
          "Log replication implemented",
          "Single-node crash recovery",
        ],
      ),
      p("Storage & snapshotting", "Weeks 11–13", 11, 13, "Durable storage and log compaction.", [
        "On-disk log + WAL",
        "Snapshot + compaction",
        "Fast follower catch-up",
      ]),
      p(
        "Client API & membership",
        "Weeks 14–16",
        14,
        16,
        "gRPC API and dynamic cluster membership.",
        ["Linearizable client API", "Joint-consensus membership changes", "Read-consistency modes"],
      ),
      p(
        "Chaos testing & write-up",
        "Weeks 17–20",
        17,
        20,
        "Fault injection and formal evaluation.",
        [
          "Toxiproxy chaos test suite",
          "Throughput/latency under faults",
          "Dissertation with formal safety argument",
        ],
      ),
    ],
    data: "No external dataset — evaluation is entirely generated by the chaos-testing harness: controlled node kills, network partitions and latency injection, with throughput/latency/consistency measured directly.",
    challenges: [
      "Subtle Raft edge cases (split votes, stale leader writes) are easy to get wrong and hard to detect without exhaustive testing",
      "Distinguishing a slow node from a dead one without false-positive leader elections",
      "Building a chaos-testing harness that is itself deterministic enough to reproduce bugs",
      "Balancing strict linearizability against throughput under high write load",
    ],
    trending:
      "Every major cloud database (CockroachDB, etcd, TiKV) is built on Raft or Paxos-family consensus, so implementing one from scratch is one of the most respected 'prove you understand distributed systems' FYPs for students targeting infrastructure or backend roles.",
    keywords: ["distributed systems", "raft", "consensus", "database", "fault tolerance"],
  },
  {
    id: "campus-ride-sharing",
    title: "Campus Ride-Sharing Platform",
    hook: "A full-stack carpooling web app matching students on overlapping routes with live trip tracking.",
    domain: "Web Dev",
    difficulty: "Intermediate",
    timelineWeeks: 16,
    timelineLabel: "16 weeks",
    teamSize: "2–3 students",
    teamCount: 3,
    description:
      "A full-stack web platform where students post or search for rides between campus and common destinations (home cities, hostels, the airport on breaks), matched by route overlap and time window rather than exact origin/destination. Drivers and riders confirm a trip, track it live on a map, and rate each other afterward.",
    features: [
      "Route-overlap matching: riders and drivers are matched on partial route overlap, not just exact endpoints",
      "Live trip tracking on a map from pickup to drop-off",
      "In-app booking flow with seat-count management and automatic waitlisting",
      "Driver verification (license/CNIC upload, admin approval) before posting rides",
      "Ratings and trip-history for both drivers and riders",
      "Cost-splitting calculator based on distance and seats filled",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Mapbox GL JS"],
      backend: ["Node.js", "Express", "PostgreSQL", "PostGIS (geo queries)"],
      aiml: [],
      infra: ["Docker", "Render / Railway", "GitHub Actions", "Cloudinary (document uploads)"],
    },
    roadmap: [
      p(
        "Requirements & data model",
        "Weeks 1–2",
        1,
        2,
        "Route-matching model and core schema design.",
        [
          "User research with 30+ students",
          "Route-overlap matching algorithm design",
          "DB schema with PostGIS",
        ],
      ),
      p("Core platform", "Weeks 3–7", 3, 7, "Auth, ride posting and search.", [
        "Auth + driver verification flow",
        "Ride posting form",
        "Route-overlap search",
      ]),
      p("Booking & tracking", "Weeks 8–11", 8, 11, "Booking flow and live map tracking.", [
        "Seat booking + waitlist",
        "Live trip tracking",
        "Notifications on trip status",
      ]),
      p("Trust features", "Weeks 12–14", 12, 14, "Ratings, history and safety.", [
        "Rating system",
        "Trip history dashboard",
        "Admin moderation panel",
      ]),
      p("Testing & launch", "Weeks 15–16", 15, 16, "Pilot and dissertation.", [
        "Pilot with real routes",
        "Load testing",
        "Dissertation",
      ]),
    ],
    data: "No external dataset — synthesise realistic route/time data for algorithm testing, then run a real pilot on campus to gather genuine matching and usage data for evaluation.",
    challenges: [
      "Route-overlap matching is more complex than naive origin/destination matching and needs careful geo-query design",
      "Verifying driver identity/licenses without a full KYC vendor is a manual, error-prone process",
      "Cold-start problem: matching quality depends on having enough posted rides",
      "Safety and liability considerations for a real-world ride-sharing pilot",
    ],
    trending:
      "Rising fuel costs and limited campus transport in many university towns keep informal ride-sharing WhatsApp groups alive — a structured platform with verification and tracking is a clear, demonstrable improvement and a strong full-stack SE showcase.",
    keywords: ["web app", "carpooling", "postgis", "full stack", "geo matching"],
  },
  {
    id: "microservices-hospital-system",
    title: "Microservices-Based Hospital Management System",
    hook: "A hospital management system decomposed into independently deployable services, built to demonstrate real SE architecture, not just CRUD.",
    domain: "Enterprise Systems",
    difficulty: "Advanced",
    timelineWeeks: 20,
    timelineLabel: "20 weeks",
    teamSize: "3 students",
    teamCount: 3,
    description:
      "A hospital management system built as a proper microservices architecture — separate services for patient records, appointment scheduling, billing and pharmacy inventory — communicating over an event bus with an API gateway in front. The dissertation focuses on the software-engineering discipline: service boundaries, eventual consistency, and resilience when one service goes down.",
    features: [
      "API gateway routing to independently deployable patient, appointment, billing and pharmacy services",
      "Event-driven communication (e.g. 'appointment booked' triggers billing pre-authorisation) via a message broker",
      "Saga pattern for multi-service transactions (e.g. admission spanning patient + billing + pharmacy)",
      "Role-based access control for doctors, nurses, receptionists and admins",
      "Service health dashboard with circuit breakers so a pharmacy outage doesn't take down appointments",
      "Centralised audit logging across all services for compliance",
    ],
    stack: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      backend: [
        "Node.js / NestJS (per service)",
        "PostgreSQL (per-service databases)",
        "RabbitMQ",
        "Kong / custom API gateway",
      ],
      aiml: [],
      infra: [
        "Docker Compose",
        "Kubernetes (for the eval deployment)",
        "Prometheus + Grafana",
        "GitHub Actions",
      ],
    },
    roadmap: [
      p(
        "Domain modelling",
        "Weeks 1–3",
        1,
        3,
        "Define service boundaries and inter-service contracts.",
        ["Domain-driven design workshop", "Service boundary decisions", "Event schema catalogue"],
      ),
      p("Core services", "Weeks 4–10", 4, 10, "Build patient, appointment and billing services.", [
        "Patient records service",
        "Appointment scheduling service",
        "Billing service",
      ]),
      p(
        "Event bus & sagas",
        "Weeks 11–14",
        11,
        14,
        "Async messaging and multi-service transactions.",
        [
          "RabbitMQ event bus wired",
          "Saga orchestrator for admissions",
          "Eventual-consistency tests",
        ],
      ),
      p("Gateway & resilience", "Weeks 15–17", 15, 17, "API gateway, RBAC and circuit breakers.", [
        "API gateway + auth",
        "RBAC per role",
        "Circuit breakers + chaos test",
      ]),
      p("Deployment & write-up", "Weeks 18–20", 18, 20, "Kubernetes deployment and dissertation.", [
        "K8s deployment manifests",
        "Load + failure testing",
        "Dissertation",
      ]),
    ],
    data: "No real patient data — generate a synthetic hospital dataset (patients, appointments, invoices, inventory) sized to realistically stress-test the system for the evaluation chapter.",
    challenges: [
      "Getting service boundaries right — too fine-grained and you drown in operational overhead, too coarse and you lose the point",
      "Debugging distributed transactions (sagas) is far harder than debugging a monolith",
      "Ensuring eventual consistency doesn't produce visibly wrong states to end users (e.g. a booked appointment with no billing record for a few seconds)",
      "Running and demonstrating a multi-service Kubernetes deployment within student infrastructure budgets",
    ],
    trending:
      "Most industry SE roles now expect familiarity with service decomposition, event-driven design and resilience patterns — this project is deliberately scoped to make students defend real architectural tradeoffs in their viva, not just show a working CRUD app.",
    keywords: [
      "microservices",
      "software engineering",
      "event-driven",
      "saga pattern",
      "kubernetes",
    ],
  },
  {
    id: "p2p-video-conferencing",
    title: "Peer-to-Peer Video Conferencing Tool",
    hook: "A WebRTC video calling app with no media server in the loop for small calls, and an SFU fallback for larger ones.",
    domain: "Networking",
    difficulty: "Advanced",
    timelineWeeks: 18,
    timelineLabel: "18 weeks",
    teamSize: "2 students",
    teamCount: 2,
    description:
      "A video-conferencing tool built directly on WebRTC: for 1-to-1 and small group calls, media flows peer-to-peer with no server touching the video; for larger rooms, the system automatically falls back to a lightweight Selective Forwarding Unit (SFU) the team builds itself. The core contribution is understanding and implementing NAT traversal, signalling and adaptive bitrate under real network conditions.",
    features: [
      "Pure peer-to-peer mesh calling for small groups (up to ~4 participants) with no media server",
      "Custom-built SFU for larger rooms, with automatic mesh-to-SFU fallback based on participant count",
      "STUN/TURN-based NAT traversal with connection-quality diagnostics shown to the user",
      "Adaptive bitrate and simulcast so call quality degrades gracefully on poor connections",
      "Screen sharing, in-call text chat and recording (server-side for SFU rooms)",
      "Signalling server for room discovery, offer/answer exchange and ICE candidate relay",
    ],
    stack: {
      frontend: ["React", "TypeScript", "WebRTC APIs", "Tailwind CSS"],
      backend: ["Node.js", "Socket.IO (signalling)", "mediasoup (SFU)", "coturn (STUN/TURN)"],
      aiml: [],
      infra: ["Docker", "Fly.io", "Prometheus (connection metrics)"],
    },
    roadmap: [
      p(
        "WebRTC fundamentals",
        "Weeks 1–3",
        1,
        3,
        "Study ICE/STUN/TURN and build a minimal 1:1 call.",
        [
          "WebRTC + signalling theory study",
          "Working 1:1 peer connection",
          "Own STUN/TURN server deployed",
        ],
      ),
      p("Mesh calling", "Weeks 4–8", 4, 8, "Multi-peer mesh for small groups.", [
        "N-way mesh signalling",
        "Bandwidth-aware mesh size cap",
        "Connection-quality UI",
      ]),
      p("SFU build", "Weeks 9–13", 9, 13, "Selective forwarding unit for larger rooms.", [
        "mediasoup SFU integration",
        "Mesh-to-SFU fallback logic",
        "Simulcast + adaptive bitrate",
      ]),
      p("Extras", "Weeks 14–16", 14, 16, "Screen share, chat and recording.", [
        "Screen sharing",
        "In-call text chat",
        "Server-side recording (SFU rooms)",
      ]),
      p(
        "Testing & write-up",
        "Weeks 17–18",
        17,
        18,
        "Network condition testing and dissertation.",
        [
          "Testing under simulated packet loss/latency",
          "Quality benchmarks: mesh vs SFU",
          "Dissertation",
        ],
      ),
    ],
    data: "No external dataset — evaluation data comes from controlled network-condition testing (via `tc netem` / Clumsy) measuring call quality, latency and reconnection behaviour across mesh and SFU modes.",
    challenges: [
      "NAT traversal fails in a meaningful fraction of real-world networks and needs a working TURN fallback",
      "Building a correct, low-latency SFU from scratch is a genuinely hard media-engineering problem",
      "Testing video quality objectively (not just 'it looked fine on my wifi') requires a controlled network-impairment setup",
      "Browser API differences (Chrome vs Safari WebRTC quirks) eat debugging time",
    ],
    trending:
      "Video calling is ubiquitous but the engineering underneath — NAT traversal, SFU media routing, adaptive bitrate — is rarely taught explicitly, making this a strong deep-networking FYP that goes well beyond wiring together a third-party SDK.",
    keywords: ["webrtc", "networking", "sfu", "nat traversal", "video calling"],
  },
  {
    id: "ar-furniture-visualizer",
    title: "AR Furniture Visualizer",
    hook: "Point your phone at a room and see furniture placed at real scale before you buy it.",
    domain: "AR/VR",
    difficulty: "Intermediate",
    timelineWeeks: 16,
    timelineLabel: "16 weeks",
    teamSize: "2 students",
    teamCount: 2,
    description:
      "A mobile augmented-reality app that lets users place 3D furniture models into their real room via the phone camera, at true-to-life scale, to check fit and style before purchasing. Plane detection anchors models to floors and walls, and a simple catalogue/cart flow turns the AR view into a shoppable experience.",
    features: [
      "Real-time plane detection (floor/wall) with model snapping and true-scale placement",
      "3D model catalogue with category browsing, colour/material variants and price tags",
      "Room-scan mode that measures wall length and floor area for fit-checking before placement",
      "Multi-object scenes: place a whole room's worth of furniture and save the layout",
      "Photo/video capture of the AR scene to share or save for later",
      "Cart and checkout flow linking placed items to a simple order summary",
    ],
    stack: {
      frontend: ["Unity", "C#", "AR Foundation (ARKit/ARCore)"],
      backend: ["Node.js", "Express", "PostgreSQL (catalogue + orders)"],
      aiml: [],
      infra: ["Docker", "AWS S3 (3D asset hosting)", "GitHub Actions"],
    },
    roadmap: [
      p(
        "AR fundamentals",
        "Weeks 1–3",
        1,
        3,
        "Learn AR Foundation and get plane detection working.",
        [
          "Plane detection prototype",
          "Model placement + scale calibration",
          "Device compatibility testing",
        ],
      ),
      p("Catalogue & backend", "Weeks 4–7", 4, 7, "Model catalogue and API.", [
        "3D asset pipeline (optimised glTF models)",
        "Catalogue API",
        "Category/filter browsing UI",
      ]),
      p("Scene features", "Weeks 8–11", 8, 11, "Room scanning and multi-object scenes.", [
        "Wall/floor measurement",
        "Multi-object scene saving",
        "Occlusion handling",
      ]),
      p("Capture & commerce", "Weeks 12–14", 12, 14, "Sharing and cart/checkout.", [
        "Photo/video capture",
        "Cart + checkout flow",
        "Order summary + confirmation",
      ]),
      p("Usability testing & write-up", "Weeks 15–16", 15, 16, "User study and dissertation.", [
        "Usability study with 15+ users",
        "Placement accuracy evaluation",
        "Dissertation",
      ]),
    ],
    data: "No external dataset — use a small set of licensed or self-modelled 3D furniture assets (glTF/GLB) for the catalogue, and gather placement-accuracy and usability data from the project's own test sessions.",
    challenges: [
      "Placement accuracy varies a lot by device, lighting and surface texture",
      "Keeping 3D asset file sizes small enough for fast AR loading on mobile",
      "Occlusion (furniture correctly hidden behind real objects) is hard to get fully right without depth sensors",
      "Testing across enough different phone models to make usability claims credible",
    ],
    trending:
      "Major e-commerce and furniture retailers now treat AR try-before-you-buy as a standard feature, and AR Foundation has matured enough that this is achievable as a single-semester FYP rather than a research-lab-only project.",
    keywords: ["augmented reality", "unity", "ar foundation", "3d", "ecommerce"],
  },
  {
    id: "toy-language-compiler",
    title: "Toy Programming Language & Compiler",
    hook: "Design your own small language and build a real compiler for it — lexer through to a working executable.",
    domain: "Systems Programming",
    difficulty: "Advanced",
    timelineWeeks: 18,
    timelineLabel: "18 weeks",
    teamSize: "1–2 students",
    teamCount: 2,
    description:
      "A compiler for a small, purpose-designed programming language (e.g. a statically-typed scripting language aimed at teaching or embedded scripting), built end-to-end: hand-written lexer and recursive-descent parser, a typed AST with a Hindley-Milner-style or simple nominal type checker, an intermediate representation, and code generation targeting LLVM IR so the language produces real native executables.",
    features: [
      "Hand-written lexer and recursive-descent parser producing a full AST with source-location tracking",
      "Static type checker (nominal typing, or optional Hindley-Milner inference as a stretch goal) with clear error messages",
      "A small but real standard library (I/O, strings, collections) implemented in the language plus native shims",
      "Custom intermediate representation (IR) with basic optimisation passes (constant folding, dead-code elimination)",
      "LLVM IR code generation producing real native executables via the LLVM toolchain",
      "A test suite of language programs (fixtures) with expected output, run in CI on every change",
    ],
    stack: {
      frontend: [
        "N/A (CLI compiler tool)",
        "Language Server Protocol shim for editor support (stretch goal)",
      ],
      backend: [
        "Rust or C++ (compiler implementation)",
        "LLVM (via inkwell/llvm-sys or the C++ LLVM API)",
      ],
      aiml: [],
      infra: [
        "Docker (reproducible toolchain)",
        "GitHub Actions (CI running the fixture test suite)",
      ],
    },
    roadmap: [
      p(
        "Language design",
        "Weeks 1–3",
        1,
        3,
        "Design the language grammar, type system and scope.",
        [
          "Language spec (grammar + semantics)",
          "Example programs written by hand",
          "Grammar formalised in BNF",
        ],
      ),
      p("Lexer & parser", "Weeks 4–6", 4, 6, "Tokenizer and recursive-descent parser.", [
        "Lexer with source spans",
        "Recursive-descent parser producing AST",
        "Parser error recovery",
      ]),
      p("Type checker", "Weeks 7–10", 7, 10, "Static type checking and semantic analysis.", [
        "Symbol table + scoping",
        "Type checker with clear diagnostics",
        "Type-error test fixtures",
      ]),
      p("IR & codegen", "Weeks 11–15", 11, 15, "Custom IR, optimisation passes and LLVM backend.", [
        "Custom IR lowering",
        "Constant folding / DCE passes",
        "LLVM IR codegen -> native binary",
      ]),
      p("Stdlib, testing & write-up", "Weeks 16–18", 16, 18, "Standard library and dissertation.", [
        "Minimal standard library",
        "Fixture test suite in CI",
        "Dissertation with benchmark comparisons",
      ]),
    ],
    data: "No external dataset — evaluation uses a self-authored corpus of test programs exercising language features, plus benchmark programs (e.g. fibonacci, sorting, small algorithms) compared for correctness and runtime performance against an interpreter baseline.",
    challenges: [
      "Writing genuinely helpful compiler error messages is its own substantial engineering problem",
      "Debugging miscompilation bugs at the LLVM IR level requires careful, methodical isolation",
      "Scoping the language small enough to finish in one semester while still being 'a real language'",
      "Type inference (if attempted) is significantly harder than nominal type checking and can eat the whole timeline if underestimated",
    ],
    trending:
      "Compilers remain one of the most respected 'deep CS fundamentals' FYPs precisely because there is no AI shortcut for correctness — LLVM's continued dominance as a compiler backend also makes the skills directly transferable to real toolchain and language-tooling roles.",
    keywords: ["compilers", "llvm", "programming languages", "type systems", "systems programming"],
  },
];

export const getProject = (id: string) => PROJECTS.find((x) => x.id === id);
