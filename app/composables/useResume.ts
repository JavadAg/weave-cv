import type { Tables } from "~/types/database.types"

export type Resume = Tables<"resumes">

type ResumeCrudState = {
  resumes: Resume[]
  loading: boolean
  error: string | undefined
  creating: boolean
  updating: boolean
  deleting: boolean
}

export const useResume = () => {
  const user = useSupabaseUser()

  const state = reactive<ResumeCrudState>({
    resumes: [],
    loading: false,
    error: undefined,
    creating: false,
    updating: false,
    deleting: false
  })

  const clearError = () => {
    state.error = undefined
  }

  const setError = (error: string) => {
    state.error = error
  }

  const fetchResumes = async (): Promise<Resume[]> => {
    if (!user.value) {
      throw new Error("User not authenticated")
    }

    state.loading = true
    state.error = undefined

    try {
      const { data, error } = useFetch("/api/resumes", {
        method: "GET",
        immediate: false,
        lazy: true
      })

      if (error) {
        throw new Error(error.value?.message)
      }

      state.resumes = data.value || []
      return data.value || []
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "Failed to fetch resumes"
      setError(errorMessage)
      throw error
    } finally {
      state.loading = false
    }
  }

  const fetchResume = async (id: string): Promise<Resume> => {
    if (!user.value) {
      throw new Error("User not authenticated")
    }

    state.loading = true
    state.error = undefined

    try {
      const { data, error } = useFetch(`/api/resumes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        immediate: false
      })

      if (error) {
        throw new Error(error.value?.message)
      }

      return data.value?.resume || {}
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "Failed to fetch resume"
      setError(errorMessage)
      throw error
    } finally {
      state.loading = false
    }
  }

  const createResume = async (data: Resume): Promise<Resume> => {
    if (!user.value) {
      throw new Error("User not authenticated")
    }

    state.creating = true
    state.error = undefined

    try {
      const resumeData = {
        owner_id: user.value.id,
        title: data.title || "Untitled Resume",
        content_json: data.content_json || {},
        css_custom: data.css_custom || "",
        theme: data.theme || {}
      }

      const { data: newResume, error } = await $fetch("/api/resumes", {
        method: "POST",
        body: resumeData
      })

      if (error) {
        throw new Error(error.message)
      }

      state.resumes.unshift(newResume)
      return newResume
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "Failed to create resume"
      setError(errorMessage)
      throw error
    } finally {
      state.creating = false
    }
  }

  /* const updateResume = async (
    id: string,
    data: Resume
  ): Promise<Resume> => {
    if (!user.value) {
      throw new Error("User not authenticated")
    }

    state.updating = true
    state.error = undefined

    try {
      const updateData = {
        ...data,
        updated_at: new Date().toISOString()
      }

      const { data: updatedResume, error } = await $fetch(`/api/resumes/${id}`, {
        method: "PUT",
        body: updateData
      })

      if (error) {
        throw new Error(error.message)
      }

      const index = state.resumes.findIndex((r) => r.id === id)
      if (index !== -1) {
        state.resumes[index] = updatedResume
      }

      return updatedResume
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "Failed to update resume"
      setError(errorMessage)
      throw error
    } finally {
      state.updating = false
    }
  } */

  /* const deleteResume = async (id: string): Promise<void> => {
    if (!user.value) {
      throw new Error("User not authenticated")
    }

    state.deleting = true
    state.error = undefined

    try {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", id)
        .eq("owner_id", user.value.id)

      if (error) {
        throw new Error(error.message)
      }

      state.resumes = state.resumes.filter((r) => r.id !== id)
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "Failed to delete resume"
      setError(errorMessage)
      throw error
    } finally {
      state.deleting = false
    }
  } */

  /* const duplicateResume = async (
    id: string,
    newTitle?: string
  ): Promise<Resume> => {
    if (!user.value) {
      throw new Error("User not authenticated")
    }

    state.creating = true
    state.error = undefined

    try {
      const originalResume = await fetchResume(id)

      const duplicateData: ResumeInsert = {
        owner_id: user.value.id,
        title: newTitle || `${originalResume.title} (Copy)`,
        content_json: originalResume.content_json,
        css_custom: originalResume.css_custom,
        theme: originalResume.theme
      }

      const { data: newResume, error } = await supabase
        .from("resumes")
        .insert(duplicateData)
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      state.resumes.unshift(newResume)
      return newResume
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || "Failed to duplicate resume"
      setError(errorMessage)
      throw error
    } finally {
      state.creating = false
    }
  } */

  return {
    state,
    fetchResumes,
    fetchResume,
    clearError,
    setError,
    createResume
    /* updateResume,
    deleteResume,
    duplicateResume */
  }
}
