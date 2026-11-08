import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Next.js",
  description: "了解 Next.js —— 由 Vercel 打造的开源 React 框架",
};

const features = [
  {
    icon: "⚡",
    title: "Server Components",
    desc: "组件在服务端渲染成纯 HTML，只有交互部分才下发 JS，页面首屏更快。",
  },
  {
    icon: "🖼️",
    title: "内置图片与字体优化",
    desc: "next/image 与 next/font 自动做尺寸裁剪、格式转换与预加载，无需额外配置。",
  },
  {
    icon: "🗺️",
    title: "基于文件系统的路由",
    desc: "在 app 目录里新建文件就自动生成路由，无需手动维护路由表。",
  },
  {
    icon: "📡",
    title: "Server Actions",
    desc: "直接写 async 函数在服务端执行数据变更，一次网络往返完成读写。",
  },
  {
    icon: "🔌",
    title: "Route Handlers",
    desc: "在 app/api 下写函数即可提供 REST 风格的 API 接口。",
  },
  {
    icon: "🌍",
    title: "多语言与暗色模式",
    desc: "内置 i18n 路由与暗色模式支持，SEO 友好地输出多语言元信息。",
  },
];

const stack = [
  { name: "React", desc: "UI 基础" },
  { name: "TypeScript", desc: "类型安全" },
  { name: "Tailwind CSS", desc: "原子化样式" },
  { name: "Turbopack", desc: "Rust 编写的高速打包器" },
  { name: "App Router", desc: "RSC + 流式渲染" },
  { name: "Edge Runtime", desc: "全球边缘部署" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
        {/* ===== 顶部导航 ===== */}
        <nav className="mb-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← 返回首页
          </Link>
        </nav>

        {/* ===== Hero ===== */}
        <section className="mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-full bg-black px-3 py-1 font-mono text-xs font-semibold tracking-wide text-white dark:bg-white dark:text-black">
              NEXT.JS
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              The React Framework
            </span>
          </div>

          <h1 className="mb-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl dark:text-zinc-50">
            用 React 构建
            <br />
            高质量 Web 应用
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Next.js 是由 Vercel 打造的开源 React 框架，
            已被《华盛顿邮报》、Sony、Sonos、Notion 等众多公司用于生产环境。
            它把 React 的开发体验与生产环境所需的性能优化打包在一起，
            让你既写得出好的代码，也部署得快。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              阅读文档
            </a>
            <a
              href="https://github.com/vercel/next.js"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* ===== 核心特性 ===== */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
            核心特性
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-black/[.08] bg-white p-5 transition-colors hover:border-black/[.2] dark:border-white/[.145] dark:bg-zinc-900 dark:hover:border-white/[.3]"
              >
                <div className="mb-3 text-2xl">{f.icon}</div>
                <h3 className="mb-1.5 font-semibold text-black dark:text-zinc-50">
                  {f.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 技术栈 ===== */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
            技术栈
          </h2>

          <div className="overflow-hidden rounded-xl border border-black/[.08] dark:border-white/[.145]">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-100 dark:bg-zinc-900">
                <tr>
                  <th className="px-5 py-3 font-semibold text-black dark:text-zinc-50">
                    名称
                  </th>
                  <th className="px-5 py-3 font-semibold text-black dark:text-zinc-50">
                    说明
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[.06] bg-white dark:divide-white/[.08] dark:bg-zinc-950">
                {stack.map((s, i) => (
                  <tr key={s.name}>
                    <td className="px-5 py-3 font-mono font-medium text-black dark:text-zinc-50">
                      {s.name}
                    </td>
                    <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400">
                      {s.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== 渲染模式 ===== */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
            渲染模式
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-900">
              <h3 className="mb-2 font-semibold text-black dark:text-zinc-50">
                静态渲染 (SSG)
              </h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                构建时生成纯静态 HTML，部署到 CDN 边缘节点，访问延迟最低。
              </p>
            </div>
            <div className="rounded-xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-900">
              <h3 className="mb-2 font-semibold text-black dark:text-zinc-50">
                服务端渲染 (SSR)
              </h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                请求时在服务端渲染，适合内容随用户或时间变化的场景。
              </p>
            </div>
            <div className="rounded-xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-900">
              <h3 className="mb-2 font-semibold text-black dark:text-zinc-50">
                增量静态再生 (ISR)
              </h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                静态页在后台定时重新生成，兼顾速度与内容新鲜度。
              </p>
            </div>
            <div className="rounded-xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-900">
              <h3 className="mb-2 font-semibold text-black dark:text-zinc-50">
                流式渲染 (Streaming)
              </h3>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                页面分块逐步推送，无需等待整个页面渲染完成。
              </p>
            </div>
          </div>
        </section>

        {/* ===== 快速上手 ===== */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
            快速上手
          </h2>

          <div className="overflow-x-auto rounded-xl border border-black/[.08] bg-zinc-950 dark:border-white/[.145]">
            <pre className="p-5 font-mono text-sm leading-7 text-zinc-100">
              <code>{`# 创建新项目
npx create-next-app@latest my-app

# 进入目录并启动开发服务器
cd my-app
npm run dev

# 生产构建与启动
npm run build
npm run start`}</code>
            </pre>
          </div>
        </section>

        {/* ===== 结语 ===== */}
        <section className="rounded-xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-zinc-900">
          <h2 className="mb-2 text-xl font-bold tracking-tight text-black dark:text-zinc-50">
            为什么选择 Next.js？
          </h2>
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            Next.js 把「前端框架」和「生产环境所需的基础设施」合为一体：
            路由、构建优化、图片处理、字体加载、缓存策略、API 端点、
            部署流程全部开箱即用。你只需要专注业务逻辑本身，
            其余交给框架与 Turbopack。
          </p>
        </section>
      </main>
    </div>
  );
}
