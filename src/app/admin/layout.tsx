import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink">
      <AdminSidebar />
      {/* Desktop: offset for sidebar. Mobile: offset for top bar + bottom bar */}
      <main className="flex-1 md:ml-56 pt-14 md:pt-0 pb-20 md:pb-0 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
