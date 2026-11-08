// ===== 博客数据类型 =====
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  readTime: string;
  // 封面图 URL（来自开源图片库 Unsplash）
  coverImage: string;
  content: string[];
};

// ===== Mock 原始数据 =====
// 模拟「数据库里的表」，平时存在数据库中
const mockPosts: Post[] = [
  {
    slug: "nextjs-intro",
    title: "Next.js 入门：从零搭建第一个项目",
    excerpt:
      "理解 App Router 的文件路由规则，学会用文件夹和 page.tsx 创建页面，以及 Server Components 与客户端组件的区别。",
    date: "2026-11-01",
    tag: "Next.js",
    readTime: "8 分钟",
    // 封面图：Unsplash 开源图片库
    // 参数说明：w=1200 宽度，q=80 质量，auto=format 自动选择 WebP/AVIF
    coverImage:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&q=80&auto=format&fit=crop",
    content: [
      "Next.js 是一个基于 React 的全栈框架，它把前端开发中那些重复繁琐的配置工作（路由、构建优化、图片处理、部署）全部内置，让你专注业务逻辑本身。",
      "传统的 React 项目需要自己配置打包工具、代码分割策略、服务器渲染方案。Next.js 用约定代替配置：你在正确的位置放正确的文件，框架就自动完成剩下的事。",
      "App Router 是 Next.js 13 之后推荐的路由方式。它的核心规则很简单——在 src/app 目录下创建文件夹，文件夹名字就是路由路径，文件夹里的 page.tsx 就是这个路由的页面。",
      "比如创建 app/blog/page.tsx，访问 /blog 就能看到内容；创建 app/blog/[slug]/page.tsx，则 /blog/任意内容 都能匹配到，由 slug 参数决定显示什么。",
      "另一个重要概念是 Server Components。默认情况下组件在服务端渲染，只把 HTML 发送给浏览器，只有需要交互（点击、输入、状态）的部分才在客户端运行。这能显著减少首屏加载的 JavaScript 体积。",
      "最后别忘了 not-found.tsx 这个特殊文件。它会自动处理所有找不到的路由，返回 404 状态码，并渲染你定义的界面。这是构建友好型网站的基础配置。",
    ],
  },
  {
    slug: "tailwind-in-practice",
    title: "Tailwind CSS 实战：原子化类名的正确用法",
    excerpt:
      "理解为什么 Tailwind 不需要写 CSS 文件也能做出复杂布局，掌握响应式断点、Flexbox 与 Grid 的实用组合。",
    date: "2026-11-05",
    tag: "CSS",
    readTime: "6 分钟",
    // 封面图：Unsplash 开源图片库
    // 参数说明：w=1200 宽度，q=80 质量，auto=format 自动选择 WebP/AVIF
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    content: [
      "Tailwind CSS 的核心理念是「原子化」——把样式拆成一个个单一职责的小类，比如 flex、items-center、gap-4，然后在 HTML 里组合使用。",
      "刚开始会觉得类名很长很啰嗦，但用熟之后会发现它带来了三个好处：不用再为元素起类名、不用担心 CSS 命名冲突、不用在多个文件之间跳转查找样式。",
      "响应式是 Tailwind 最大的杀手锏。前缀 sm:、md:、lg:、xl: 表示断点，例如 flex-col md:flex-row 意味着小屏上下排列，大屏左右排列，只需要加一个前缀就完成了响应式布局。",
      "Flexbox 处理一维布局（横向或纵向），Grid 处理二维布局。实际开发中先想清楚方向：文字行排布用 flex，卡片网格用 grid。",
      "关于暗色模式，Tailwind 4 默认跟随系统偏好。只要给 html 加上 dark: 前缀类名，系统切换深色时样式会自动跟着变，不需要写任何额外的 JavaScript。",
      "最后提醒一点：Tailwind 不是要取代 CSS 本身，而是补充它。遇到复杂的动画、伪元素或者第三方组件覆盖时，该写 CSS 还是得写。工具是为效率服务的，不是为教条服务的。",
    ],
  },
];

// ===== 服务端数据获取函数 =====
// 用 async + await 模拟真实的数据请求过程。
// "use cache" 让 Next.js 缓存这个函数的结果：
// 构建时就能确定数据，预渲染成静态页面。
// 以后接入数据库或 API 时，只需要改这个函数内部实现，
// 所有调用它的组件代码都不用动。
export async function getPosts(): Promise<Post[]> {
  "use cache";

  // 模拟网络延迟，让加载状态更接近真实场景
  await new Promise((resolve) => setTimeout(resolve, 100));

  return mockPosts;
}

// 按 slug 查找单篇文章
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  "use cache";

  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

// 获取所有文章的 slug，用于静态预生成
export async function getAllSlugs(): Promise<string[]> {
  "use cache";

  const posts = await getPosts();
  return posts.map((post) => post.slug);
}
