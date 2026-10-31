import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProductSizeModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductSizePayload>;
export type AggregateProductSize = {
    _count: ProductSizeCountAggregateOutputType | null;
    _avg: ProductSizeAvgAggregateOutputType | null;
    _sum: ProductSizeSumAggregateOutputType | null;
    _min: ProductSizeMinAggregateOutputType | null;
    _max: ProductSizeMaxAggregateOutputType | null;
};
export type ProductSizeAvgAggregateOutputType = {
    price: number | null;
};
export type ProductSizeSumAggregateOutputType = {
    price: number | null;
};
export type ProductSizeMinAggregateOutputType = {
    id: string | null;
    productId: string | null;
    name: string | null;
    price: number | null;
};
export type ProductSizeMaxAggregateOutputType = {
    id: string | null;
    productId: string | null;
    name: string | null;
    price: number | null;
};
export type ProductSizeCountAggregateOutputType = {
    id: number;
    productId: number;
    name: number;
    price: number;
    _all: number;
};
export type ProductSizeAvgAggregateInputType = {
    price?: true;
};
export type ProductSizeSumAggregateInputType = {
    price?: true;
};
export type ProductSizeMinAggregateInputType = {
    id?: true;
    productId?: true;
    name?: true;
    price?: true;
};
export type ProductSizeMaxAggregateInputType = {
    id?: true;
    productId?: true;
    name?: true;
    price?: true;
};
export type ProductSizeCountAggregateInputType = {
    id?: true;
    productId?: true;
    name?: true;
    price?: true;
    _all?: true;
};
export type ProductSizeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductSizeWhereInput;
    orderBy?: Prisma.ProductSizeOrderByWithRelationInput | Prisma.ProductSizeOrderByWithRelationInput[];
    cursor?: Prisma.ProductSizeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductSizeCountAggregateInputType;
    _avg?: ProductSizeAvgAggregateInputType;
    _sum?: ProductSizeSumAggregateInputType;
    _min?: ProductSizeMinAggregateInputType;
    _max?: ProductSizeMaxAggregateInputType;
};
export type GetProductSizeAggregateType<T extends ProductSizeAggregateArgs> = {
    [P in keyof T & keyof AggregateProductSize]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductSize[P]> : Prisma.GetScalarType<T[P], AggregateProductSize[P]>;
};
export type ProductSizeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductSizeWhereInput;
    orderBy?: Prisma.ProductSizeOrderByWithAggregationInput | Prisma.ProductSizeOrderByWithAggregationInput[];
    by: Prisma.ProductSizeScalarFieldEnum[] | Prisma.ProductSizeScalarFieldEnum;
    having?: Prisma.ProductSizeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductSizeCountAggregateInputType | true;
    _avg?: ProductSizeAvgAggregateInputType;
    _sum?: ProductSizeSumAggregateInputType;
    _min?: ProductSizeMinAggregateInputType;
    _max?: ProductSizeMaxAggregateInputType;
};
export type ProductSizeGroupByOutputType = {
    id: string;
    productId: string;
    name: string;
    price: number;
    _count: ProductSizeCountAggregateOutputType | null;
    _avg: ProductSizeAvgAggregateOutputType | null;
    _sum: ProductSizeSumAggregateOutputType | null;
    _min: ProductSizeMinAggregateOutputType | null;
    _max: ProductSizeMaxAggregateOutputType | null;
};
export type GetProductSizeGroupByPayload<T extends ProductSizeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductSizeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductSizeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductSizeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductSizeGroupByOutputType[P]>;
}>>;
export type ProductSizeWhereInput = {
    AND?: Prisma.ProductSizeWhereInput | Prisma.ProductSizeWhereInput[];
    OR?: Prisma.ProductSizeWhereInput[];
    NOT?: Prisma.ProductSizeWhereInput | Prisma.ProductSizeWhereInput[];
    id?: Prisma.StringFilter<"ProductSize"> | string;
    productId?: Prisma.StringFilter<"ProductSize"> | string;
    name?: Prisma.StringFilter<"ProductSize"> | string;
    price?: Prisma.IntFilter<"ProductSize"> | number;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
};
export type ProductSizeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
};
export type ProductSizeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    productId_name?: Prisma.ProductSizeProductIdNameCompoundUniqueInput;
    AND?: Prisma.ProductSizeWhereInput | Prisma.ProductSizeWhereInput[];
    OR?: Prisma.ProductSizeWhereInput[];
    NOT?: Prisma.ProductSizeWhereInput | Prisma.ProductSizeWhereInput[];
    productId?: Prisma.StringFilter<"ProductSize"> | string;
    name?: Prisma.StringFilter<"ProductSize"> | string;
    price?: Prisma.IntFilter<"ProductSize"> | number;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
}, "id" | "productId_name">;
export type ProductSizeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    _count?: Prisma.ProductSizeCountOrderByAggregateInput;
    _avg?: Prisma.ProductSizeAvgOrderByAggregateInput;
    _max?: Prisma.ProductSizeMaxOrderByAggregateInput;
    _min?: Prisma.ProductSizeMinOrderByAggregateInput;
    _sum?: Prisma.ProductSizeSumOrderByAggregateInput;
};
export type ProductSizeScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductSizeScalarWhereWithAggregatesInput | Prisma.ProductSizeScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductSizeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductSizeScalarWhereWithAggregatesInput | Prisma.ProductSizeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProductSize"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"ProductSize"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ProductSize"> | string;
    price?: Prisma.IntWithAggregatesFilter<"ProductSize"> | number;
};
export type ProductSizeCreateInput = {
    id?: string;
    name: string;
    price: number;
    product: Prisma.ProductCreateNestedOneWithoutSizesInput;
};
export type ProductSizeUncheckedCreateInput = {
    id?: string;
    productId: string;
    name: string;
    price: number;
};
export type ProductSizeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
    product?: Prisma.ProductUpdateOneRequiredWithoutSizesNestedInput;
};
export type ProductSizeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductSizeCreateManyInput = {
    id?: string;
    productId: string;
    name: string;
    price: number;
};
export type ProductSizeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductSizeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductSizeListRelationFilter = {
    every?: Prisma.ProductSizeWhereInput;
    some?: Prisma.ProductSizeWhereInput;
    none?: Prisma.ProductSizeWhereInput;
};
export type ProductSizeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductSizeProductIdNameCompoundUniqueInput = {
    productId: string;
    name: string;
};
export type ProductSizeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type ProductSizeAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ProductSizeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type ProductSizeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type ProductSizeSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ProductSizeCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductSizeCreateWithoutProductInput, Prisma.ProductSizeUncheckedCreateWithoutProductInput> | Prisma.ProductSizeCreateWithoutProductInput[] | Prisma.ProductSizeUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductSizeCreateOrConnectWithoutProductInput | Prisma.ProductSizeCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductSizeCreateManyProductInputEnvelope;
    connect?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
};
export type ProductSizeUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductSizeCreateWithoutProductInput, Prisma.ProductSizeUncheckedCreateWithoutProductInput> | Prisma.ProductSizeCreateWithoutProductInput[] | Prisma.ProductSizeUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductSizeCreateOrConnectWithoutProductInput | Prisma.ProductSizeCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductSizeCreateManyProductInputEnvelope;
    connect?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
};
export type ProductSizeUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductSizeCreateWithoutProductInput, Prisma.ProductSizeUncheckedCreateWithoutProductInput> | Prisma.ProductSizeCreateWithoutProductInput[] | Prisma.ProductSizeUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductSizeCreateOrConnectWithoutProductInput | Prisma.ProductSizeCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductSizeUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductSizeUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductSizeCreateManyProductInputEnvelope;
    set?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
    disconnect?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
    delete?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
    connect?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
    update?: Prisma.ProductSizeUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductSizeUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductSizeUpdateManyWithWhereWithoutProductInput | Prisma.ProductSizeUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductSizeScalarWhereInput | Prisma.ProductSizeScalarWhereInput[];
};
export type ProductSizeUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductSizeCreateWithoutProductInput, Prisma.ProductSizeUncheckedCreateWithoutProductInput> | Prisma.ProductSizeCreateWithoutProductInput[] | Prisma.ProductSizeUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductSizeCreateOrConnectWithoutProductInput | Prisma.ProductSizeCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductSizeUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductSizeUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductSizeCreateManyProductInputEnvelope;
    set?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
    disconnect?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
    delete?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
    connect?: Prisma.ProductSizeWhereUniqueInput | Prisma.ProductSizeWhereUniqueInput[];
    update?: Prisma.ProductSizeUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductSizeUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductSizeUpdateManyWithWhereWithoutProductInput | Prisma.ProductSizeUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductSizeScalarWhereInput | Prisma.ProductSizeScalarWhereInput[];
};
export type ProductSizeCreateWithoutProductInput = {
    id?: string;
    name: string;
    price: number;
};
export type ProductSizeUncheckedCreateWithoutProductInput = {
    id?: string;
    name: string;
    price: number;
};
export type ProductSizeCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductSizeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductSizeCreateWithoutProductInput, Prisma.ProductSizeUncheckedCreateWithoutProductInput>;
};
export type ProductSizeCreateManyProductInputEnvelope = {
    data: Prisma.ProductSizeCreateManyProductInput | Prisma.ProductSizeCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductSizeUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductSizeWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductSizeUpdateWithoutProductInput, Prisma.ProductSizeUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductSizeCreateWithoutProductInput, Prisma.ProductSizeUncheckedCreateWithoutProductInput>;
};
export type ProductSizeUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductSizeWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductSizeUpdateWithoutProductInput, Prisma.ProductSizeUncheckedUpdateWithoutProductInput>;
};
export type ProductSizeUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductSizeScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductSizeUpdateManyMutationInput, Prisma.ProductSizeUncheckedUpdateManyWithoutProductInput>;
};
export type ProductSizeScalarWhereInput = {
    AND?: Prisma.ProductSizeScalarWhereInput | Prisma.ProductSizeScalarWhereInput[];
    OR?: Prisma.ProductSizeScalarWhereInput[];
    NOT?: Prisma.ProductSizeScalarWhereInput | Prisma.ProductSizeScalarWhereInput[];
    id?: Prisma.StringFilter<"ProductSize"> | string;
    productId?: Prisma.StringFilter<"ProductSize"> | string;
    name?: Prisma.StringFilter<"ProductSize"> | string;
    price?: Prisma.IntFilter<"ProductSize"> | number;
};
export type ProductSizeCreateManyProductInput = {
    id?: string;
    name: string;
    price: number;
};
export type ProductSizeUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductSizeUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductSizeUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ProductSizeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    name?: boolean;
    price?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productSize"]>;
