# Production-Ready Folder Structure

```
sada-vyah/
├── apps/
│   ├── web/                         # Next.js 15 (App Router) frontend
│   │   ├── app/
│   │   │   ├── (marketing)/         # homepage, pricing, how-it-works, about, blog
│   │   │   ├── inspiration/[category]/
│   │   │   ├── vendors/[category]/[city]/
│   │   │   ├── vendors/profile/[slug]/
│   │   │   ├── dashboard/           # couple dashboard (auth)
│   │   │   ├── vendor-dashboard/    # vendor dashboard (auth)
│   │   │   ├── admin/               # admin panel (auth)
│   │   │   ├── w/[subdomain]/       # public wedding websites
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn primitives
│   │   │   ├── dashboard/
│   │   │   ├── vendor/
│   │   │   └── marketing/
│   │   ├── lib/                     # api client, hooks, utils
│   │   ├── store/                   # zustand stores
│   │   ├── styles/
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   └── api/                         # NestJS backend
│       ├── src/
│       │   ├── auth/
│       │   ├── weddings/
│       │   ├── events/
│       │   ├── budgets/
│       │   ├── guests/
│       │   ├── rsvp/
│       │   ├── tasks/
│       │   ├── vendors/
│       │   ├── subscriptions/
│       │   ├── reviews/
│       │   ├── websites/
│       │   ├── ai/
│       │   ├── admin/
│       │   ├── analytics/
│       │   ├── common/              # guards, interceptors, decorators
│       │   ├── app.module.ts
│       │   └── main.ts
│       └── package.json
├── packages/
│   ├── db/                          # Prisma schema + client
│   │   └── prisma/schema.prisma
│   ├── ui/                          # shared design tokens / shadcn config
│   └── config/                      # shared eslint/tsconfig
├── docs/                            # this PRD + architecture set
├── package.json                     # workspaces root
├── pnpm-workspace.yaml
└── turbo.json
```
