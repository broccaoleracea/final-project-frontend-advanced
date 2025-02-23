export const metadata = {
    title: "GacorCihuy - Admin",
    description: "Segala kebutuhanmu, ada disini!",
    icons: {
        icon: "/logo/key-lineal-color.ico",
    },
};
export default function AdminLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="bg-gray-100 ml-64">
        {children}
        </div>
    );
}
