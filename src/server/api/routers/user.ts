import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  join: protectedProcedure
    .input(
      z.object({ groupId: z.string() })
    ).mutation(async ({ctx, input}) => {
        return ctx.prisma.user.update({
            where: {
                id: ctx.session.user.id
            },
            data: {
              groups: {
                create: [
                  {
                    groupId: input.groupId
                  }
                ]
              }
            }
        })
    })
});