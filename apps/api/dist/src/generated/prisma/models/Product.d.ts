import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProductModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductPayload>;
export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type ProductAvgAggregateOutputType = {
    price: number | null;
    stock: number | null;
    stockVersion: number | null;
};
export type ProductSumAggregateOutputType = {
    price: number | null;
    stock: number | null;
    stockVersion: number | null;
};
export type ProductMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    price: number | null;
    stock: number | null;
    stockVersion: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    price: number | null;
    stock: number | null;
    stockVersion: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProductCountAggregateOutputType = {
    id: number;
    name: number;
    price: number;
    stock: number;
    stockVersion: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProductAvgAggregateInputType = {
    price?: true;
    stock?: true;
    stockVersion?: true;
};
export type ProductSumAggregateInputType = {
    price?: true;
    stock?: true;
    stockVersion?: true;
};
export type ProductMinAggregateInputType = {
    id?: true;
    name?: true;
    price?: true;
    stock?: true;
    stockVersion?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductMaxAggregateInputType = {
    id?: true;
    name?: true;
    price?: true;
    stock?: true;
    stockVersion?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProductCountAggregateInputType = {
    id?: true;
    name?: true;
    price?: true;
    stock?: true;
    stockVersion?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductCountAggregateInputType;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProduct[P]> : Prisma.GetScalarType<T[P], AggregateProduct[P]>;
};
export type ProductGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithAggregationInput | Prisma.ProductOrderByWithAggregationInput[];
    by: Prisma.ProductScalarFieldEnum[] | Prisma.ProductScalarFieldEnum;
    having?: Prisma.ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type ProductGroupByOutputType = {
    id: string;
    name: string;
    price: number;
    stock: number;
    stockVersion: number;
    createdAt: Date;
    updatedAt: Date;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]>;
}>>;
export type ProductWhereInput = {
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    id?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringFilter<"Product"> | string;
    price?: Prisma.IntFilter<"Product"> | number;
    stock?: Prisma.IntFilter<"Product"> | number;
    stockVersion?: Prisma.IntFilter<"Product"> | number;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    sizes?: Prisma.ProductSizeListRelationFilter;
    toppings?: Prisma.ProductToppingListRelationFilter;
    orderItems?: Prisma.OrderItemListRelationFilter;
};
export type ProductOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    stockVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    sizes?: Prisma.ProductSizeOrderByRelationAggregateInput;
    toppings?: Prisma.ProductToppingOrderByRelationAggregateInput;
    orderItems?: Prisma.OrderItemOrderByRelationAggregateInput;
};
export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    name?: Prisma.StringFilter<"Product"> | string;
    price?: Prisma.IntFilter<"Product"> | number;
    stock?: Prisma.IntFilter<"Product"> | number;
    stockVersion?: Prisma.IntFilter<"Product"> | number;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    sizes?: Prisma.ProductSizeListRelationFilter;
    toppings?: Prisma.ProductToppingListRelationFilter;
    orderItems?: Prisma.OrderItemListRelationFilter;
}, "id">;
export type ProductOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    stockVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProductCountOrderByAggregateInput;
    _avg?: Prisma.ProductAvgOrderByAggregateInput;
    _max?: Prisma.ProductMaxOrderByAggregateInput;
    _min?: Prisma.ProductMinOrderByAggregateInput;
    _sum?: Prisma.ProductSumOrderByAggregateInput;
};
export type ProductScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    price?: Prisma.IntWithAggregatesFilter<"Product"> | number;
    stock?: Prisma.IntWithAggregatesFilter<"Product"> | number;
    stockVersion?: Prisma.IntWithAggregatesFilter<"Product"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Product"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Product"> | Date | string;
};
export type ProductCreateInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sizes?: Prisma.ProductSizeCreateNestedManyWithoutProductInput;
    toppings?: Prisma.ProductToppingCreateNestedManyWithoutProductInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sizes?: Prisma.ProductSizeUncheckedCreateNestedManyWithoutProductInput;
    toppings?: Prisma.ProductToppingUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sizes?: Prisma.ProductSizeUpdateManyWithoutProductNestedInput;
    toppings?: Prisma.ProductToppingUpdateManyWithoutProductNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sizes?: Prisma.ProductSizeUncheckedUpdateManyWithoutProductNestedInput;
    toppings?: Prisma.ProductToppingUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateManyInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProductUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    stockVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    stockVersion?: Prisma.SortOrder;
};
export type ProductMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    stockVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    stockVersion?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProductSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    stock?: Prisma.SortOrder;
    stockVersion?: Prisma.SortOrder;
};
export type ProductScalarRelationFilter = {
    is?: Prisma.ProductWhereInput;
    isNot?: Prisma.ProductWhereInput;
};
export type ProductCreateNestedOneWithoutSizesInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSizesInput, Prisma.ProductUncheckedCreateWithoutSizesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSizesInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutSizesNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSizesInput, Prisma.ProductUncheckedCreateWithoutSizesInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSizesInput;
    upsert?: Prisma.ProductUpsertWithoutSizesInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutSizesInput, Prisma.ProductUpdateWithoutSizesInput>, Prisma.ProductUncheckedUpdateWithoutSizesInput>;
};
export type ProductCreateNestedOneWithoutToppingsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutToppingsInput, Prisma.ProductUncheckedCreateWithoutToppingsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutToppingsInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutToppingsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutToppingsInput, Prisma.ProductUncheckedCreateWithoutToppingsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutToppingsInput;
    upsert?: Prisma.ProductUpsertWithoutToppingsInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutToppingsInput, Prisma.ProductUpdateWithoutToppingsInput>, Prisma.ProductUncheckedUpdateWithoutToppingsInput>;
};
export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutOrderItemsInput, Prisma.ProductUncheckedCreateWithoutOrderItemsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutOrderItemsInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutOrderItemsInput, Prisma.ProductUncheckedCreateWithoutOrderItemsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutOrderItemsInput;
    upsert?: Prisma.ProductUpsertWithoutOrderItemsInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutOrderItemsInput, Prisma.ProductUpdateWithoutOrderItemsInput>, Prisma.ProductUncheckedUpdateWithoutOrderItemsInput>;
};
export type ProductCreateWithoutSizesInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    toppings?: Prisma.ProductToppingCreateNestedManyWithoutProductInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutSizesInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    toppings?: Prisma.ProductToppingUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutSizesInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutSizesInput, Prisma.ProductUncheckedCreateWithoutSizesInput>;
};
export type ProductUpsertWithoutSizesInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutSizesInput, Prisma.ProductUncheckedUpdateWithoutSizesInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutSizesInput, Prisma.ProductUncheckedCreateWithoutSizesInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutSizesInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutSizesInput, Prisma.ProductUncheckedUpdateWithoutSizesInput>;
};
export type ProductUpdateWithoutSizesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toppings?: Prisma.ProductToppingUpdateManyWithoutProductNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutSizesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    toppings?: Prisma.ProductToppingUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutToppingsInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sizes?: Prisma.ProductSizeCreateNestedManyWithoutProductInput;
    orderItems?: Prisma.OrderItemCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutToppingsInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sizes?: Prisma.ProductSizeUncheckedCreateNestedManyWithoutProductInput;
    orderItems?: Prisma.OrderItemUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutToppingsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutToppingsInput, Prisma.ProductUncheckedCreateWithoutToppingsInput>;
};
export type ProductUpsertWithoutToppingsInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutToppingsInput, Prisma.ProductUncheckedUpdateWithoutToppingsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutToppingsInput, Prisma.ProductUncheckedCreateWithoutToppingsInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutToppingsInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutToppingsInput, Prisma.ProductUncheckedUpdateWithoutToppingsInput>;
};
export type ProductUpdateWithoutToppingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sizes?: Prisma.ProductSizeUpdateManyWithoutProductNestedInput;
    orderItems?: Prisma.OrderItemUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutToppingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sizes?: Prisma.ProductSizeUncheckedUpdateManyWithoutProductNestedInput;
    orderItems?: Prisma.OrderItemUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sizes?: Prisma.ProductSizeCreateNestedManyWithoutProductInput;
    toppings?: Prisma.ProductToppingCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: string;
    name: string;
    price: number;
    stock?: number;
    stockVersion?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sizes?: Prisma.ProductSizeUncheckedCreateNestedManyWithoutProductInput;
    toppings?: Prisma.ProductToppingUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutOrderItemsInput, Prisma.ProductUncheckedCreateWithoutOrderItemsInput>;
};
export type ProductUpsertWithoutOrderItemsInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutOrderItemsInput, Prisma.ProductUncheckedUpdateWithoutOrderItemsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutOrderItemsInput, Prisma.ProductUncheckedCreateWithoutOrderItemsInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutOrderItemsInput, Prisma.ProductUncheckedUpdateWithoutOrderItemsInput>;
};
export type ProductUpdateWithoutOrderItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sizes?: Prisma.ProductSizeUpdateManyWithoutProductNestedInput;
    toppings?: Prisma.ProductToppingUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    stock?: Prisma.IntFieldUpdateOperationsInput | number;
    stockVersion?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sizes?: Prisma.ProductSizeUncheckedUpdateManyWithoutProductNestedInput;
    toppings?: Prisma.ProductToppingUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCountOutputType = {
    sizes: number;
    toppings: number;
    orderItems: number;
};
export type ProductCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sizes?: boolean | ProductCountOutputTypeCountSizesArgs;
    toppings?: boolean | ProductCountOutputTypeCountToppingsArgs;
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs;
};
export type ProductCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductCountOutputTypeCountSizesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductSizeWhereInput;
};
export type ProductCountOutputTypeCountToppingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductToppingWhereInput;
};
export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderItemWhereInput;
};
export type ProductSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    price?: boolean;
    stock?: boolean;
    stockVersion?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    sizes?: boolean | Prisma.Product$sizesArgs<ExtArgs>;
    toppings?: boolean | Prisma.Product$toppingsArgs<ExtArgs>;
    orderItems?: boolean | Prisma.Product$orderItemsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    price?: boolean;
    stock?: boolean;
    stockVersion?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["product"]>;
