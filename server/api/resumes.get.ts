import { serverSupabaseClient } from "#supabase/server"

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

    const { data: resumes, error } = await client
      .from("resumes")
      .select("*")
      .eq("owner_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch resumes"
      })
    }

    return resumes
  } catch (error: unknown) {
    const err = error as { statusCode?: number; statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal server error"
    })
  }
})
