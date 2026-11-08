"use client";

import useSWR from "swr";
import { RefreshCw } from "lucide-react";

import type { HelloResponse } from "@/app/api/hello/route";

// ===== SWR fetcher =====
// SWR 只会用一个 fetcher 函数处理所有请求。
// 这个函数接收 key（请求地址），返回解析后的 JSON。
async function fetcher(url: string): Promise<HelloResponse> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("请求失败");
  }
  return res.json();
}

// ===== 客户端组件 =====
export default function HomeContent() {
  // useSWR(key, fetcher, options)
  // key 是请求地址；传 null 可以暂停请求
  const { data, error, isLoading, mutate } = useSWR<HelloResponse>(
    "/api/hello",
    fetcher,
    {
      // 页面重新聚焦时自动重新验证
      revalidateOnFocus: true,
      // 重复请求去重间隔（毫秒）
      dedupingInterval: 2000,
    }
  );

  // ===== 加载中 =====
  if (isLoading) {
    return (
      <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center px-6 py-32">
        <div className="h-12 w-64 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">加载中...</p>
      </div>
    );
  }

  // ===== 出错 =====
  if (error) {
    return (
      <div className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center px-6 py-32 text-center">
        <p className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">
          加载失败
        </p>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          {error.message}
        </p>
        <button
          onClick={() => mutate()}
          className="flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          <RefreshCw className="mr-2 size-4" />
          重试
        </button>
      </div>
    );
  }

  // ===== 成功 =====
  return (
    <div className="flex flex-1 w-full max-w-3xl flex-col items-center px-6 py-20 sm:px-10">
      {/* 接口返回的主信息 */}
      <h1 className="text-center text-5xl font-bold tracking-tight text-black dark:text-zinc-50 sm:text-6xl">
        {data?.message}
      </h1>

      <p className="mt-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        {data?.timestamp}
      </p>

      {/* 接口返回的列表数据 */}
      <ul className="mt-12 w-full space-y-3">
        {data?.items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-black/[.08] bg-white p-5 dark:border-white/[.145] dark:bg-zinc-900"
          >
            <h2 className="mb-1.5 text-base font-semibold text-black dark:text-zinc-50">
              {item.name}
            </h2>
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          </li>
        ))}
      </ul>

      {/* 手动刷新：mutate() 会重新请求数据 */}
      <button
        onClick={() => mutate()}
        className="mt-8 flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-5 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      >
        <RefreshCw className="size-4" />
        刷新数据
      </button>
    </div>
  );
}
