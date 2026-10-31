import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type CouponModel = runtime.Types.Result.DefaultSelection<Prisma.$CouponPayload>;
export type AggregateCoupon = {
    _count: CouponCountAggregateOutputType | null;
    _avg: CouponAvgAggregateOutputType | null;
    _sum: CouponSumAggregateOutputType | null;
    _min: CouponMinAggregateOutputType | null;
    _max: CouponMaxAggregateOutputType | null;
};
export type CouponAvgAggregateOutputType = {
    value: number | null;
    minimumOrderAmount: number | null;
    maximumDiscount: number | null;
};
export type CouponSumAggregateOutputType = {
    value: number | null;
    minimumOrderAmount: number | null;
    maximumDiscount: number | null;
};
export type CouponMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    discountType: $Enums.DiscountType | null;
    value: number | null;
    minimumOrderAmount: number | null;
    maximumDiscount: number | null;
    activeFrom: Date | null;
    activeUntil: Date | null;
    createdAt: Date | null;
};
export type CouponMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    discountType: $Enums.DiscountType | null;
    value: number | null;
    minimumOrderAmount: number | null;
    maximumDiscount: number | null;
    activeFrom: Date | null;
    activeUntil: Date | null;
    createdAt: Date | null;
};
export type CouponCountAggregateOutputType = {
    id: number;
    code: number;
    discountType: number;
    value: number;
    minimumOrderAmount: number;
    maximumDiscount: number;
    activeFrom: number;
    activeUntil: number;
    createdAt: number;
    _all: number;
};
export type CouponAvgAggregateInputType = {
    value?: true;
    minimumOrderAmount?: true;
    maximumDiscount?: true;
};
export type CouponSumAggregateInputType = {
    value?: true;
    minimumOrderAmount?: true;
    maximumDiscount?: true;
};
export type CouponMinAggregateInputType = {
    id?: true;
    code?: true;
    discountType?: true;
    value?: true;
    minimumOrderAmount?: true;
    maximumDiscount?: true;
    activeFrom?: true;
    activeUntil?: true;
    createdAt?: true;
};
export type CouponMaxAggregateInputType = {
    id?: true;
    code?: true;
    discountType?: true;
    value?: true;
    minimumOrderAmount?: true;
    maximumDiscount?: true;
    activeFrom?: true;
    activeUntil?: true;
    createdAt?: true;
};
export type CouponCountAggregateInputType = {
    id?: true;
    code?: true;
    discountType?: true;
    value?: true;
    minimumOrderAmount?: true;
    maximumDiscount?: true;
    activeFrom?: true;
    activeUntil?: true;
    createdAt?: true;
    _all?: true;
};
export type CouponAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CouponCountAggregateInputType;
    _avg?: CouponAvgAggregateInputType;
    _sum?: CouponSumAggregateInputType;
    _min?: CouponMinAggregateInputType;
    _max?: CouponMaxAggregateInputType;
};
export type GetCouponAggregateType<T extends CouponAggregateArgs> = {
    [P in keyof T & keyof AggregateCoupon]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCoupon[P]> : Prisma.GetScalarType<T[P], AggregateCoupon[P]>;
};
export type CouponGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithAggregationInput | Prisma.CouponOrderByWithAggregationInput[];
    by: Prisma.CouponScalarFieldEnum[] | Prisma.CouponScalarFieldEnum;
    having?: Prisma.CouponScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CouponCountAggregateInputType | true;
    _avg?: CouponAvgAggregateInputType;
    _sum?: CouponSumAggregateInputType;
    _min?: CouponMinAggregateInputType;
    _max?: CouponMaxAggregateInputType;
};
export type CouponGroupByOutputType = {
    id: string;
    code: string;
    discountType: $Enums.DiscountType;
    value: number;
    minimumOrderAmount: number;
    maximumDiscount: number | null;
    activeFrom: Date | null;
    activeUntil: Date | null;
    createdAt: Date;
    _count: CouponCountAggregateOutputType | null;
    _avg: CouponAvgAggregateOutputType | null;
    _sum: CouponSumAggregateOutputType | null;
    _min: CouponMinAggregateOutputType | null;
    _max: CouponMaxAggregateOutputType | null;
};
export type GetCouponGroupByPayload<T extends CouponGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CouponGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CouponGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CouponGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CouponGroupByOutputType[P]>;
}>>;
export type CouponWhereInput = {
    AND?: Prisma.CouponWhereInput | Prisma.CouponWhereInput[];
    OR?: Prisma.CouponWhereInput[];
    NOT?: Prisma.CouponWhereInput | Prisma.CouponWhereInput[];
    id?: Prisma.StringFilter<"Coupon"> | string;
    code?: Prisma.StringFilter<"Coupon"> | string;
    discountType?: Prisma.EnumDiscountTypeFilter<"Coupon"> | $Enums.DiscountType;
    value?: Prisma.IntFilter<"Coupon"> | number;
    minimumOrderAmount?: Prisma.IntFilter<"Coupon"> | number;
    maximumDiscount?: Prisma.IntNullableFilter<"Coupon"> | number | null;
    activeFrom?: Prisma.DateTimeNullableFilter<"Coupon"> | Date | string | null;
    activeUntil?: Prisma.DateTimeNullableFilter<"Coupon"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Coupon"> | Date | string;
    redemptions?: Prisma.CouponRedemptionListRelationFilter;
};
export type CouponOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minimumOrderAmount?: Prisma.SortOrder;
    maximumDiscount?: Prisma.SortOrderInput | Prisma.SortOrder;
    activeFrom?: Prisma.SortOrderInput | Prisma.SortOrder;
    activeUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    redemptions?: Prisma.CouponRedemptionOrderByRelationAggregateInput;
};
export type CouponWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.CouponWhereInput | Prisma.CouponWhereInput[];
    OR?: Prisma.CouponWhereInput[];
    NOT?: Prisma.CouponWhereInput | Prisma.CouponWhereInput[];
    discountType?: Prisma.EnumDiscountTypeFilter<"Coupon"> | $Enums.DiscountType;
    value?: Prisma.IntFilter<"Coupon"> | number;
    minimumOrderAmount?: Prisma.IntFilter<"Coupon"> | number;
    maximumDiscount?: Prisma.IntNullableFilter<"Coupon"> | number | null;
    activeFrom?: Prisma.DateTimeNullableFilter<"Coupon"> | Date | string | null;
    activeUntil?: Prisma.DateTimeNullableFilter<"Coupon"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Coupon"> | Date | string;
    redemptions?: Prisma.CouponRedemptionListRelationFilter;
}, "id" | "code">;
export type CouponOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minimumOrderAmount?: Prisma.SortOrder;
    maximumDiscount?: Prisma.SortOrderInput | Prisma.SortOrder;
    activeFrom?: Prisma.SortOrderInput | Prisma.SortOrder;
    activeUntil?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CouponCountOrderByAggregateInput;
    _avg?: Prisma.CouponAvgOrderByAggregateInput;
    _max?: Prisma.CouponMaxOrderByAggregateInput;
    _min?: Prisma.CouponMinOrderByAggregateInput;
    _sum?: Prisma.CouponSumOrderByAggregateInput;
};
export type CouponScalarWhereWithAggregatesInput = {
    AND?: Prisma.CouponScalarWhereWithAggregatesInput | Prisma.CouponScalarWhereWithAggregatesInput[];
    OR?: Prisma.CouponScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CouponScalarWhereWithAggregatesInput | Prisma.CouponScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Coupon"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Coupon"> | string;
    discountType?: Prisma.EnumDiscountTypeWithAggregatesFilter<"Coupon"> | $Enums.DiscountType;
    value?: Prisma.IntWithAggregatesFilter<"Coupon"> | number;
    minimumOrderAmount?: Prisma.IntWithAggregatesFilter<"Coupon"> | number;
    maximumDiscount?: Prisma.IntNullableWithAggregatesFilter<"Coupon"> | number | null;
    activeFrom?: Prisma.DateTimeNullableWithAggregatesFilter<"Coupon"> | Date | string | null;
    activeUntil?: Prisma.DateTimeNullableWithAggregatesFilter<"Coupon"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Coupon"> | Date | string;
};
export type CouponCreateInput = {
    id?: string;
    code: string;
    discountType: $Enums.DiscountType;
    value: number;
    minimumOrderAmount?: number;
    maximumDiscount?: number | null;
    activeFrom?: Date | string | null;
    activeUntil?: Date | string | null;
    createdAt?: Date | string;
    redemptions?: Prisma.CouponRedemptionCreateNestedManyWithoutCouponInput;
};
export type CouponUncheckedCreateInput = {
    id?: string;
    code: string;
    discountType: $Enums.DiscountType;
    value: number;
    minimumOrderAmount?: number;
    maximumDiscount?: number | null;
    activeFrom?: Date | string | null;
    activeUntil?: Date | string | null;
    createdAt?: Date | string;
    redemptions?: Prisma.CouponRedemptionUncheckedCreateNestedManyWithoutCouponInput;
};
export type CouponUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumDiscountTypeFieldUpdateOperationsInput | $Enums.DiscountType;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    minimumOrderAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    maximumDiscount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activeFrom?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    activeUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    redemptions?: Prisma.CouponRedemptionUpdateManyWithoutCouponNestedInput;
};
export type CouponUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumDiscountTypeFieldUpdateOperationsInput | $Enums.DiscountType;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    minimumOrderAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    maximumDiscount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activeFrom?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    activeUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    redemptions?: Prisma.CouponRedemptionUncheckedUpdateManyWithoutCouponNestedInput;
};
export type CouponCreateManyInput = {
    id?: string;
    code: string;
    discountType: $Enums.DiscountType;
    value: number;
    minimumOrderAmount?: number;
    maximumDiscount?: number | null;
    activeFrom?: Date | string | null;
    activeUntil?: Date | string | null;
    createdAt?: Date | string;
};
export type CouponUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumDiscountTypeFieldUpdateOperationsInput | $Enums.DiscountType;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    minimumOrderAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    maximumDiscount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activeFrom?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    activeUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumDiscountTypeFieldUpdateOperationsInput | $Enums.DiscountType;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    minimumOrderAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    maximumDiscount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activeFrom?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    activeUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minimumOrderAmount?: Prisma.SortOrder;
    maximumDiscount?: Prisma.SortOrder;
    activeFrom?: Prisma.SortOrder;
    activeUntil?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CouponAvgOrderByAggregateInput = {
    value?: Prisma.SortOrder;
    minimumOrderAmount?: Prisma.SortOrder;
    maximumDiscount?: Prisma.SortOrder;
};
export type CouponMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minimumOrderAmount?: Prisma.SortOrder;
    maximumDiscount?: Prisma.SortOrder;
    activeFrom?: Prisma.SortOrder;
    activeUntil?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CouponMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    discountType?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    minimumOrderAmount?: Prisma.SortOrder;
    maximumDiscount?: Prisma.SortOrder;
    activeFrom?: Prisma.SortOrder;
    activeUntil?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CouponSumOrderByAggregateInput = {
    value?: Prisma.SortOrder;
    minimumOrderAmount?: Prisma.SortOrder;
    maximumDiscount?: Prisma.SortOrder;
};
export type CouponScalarRelationFilter = {
    is?: Prisma.CouponWhereInput;
    isNot?: Prisma.CouponWhereInput;
};
export type EnumDiscountTypeFieldUpdateOperationsInput = {
    set?: $Enums.DiscountType;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type CouponCreateNestedOneWithoutRedemptionsInput = {
    create?: Prisma.XOR<Prisma.CouponCreateWithoutRedemptionsInput, Prisma.CouponUncheckedCreateWithoutRedemptionsInput>;
    connectOrCreate?: Prisma.CouponCreateOrConnectWithoutRedemptionsInput;
    connect?: Prisma.CouponWhereUniqueInput;
};
export type CouponUpdateOneRequiredWithoutRedemptionsNestedInput = {
    create?: Prisma.XOR<Prisma.CouponCreateWithoutRedemptionsInput, Prisma.CouponUncheckedCreateWithoutRedemptionsInput>;
    connectOrCreate?: Prisma.CouponCreateOrConnectWithoutRedemptionsInput;
    upsert?: Prisma.CouponUpsertWithoutRedemptionsInput;
    connect?: Prisma.CouponWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CouponUpdateToOneWithWhereWithoutRedemptionsInput, Prisma.CouponUpdateWithoutRedemptionsInput>, Prisma.CouponUncheckedUpdateWithoutRedemptionsInput>;
};
export type CouponCreateWithoutRedemptionsInput = {
    id?: string;
    code: string;
    discountType: $Enums.DiscountType;
    value: number;
    minimumOrderAmount?: number;
    maximumDiscount?: number | null;
    activeFrom?: Date | string | null;
    activeUntil?: Date | string | null;
    createdAt?: Date | string;
};
export type CouponUncheckedCreateWithoutRedemptionsInput = {
    id?: string;
    code: string;
    discountType: $Enums.DiscountType;
    value: number;
    minimumOrderAmount?: number;
    maximumDiscount?: number | null;
    activeFrom?: Date | string | null;
    activeUntil?: Date | string | null;
    createdAt?: Date | string;
};
export type CouponCreateOrConnectWithoutRedemptionsInput = {
    where: Prisma.CouponWhereUniqueInput;
    create: Prisma.XOR<Prisma.CouponCreateWithoutRedemptionsInput, Prisma.CouponUncheckedCreateWithoutRedemptionsInput>;
};
export type CouponUpsertWithoutRedemptionsInput = {
    update: Prisma.XOR<Prisma.CouponUpdateWithoutRedemptionsInput, Prisma.CouponUncheckedUpdateWithoutRedemptionsInput>;
    create: Prisma.XOR<Prisma.CouponCreateWithoutRedemptionsInput, Prisma.CouponUncheckedCreateWithoutRedemptionsInput>;
    where?: Prisma.CouponWhereInput;
};
export type CouponUpdateToOneWithWhereWithoutRedemptionsInput = {
    where?: Prisma.CouponWhereInput;
    data: Prisma.XOR<Prisma.CouponUpdateWithoutRedemptionsInput, Prisma.CouponUncheckedUpdateWithoutRedemptionsInput>;
};
export type CouponUpdateWithoutRedemptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumDiscountTypeFieldUpdateOperationsInput | $Enums.DiscountType;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    minimumOrderAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    maximumDiscount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activeFrom?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    activeUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponUncheckedUpdateWithoutRedemptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    discountType?: Prisma.EnumDiscountTypeFieldUpdateOperationsInput | $Enums.DiscountType;
    value?: Prisma.IntFieldUpdateOperationsInput | number;
    minimumOrderAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    maximumDiscount?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    activeFrom?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    activeUntil?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponCountOutputType = {
    redemptions: number;
};
export type CouponCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    redemptions?: boolean | CouponCountOutputTypeCountRedemptionsArgs;
};
export type CouponCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponCountOutputTypeSelect<ExtArgs> | null;
};
export type CouponCountOutputTypeCountRedemptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponRedemptionWhereInput;
};
export type CouponSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    discountType?: boolean;
    value?: boolean;
    minimumOrderAmount?: boolean;
    maximumDiscount?: boolean;
    activeFrom?: boolean;
    activeUntil?: boolean;
    createdAt?: boolean;
    redemptions?: boolean | Prisma.Coupon$redemptionsArgs<ExtArgs>;
    _count?: boolean | Prisma.CouponCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["coupon"]>;
