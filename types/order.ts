export interface Order {
    _id: string;
    orderId: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    orderData: {
        fullName: string;
        phone: string;
        addressLine:string;
        city: string;
    };
};