export type ProductSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    price?: boolean;
    stock?: boolean;
    stockVersion?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["product"]>;
export type ProductSelectScalar = {
    id?: boolean;
    name?: boolean;
    price?: boolean;
    stock?: boolean;
    stockVersion?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProductOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "price" | "stock" | "stockVersion" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>;
export type ProductInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sizes?: boolean | Prisma.Product$sizesArgs<ExtArgs>;
    toppings?: boolean | Prisma.Product$toppingsArgs<ExtArgs>;
    orderItems?: boolean | Prisma.Product$orderItemsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ProductIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ProductPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Product";
    objects: {
        sizes: Prisma.$ProductSizePayload<ExtArgs>[];
        toppings: Prisma.$ProductToppingPayload<ExtArgs>[];
        orderItems: Prisma.$OrderItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        price: number;
        stock: number;
        stockVersion: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["product"]>;
    composites: {};
};
export type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductPayload, S>;
export type ProductCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCountAggregateInputType | true;
};
export interface ProductDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Product'];
        meta: {
            name: 'Product';
        };
    };
    findUnique<T extends ProductFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductFindManyArgs>(args?: Prisma.SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductCreateArgs>(args: Prisma.SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductDeleteArgs>(args: Prisma.SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductUpdateArgs>(args: Prisma.SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductUpsertArgs>(args: Prisma.SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductCountArgs>(args?: Prisma.Subset<T, ProductCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductCountAggregateOutputType> : number>;
    aggregate<T extends ProductAggregateArgs>(args: Prisma.Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>;
    groupBy<T extends ProductGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductFieldRefs;
}
export interface Prisma__ProductClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sizes<T extends Prisma.Product$sizesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$sizesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    toppings<T extends Prisma.Product$toppingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$toppingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orderItems<T extends Prisma.Product$orderItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductFieldRefs {
    readonly id: Prisma.FieldRef<"Product", 'String'>;
    readonly name: Prisma.FieldRef<"Product", 'String'>;
    readonly price: Prisma.FieldRef<"Product", 'Int'>;
    readonly stock: Prisma.FieldRef<"Product", 'Int'>;
    readonly stockVersion: Prisma.FieldRef<"Product", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Product", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Product", 'DateTime'>;
}
export type ProductFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
};
export type ProductCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type ProductUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type ProductUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
};
export type ProductDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type Product$sizesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelect<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    include?: Prisma.ProductSizeInclude<ExtArgs> | null;
    where?: Prisma.ProductSizeWhereInput;
    orderBy?: Prisma.ProductSizeOrderByWithRelationInput | Prisma.ProductSizeOrderByWithRelationInput[];
    cursor?: Prisma.ProductSizeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductSizeScalarFieldEnum | Prisma.ProductSizeScalarFieldEnum[];
};
export type Product$toppingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelect<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    include?: Prisma.ProductToppingInclude<ExtArgs> | null;
    where?: Prisma.ProductToppingWhereInput;
    orderBy?: Prisma.ProductToppingOrderByWithRelationInput | Prisma.ProductToppingOrderByWithRelationInput[];
    cursor?: Prisma.ProductToppingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductToppingScalarFieldEnum | Prisma.ProductToppingScalarFieldEnum[];
};
export type Product$orderItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderItemSelect<ExtArgs> | null;
    omit?: Prisma.OrderItemOmit<ExtArgs> | null;
    include?: Prisma.OrderItemInclude<ExtArgs> | null;
    where?: Prisma.OrderItemWhereInput;
    orderBy?: Prisma.OrderItemOrderByWithRelationInput | Prisma.OrderItemOrderByWithRelationInput[];
    cursor?: Prisma.OrderItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderItemScalarFieldEnum | Prisma.OrderItemScalarFieldEnum[];
};
export type ProductDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
};