export type CouponSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    discountType?: boolean;
    value?: boolean;
    minimumOrderAmount?: boolean;
    maximumDiscount?: boolean;
    activeFrom?: boolean;
    activeUntil?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["coupon"]>;
export type CouponSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    discountType?: boolean;
    value?: boolean;
    minimumOrderAmount?: boolean;
    maximumDiscount?: boolean;
    activeFrom?: boolean;
    activeUntil?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["coupon"]>;
export type CouponSelectScalar = {
    id?: boolean;
    code?: boolean;
    discountType?: boolean;
    value?: boolean;
    minimumOrderAmount?: boolean;
    maximumDiscount?: boolean;
    activeFrom?: boolean;
    activeUntil?: boolean;
    createdAt?: boolean;
};
export type CouponOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "discountType" | "value" | "minimumOrderAmount" | "maximumDiscount" | "activeFrom" | "activeUntil" | "createdAt", ExtArgs["result"]["coupon"]>;
export type CouponInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    redemptions?: boolean | Prisma.Coupon$redemptionsArgs<ExtArgs>;
    _count?: boolean | Prisma.CouponCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CouponIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type CouponIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $CouponPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Coupon";
    objects: {
        redemptions: Prisma.$CouponRedemptionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        discountType: $Enums.DiscountType;
        value: number;
        minimumOrderAmount: number;
        maximumDiscount: number | null;
        activeFrom: Date | null;
        activeUntil: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["coupon"]>;
    composites: {};
};
export type CouponGetPayload<S extends boolean | null | undefined | CouponDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CouponPayload, S>;
export type CouponCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CouponFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CouponCountAggregateInputType | true;
};
export interface CouponDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Coupon'];
        meta: {
            name: 'Coupon';
        };
    };
    findUnique<T extends CouponFindUniqueArgs>(args: Prisma.SelectSubset<T, CouponFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CouponFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CouponFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CouponFindFirstArgs>(args?: Prisma.SelectSubset<T, CouponFindFirstArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CouponFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CouponFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CouponFindManyArgs>(args?: Prisma.SelectSubset<T, CouponFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CouponCreateArgs>(args: Prisma.SelectSubset<T, CouponCreateArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CouponCreateManyArgs>(args?: Prisma.SelectSubset<T, CouponCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CouponCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CouponCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CouponDeleteArgs>(args: Prisma.SelectSubset<T, CouponDeleteArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CouponUpdateArgs>(args: Prisma.SelectSubset<T, CouponUpdateArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CouponDeleteManyArgs>(args?: Prisma.SelectSubset<T, CouponDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CouponUpdateManyArgs>(args: Prisma.SelectSubset<T, CouponUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CouponUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CouponUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CouponUpsertArgs>(args: Prisma.SelectSubset<T, CouponUpsertArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CouponCountArgs>(args?: Prisma.Subset<T, CouponCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CouponCountAggregateOutputType> : number>;
    aggregate<T extends CouponAggregateArgs>(args: Prisma.Subset<T, CouponAggregateArgs>): Prisma.PrismaPromise<GetCouponAggregateType<T>>;
    groupBy<T extends CouponGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CouponGroupByArgs['orderBy'];
    } : {
        orderBy?: CouponGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CouponGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCouponGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CouponFieldRefs;
}
export interface Prisma__CouponClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    redemptions<T extends Prisma.Coupon$redemptionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Coupon$redemptionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CouponFieldRefs {
    readonly id: Prisma.FieldRef<"Coupon", 'String'>;
    readonly code: Prisma.FieldRef<"Coupon", 'String'>;
    readonly discountType: Prisma.FieldRef<"Coupon", 'DiscountType'>;
    readonly value: Prisma.FieldRef<"Coupon", 'Int'>;
    readonly minimumOrderAmount: Prisma.FieldRef<"Coupon", 'Int'>;
    readonly maximumDiscount: Prisma.FieldRef<"Coupon", 'Int'>;
    readonly activeFrom: Prisma.FieldRef<"Coupon", 'DateTime'>;
    readonly activeUntil: Prisma.FieldRef<"Coupon", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Coupon", 'DateTime'>;
}
export type CouponFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    where: Prisma.CouponWhereUniqueInput;
};
export type CouponFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    where: Prisma.CouponWhereUniqueInput;
};
export type CouponFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CouponScalarFieldEnum | Prisma.CouponScalarFieldEnum[];
};
export type CouponFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CouponScalarFieldEnum | Prisma.CouponScalarFieldEnum[];
};
export type CouponFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CouponScalarFieldEnum | Prisma.CouponScalarFieldEnum[];
};
export type CouponCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponCreateInput, Prisma.CouponUncheckedCreateInput>;
};
export type CouponCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CouponCreateManyInput | Prisma.CouponCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CouponCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    data: Prisma.CouponCreateManyInput | Prisma.CouponCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CouponUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponUpdateInput, Prisma.CouponUncheckedUpdateInput>;
    where: Prisma.CouponWhereUniqueInput;
};
export type CouponUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CouponUpdateManyMutationInput, Prisma.CouponUncheckedUpdateManyInput>;
    where?: Prisma.CouponWhereInput;
    limit?: number;
};
export type CouponUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponUpdateManyMutationInput, Prisma.CouponUncheckedUpdateManyInput>;
    where?: Prisma.CouponWhereInput;
    limit?: number;
};
export type CouponUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    where: Prisma.CouponWhereUniqueInput;
    create: Prisma.XOR<Prisma.CouponCreateInput, Prisma.CouponUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CouponUpdateInput, Prisma.CouponUncheckedUpdateInput>;
};
export type CouponDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
    where: Prisma.CouponWhereUniqueInput;
};
export type CouponDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponWhereInput;
    limit?: number;
};
export type Coupon$redemptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelect<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    include?: Prisma.CouponRedemptionInclude<ExtArgs> | null;
    where?: Prisma.CouponRedemptionWhereInput;
    orderBy?: Prisma.CouponRedemptionOrderByWithRelationInput | Prisma.CouponRedemptionOrderByWithRelationInput[];
    cursor?: Prisma.CouponRedemptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CouponRedemptionScalarFieldEnum | Prisma.CouponRedemptionScalarFieldEnum[];
};
export type CouponDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponSelect<ExtArgs> | null;
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    include?: Prisma.CouponInclude<ExtArgs> | null;
};
