import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createEbookCheckoutSession, getCheckoutSessionStatus } from "./stripe";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  checkout: router({
    createEbookSession: publicProcedure.mutation(async ({ ctx }) => {
      const origin = ctx.req.headers.origin || `${ctx.req.protocol}://${ctx.req.get("host")}`;
      const session = await createEbookCheckoutSession({ origin, user: ctx.user });
      if (!session.url) {
        throw new Error("Stripe did not return a checkout URL");
      }
      return { url: session.url, sessionId: session.id };
    }),
    getSessionStatus: publicProcedure
      .input(z.object({ sessionId: z.string().min(1) }))
      .query(({ input }) => getCheckoutSessionStatus(input.sessionId)),
  }),
});

export type AppRouter = typeof appRouter;
