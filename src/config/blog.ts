export type BlogCategory = { name: string; slug: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  image: string;
  featured?: boolean;
  status: "published" | "migration-pending";
  sourceUrl?: string;
  content?: string;
};

export const blogCategories: BlogCategory[] = [
  { name: "All insights", slug: "all" },
  { name: "Business & Technology", slug: "business-technology" },
  { name: "Web Development & Design", slug: "web-development-design" },
  { name: "IT Services", slug: "it-services" },
  { name: "Technology", slug: "technology" },
  { name: "Digital", slug: "digital" },
];

const article = (intro: string, sections: Array<[string, string]>, close: string) =>
  [intro, ...sections.flatMap(([heading, body]) => [`## ${heading}`, body]), close].join("\n\n");

export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-business-needs-a-website",
    title: "Why Your Business Needs a Website (And How to Get One)",
    excerpt: "A practical guide to building a useful business website: one that answers customer questions, earns trust and turns interest into meaningful enquiries.",
    category: "Business & Technology", date: "2025-02-13", readMinutes: 7,
    image: "/images/work/orex-group.webp", featured: true, status: "published",
    content: article(
      "A business website is more than an online brochure. It is a place you control where customers can understand what you do, assess whether you are credible and decide how to take the next step. Social media can help people discover a business, but a website gives that discovery a reliable destination.",
      [
        ["Make the customer journey clear", "A visitor should quickly understand who you serve, what you offer and what makes your service relevant. Organise information around customer questions rather than internal departments. Explain services in plain language, show the locations or audiences you serve and make contact options easy to find."],
        ["Build trust with useful evidence", "Use real project examples, accurate business details, genuine testimonials where permission has been granted and clear explanations of how you work. Avoid inflated claims and stock statements that could describe any company. Specific, verifiable information is more persuasive than grand promises."],
        ["Design for phones first", "Many customers will discover your business on a mobile device. Pages should load quickly, text should be comfortable to read and forms should be simple to complete. Compress images, avoid unnecessary animation and test important journeys on smaller screens."],
        ["Give the website a job", "Decide what a successful visit should lead to: a phone call, an enquiry, a booking, a product purchase or an application. Give each important page a relevant call to action and measure meaningful outcomes rather than page views alone."],
        ["Plan for maintenance and search", "Keep contact information, services and project details current. Use descriptive page titles, useful headings, internal links and a sitemap. Search visibility takes time and depends on relevance, quality, technical health and reputation; a website is a foundation, not an instant ranking guarantee."]
      ],
      "Start with the customer problem and the smallest useful website that can solve it. A focused, well-maintained site is often more valuable than a large collection of pages that are difficult to navigate or keep up to date."
    )
  },
  {
    slug: "the-it-evolution-advancing-next-generation-solutions-pro",
    title: "The IT Evolution: Building Technology That Can Keep Up",
    excerpt: "How organisations can modernise their technology without replacing everything at once or losing sight of day-to-day operations.",
    category: "IT Services", date: "2024-09-07", readMinutes: 6, image: "/images/work/waa-sacco.webp", status: "published",
    content: article("Technology changes quickly, but an organisation does not need to chase every new platform. The real task is to make sure its tools remain secure, maintainable and useful as the work changes.",
      [["Start with an honest systems inventory", "List the applications, spreadsheets, devices and manual processes your team relies on. Note who owns each system, what information it stores, what it connects to and what would happen if it became unavailable. This often reveals duplicated tools and fragile dependencies."],
      ["Modernise in manageable steps", "Replacing a core system can be expensive and disruptive. Prioritise improvements by business impact, risk and effort. Sometimes a better integration, a refreshed interface or a documented process delivers more value than a full rebuild."],
      ["Treat security as ongoing work", "Keep software updated, remove unused accounts, use multi-factor authentication where available and review who can access sensitive information. Backups should be tested, not simply assumed to work."],
      ["Design for change", "Prefer clear interfaces, documented integrations and maintainable components. Avoid unnecessary vendor lock-in and make sure the organisation can retrieve its own data in a usable format."]
      ], "Modernisation is a continuous discipline. The best technology roadmap is one that improves reliability and service while respecting the people, budgets and processes that keep the organisation running.")
  },
  {
    slug: "the-tech-atlas-is-mapping-the-landscape-of-it-solutions",
    title: "Choosing the Right IT Solution: A Practical Decision Framework",
    excerpt: "A straightforward way to compare software, cloud services and custom development against the needs of your organisation.",
    category: "Technology", date: "2024-09-07", readMinutes: 6, image: "/images/work/klaswa-learning.webp", status: "published",
    content: article("The technology market offers countless tools, each promising to make work easier. A good decision starts by defining the problem clearly and comparing options against the way your organisation actually operates.",
      [["Write down the problem before shopping", "Describe the task that is slow, unreliable or difficult today. Identify who experiences it, how often it occurs and what a better outcome would look like. This prevents a feature-rich product from distracting the team from the original need."],
      ["Compare fit, not feature count", "Evaluate usability, integrations, data ownership, security, support, accessibility and the total cost of ownership. A tool with fewer features may be a better choice if it solves the priority workflow simply and reliably."],
      ["Know when to configure or customise", "Off-the-shelf software is usually a sensible starting point when the process is common and the product fits. Configuration can close smaller gaps. Custom software becomes relevant when a critical workflow is distinctive, integration requirements are unusual or existing products create persistent constraints."],
      ["Run a small pilot", "Test the preferred option with real users and realistic data. Agree on success measures before the pilot begins and record what works, what creates friction and what additional costs appear."]
      ], "A decision framework makes technology selection less about trends and more about evidence. Choose the option your team can operate, secure and improve over time.")
  },
  {
    slug: "unlocking-tech-potential-is-ways-to-effective-it-solutions",
    title: "From Technology Potential to Practical Business Results",
    excerpt: "Turn digital ambitions into achievable improvements by connecting technology decisions to everyday business outcomes.",
    category: "Technology", date: "2024-09-07", readMinutes: 5, image: "/images/work/bob-van-transfers.webp", status: "published",
    content: article("Digital transformation can sound like a large, abstract programme. For most organisations, progress is easier to achieve when it begins with a specific operational or customer problem.",
      [["Find the friction points", "Look for repeated data entry, slow approvals, missed follow-ups, unclear ownership and information that lives in disconnected places. Ask staff where work regularly gets stuck and observe the process before proposing a tool."],
      ["Map the process end to end", "Document what starts the workflow, who acts at each stage, what information is required and how completion is confirmed. A process map helps distinguish a technology problem from a policy or communication problem."],
      ["Automate carefully", "Automate stable, repeatable steps first. Keep human review for exceptions, sensitive decisions and situations where context matters. Include alerts, logs and a clear way to recover when an integration fails."],
      ["Measure the outcome", "Track indicators that matter: time to complete a task, response time, error rates, abandoned enquiries or the number of manual hand-offs. Use a baseline so improvements can be assessed honestly."]
      ], "Technology creates value when it improves a real process. Keep the scope focused, involve the people who do the work and expand only after the first improvement is working reliably.")
  },
  {
    slug: "beyond-the-binary-is-cutting-edge-it-solutions-unveiled-tech",
    title: "Beyond the Binary: Why Good Software Starts With People",
    excerpt: "The most effective software balances engineering quality with the needs, habits and context of the people using it.",
    category: "Technology", date: "2024-09-07", readMinutes: 5, image: "/images/work/shop-chess-club.webp", status: "published",
    content: article("Software is often discussed in terms of frameworks, databases and features. Those details matter, but they are not the reason a product succeeds. Software succeeds when people can use it to complete meaningful tasks with confidence.",
      [["Understand users in context", "Talk to the people who will use the product and observe the environment in which they work. A field worker, an administrator and a customer may interact with the same system in very different ways."],
      ["Reduce cognitive load", "Use familiar language, predictable navigation and clear feedback. Make the next action visible. Avoid asking for information the organisation already has and explain errors in a way that helps users recover."],
      ["Include accessibility from the start", "Readable contrast, keyboard access, semantic structure, descriptive labels and sensible focus states help more people use a product. Accessibility is easier to build into the design than to retrofit after launch."],
      ["Test real tasks", "Ask representative users to complete common tasks without coaching. Watch where they hesitate, make mistakes or need help. Use those observations to improve the product before adding more features."]
      ], "Engineering excellence and human-centred design are not competing priorities. The strongest products bring them together.")
  },
  {
    slug: "beyond-boundaries-is-charting-new-territories-in-it-solutions",
    title: "Connecting Disconnected Systems: The Value of Good Integration",
    excerpt: "Why integrations need clear ownership, reliable data flows and thoughtful failure handling to deliver real operational value.",
    category: "IT Services", date: "2024-09-07", readMinutes: 6, image: "/images/work/waa-sacco.webp", status: "published",
    content: article("When business applications do not communicate, people become the integration layer. They copy details between systems, reconcile conflicting records and spend time checking whether an update has reached the right place.",
      [["Choose a trusted source for each record", "Decide which system owns customer details, orders, payments or inventory. Without clear ownership, integrations can create duplicates and overwrite correct information with stale data."],
      ["Define the data contract", "Agree on required fields, formats, identifiers and validation rules. Document what happens when information is missing or a record cannot be matched. Consistent contracts make integrations easier to test and maintain."],
      ["Plan for failure", "Networks fail, APIs change and third-party services become unavailable. Use retries carefully, log errors, alert the right people and design a safe process for reconciling incomplete transactions."],
      ["Protect information in transit", "Use authenticated connections, least-privilege credentials and appropriate encryption. Keep secrets out of browser code and rotate credentials when access changes."]
      ], "A reliable integration is more than a connection between two APIs. It is an agreed process for moving accurate information safely, with clear ownership when something goes wrong.")
  },
  {
    slug: "digital-discourses-is-conversion-on-innovative-it-solutions",
    title: "Digital Change That Sticks: Bringing Teams Along",
    excerpt: "Practical ways to introduce new digital tools while supporting adoption, communication and continuous improvement.",
    category: "IT Services", date: "2024-09-07", readMinutes: 5, image: "/images/work/klaswa-learning.webp", status: "published",
    content: article("A new platform can be technically successful and still fail to improve work if people do not understand it, trust it or have time to learn it. Adoption deserves the same attention as implementation.",
      [["Explain the reason for change", "Connect the new tool to a problem staff recognise. Explain what will change, what will stay the same and how the improvement will be assessed."],
      ["Involve representative users", "Invite people from different roles to review workflows and test early versions. Their feedback can uncover constraints that a project team may not see."],
      ["Provide practical support", "Use short task-based guides, demonstrations and a clear route for reporting issues. Give teams time to practise before making the new process mandatory."],
      ["Listen after launch", "Review usage patterns and collect feedback. Low adoption may indicate a training gap, confusing design or a process that does not fit the real work. Treat it as evidence to investigate, not simply resistance."]
      ], "Digital change is a people process supported by technology. Clear communication and ongoing support turn a launch into a lasting improvement.")
  },
  {
    slug: "how-to-choose-the-right-customer-for-your-photo-business",
    title: "Choosing the Right Digital Audience for a Creative Business",
    excerpt: "How creative and photography businesses can identify the customers they serve best and communicate their value online.",
    category: "Digital", date: "2024-09-07", readMinutes: 5, image: "/images/work/rook-reed-juicery.webp", status: "published",
    content: article("Creative businesses often offer several services, but a website that tries to speak to everyone can make it difficult for the right customer to recognise a good fit. Clear positioning helps people understand what you do and why it matters to them.",
      [["Group customers by need", "A photographer may serve families, events, brands and commercial clients. These audiences have different priorities, budgets and decision processes. Describe the needs behind each service rather than using one generic message."],
      ["Show relevant work", "Curate a portfolio that reflects the type of work you want to attract. Use accurate captions and obtain permission before publishing client images. A smaller, relevant portfolio can communicate more than a large, mixed gallery."],
      ["Make the enquiry process simple", "Explain what information you need, what happens after a customer contacts you and how they can discuss availability. A clear enquiry form reduces unnecessary back-and-forth."],
      ["Use content with purpose", "Share useful preparation advice, examples and answers to common questions. Content should help a prospective customer make a decision, not simply fill a social feed."]
      ], "A strong digital presence connects the right audience with the right service. Be specific about your strengths and make it easy for a potential customer to take the next step.")
  },
  {
    slug: "how-to-optimize-images-in-wordpress-for-faster-loading",
    title: "Image Optimisation: A Practical Guide to Faster Websites",
    excerpt: "Improve page speed and visual quality by choosing suitable formats, dimensions, compression and loading behaviour.",
    category: "Web Development & Design", date: "2024-09-07", readMinutes: 6, image: "/images/work/smartfix-interior.webp", status: "published",
    content: article("Large images are one of the common reasons a website feels slow, especially on mobile connections. Optimisation is not about making every image tiny; it is about delivering the right visual quality at the size and format the page actually needs.",
      [["Start with the displayed dimensions", "Do not upload a 5000-pixel photograph when the design displays it at a few hundred pixels. Generate responsive sizes and serve an appropriate variant for each screen."],
      ["Choose modern formats where supported", "WebP and AVIF can often reduce file size while retaining good visual quality. Keep sensible fallbacks where required and inspect the result for artefacts, especially in photographs and text-heavy graphics."],
      ["Compress with visual review", "Use a measured quality setting and compare the result at the actual display size. Logos, screenshots and photographs may need different treatment."],
      ["Load images intelligently", "Lazy-load images below the fold, but do not lazy-load the main hero image if it is the page's largest content element. Provide width and height or a stable aspect ratio to reduce layout shifts."],
      ["Keep accessibility in view", "Write useful alternative text for informative images. Decorative images should have empty alternative text so screen readers can skip them."]
      ], "Measure before and after with real devices and performance tools. Faster images improve the experience only when the page remains clear, stable and accessible.")
  },
  {
    slug: "where-to-grow-your-business-as-a-site-or-social-media",
    title: "Website or Social Media? Building a Stronger Digital Presence",
    excerpt: "Understand the different roles of your website and social channels, and how to make them work together.",
    category: "Business & Technology", date: "2024-09-07", readMinutes: 6, image: "/images/work/orex-group.webp", status: "published",
    content: article("A business does not need to choose between a website and social media. Each serves a different purpose. Social platforms can help people discover and discuss a brand, while a website provides a stable place for detailed information, enquiries and transactions.",
      [["Use social channels for discovery", "Publish updates, answer questions and participate in conversations where your audience already spends time. Keep profiles accurate and direct interested people to a relevant page rather than always sending them to the homepage."],
      ["Use your website as the reliable source", "Your website is where you can organise service details, policies, case studies and contact routes without relying on a platform's changing layout or rules. You also control the structure and can improve it based on user behaviour."],
      ["Connect the journey", "Link social posts to useful landing pages, use consistent business details and make it clear how to contact you. Ensure pages are mobile-friendly because many social referrals arrive on phones."],
      ["Measure meaningful outcomes", "Track enquiries, bookings and purchases from each channel where possible. A large follower count is not automatically valuable if it does not reach the people who need your service."]
      ], "Think of social media as a way to start relationships and your website as a place to develop them. A joined-up approach gives customers a clearer journey and gives the business more control.")
  },
  {
    slug: "the-future-of-artificial-intelligence-in-kenyan-businesses",
    title: "Practical Uses of Artificial Intelligence for Kenyan Businesses",
    excerpt: "Where AI can help with everyday business work, what to keep under human review and how to start responsibly.",
    category: "Technology", date: "2023-12-30", readMinutes: 7, image: "/images/work/bob-van-transfers.webp", status: "published",
    content: article("Artificial intelligence is becoming part of everyday business software, from writing assistance to customer support and data analysis. For Kenyan organisations, the most useful starting point is not adopting AI because it is popular; it is identifying a task where it can save time or improve access to information.",
      [["Start with low-risk, repetitive tasks", "AI can help draft routine communications, summarise long documents, classify incoming enquiries or make internal knowledge easier to search. These uses still need review, especially where facts, tone or customer commitments matter."],
      ["Keep people responsible for decisions", "Do not allow an AI system to make sensitive employment, credit, medical or legal decisions without appropriate safeguards and human oversight. Make it clear when customers are interacting with automated systems and provide a route to a person."],
      ["Protect business and customer data", "Understand how a tool stores and uses submitted information. Do not paste confidential records, passwords or sensitive personal data into unapproved services. Limit access and establish an internal policy."],
      ["Test against real work", "Choose a small workflow, define what good output looks like and compare quality, time saved and error rates. Include staff who understand the task and document where human review is required."],
      ["Consider local context", "Evaluate language support, connectivity, cost, payment options and integration with the systems your organisation already uses. A tool must be practical for the people expected to use it."]
      ], "AI can be useful when it is applied to a clear problem with proportionate safeguards. Begin with a small experiment, measure the result and expand only when the value is demonstrated.")
  },
  {
    slug: "building-a-strong-online-presence-for-kenyan-businesses",
    title: "Building a Strong Online Presence for Kenyan Businesses",
    excerpt: "A practical checklist for a credible, discoverable and useful online presence that supports customers across Kenya.",
    category: "Web Development & Design", date: "2023-12-30", readMinutes: 7, image: "/images/work/orex-group.webp", status: "published",
    content: article("A strong online presence is built from several connected pieces: a useful website, accurate business information, relevant content and consistent customer communication. For businesses serving customers across Kenya, clarity and trust are especially important.",
      [["Make essential details easy to find", "Display the correct business name, phone number, email, location and opening hours. Explain the services you provide and the areas you serve. Keep these details consistent across your website and business profiles."],
      ["Create pages around customer intent", "Give each major service a clear page with its purpose, benefits, process and next step. Avoid repeating the same generic paragraph across every page. Useful detail helps customers and search engines understand relevance."],
      ["Build local relevance honestly", "Mention real service areas and include accurate location information where it helps customers. Do not create misleading location pages for places where the business has no meaningful presence."],
      ["Publish helpful answers", "Use articles and FAQs to address questions customers genuinely ask. Explain topics clearly, update information when it changes and link to related services where relevant."],
      ["Review performance regularly", "Check search queries, page engagement, enquiries and technical issues. Use the evidence to improve pages that matter rather than chasing vanity metrics."]
      ], "Consistency builds recognition. Make the business easy to understand, easy to contact and easy to verify, then keep improving the experience based on customer needs.")
  },
  {
    slug: "printing-services-for-modern-businesses-in-kenya",
    title: "Bringing Digital and Print Together in Business Communication",
    excerpt: "How consistent brand information across websites, documents and printed materials creates a more coherent customer experience.",
    category: "Business & Technology", date: "2023-12-30", readMinutes: 5, image: "/images/work/smartfix-interior.webp", status: "published",
    content: article("Digital communication has not removed the need for printed materials. Menus, brochures, packaging, signage and business documents still help organisations communicate in physical environments. The challenge is keeping the message consistent across both channels.",
      [["Create a shared source of brand information", "Maintain approved logos, colours, typography, contact details and service descriptions in one accessible location. This reduces the risk of outdated phone numbers or inconsistent brand presentation appearing in different materials."],
      ["Design for the medium", "A layout that works on a phone may not work on a printed flyer. Consider reading distance, paper size, contrast, image resolution and the amount of information people can absorb at a glance."],
      ["Connect print to digital", "Use a short, readable website address or a QR code where it genuinely helps someone reach a booking page, catalogue or contact form. Test codes before printing and keep the destination current."],
      ["Review before production", "Check spelling, prices, dates, contact details, image permissions and print specifications. A proofing process is cheaper than reprinting a large batch."]
      ], "Digital and print should reinforce the same customer promise. Consistent information and thoughtful design make every interaction feel like part of one business.")
  },
  {
    slug: "building-a-mobile-app-for-your-business",
    title: "Does Your Business Need a Mobile App?",
    excerpt: "When a mobile app makes sense, when a responsive website is enough and what to plan before investing in development.",
    category: "Technology", date: "2023-12-30", readMinutes: 7, image: "/images/work/shop-chess-club.webp", status: "published",
    content: article("A mobile app can create a convenient experience for customers or staff, but it is not automatically the best solution for every business. The decision should be based on how frequently people need the service and what the app can do better than a well-designed website.",
      [["Look for repeat-use behaviour", "Apps are often useful when customers return frequently, need notifications, use device features or must complete tasks in a structured workflow. If visitors only need occasional information, a responsive website may be simpler and cheaper."],
      ["Define the first useful release", "List the essential user journeys and separate them from features that can wait. A focused first release is easier to test, secure and maintain than an oversized product."],
      ["Plan the operating model", "Budget for design, development, hosting, support, updates, analytics and store requirements. Decide who will manage content, respond to support requests and maintain integrations."],
      ["Treat security and privacy as core requirements", "Collect only necessary information, explain how it is used, protect accounts and review permissions. Plan for lost devices, account recovery and secure data handling."],
      ["Validate before building", "Interview likely users, test a prototype and compare the expected benefit with the total cost. Consider whether a progressive web app or an improved web portal could meet the same need."]
      ], "Choose the channel that best serves the user and the business. The right product is the one people can use reliably and the organisation can sustain.")
  },
  {
    slug: "importance-of-regular-software-maintenance-and-updates",
    title: "Why Software Maintenance Matters After Launch",
    excerpt: "Keep digital products secure, dependable and useful with a planned approach to updates, backups and ongoing improvement.",
    category: "IT Services", date: "2023-12-30", readMinutes: 6, image: "/images/work/klaswa-learning.webp", status: "published",
    content: article("Launching software is the beginning of its operational life, not the end of the project. Dependencies change, security vulnerabilities are discovered, browsers evolve and business processes develop. Maintenance keeps a product dependable as those conditions change.",
      [["Keep dependencies and platforms current", "Review framework, plugin, operating system and service updates. Apply security fixes promptly after assessing compatibility, and avoid leaving unsupported components in production."],
      ["Back up and test recovery", "Maintain backups appropriate to the importance of the data. Test restoration procedures and document who is responsible for recovery. A backup that has never been restored is an assumption, not a proven plan."],
      ["Monitor the experience", "Check uptime, error rates, form submissions and important user journeys. Logs and alerts help teams identify problems before they become widespread."],
      ["Schedule improvement work", "Collect feedback, review analytics and prioritise usability and performance improvements. Small, regular changes can prevent a product from becoming difficult and expensive to update."]
      ], "A maintenance plan protects the investment made in software. Include it in the original project conversation, assign ownership and treat it as normal operational work.")
  },
  {
    slug: "role-of-technology-in-supporting-kenya-sme-growth",
    title: "How Technology Can Support the Growth of Kenyan SMEs",
    excerpt: "Practical ways small and medium-sized enterprises can use digital tools to improve customer access, operations and decision-making.",
    category: "Business & Technology", date: "2023-12-30", readMinutes: 7, image: "/images/work/orex-group.webp", status: "published",
    content: article("Small and medium-sized enterprises need technology that solves immediate problems without creating costs and complexity they cannot sustain. The most useful investments often begin with customer communication, reliable records and simpler operations.",
      [["Make it easier to be found and contacted", "A clear website and accurate business profiles help customers understand services, locations and contact options. Keep the experience lightweight and mobile-friendly."],
      ["Organise customer and sales information", "A structured customer record can reduce missed follow-ups and help teams understand enquiries. Start with clear fields, access controls and a process for keeping information accurate."],
      ["Connect payments and operations carefully", "Digital payment records, inventory tools and accounting systems can reduce reconciliation effort when configured properly. Confirm that systems fit local workflows and that staff understand how to handle exceptions."],
      ["Use data to make better decisions", "Track a small number of useful measures such as enquiry sources, repeat customers, stock movement or service turnaround. Review trends regularly instead of collecting data without a purpose."],
      ["Grow in stages", "Choose tools that can scale with the business and export data when needed. Avoid paying for complex features before the organisation has a process that can use them."]
      ], "Technology is not a substitute for a sound business model. It can, however, make good operations easier to repeat, measure and improve.")
  },
  {
    slug: "cybersecurity-in-kenya-protecting-your-business",
    title: "Cybersecurity Basics Every Business Should Take Seriously",
    excerpt: "A practical foundation for protecting business accounts, devices, customer information and the services your team depends on.",
    category: "Technology", date: "2023-12-30", readMinutes: 7, image: "/images/work/waa-sacco.webp", status: "published",
    content: article("Cybersecurity is an operational responsibility for businesses of every size. A compromised email account, weak password or unpatched website can disrupt service and expose information. A few consistent practices can reduce common risks.",
      [["Protect accounts", "Use unique passwords stored in a reputable password manager and enable multi-factor authentication on email, hosting, finance and administrator accounts. Remove access promptly when a staff member or supplier no longer needs it."],
      ["Keep systems updated", "Apply security updates to operating systems, websites, plugins and devices. Remove unused software and review administrator accounts regularly."],
      ["Train people to recognise suspicious requests", "Be cautious with unexpected attachments, payment changes and urgent requests for credentials. Verify sensitive instructions through a known, separate communication channel."],
      ["Limit access to information", "Give users only the permissions required for their roles. Protect customer records, avoid sharing credentials and do not expose private keys or service-role secrets in public code."],
      ["Prepare for incidents", "Maintain tested backups and document who to contact if an account or system is compromised. Know how to disable access, preserve relevant records and restore essential services."]
      ], "Security is not a one-time product purchase. It is a set of habits, controls and response plans that should be reviewed as the business changes.")
  },
  {
    slug: "how-data-analytics-can-drive-growth-for-kenyan-businesses",
    title: "Using Business Data to Make Better Decisions",
    excerpt: "Start with practical questions, trustworthy records and a small set of measures that help teams understand what is working.",
    category: "Business & Technology", date: "2025-02-17", readMinutes: 7, image: "/images/work/bob-van-transfers.webp", status: "published",
    content: article("Data analytics is useful when it helps people make a better decision. Businesses do not need a complicated dashboard to begin. They need clear questions, reliable information and a routine for reviewing what the numbers mean.",
      [["Begin with a decision", "Ask what the team needs to understand. Which services generate the most enquiries? Where do customers abandon a process? How long does it take to fulfil an order? A focused question determines what information is worth collecting."],
      ["Check data quality", "Agree on definitions, dates, categories and ownership. Duplicate records, missing values and inconsistent labels can make a polished dashboard misleading. Fix the collection process before relying on the results."],
      ["Choose a few useful indicators", "Combine outcome measures with operational measures. Revenue may show what happened, while response time or conversion by channel can help explain why. Avoid tracking metrics simply because a tool makes them easy to display."],
      ["Make reporting understandable", "Use clear labels, show the period being measured and compare like with like. Explain limitations and avoid presenting correlation as proof that one factor caused another."],
      ["Turn insight into action", "Assign an owner to each improvement, agree on a review date and check whether the change had the intended effect. Analytics should lead to a decision, not just another report."]
      ], "A simple, trusted measurement practice can help a business learn faster. Build it around decisions people need to make, then expand as the questions become more sophisticated.")
  }
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
