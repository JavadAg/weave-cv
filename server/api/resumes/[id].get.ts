import { serverSupabaseClient } from "#supabase/server"
import type { TResume } from "~/types/resume.types"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const id = getRouterParam(event, "id")

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required"
    })
  }

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

    const { data: resume, error } = await client
      .from("resumes")
      .select("*")
      .eq("owner_id", user.id)
      .eq("id", id)
      .single()
      .overrideTypes<TResume>()

    if (error) {
      if (error.code === "PGRST116") {
        throw createError({
          statusCode: 404,
          statusMessage: "Resume not found"
        })
      }
      throw createError({
        statusCode: 500,
        statusMessage: error.message || "Failed to fetch resume"
      })
    }

    if (!resume) {
      throw createError({
        statusCode: 404,
        statusMessage: "Resume not found"
      })
    }

    return resume
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
