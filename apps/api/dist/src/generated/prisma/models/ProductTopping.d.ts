import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProductToppingModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductToppingPayload>;
export type AggregateProductTopping = {
    _count: ProductToppingCountAggregateOutputType | null;
    _avg: ProductToppingAvgAggregateOutputType | null;
    _sum: ProductToppingSumAggregateOutputType | null;
    _min: ProductToppingMinAggregateOutputType | null;
    _max: ProductToppingMaxAggregateOutputType | null;
};
export type ProductToppingAvgAggregateOutputType = {
    price: number | null;
};
export type ProductToppingSumAggregateOutputType = {
    price: number | null;
};
export type ProductToppingMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    name: string | null;
    price: number | null;
};
export type ProductToppingMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    name: string | null;
    price: number | null;
};
export type ProductToppingCountAggregateOutputType = {
    id: number;
    productId: number;
    name: number;
    price: number;
    _all: number;
};
export type ProductToppingAvgAggregateInputType = {
    price?: true;
};
export type ProductToppingSumAggregateInputType = {
    price?: true;
};
export type ProductToppingMinAggregateInputType = {
    id?: true;
    productId?: true;
    name?: true;
    price?: true;
};
export type ProductToppingMaxAggregateInputType = {
    id?: true;
    productId?: true;
    name?: true;
    price?: true;
};
export type ProductToppingCountAggregateInputType = {
    id?: true;
    productId?: true;
    name?: true;
    price?: true;
    _all?: true;
};
export type ProductToppingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductToppingWhereInput;
    orderBy?: Prisma.ProductToppingOrderByWithRelationInput | Prisma.ProductToppingOrderByWithRelationInput[];
    cursor?: Prisma.ProductToppingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductToppingCountAggregateInputType;
    _avg?: ProductToppingAvgAggregateInputType;
    _sum?: ProductToppingSumAggregateInputType;
    _min?: ProductToppingMinAggregateInputType;
    _max?: ProductToppingMaxAggregateInputType;
};
export type GetProductToppingAggregateType<T extends ProductToppingAggregateArgs> = {
    [P in keyof T & keyof AggregateProductTopping]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductTopping[P]> : Prisma.GetScalarType<T[P], AggregateProductTopping[P]>;
};
export type ProductToppingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductToppingWhereInput;
    orderBy?: Prisma.ProductToppingOrderByWithAggregationInput | Prisma.ProductToppingOrderByWithAggregationInput[];
    by: Prisma.ProductToppingScalarFieldEnum[] | Prisma.ProductToppingScalarFieldEnum;
    having?: Prisma.ProductToppingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductToppingCountAggregateInputType | true;
    _avg?: ProductToppingAvgAggregateInputType;
    _sum?: ProductToppingSumAggregateInputType;
    _min?: ProductToppingMinAggregateInputType;
    _max?: ProductToppingMaxAggregateInputType;
};
export type ProductToppingGroupByOutputType = {
    id: string;
    productId: string;
    name: string;
    price: number;
    _count: ProductToppingCountAggregateOutputType | null;
    _avg: ProductToppingAvgAggregateOutputType | null;
    _sum: ProductToppingSumAggregateOutputType | null;
    _min: ProductToppingMinAggregateOutputType | null;
    _max: ProductToppingMaxAggregateOutputType | null;
};
export type GetProductToppingGroupByPayload<T extends ProductToppingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductToppingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductToppingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductToppingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductToppingGroupByOutputType[P]>;
}>>;
export type ProductToppingWhereInput = {
    AND?: Prisma.ProductToppingWhereInput | Prisma.ProductToppingWhereInput[];
    OR?: Prisma.ProductToppingWhereInput[];
    NOT?: Prisma.ProductToppingWhereInput | Prisma.ProductToppingWhereInput[];
    id?: Prisma.StringFilter<"ProductTopping"> | string;
    productId?: Prisma.StringFilter<"ProductTopping"> | string;
    name?: Prisma.StringFilter<"ProductTopping"> | string;
    price?: Prisma.IntFilter<"ProductTopping"> | number;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ProductToppingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type ProductToppingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    productId_name?: Prisma.ProductToppingProductIdNameCompoundUniqueInput;
    AND?: Prisma.ProductToppingWhereInput | Prisma.ProductToppingWhereInput[];
    OR?: Prisma.ProductToppingWhereInput[];
    NOT?: Prisma.ProductToppingWhereInput | Prisma.ProductToppingWhereInput[];
    productId?: Prisma.StringFilter<"ProductTopping"> | string;
    name?: Prisma.StringFilter<"ProductTopping"> | string;
    price?: Prisma.IntFilter<"ProductTopping"> | number;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id" | "productId_name">;
export type ProductToppingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    _count?: Prisma.ProductToppingCountOrderByAggregateInput;
    _avg?: Prisma.ProductToppingAvgOrderByAggregateInput;
    _max?: Prisma.ProductToppingMaxOrderByAggregateInput;
    _min?: Prisma.ProductToppingMinOrderByAggregateInput;
    _sum?: Prisma.ProductToppingSumOrderByAggregateInput;
};
export type ProductToppingScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductToppingScalarWhereWithAggregatesInput | Prisma.ProductToppingScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductToppingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductToppingScalarWhereWithAggregatesInput | Prisma.ProductToppingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductTopping"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ProductTopping"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ProductTopping"> | string;
    price?: Prisma.IntWithAggregatesFilter<"ProductTopping"> | number;
};
export type ProductToppingCreateInput = {
    id?: string;
    name: string;
    price: number;
    product: Prisma.ProductCreateNestedOneWithoutToppingsInput;
};
export type ProductToppingUncheckedCreateInput = {
    id?: string;
    productId: string;
    name: string;
    price: number;
};
export type ProductToppingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutToppingsNestedInput;
};
export type ProductToppingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductToppingCreateManyInput = {
    id?: string;
    productId: string;
    name: string;
    price: number;
};
export type ProductToppingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductToppingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductToppingListRelationFilter = {
    every?: Prisma.ProductToppingWhereInput;
    some?: Prisma.ProductToppingWhereInput;
    none?: Prisma.ProductToppingWhereInput;
};
export type ProductToppingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductToppingProductIdNameCompoundUniqueInput = {
    productId: string;
    name: string;
};
export type ProductToppingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type ProductToppingAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ProductToppingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type ProductToppingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type ProductToppingSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ProductToppingCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductToppingCreateWithoutProductInput, Prisma.ProductToppingUncheckedCreateWithoutProductInput> | Prisma.ProductToppingCreateWithoutProductInput[] | Prisma.ProductToppingUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductToppingCreateOrConnectWithoutProductInput | Prisma.ProductToppingCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductToppingCreateManyProductInputEnvelope;
    connect?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
};
export type ProductToppingUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductToppingCreateWithoutProductInput, Prisma.ProductToppingUncheckedCreateWithoutProductInput> | Prisma.ProductToppingCreateWithoutProductInput[] | Prisma.ProductToppingUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductToppingCreateOrConnectWithoutProductInput | Prisma.ProductToppingCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductToppingCreateManyProductInputEnvelope;
    connect?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
};
export type ProductToppingUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductToppingCreateWithoutProductInput, Prisma.ProductToppingUncheckedCreateWithoutProductInput> | Prisma.ProductToppingCreateWithoutProductInput[] | Prisma.ProductToppingUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductToppingCreateOrConnectWithoutProductInput | Prisma.ProductToppingCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductToppingUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductToppingUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductToppingCreateManyProductInputEnvelope;
    set?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
    disconnect?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
    delete?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
    connect?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
    update?: Prisma.ProductToppingUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductToppingUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductToppingUpdateManyWithWhereWithoutProductInput | Prisma.ProductToppingUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductToppingScalarWhereInput | Prisma.ProductToppingScalarWhereInput[];
};
export type ProductToppingUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductToppingCreateWithoutProductInput, Prisma.ProductToppingUncheckedCreateWithoutProductInput> | Prisma.ProductToppingCreateWithoutProductInput[] | Prisma.ProductToppingUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductToppingCreateOrConnectWithoutProductInput | Prisma.ProductToppingCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductToppingUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductToppingUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductToppingCreateManyProductInputEnvelope;
    set?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
    disconnect?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
    delete?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
    connect?: Prisma.ProductToppingWhereUniqueInput | Prisma.ProductToppingWhereUniqueInput[];
    update?: Prisma.ProductToppingUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductToppingUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductToppingUpdateManyWithWhereWithoutProductInput | Prisma.ProductToppingUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductToppingScalarWhereInput | Prisma.ProductToppingScalarWhereInput[];
};
export type ProductToppingCreateWithoutProductInput = {
    id?: string;
    name: string;
    price: number;
};
export type ProductToppingUncheckedCreateWithoutProductInput = {
    id?: string;
    name: string;
    price: number;
};
export type ProductToppingCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductToppingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductToppingCreateWithoutProductInput, Prisma.ProductToppingUncheckedCreateWithoutProductInput>;
};
export type ProductToppingCreateManyProductInputEnvelope = {
    data: Prisma.ProductToppingCreateManyProductInput | Prisma.ProductToppingCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductToppingUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductToppingWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductToppingUpdateWithoutProductInput, Prisma.ProductToppingUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductToppingCreateWithoutProductInput, Prisma.ProductToppingUncheckedCreateWithoutProductInput>;
};
export type ProductToppingUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductToppingWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductToppingUpdateWithoutProductInput, Prisma.ProductToppingUncheckedUpdateWithoutProductInput>;
};
export type ProductToppingUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductToppingScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductToppingUpdateManyMutationInput, Prisma.ProductToppingUncheckedUpdateManyWithoutProductInput>;
};
export type ProductToppingScalarWhereInput = {
    AND?: Prisma.ProductToppingScalarWhereInput | Prisma.ProductToppingScalarWhereInput[];
    OR?: Prisma.ProductToppingScalarWhereInput[];
    NOT?: Prisma.ProductToppingScalarWhereInput | Prisma.ProductToppingScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductTopping"> | string;
    productId?: Prisma.StringFilter<"ProductTopping"> | string;
    name?: Prisma.StringFilter<"ProductTopping"> | string;
    price?: Prisma.IntFilter<"ProductTopping"> | number;
};
export type ProductToppingCreateManyProductInput = {
    id?: string;
    name: string;
    price: number;
};
export type ProductToppingUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductToppingUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductToppingUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductToppingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    name?: boolean;
    price?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productTopping"]>;
