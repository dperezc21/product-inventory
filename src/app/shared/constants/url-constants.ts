import {environment} from '../../../environments/environment';

export const INVENTORY_MANAGEMENT_URL: string = environment.PRODUCT_INVENTORY_URL;

export const PRODUCT_BASE_URL: string = `${INVENTORY_MANAGEMENT_URL}/products`;
export const CATEGORY_BASE_URL: string = `${INVENTORY_MANAGEMENT_URL}/categories`;
