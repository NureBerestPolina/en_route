export interface AddGood {
    name: string;
    description: string;
    measurementUnit: string;
    needsCooling: boolean;
    price: number;
    amountInStock: number;
    producerId: string;
    categoryId: string;
    organizationId: string;
}