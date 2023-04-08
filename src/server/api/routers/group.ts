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
        },
      });
    }),
});