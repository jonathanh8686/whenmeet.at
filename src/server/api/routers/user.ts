import { unknown, z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  join: protectedProcedure
    .input(
      z.object({ groupId: z.string() })
    ).mutation(async ({ ctx, input }) => {
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
    }),
    
    leave: protectedProcedure
    .input(z.object({groupId: z.string()}))
    .mutation(async ({ctx, input}) => {
      return ctx.prisma.userGroup.delete({
        where: {
          userId_groupId: {
            userId: ctx.session.user.id,
            groupId: input.groupId
          }
        },
      })
    }),

  getSelfWithGroups: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id
        },
        include: {
          groups: {
            include: {
              group: true
            }
          }
        }
      })
    }),
});