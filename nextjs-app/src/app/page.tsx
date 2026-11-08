import HomeContent from "./HomeContent";

// ===== 首页（服务端组件）=====
// 服务端组件本身不能使用 useState 等客户端 Hook，
// 但可以「引用」客户端组件。
// 数据获取交给 HomeContent 里的 SWR 处理。
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center bg-white dark:bg-black">
        <HomeContent />
      </main>
    </div>
  );
}
