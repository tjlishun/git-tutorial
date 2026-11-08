import { NextResponse } from "next/server";

// ===== Route Handler =====
// 文件路径 src/app/api/hello/route.ts → 对应接口 /api/hello
// route.ts 是 Next.js 的「API 端点」约定文件名，
// 和 page.tsx 一样靠文件系统约定，不需要任何配置。

export type HelloResponse = {
  message: string;
  timestamp: string;
  items: { id: number; name: string; description: string }[];
};

// GET /api/hello
export async function GET() {
  const data: HelloResponse = {
    message: "hello next.js",
    timestamp: new Date().toISOString(),
    items: [
      {
        id: 1,
        name: "Server Components",
        description: "默认在服务端渲染，只把 HTML 发给浏览器",
      },
      {
        id: 2,
        name: "Route Handlers",
        description: "基于文件系统的 API 端点，支持 GET/POST 等方法",
      },
      {
        id: 3,
        name: "SWR",
        description: "Stale-While-Revalidate，让数据获取更简单",
      },
    ],
  };

  return NextResponse.json(data);
}
