"use client"
export default function AdminLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="bg-gray-100 ml-64">
        {children}
        </div>
    );
}
