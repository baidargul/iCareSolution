import { prisma } from "@/lib/prisma-db";
import { OrderListAction } from "./OrderListAction";

const OrderList = async () => {
    const tempOrders: any = await prisma.purchase.findMany({
        orderBy: [
            {
                purchaseId: 'desc'
            }
        ]
    });

    return (
        <OrderListAction orders={tempOrders} />
    );
}

export default OrderList;