export type ProductToppingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    name?: boolean;
    price?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productTopping"]>;
export type ProductToppingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    name?: boolean;
    price?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productTopping"]>;
export type ProductToppingSelectScalar = {
    id?: boolean;
    productId?: boolean;
    name?: boolean;
    price?: boolean;
};
export type ProductToppingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "name" | "price", ExtArgs["result"]["productTopping"]>;
export type ProductToppingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductToppingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductToppingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ProductToppingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductTopping";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        name: string;
        price: number;
    }, ExtArgs["result"]["productTopping"]>;
    composites: {};
};
export type ProductToppingGetPayload<S extends boolean | null | undefined | ProductToppingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload, S>;
export type ProductToppingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductToppingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductToppingCountAggregateInputType | true;
};
export interface ProductToppingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductTopping'];
        meta: {
            name: 'ProductTopping';
        };
    };
    findUnique<T extends ProductToppingFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductToppingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductToppingClient<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductToppingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductToppingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductToppingClient<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductToppingFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductToppingFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductToppingClient<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductToppingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductToppingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductToppingClient<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductToppingFindManyArgs>(args?: Prisma.SelectSubset<T, ProductToppingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductToppingCreateArgs>(args: Prisma.SelectSubset<T, ProductToppingCreateArgs<ExtArgs>>): Prisma.Prisma__ProductToppingClient<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductToppingCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductToppingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductToppingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductToppingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductToppingDeleteArgs>(args: Prisma.SelectSubset<T, ProductToppingDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductToppingClient<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductToppingUpdateArgs>(args: Prisma.SelectSubset<T, ProductToppingUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductToppingClient<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductToppingDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductToppingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductToppingUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductToppingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductToppingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductToppingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductToppingUpsertArgs>(args: Prisma.SelectSubset<T, ProductToppingUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductToppingClient<runtime.Types.Result.GetResult<Prisma.$ProductToppingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductToppingCountArgs>(args?: Prisma.Subset<T, ProductToppingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductToppingCountAggregateOutputType> : number>;
    aggregate<T extends ProductToppingAggregateArgs>(args: Prisma.Subset<T, ProductToppingAggregateArgs>): Prisma.PrismaPromise<GetProductToppingAggregateType<T>>;
    groupBy<T extends ProductToppingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductToppingGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductToppingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductToppingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductToppingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductToppingFieldRefs;
}
export interface Prisma__ProductToppingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductToppingFieldRefs {
    readonly id: Prisma.FieldRef<"ProductTopping", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductTopping", 'String'>;
    readonly name: Prisma.FieldRef<"ProductTopping", 'String'>;
    readonly price: Prisma.FieldRef<"ProductTopping", 'Int'>;
}
export type ProductToppingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelect<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    include?: Prisma.ProductToppingInclude<ExtArgs> | null;
    where: Prisma.ProductToppingWhereUniqueInput;
};
export type ProductToppingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelect<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    include?: Prisma.ProductToppingInclude<ExtArgs> | null;
    where: Prisma.ProductToppingWhereUniqueInput;
};
export type ProductToppingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductToppingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductToppingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductToppingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelect<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    include?: Prisma.ProductToppingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductToppingCreateInput, Prisma.ProductToppingUncheckedCreateInput>;
};
export type ProductToppingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductToppingCreateManyInput | Prisma.ProductToppingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductToppingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    data: Prisma.ProductToppingCreateManyInput | Prisma.ProductToppingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductToppingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductToppingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelect<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    include?: Prisma.ProductToppingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductToppingUpdateInput, Prisma.ProductToppingUncheckedUpdateInput>;
    where: Prisma.ProductToppingWhereUniqueInput;
};
export type ProductToppingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductToppingUpdateManyMutationInput, Prisma.ProductToppingUncheckedUpdateManyInput>;
    where?: Prisma.ProductToppingWhereInput;
    limit?: number;
};
export type ProductToppingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductToppingUpdateManyMutationInput, Prisma.ProductToppingUncheckedUpdateManyInput>;
    where?: Prisma.ProductToppingWhereInput;
    limit?: number;
    include?: Prisma.ProductToppingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductToppingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelect<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    include?: Prisma.ProductToppingInclude<ExtArgs> | null;
    where: Prisma.ProductToppingWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductToppingCreateInput, Prisma.ProductToppingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductToppingUpdateInput, Prisma.ProductToppingUncheckedUpdateInput>;
};
export type ProductToppingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelect<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    include?: Prisma.ProductToppingInclude<ExtArgs> | null;
    where: Prisma.ProductToppingWhereUniqueInput;
};
export type ProductToppingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductToppingWhereInput;
    limit?: number;
};
export type ProductToppingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductToppingSelect<ExtArgs> | null;
    omit?: Prisma.ProductToppingOmit<ExtArgs> | null;
    include?: Prisma.ProductToppingInclude<ExtArgs> | null;
};
