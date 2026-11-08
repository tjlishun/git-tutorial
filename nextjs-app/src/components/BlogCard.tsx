import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/lib/posts";

// ===== 服务端组件 =====
// 注意：这里没有 "use client"，所以它是 Server Component。
// 组件在服务端渲染成 HTML，浏览器不需要为它下载任何 JS。
type BlogCardProps = {
  post: Post;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden py-0 transition-all hover:border-black/[.2] hover:shadow-md dark:hover:border-white/[.3]">
      {/* ===== 封面图 ===== */}
      {/* next/image 会自动：懒加载、响应式尺寸、格式优化（WebP/AVIF）、防布局抖动 */}
      <Link href={`/blog/${post.slug}`} className="relative block overflow-hidden">
        <Image
          src={post.coverImage}
          alt={`${post.title} - 文章封面`}
          width={1200}
          height={630}
          // 16:9 比例裁切，容器高度用 aspect-ratio 锁定
          className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          // 优先加载首屏图片，其余懒加载
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 896px"
        />
      </Link>

      <CardHeader>
        {/* 标签和日期 */}
        <div className="mb-1 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-black px-2.5 py-1 font-mono text-xs font-medium text-white dark:bg-white dark:text-black">
            {post.tag}
          </span>
          <time
            dateTime={post.date}
            className="font-mono text-xs text-muted-foreground"
          >
            {post.date}
          </time>
          <span className="text-xs text-muted-foreground">· 约 {post.readTime}</span>
        </div>

        {/* 标题 */}
        <CardTitle className="text-xl font-bold tracking-tight transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>

        {/* 摘要 */}
        <CardDescription className="text-sm leading-7">
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      {/* ===== 卡片底部：阅读链接 ===== */}
      <CardFooter>
        {/* asChild 让 Button 渲染成内部的 <Link>，而不是 <button> */}
        <Button asChild variant="outline" size="sm">
          <Link href={`/blog/${post.slug}`}>
            阅读全文
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
