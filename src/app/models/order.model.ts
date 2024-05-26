export interface Order {
    id?: number,
    orderDate?: Date,
    shipCity?: string,
    shippedDate?: Date,
    shipRegion?: string,
    username?: string,
    phone?: string,
    address?: string,
    name?: string,
    email?: string,
    createdAt?: Date,
    updatedAt?: Date,
    orderDetailRequestDtoList? : OrderDetailRequestDto[]
}

export interface OrderDetailRequestDto{

    name?: string,
    price?: number, 
    image?: string,
    description?: string
    productId?: number,
    position?: number,
    discount?: number,
    quantity?: number,
    totalAmount?: number
}


export interface OrderRequestModel {
    id: string,
    orderFromDate?: Date | null,
    orderToDate?: Date | null,
    shipCity?: string | null,
    shippedFromDate?: Date | null,
    shippedToDate?: Date | null,
    shipRegion?: string | null,
    username?: string | null,

    //Search
    createFromDate?: Date | null,
    createToDate?: Date | null,
    listSorted?: any[] | null
    listFields?: any[] | undefined
}

export const ID: string = 'id';
export const ORDER_DATE: string = 'orderDate';
export const SHIP_CITY: string = 'shipCity';
export const SHIPPED_DATE: string = 'shippedDate';
export const SHIP_REGION: string = 'shipRegion';
export const USERNAME: string = 'username';
export const CREATED_AT: string = 'createdAt';
export const UPDATED_AT: string = 'updatedAt';