export type ProductSizeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    name?: boolean;
    price?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productSize"]>;
export type ProductSizeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    productId?: boolean;
    name?: boolean;
    price?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productSize"]>;
export type ProductSizeSelectScalar = {
    id?: boolean;
    productId?: boolean;
    name?: boolean;
    price?: boolean;
};
export type ProductSizeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "productId" | "name" | "price", ExtArgs["result"]["productSize"]>;
export type ProductSizeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductSizeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type ProductSizeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
};
export type $ProductSizePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductSize";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        productId: string;
        name: string;
        price: number;
    }, ExtArgs["result"]["productSize"]>;
    composites: {};
};
export type ProductSizeGetPayload<S extends boolean | null | undefined | ProductSizeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductSizePayload, S>;
export type ProductSizeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductSizeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductSizeCountAggregateInputType | true;
};
export interface ProductSizeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductSize'];
        meta: {
            name: 'ProductSize';
        };
    };
    findUnique<T extends ProductSizeFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductSizeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductSizeClient<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductSizeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductSizeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductSizeClient<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductSizeFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductSizeFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductSizeClient<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductSizeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductSizeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductSizeClient<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductSizeFindManyArgs>(args?: Prisma.SelectSubset<T, ProductSizeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductSizeCreateArgs>(args: Prisma.SelectSubset<T, ProductSizeCreateArgs<ExtArgs>>): Prisma.Prisma__ProductSizeClient<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductSizeCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductSizeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductSizeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductSizeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductSizeDeleteArgs>(args: Prisma.SelectSubset<T, ProductSizeDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductSizeClient<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductSizeUpdateArgs>(args: Prisma.SelectSubset<T, ProductSizeUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductSizeClient<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductSizeDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductSizeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductSizeUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductSizeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductSizeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductSizeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductSizeUpsertArgs>(args: Prisma.SelectSubset<T, ProductSizeUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductSizeClient<runtime.Types.Result.GetResult<Prisma.$ProductSizePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductSizeCountArgs>(args?: Prisma.Subset<T, ProductSizeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductSizeCountAggregateOutputType> : number>;
    aggregate<T extends ProductSizeAggregateArgs>(args: Prisma.Subset<T, ProductSizeAggregateArgs>): Prisma.PrismaPromise<GetProductSizeAggregateType<T>>;
    groupBy<T extends ProductSizeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductSizeGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductSizeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductSizeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductSizeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductSizeFieldRefs;
}
export interface Prisma__ProductSizeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductSizeFieldRefs {
    readonly id: Prisma.FieldRef<"ProductSize", 'String'>;
    readonly productId: Prisma.FieldRef<"ProductSize", 'String'>;
    readonly name: Prisma.FieldRef<"ProductSize", 'String'>;
    readonly price: Prisma.FieldRef<"ProductSize", 'Int'>;
}
export type ProductSizeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelect<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    include?: Prisma.ProductSizeInclude<ExtArgs> | null;
    where: Prisma.ProductSizeWhereUniqueInput;
};
export type ProductSizeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelect<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    include?: Prisma.ProductSizeInclude<ExtArgs> | null;
    where: Prisma.ProductSizeWhereUniqueInput;
};
export type ProductSizeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductSizeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductSizeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProductSizeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelect<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    include?: Prisma.ProductSizeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductSizeCreateInput, Prisma.ProductSizeUncheckedCreateInput>;
};
export type ProductSizeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductSizeCreateManyInput | Prisma.ProductSizeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductSizeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    data: Prisma.ProductSizeCreateManyInput | Prisma.ProductSizeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductSizeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductSizeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelect<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    include?: Prisma.ProductSizeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductSizeUpdateInput, Prisma.ProductSizeUncheckedUpdateInput>;
    where: Prisma.ProductSizeWhereUniqueInput;
};
export type ProductSizeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductSizeUpdateManyMutationInput, Prisma.ProductSizeUncheckedUpdateManyInput>;
    where?: Prisma.ProductSizeWhereInput;
    limit?: number;
};
export type ProductSizeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductSizeUpdateManyMutationInput, Prisma.ProductSizeUncheckedUpdateManyInput>;
    where?: Prisma.ProductSizeWhereInput;
    limit?: number;
    include?: Prisma.ProductSizeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductSizeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelect<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    include?: Prisma.ProductSizeInclude<ExtArgs> | null;
    where: Prisma.ProductSizeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductSizeCreateInput, Prisma.ProductSizeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductSizeUpdateInput, Prisma.ProductSizeUncheckedUpdateInput>;
};
export type ProductSizeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelect<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    include?: Prisma.ProductSizeInclude<ExtArgs> | null;
    where: Prisma.ProductSizeWhereUniqueInput;
};
export type ProductSizeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductSizeWhereInput;
    limit?: number;
};
export type ProductSizeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSizeSelect<ExtArgs> | null;
    omit?: Prisma.ProductSizeOmit<ExtArgs> | null;
    include?: Prisma.ProductSizeInclude<ExtArgs> | null;
};
