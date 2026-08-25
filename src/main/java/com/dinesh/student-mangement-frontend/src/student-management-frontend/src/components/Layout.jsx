import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ 
  children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-40 right-[-80px] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-1/3 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Right content area */}
        <div className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className=" w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;