// constants/order.ts
export enum TOrder {
  OLDEST = "asc",
  NEWEST = "desc",
}

export const ORDER_LABEL = {
  [TOrder.OLDEST]: "오래된 순",
  [TOrder.NEWEST]: "최신 순",
};
