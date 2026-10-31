import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CouponRedemptionModel = runtime.Types.Result.DefaultSelection<Prisma.$CouponRedemptionPayload>;
export type AggregateCouponRedemption = {
    _count: CouponRedemptionCountAggregateOutputType | null;
    _min: CouponRedemptionMinAggregateOutputType | null;
    _max: CouponRedemptionMaxAggregateOutputType | null;
};
export type CouponRedemptionMinAggregateOutputType = {
    id: string | null;
    couponId: string | null;
    userId: string | null;
    orderId: string | null;
    createdAt: Date | null;
};
export type CouponRedemptionMaxAggregateOutputType = {
    id: string | null;
    couponId: string | null;
    userId: string | null;
    orderId: string | null;
    createdAt: Date | null;
};
export type CouponRedemptionCountAggregateOutputType = {
    id: number;
    couponId: number;
    userId: number;
    orderId: number;
    createdAt: number;
    _all: number;
};
export type CouponRedemptionMinAggregateInputType = {
    id?: true;
    couponId?: true;
    userId?: true;
    orderId?: true;
    createdAt?: true;
};
export type CouponRedemptionMaxAggregateInputType = {
    id?: true;
    couponId?: true;
    userId?: true;
    orderId?: true;
    createdAt?: true;
};
export type CouponRedemptionCountAggregateInputType = {
    id?: true;
    couponId?: true;
    userId?: true;
    orderId?: true;
    createdAt?: true;
    _all?: true;
};
export type CouponRedemptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponRedemptionWhereInput;
    orderBy?: Prisma.CouponRedemptionOrderByWithRelationInput | Prisma.CouponRedemptionOrderByWithRelationInput[];
    cursor?: Prisma.CouponRedemptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CouponRedemptionCountAggregateInputType;
    _min?: CouponRedemptionMinAggregateInputType;
    _max?: CouponRedemptionMaxAggregateInputType;
};
export type GetCouponRedemptionAggregateType<T extends CouponRedemptionAggregateArgs> = {
    [P in keyof T & keyof AggregateCouponRedemption]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCouponRedemption[P]> : Prisma.GetScalarType<T[P], AggregateCouponRedemption[P]>;
};
export type CouponRedemptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponRedemptionWhereInput;
    orderBy?: Prisma.CouponRedemptionOrderByWithAggregationInput | Prisma.CouponRedemptionOrderByWithAggregationInput[];
    by: Prisma.CouponRedemptionScalarFieldEnum[] | Prisma.CouponRedemptionScalarFieldEnum;
    having?: Prisma.CouponRedemptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CouponRedemptionCountAggregateInputType | true;
    _min?: CouponRedemptionMinAggregateInputType;
    _max?: CouponRedemptionMaxAggregateInputType;
};
export type CouponRedemptionGroupByOutputType = {
    id: string;
    couponId: string;
    userId: string;
    orderId: string;
    createdAt: Date;
    _count: CouponRedemptionCountAggregateOutputType | null;
    _min: CouponRedemptionMinAggregateOutputType | null;
    _max: CouponRedemptionMaxAggregateOutputType | null;
};
export type GetCouponRedemptionGroupByPayload<T extends CouponRedemptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CouponRedemptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CouponRedemptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CouponRedemptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CouponRedemptionGroupByOutputType[P]>;
}>>;
export type CouponRedemptionWhereInput = {
    AND?: Prisma.CouponRedemptionWhereInput | Prisma.CouponRedemptionWhereInput[];
    OR?: Prisma.CouponRedemptionWhereInput[];
    NOT?: Prisma.CouponRedemptionWhereInput | Prisma.CouponRedemptionWhereInput[];
    id?: Prisma.StringFilter<"CouponRedemption"> | string;
    couponId?: Prisma.StringFilter<"CouponRedemption"> | string;
    userId?: Prisma.StringFilter<"CouponRedemption"> | string;
    orderId?: Prisma.StringFilter<"CouponRedemption"> | string;
    createdAt?: Prisma.DateTimeFilter<"CouponRedemption"> | Date | string;
    coupon?: Prisma.XOR<Prisma.CouponScalarRelationFilter, Prisma.CouponWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CouponRedemptionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    couponId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    coupon?: Prisma.CouponOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type CouponRedemptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    orderId?: string;
    couponId_userId?: Prisma.CouponRedemptionCouponIdUserIdCompoundUniqueInput;
    AND?: Prisma.CouponRedemptionWhereInput | Prisma.CouponRedemptionWhereInput[];
    OR?: Prisma.CouponRedemptionWhereInput[];
    NOT?: Prisma.CouponRedemptionWhereInput | Prisma.CouponRedemptionWhereInput[];
    couponId?: Prisma.StringFilter<"CouponRedemption"> | string;
    userId?: Prisma.StringFilter<"CouponRedemption"> | string;
    createdAt?: Prisma.DateTimeFilter<"CouponRedemption"> | Date | string;
    coupon?: Prisma.XOR<Prisma.CouponScalarRelationFilter, Prisma.CouponWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "orderId" | "couponId_userId">;
export type CouponRedemptionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    couponId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CouponRedemptionCountOrderByAggregateInput;
    _max?: Prisma.CouponRedemptionMaxOrderByAggregateInput;
    _min?: Prisma.CouponRedemptionMinOrderByAggregateInput;
};
export type CouponRedemptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.CouponRedemptionScalarWhereWithAggregatesInput | Prisma.CouponRedemptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.CouponRedemptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CouponRedemptionScalarWhereWithAggregatesInput | Prisma.CouponRedemptionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CouponRedemption"> | string;
    couponId?: Prisma.StringWithAggregatesFilter<"CouponRedemption"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"CouponRedemption"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"CouponRedemption"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CouponRedemption"> | Date | string;
};
export type CouponRedemptionCreateInput = {
    id?: string;
    orderId: string;
    createdAt?: Date | string;
    coupon: Prisma.CouponCreateNestedOneWithoutRedemptionsInput;
    user: Prisma.UserCreateNestedOneWithoutRedemptionsInput;
};
export type CouponRedemptionUncheckedCreateInput = {
    id?: string;
    couponId: string;
    userId: string;
    orderId: string;
    createdAt?: Date | string;
};
export type CouponRedemptionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coupon?: Prisma.CouponUpdateOneRequiredWithoutRedemptionsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutRedemptionsNestedInput;
};
export type CouponRedemptionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    couponId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponRedemptionCreateManyInput = {
    id?: string;
    couponId: string;
    userId: string;
    orderId: string;
    createdAt?: Date | string;
};
export type CouponRedemptionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponRedemptionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    couponId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponRedemptionListRelationFilter = {
    every?: Prisma.CouponRedemptionWhereInput;
    some?: Prisma.CouponRedemptionWhereInput;
    none?: Prisma.CouponRedemptionWhereInput;
};
export type CouponRedemptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CouponRedemptionCouponIdUserIdCompoundUniqueInput = {
    couponId: string;
    userId: string;
};
export type CouponRedemptionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    couponId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CouponRedemptionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    couponId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CouponRedemptionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    couponId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CouponRedemptionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutUserInput, Prisma.CouponRedemptionUncheckedCreateWithoutUserInput> | Prisma.CouponRedemptionCreateWithoutUserInput[] | Prisma.CouponRedemptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CouponRedemptionCreateOrConnectWithoutUserInput | Prisma.CouponRedemptionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CouponRedemptionCreateManyUserInputEnvelope;
    connect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
};
export type CouponRedemptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutUserInput, Prisma.CouponRedemptionUncheckedCreateWithoutUserInput> | Prisma.CouponRedemptionCreateWithoutUserInput[] | Prisma.CouponRedemptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CouponRedemptionCreateOrConnectWithoutUserInput | Prisma.CouponRedemptionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CouponRedemptionCreateManyUserInputEnvelope;
    connect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
};
export type CouponRedemptionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutUserInput, Prisma.CouponRedemptionUncheckedCreateWithoutUserInput> | Prisma.CouponRedemptionCreateWithoutUserInput[] | Prisma.CouponRedemptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CouponRedemptionCreateOrConnectWithoutUserInput | Prisma.CouponRedemptionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutUserInput | Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CouponRedemptionCreateManyUserInputEnvelope;
    set?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    disconnect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    delete?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    connect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    update?: Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutUserInput | Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CouponRedemptionUpdateManyWithWhereWithoutUserInput | Prisma.CouponRedemptionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CouponRedemptionScalarWhereInput | Prisma.CouponRedemptionScalarWhereInput[];
};
export type CouponRedemptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutUserInput, Prisma.CouponRedemptionUncheckedCreateWithoutUserInput> | Prisma.CouponRedemptionCreateWithoutUserInput[] | Prisma.CouponRedemptionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CouponRedemptionCreateOrConnectWithoutUserInput | Prisma.CouponRedemptionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutUserInput | Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CouponRedemptionCreateManyUserInputEnvelope;
    set?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    disconnect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    delete?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    connect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    update?: Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutUserInput | Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CouponRedemptionUpdateManyWithWhereWithoutUserInput | Prisma.CouponRedemptionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CouponRedemptionScalarWhereInput | Prisma.CouponRedemptionScalarWhereInput[];
};
export type CouponRedemptionCreateNestedManyWithoutCouponInput = {
    create?: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutCouponInput, Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput> | Prisma.CouponRedemptionCreateWithoutCouponInput[] | Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput[];
    connectOrCreate?: Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput | Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput[];
    createMany?: Prisma.CouponRedemptionCreateManyCouponInputEnvelope;
    connect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
};
export type CouponRedemptionUncheckedCreateNestedManyWithoutCouponInput = {
    create?: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutCouponInput, Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput> | Prisma.CouponRedemptionCreateWithoutCouponInput[] | Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput[];
    connectOrCreate?: Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput | Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput[];
    createMany?: Prisma.CouponRedemptionCreateManyCouponInputEnvelope;
    connect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
};
export type CouponRedemptionUpdateManyWithoutCouponNestedInput = {
    create?: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutCouponInput, Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput> | Prisma.CouponRedemptionCreateWithoutCouponInput[] | Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput[];
    connectOrCreate?: Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput | Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput[];
    upsert?: Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput | Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput[];
    createMany?: Prisma.CouponRedemptionCreateManyCouponInputEnvelope;
    set?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    disconnect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    delete?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    connect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    update?: Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput | Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput[];
    updateMany?: Prisma.CouponRedemptionUpdateManyWithWhereWithoutCouponInput | Prisma.CouponRedemptionUpdateManyWithWhereWithoutCouponInput[];
    deleteMany?: Prisma.CouponRedemptionScalarWhereInput | Prisma.CouponRedemptionScalarWhereInput[];
};
export type CouponRedemptionUncheckedUpdateManyWithoutCouponNestedInput = {
    create?: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutCouponInput, Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput> | Prisma.CouponRedemptionCreateWithoutCouponInput[] | Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput[];
    connectOrCreate?: Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput | Prisma.CouponRedemptionCreateOrConnectWithoutCouponInput[];
    upsert?: Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput | Prisma.CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput[];
    createMany?: Prisma.CouponRedemptionCreateManyCouponInputEnvelope;
    set?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    disconnect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    delete?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    connect?: Prisma.CouponRedemptionWhereUniqueInput | Prisma.CouponRedemptionWhereUniqueInput[];
    update?: Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput | Prisma.CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput[];
    updateMany?: Prisma.CouponRedemptionUpdateManyWithWhereWithoutCouponInput | Prisma.CouponRedemptionUpdateManyWithWhereWithoutCouponInput[];
    deleteMany?: Prisma.CouponRedemptionScalarWhereInput | Prisma.CouponRedemptionScalarWhereInput[];
};
export type CouponRedemptionCreateWithoutUserInput = {
    id?: string;
    orderId: string;
    createdAt?: Date | string;
    coupon: Prisma.CouponCreateNestedOneWithoutRedemptionsInput;
};
export type CouponRedemptionUncheckedCreateWithoutUserInput = {
    id?: string;
    couponId: string;
    orderId: string;
    createdAt?: Date | string;
};
export type CouponRedemptionCreateOrConnectWithoutUserInput = {
    where: Prisma.CouponRedemptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutUserInput, Prisma.CouponRedemptionUncheckedCreateWithoutUserInput>;
};
export type CouponRedemptionCreateManyUserInputEnvelope = {
    data: Prisma.CouponRedemptionCreateManyUserInput | Prisma.CouponRedemptionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CouponRedemptionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CouponRedemptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CouponRedemptionUpdateWithoutUserInput, Prisma.CouponRedemptionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutUserInput, Prisma.CouponRedemptionUncheckedCreateWithoutUserInput>;
};
export type CouponRedemptionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CouponRedemptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CouponRedemptionUpdateWithoutUserInput, Prisma.CouponRedemptionUncheckedUpdateWithoutUserInput>;
};
export type CouponRedemptionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CouponRedemptionScalarWhereInput;
    data: Prisma.XOR<Prisma.CouponRedemptionUpdateManyMutationInput, Prisma.CouponRedemptionUncheckedUpdateManyWithoutUserInput>;
};
export type CouponRedemptionScalarWhereInput = {
    AND?: Prisma.CouponRedemptionScalarWhereInput | Prisma.CouponRedemptionScalarWhereInput[];
    OR?: Prisma.CouponRedemptionScalarWhereInput[];
    NOT?: Prisma.CouponRedemptionScalarWhereInput | Prisma.CouponRedemptionScalarWhereInput[];
    id?: Prisma.StringFilter<"CouponRedemption"> | string;
    couponId?: Prisma.StringFilter<"CouponRedemption"> | string;
    userId?: Prisma.StringFilter<"CouponRedemption"> | string;
    orderId?: Prisma.StringFilter<"CouponRedemption"> | string;
    createdAt?: Prisma.DateTimeFilter<"CouponRedemption"> | Date | string;
};
export type CouponRedemptionCreateWithoutCouponInput = {
    id?: string;
    orderId: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRedemptionsInput;
};
export type CouponRedemptionUncheckedCreateWithoutCouponInput = {
    id?: string;
    userId: string;
    orderId: string;
    createdAt?: Date | string;
};
export type CouponRedemptionCreateOrConnectWithoutCouponInput = {
    where: Prisma.CouponRedemptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutCouponInput, Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput>;
};
export type CouponRedemptionCreateManyCouponInputEnvelope = {
    data: Prisma.CouponRedemptionCreateManyCouponInput | Prisma.CouponRedemptionCreateManyCouponInput[];
    skipDuplicates?: boolean;
};
export type CouponRedemptionUpsertWithWhereUniqueWithoutCouponInput = {
    where: Prisma.CouponRedemptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.CouponRedemptionUpdateWithoutCouponInput, Prisma.CouponRedemptionUncheckedUpdateWithoutCouponInput>;
    create: Prisma.XOR<Prisma.CouponRedemptionCreateWithoutCouponInput, Prisma.CouponRedemptionUncheckedCreateWithoutCouponInput>;
};
export type CouponRedemptionUpdateWithWhereUniqueWithoutCouponInput = {
    where: Prisma.CouponRedemptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.CouponRedemptionUpdateWithoutCouponInput, Prisma.CouponRedemptionUncheckedUpdateWithoutCouponInput>;
};
export type CouponRedemptionUpdateManyWithWhereWithoutCouponInput = {
    where: Prisma.CouponRedemptionScalarWhereInput;
    data: Prisma.XOR<Prisma.CouponRedemptionUpdateManyMutationInput, Prisma.CouponRedemptionUncheckedUpdateManyWithoutCouponInput>;
};
export type CouponRedemptionCreateManyUserInput = {
    id?: string;
    couponId: string;
    orderId: string;
    createdAt?: Date | string;
};
export type CouponRedemptionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coupon?: Prisma.CouponUpdateOneRequiredWithoutRedemptionsNestedInput;
};
export type CouponRedemptionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    couponId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponRedemptionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    couponId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponRedemptionCreateManyCouponInput = {
    id?: string;
    userId: string;
    orderId: string;
    createdAt?: Date | string;
};
export type CouponRedemptionUpdateWithoutCouponInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRedemptionsNestedInput;
};
export type CouponRedemptionUncheckedUpdateWithoutCouponInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponRedemptionUncheckedUpdateManyWithoutCouponInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CouponRedemptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    couponId?: boolean;
    userId?: boolean;
    orderId?: boolean;
    createdAt?: boolean;
    coupon?: boolean | Prisma.CouponDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["couponRedemption"]>;
