import { serverSupabaseClient } from "#supabase/server"
import { CURRENT_SCHEMA_VERSION } from "~/constants/version"
import type { TablesInsert } from "~/types/database.types"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  try {
    const {
      data: { user },
      error: userError
    } = await client.auth.getUser()

    if (userError || !user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized"
      })
    }

    const body = await readBody(event).catch(() => ({}))
    const title = body?.title || "Untitled Resume"

    const insertData: TablesInsert<"resumes"> = {
      owner_id: user.id,
      title,
      schemaVersion: CURRENT_SCHEMA_VERSION
    }

    const { data, error } = await client.from("resumes").insert(insertData).select().single()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message || "Failed to create resume"
      })
    }

    return data
  } catch (error: unknown) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error
    }
    const err = error as { statusCode?: number; statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal server error"
    })
  }
})
