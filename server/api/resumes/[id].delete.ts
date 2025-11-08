import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"

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

  const client = await serverSupabaseClient(event)

  // Verify the resume exists and belongs to the user
  const { data: resume, error: fetchError } = await client
    .from("resumes")
    .select("id")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single()

  if (fetchError) {
    if (fetchError.code === "PGRST116") {
      throw createError({
        statusCode: 404,
        statusMessage: "Resume not found"
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: fetchError.message || "Failed to fetch resume"
    })
  }

  if (!resume) {
    throw createError({
      statusCode: 404,
      statusMessage: "Resume not found"
    })
  }

  // Delete the resume
  const { error: deleteError } = await client.from("resumes").delete().eq("id", id).eq("owner_id", user.id)

  if (deleteError) {
    throw createError({
      statusCode: 500,
      statusMessage: deleteError.message || "Failed to delete resume"
    })
  }

  return { success: true, id }
})
