import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Json, TablesUpdate } from "~/types/database.types"

type UpdateResumeBody = {
  title?: string
  content?: {
    personal?: unknown
    core?: unknown
  }
  configs?: unknown
  schemaVersion?: number
}

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  const id = getRouterParam(event, "id")

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required"
    })
  }

  const body = await readBody<UpdateResumeBody>(event)

  const client = await serverSupabaseClient(event)

  const updateData: TablesUpdate<"resumes"> = {
    updated_at: new Date().toISOString()
  }

  if (body.title) {
    updateData.title = body.title
  }

  if (body.content) {
    updateData.content = body.content as Json
  }
  if (body.configs) {
    updateData.configs = body.configs as Json
  }
  if (body.schemaVersion) {
    updateData.schemaVersion = body.schemaVersion
  }

  const { data: resume, error } = await client
    .from("resumes")
    .update(updateData)
    .eq("id", id)
    .eq("owner_id", user.id)
    .select()
    .single()

  if (error) {
    if (error.code === "PGRST116") {
      throw createError({
        statusCode: 404,
        statusMessage: "Resume not found"
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Failed to update resume"
    })
  }

  return resume
})
