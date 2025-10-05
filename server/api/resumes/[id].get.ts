import { serverSupabaseClient } from "#supabase/server"

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

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch resume"
      })
    }

    return resume
  } catch (error: unknown) {
    const err = error as { statusCode?: number; statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal server error"
    })
  }
})
