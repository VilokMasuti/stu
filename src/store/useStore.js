import { create } from 'zustand'
import { supabase } from '../db/supabase'

const useStore = create((set, get) => ({
  students: [],
  courses: [],
  loading: false,
  error: null,
  filters: {
    year: 'AY 2024-25',
    class: 'CBSE 9',
  },

  setFilters: (filters) => {
    set({ filters: { ...get().filters, ...filters } })
    get().fetchStudents()
  },

  fetchStudents: async () => {
    const { year } = get().filters
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          student_courses (
            id,
            course_id,
            courses (
              id,
              course_name,
              course_code
            )
          )
        `)
        .eq('cohort', year)
        .order('student_name')

      if (error) throw error
      set({ students: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error fetching students:', error)
    }
  },

  addStudent: async (studentData) => {
    set({ loading: true, error: null })
    try {
      // First insert the student
      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert([{
          student_name: studentData.student_name,
          cohort: studentData.cohort,
          status: studentData.status,
          date_joined: new Date().toISOString(),
          last_login: new Date().toISOString(),
        }])
        .select()

      if (studentError) throw studentError

      // Then insert new courses and create student-course relationships
      if (studentData.courses?.length > 0) {
        for (const course of studentData.courses) {
          // Insert new course
          const { data: newCourse, error: courseError } = await supabase
            .from('courses')
            .insert([{
              course_name: course.course_name,
              course_code: course.course_code
            }])
            .select()

          if (courseError) throw courseError

          // Create student-course relationship
          const { error: relationError } = await supabase
            .from('student_courses')
            .insert([{
              student_id: student[0].id,
              course_id: newCourse[0].id
            }])

          if (relationError) throw relationError
        }
      }

      await get().fetchStudents()
      return student[0]
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  updateStudent: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      // Update student data
      const { data, error: studentError } = await supabase
        .from('students')
        .update({
          student_name: updates.student_name,
          cohort: updates.cohort,
          status: updates.status,
          last_login: new Date().toISOString(),
        })
        .eq('id', id)
        .select()

      if (studentError) throw studentError

      // Update course relationships
      if (updates.courses) {
        // First remove existing relationships
        const { error: deleteError } = await supabase
          .from('student_courses')
          .delete()
          .eq('student_id', id)

        if (deleteError) throw deleteError

        // Then add new courses and relationships
        for (const course of updates.courses) {
          let courseId = course.id

          if (!courseId) {
            // Insert new course if it doesn't exist
            const { data: newCourse, error: courseError } = await supabase
              .from('courses')
              .insert([{
                course_name: course.course_name,
                course_code: course.course_code
              }])
              .select()

            if (courseError) throw courseError
            courseId = newCourse[0].id
          }

          // Create student-course relationship
          const { error: relationError } = await supabase
            .from('student_courses')
            .insert([{
              student_id: id,
              course_id: courseId
            }])

          if (relationError) throw relationError
        }
      }

      await get().fetchStudents()
      return data[0]
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  deleteStudent: async (id) => {
    set({ loading: true, error: null })
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id)

      if (error) throw error
      await get().fetchStudents()
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  fetchCourses: async () => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('course_name')

      if (error) throw error
      set({ courses: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
      console.error('Error fetching courses:', error)
    }
  },
}))

export default useStore

