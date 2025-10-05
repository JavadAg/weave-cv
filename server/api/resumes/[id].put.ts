// server/api/resumes/[id].put.ts
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import { sanitizeCss } from "~~/server/utils/cssSanitize"

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  const id = getRouterParam(event, "id")!

  const body = await readBody(event)

  const cssSafe = sanitizeCss(body.css || "")

  const client = await serverSupabaseClient(event)
  const { error } = await client
    .from("resumes")
    .update({
      title: body.title ?? undefined,
      content_json: body.structuredData,
      css_custom: cssSafe,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
  if (error)
    throw createError({ statusCode: 500, statusMessage: error.message })

  return { ok: true }
})
