import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const travelEventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ location: z.string(), userId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.travelEvent.create(
        {
          data: {
            userId: input.userId,
            location: input.location
          }
        }
      )
    }),
});