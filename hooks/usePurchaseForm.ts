import { create } from "zustand";
import { prisma } from "../lib/prisma-db";

const usePurchaseForm = create((set) => ({
  orders: [],
  fetchOrders: async () => {
    const purchaseOrders = await prisma.purchase.findMany({
      orderBy: {
        dateOfPurchase: "desc",
      },
    });
    set({ orders: purchaseOrders });
  },
}));
