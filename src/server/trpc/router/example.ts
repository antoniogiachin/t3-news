import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { env } from "../../../env/server.mjs";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAllTodayNews: publicProcedure
    .input(z.object({ loc: z.string() }))
    .query(async ({ input }) => {
      const { loc } = input;

      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${loc}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": env.NEWS_API_KEY,
          },
        }
      );

      return await res.json();
    }),
  searchByKeyword: publicProcedure
    .input(z.object({ keyword: z.string() }))
    .query(async ({ input }) => {
      const { keyword } = input;

      if (!keyword) return;

      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}`,
        {
          method: "GET",
          headers: {
            "X-Api-Key": env.NEWS_API_KEY,
          },
        }
      );

      return await res.json();
    }),
  saveSearch: protectedProcedure
    .input(z.object({ keyword: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { keyword } = input;
      const { session } = ctx;
      const id = session.user.id;

      const actualSearchHistory = await ctx.prisma.search.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (
        actualSearchHistory.find((ash) => ash.keyword === keyword) ||
        keyword === "" ||
        !keyword
      ) {
        return;
      }

      if (actualSearchHistory.length > 10) {
        const id = actualSearchHistory[9]?.id;
        await ctx.prisma.search.delete({ where: { id } });
      }

      return await ctx.prisma.search.create({
        data: { keyword, User: { connect: { id } } },
        include: { User: true },
      });
    }),
  getSearchHistory: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.search.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
