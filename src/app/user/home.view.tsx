import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100 p-6">
      <nav className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">daisyUI</h1>
        <div className="space-x-4">
          <button className="btn btn-primary">Components</button>
          <button className="btn btn-secondary">Store</button>
          <button className="btn">Theme</button>
        </div>
      </nav>

      <header className="text-center mt-12">
        <h2 className="text-5xl font-bold">
          The most popular <span className="text-primary">component library</span> for Tailwind CSS
        </h2>
        <p className="mt-4 text-lg">
          daisyUI adds component class names to Tailwind CSS so you can make beautiful websites faster than ever.
        </p>
        <div className="mt-6">
          <button className="btn btn-primary">Discord</button>
          <button className="btn btn-neutral ml-4">How to use?</button>
        </div>
      </header>

      <section className="mt-12 flex justify-center">
        <div className="card bg-base-200 p-6 shadow-xl">
          <h3 className="text-xl font-semibold">Design System</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <button className="btn btn-xs">checkbox-xs</button>
            <button className="btn btn-sm">checkbox-sm</button>
            <button className="btn btn-md">checkbox-md</button>
          </div>
        </div>
      </section>
    </div>
  );
}
