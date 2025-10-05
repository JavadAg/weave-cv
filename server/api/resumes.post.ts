import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

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

    const { data: newResume, error } = await client
      .from("resumes")
      .insert({
        owner_id: user.id,
        title: body.title,
        content_json: body.content_json,
        css_custom: body.css_custom,
        theme: body.theme
      })
      .select()
      .single()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to create resume"
      })
    }

    return newResume
  } catch (error: unknown) {
    const err = error as { statusCode?: number; statusMessage?: string }
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal server error"
    })
  }
})
