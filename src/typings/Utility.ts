export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
