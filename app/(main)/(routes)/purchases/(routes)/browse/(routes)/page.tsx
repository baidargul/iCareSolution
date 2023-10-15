import { ScrollArea } from "@/components/ui/scroll-area";
import OrderList from "../components/OrdersList";

const PurchasesPage = () => {
    return (
        <div className="">
            <div className="font-semibold text-xl text-theme-BlackPointer mb-10">
                Purchase Orders
            </div>
            <div className="flex justify-between items-center gap-2">
                <div className="bg-white border border-slate-300 rounded p-2 h-[515px] w-72">
                    <OrderList />
                </div>

                <div className="bg-white border border-slate-300 rounded p-2 h-[515px] w-full">

                </div>
            </div>
        </div>
    );
}

export default PurchasesPage;