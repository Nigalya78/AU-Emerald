# Graph Report - e:/work/au-emerald  (2026-06-11)

## Corpus Check
- 47 files · ~379,178 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 188 nodes · 191 edges · 31 communities (16 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Homepage & Public Pages|Homepage & Public Pages]]
- [[_COMMUNITY_API Routes & Core Components|API Routes & Core Components]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_API Route Handlers|API Route Handlers]]
- [[_COMMUNITY_Collections & Product Browsing|Collections & Product Browsing]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_NextAuth Type Declarations|NextAuth Type Declarations]]
- [[_COMMUNITY_Admin Edit Product|Admin Edit Product]]
- [[_COMMUNITY_Admin Products List|Admin Products List]]
- [[_COMMUNITY_Root Layout & Metadata|Root Layout & Metadata]]
- [[_COMMUNITY_Seed Script|Seed Script]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Luxury Design System|Luxury Design System]]
- [[_COMMUNITY_Admin Sidebar|Admin Sidebar]]
- [[_COMMUNITY_Root Layout (Semantic)|Root Layout (Semantic)]]
- [[_COMMUNITY_Motto (Semantic)|Motto (Semantic)]]
- [[_COMMUNITY_About Page (Semantic)|About Page (Semantic)]]
- [[_COMMUNITY_Contact Page (Semantic)|Contact Page (Semantic)]]
- [[_COMMUNITY_Admin Dashboard (Semantic)|Admin Dashboard (Semantic)]]
- [[_COMMUNITY_Admin Login (Semantic)|Admin Login (Semantic)]]
- [[_COMMUNITY_Package JSON (Semantic)|Package JSON (Semantic)]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Home Page` - 8 edges
3. `Product Detail Page` - 8 edges
4. `API: Products (CRUD)` - 8 edges
5. `scripts` - 6 edges
6. `Navbar` - 6 edges
7. `Footer` - 5 edges
8. `ProductsPage (Collections Client)` - 4 edges
9. `Prisma Client Singleton` - 4 edges
10. `Scroll-to-Section Navigation` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Home Page` --references--> `About`  [EXTRACTED]
  app/page.tsx → components/About.tsx
- `Home Page` --references--> `Contact`  [EXTRACTED]
  app/page.tsx → components/Contact.tsx
- `Home Page` --references--> `Hero`  [EXTRACTED]
  app/page.tsx → components/Hero.tsx
- `WhatsApp Enquiry CTA Pattern` --conceptually_related_to--> `Product Detail Page`  [INFERRED]
  components/Navbar.tsx → app/products/[id]/page.tsx
- `API: NextAuth Handler` --references--> `NextAuth Type Declarations`  [INFERRED]
  app/api/auth/[...nextauth]/route.ts → types/next-auth.d.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Homepage Section Pipeline** — comp_navbar, comp_hero, comp_collections, comp_homesavings, comp_about, comp_whychooseus, comp_contact, comp_footer [EXTRACTED 1.00]
- **Admin Product CRUD Flow** — page_adminproducts, page_adminnewproduct, page_admineditproduct, api_products, lib_prisma [EXTRACTED 1.00]
- **Public Product Discovery Flow** — comp_collections, page_productspage, page_productdetail, api_products, api_product_id [EXTRACTED 1.00]

## Communities (31 total, 15 thin omitted)

### Community 0 - "Homepage & Public Pages"
Cohesion: 0.07
Nodes (8): Product, FEATURES, COLLECTIONS, QUICK_LINKS, PLANS, NAV_LINKS, WhatsAppIconProps, Product

### Community 1 - "API Routes & Core Components"
Cohesion: 0.11
Nodes (28): API: NextAuth Handler, API: Product by ID, API: Products (CRUD), About, Collections, Contact, Footer, Hero (+20 more)

### Community 2 - "Runtime Dependencies"
Cohesion: 0.10
Nodes (19): dependencies, bcryptjs, framer-motion, lucide-react, next, next-auth, prisma, @prisma/client (+11 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 5 - "Collections & Product Browsing"
Cohesion: 0.20
Nodes (6): categories, fallbackProducts, Product, purities, stones, weightRanges

### Community 6 - "Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, autoprefixer, eslint, eslint-config-next, postcss, tailwindcss, @types/node, @types/react (+2 more)

### Community 9 - "NextAuth Type Declarations"
Cohesion: 0.50
Nodes (3): JWT, Session, User

## Knowledge Gaps
- **85 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+80 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Dev Dependencies` to `Runtime Dependencies`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _86 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Homepage & Public Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.06747638326585695 - nodes in this community are weakly interconnected._
- **Should `API Routes & Core Components` be split into smaller, more focused modules?**
  _Cohesion score 0.11375661375661375 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._