import Link from "next/link";
import type { Metadata } from "next";

import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客 · Next.js",
  description: "记录 Next.js 学习笔记与前端开发心得。",
};

// ===== 博客列表页（服务端组件）=====
// async 组件可以在服务端 await 数据，
// 数据获取完成后才渲染 HTML。
export default async function BlogPage() {
  // 从服务端获取数据
  const posts = await getPosts();

  return (
    <div className="flex flex-1 bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
        {/* ===== 顶部导航 ===== */}
        <nav className="mb-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← 返回首页
          </Link>
          <span className="rounded-full border border-black/[.08] px-3 py-1 font-mono text-xs text-zinc-500 dark:border-white/[.145] dark:text-zinc-400">
            共 {posts.length} 篇
          </span>
        </nav>

        {/* ===== 标题区 ===== */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-zinc-50">
            博客
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            记录 Next.js 与前端开发的 learning 笔记 —— 从理解原理到动手实践。
          </p>
        </header>

        {/* ===== 博客卡片列表 ===== */}
        <div className="grid gap-5">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* ===== 空状态提示（posts 为空时显示）===== */}
        {posts.length === 0 && (
          <div className="rounded-xl border border-dashed border-black/[.15] py-16 text-center dark:border-white/[.2]">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              还没有文章，来写第一篇吧
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
