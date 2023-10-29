import { create } from "zustand";
import { FileBarChart2, FileCheck2, ScrollText, Users2Icon, Users, Landmark, Box, Glasses } from "lucide-react"


 const useNavigationMenuSideBar = create((set) => ({
    selectedPage: "overview",
   
    changePage(pageName:string) {
        set((state:any) => ({ selectedPage: pageName }));
    }
}));

export default useNavigationMenuSideBar;