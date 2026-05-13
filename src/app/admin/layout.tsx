import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ink">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8">{children}</main>
    </div>
  );
}
