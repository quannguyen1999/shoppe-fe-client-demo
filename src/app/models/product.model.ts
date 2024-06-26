export interface Product {
    id?: number,
    name?: string,
    image?: string,
    quantity?: number,
    price?: number, 
    discount?: number,
    description?: string
}


export interface ProductRequestModel {
    id?: string,
    name?: string | null,
    image?: string | null,
    quantity?: number | null,
    price?: number | null,
    discount?: number | null, 
    idCategory?: string | null,

    //Search
    createFromDate?: Date | null,
    createToDate?: Date | null,
    listSorted?: any[] | null,
    listFields?: any[] | undefined,
    isGetTopProduct?: boolean,
    isSuggestProduct?: boolean

}

export const ID: string = 'id';
export const NAME: string = 'name';
export const IMAGE: string = 'image';
export const QUANTITY: string = 'quantity';
export const ID_CATEGORY: string = 'idCategory';
export const CATEGORY: string = 'category';
export const PRICE: string = 'price';
export const DISCOUNT: string = 'discount';
export const DESCRIPTION: string = 'description';
export const CREATED_AT: string = 'createdAt';
export const UPDATED_AT: string = 'updatedAt';