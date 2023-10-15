import React from "react";
import PurchasesPageHeader from "./components/Header";
import PurchasePageFooter from "./components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen bg-theme-BlackPointer/70 p-2">
            <PurchasesPageHeader />
            <div className=" bg-theme-Slate h-[600px] p-2">
                {
                    children
                }
            </div>

            <PurchasePageFooter/>
        </div>
    );
}

export default Layout;