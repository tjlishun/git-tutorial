import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 · 页面不存在",
  description: "你访问的页面不存在或已被移动。",
};

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-24 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center text-center">
        {/* 404 大字 */}
        <span className="text-7xl font-bold tracking-tighter text-black dark:text-zinc-50 sm:text-8xl">
          404
        </span>

        {/* 装饰线 */}
        <div className="mb-8 mt-6 h-px w-16 bg-zinc-300 dark:bg-zinc-700" />

        <h1 className="mb-4 text-2xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-3xl">
          页面走丢了
        </h1>

        <p className="mb-10 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
          你访问的地址不存在，可能已被移动或删除。
          别担心，往下看看也许能找回你想要的。
        </p>

        {/* 操作按钮 */}
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            返回首页
          </Link>
          <Link
            href="/about"
            className="flex h-11 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            看看 Next.js 介绍
          </Link>
        </div>

        {/* 提示 */}
        <p className="mt-12 font-mono text-xs text-zinc-400 dark:text-zinc-600">
          Next.js App Router · not-found.tsx
        </p>
      </main>
    </div>
  );
}
