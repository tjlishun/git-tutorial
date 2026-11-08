import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPostBySlug, getAllSlugs } from "@/lib/posts";

// ===== 关闭 instant 校验 =====
// 本页面需要在 Suspense 之外读取 params 来做 404 判断，
// 属于「允许阻塞」的路由，明确声明可避免 Next.js 16 的警告。
export const instant = false;

// ===== 静态预生成 =====
// 告诉 Next.js 有哪些 slug 需要预生成成静态页面
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ===== 页面元数据 =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "文章未找到 · Next.js" };
  }

  return {
    title: `${post.title} · Next.js`,
    description: post.excerpt,
  };
}

// ===== 详情页 =====
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // 找不到就抛出 404，由 not-found.tsx 接管
  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-1 bg-zinc-50 font-sans dark:bg-black">
      <Suspense fallback={<PostSkeleton />}>
        <PostContent />
      </Suspense>
    </div>
  );
}

// ===== 实际内容组件 =====
async function PostContent() {
  // 请求服务端 API 接口
  // 这里用的是相对路径，Next.js 会在服务端自动补全为完整 URL
  const res = await fetch("http://localhost:3000/api/hello");
  const data: { message: string } = await res.json();

  return (
    <main className="flex w-full max-w-3xl flex-1 items-center justify-center px-6 py-16 sm:px-10">
      {/* ===== 只渲染接口返回的内容 ===== */}
      <h1 className="text-center text-5xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
        {data.message}
      </h1>
    </main>
  );
}

// ===== 加载骨架 =====
function PostSkeleton() {
  return (
    <main className="flex w-full max-w-3xl flex-1 items-center justify-center px-6 py-16 sm:px-10">
      <div className="h-14 w-72 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </main>
  );
}
