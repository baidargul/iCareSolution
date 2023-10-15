import NavigationMenuSideBar from "@/components/sideBars/NavigationMenuSideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <NavigationMenuSideBar />
            {children}
        </div>

    );
}

export default Layout;