export type CouponRedemptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    couponId?: boolean;
    userId?: boolean;
    orderId?: boolean;
    createdAt?: boolean;
    coupon?: boolean | Prisma.CouponDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["couponRedemption"]>;
export type CouponRedemptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    couponId?: boolean;
    userId?: boolean;
    orderId?: boolean;
    createdAt?: boolean;
    coupon?: boolean | Prisma.CouponDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["couponRedemption"]>;
export type CouponRedemptionSelectScalar = {
    id?: boolean;
    couponId?: boolean;
    userId?: boolean;
    orderId?: boolean;
    createdAt?: boolean;
};
export type CouponRedemptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "couponId" | "userId" | "orderId" | "createdAt", ExtArgs["result"]["couponRedemption"]>;
export type CouponRedemptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coupon?: boolean | Prisma.CouponDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CouponRedemptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coupon?: boolean | Prisma.CouponDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CouponRedemptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coupon?: boolean | Prisma.CouponDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CouponRedemptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CouponRedemption";
    objects: {
        coupon: Prisma.$CouponPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        couponId: string;
        userId: string;
        orderId: string;
        createdAt: Date;
    }, ExtArgs["result"]["couponRedemption"]>;
    composites: {};
};
export type CouponRedemptionGetPayload<S extends boolean | null | undefined | CouponRedemptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload, S>;
export type CouponRedemptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CouponRedemptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CouponRedemptionCountAggregateInputType | true;
};
export interface CouponRedemptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CouponRedemption'];
        meta: {
            name: 'CouponRedemption';
        };
    };
    findUnique<T extends CouponRedemptionFindUniqueArgs>(args: Prisma.SelectSubset<T, CouponRedemptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CouponRedemptionClient<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CouponRedemptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CouponRedemptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CouponRedemptionClient<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CouponRedemptionFindFirstArgs>(args?: Prisma.SelectSubset<T, CouponRedemptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__CouponRedemptionClient<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CouponRedemptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CouponRedemptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CouponRedemptionClient<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CouponRedemptionFindManyArgs>(args?: Prisma.SelectSubset<T, CouponRedemptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CouponRedemptionCreateArgs>(args: Prisma.SelectSubset<T, CouponRedemptionCreateArgs<ExtArgs>>): Prisma.Prisma__CouponRedemptionClient<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CouponRedemptionCreateManyArgs>(args?: Prisma.SelectSubset<T, CouponRedemptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CouponRedemptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CouponRedemptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CouponRedemptionDeleteArgs>(args: Prisma.SelectSubset<T, CouponRedemptionDeleteArgs<ExtArgs>>): Prisma.Prisma__CouponRedemptionClient<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CouponRedemptionUpdateArgs>(args: Prisma.SelectSubset<T, CouponRedemptionUpdateArgs<ExtArgs>>): Prisma.Prisma__CouponRedemptionClient<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CouponRedemptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, CouponRedemptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CouponRedemptionUpdateManyArgs>(args: Prisma.SelectSubset<T, CouponRedemptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CouponRedemptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CouponRedemptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CouponRedemptionUpsertArgs>(args: Prisma.SelectSubset<T, CouponRedemptionUpsertArgs<ExtArgs>>): Prisma.Prisma__CouponRedemptionClient<runtime.Types.Result.GetResult<Prisma.$CouponRedemptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CouponRedemptionCountArgs>(args?: Prisma.Subset<T, CouponRedemptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CouponRedemptionCountAggregateOutputType> : number>;
    aggregate<T extends CouponRedemptionAggregateArgs>(args: Prisma.Subset<T, CouponRedemptionAggregateArgs>): Prisma.PrismaPromise<GetCouponRedemptionAggregateType<T>>;
    groupBy<T extends CouponRedemptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CouponRedemptionGroupByArgs['orderBy'];
    } : {
        orderBy?: CouponRedemptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CouponRedemptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCouponRedemptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CouponRedemptionFieldRefs;
}
export interface Prisma__CouponRedemptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    coupon<T extends Prisma.CouponDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CouponDefaultArgs<ExtArgs>>): Prisma.Prisma__CouponClient<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CouponRedemptionFieldRefs {
    readonly id: Prisma.FieldRef<"CouponRedemption", 'String'>;
    readonly couponId: Prisma.FieldRef<"CouponRedemption", 'String'>;
    readonly userId: Prisma.FieldRef<"CouponRedemption", 'String'>;
    readonly orderId: Prisma.FieldRef<"CouponRedemption", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CouponRedemption", 'DateTime'>;
}
export type CouponRedemptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelect<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    include?: Prisma.CouponRedemptionInclude<ExtArgs> | null;
    where: Prisma.CouponRedemptionWhereUniqueInput;
};
export type CouponRedemptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelect<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    include?: Prisma.CouponRedemptionInclude<ExtArgs> | null;
    where: Prisma.CouponRedemptionWhereUniqueInput;
};
export type CouponRedemptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CouponRedemptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CouponRedemptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CouponRedemptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelect<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    include?: Prisma.CouponRedemptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponRedemptionCreateInput, Prisma.CouponRedemptionUncheckedCreateInput>;
};
export type CouponRedemptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CouponRedemptionCreateManyInput | Prisma.CouponRedemptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CouponRedemptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    data: Prisma.CouponRedemptionCreateManyInput | Prisma.CouponRedemptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CouponRedemptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CouponRedemptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelect<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    include?: Prisma.CouponRedemptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponRedemptionUpdateInput, Prisma.CouponRedemptionUncheckedUpdateInput>;
    where: Prisma.CouponRedemptionWhereUniqueInput;
};
export type CouponRedemptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CouponRedemptionUpdateManyMutationInput, Prisma.CouponRedemptionUncheckedUpdateManyInput>;
    where?: Prisma.CouponRedemptionWhereInput;
    limit?: number;
};
export type CouponRedemptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CouponRedemptionUpdateManyMutationInput, Prisma.CouponRedemptionUncheckedUpdateManyInput>;
    where?: Prisma.CouponRedemptionWhereInput;
    limit?: number;
    include?: Prisma.CouponRedemptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CouponRedemptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelect<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    include?: Prisma.CouponRedemptionInclude<ExtArgs> | null;
    where: Prisma.CouponRedemptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.CouponRedemptionCreateInput, Prisma.CouponRedemptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CouponRedemptionUpdateInput, Prisma.CouponRedemptionUncheckedUpdateInput>;
};
export type CouponRedemptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelect<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    include?: Prisma.CouponRedemptionInclude<ExtArgs> | null;
    where: Prisma.CouponRedemptionWhereUniqueInput;
};
export type CouponRedemptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponRedemptionWhereInput;
    limit?: number;
};
export type CouponRedemptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CouponRedemptionSelect<ExtArgs> | null;
    omit?: Prisma.CouponRedemptionOmit<ExtArgs> | null;
    include?: Prisma.CouponRedemptionInclude<ExtArgs> | null;
};
