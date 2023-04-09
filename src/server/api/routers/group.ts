import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const groupRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.group.create({
        data: {
          name: input.name,
          users: {
            create: [
              {
                userId: ctx.session.user.id
              }
            ]
          }
        },
      });
    }),
  
  getGroup: protectedProcedure
  .input(z.object({groupId: z.string()}))
  .query(({ctx, input}) => {
    return ctx.prisma.group.findUniqueOrThrow({
      where: {
        id: input.groupId
      },
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    })
  })
});