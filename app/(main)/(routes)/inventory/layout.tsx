import React from "react";
import InventoryPageHeader from "./components/Header";
import InventoryPageFooter from "./components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen bg-theme-BlackPointer/70 p-2">
            <InventoryPageHeader />
            <div className=" bg-theme-Slate h-[600px] p-2">
                {
                    children
                }
            </div>

            <InventoryPageFooter />
        </div>
    );
}

export default Layout;