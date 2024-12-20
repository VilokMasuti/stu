
import { create } from 'zustand';

import { supabase } from '../db/supabase';


const useStore = create((set, get) => ({
  // State properties:
  students: [], // Array to store student records
  loading: false, // Boolean to indicate loading state
  error: null, // Error message storage
  filters: {
    year: 'AY 2024-25', // Default year filter for fetching students
    class: 'CBSE 9', // Default class filter (not actively used in current logic)
  },

  // 1. setFilters: Function to update filter criteria and refetch students
  setFilters: (filters) => {
    // Merge new filters with existing filters in the state
    set({ filters: { ...get().filters, ...filters } });
    // Call fetchStudents to get updated data based on new filters
    get().fetchStudents();
  },

  // 2. fetchStudents: Function to fetch students from the Supabase database
  fetchStudents: async () => {
    const { year } = get().filters; // Extract the 'year' filter
    set({ loading: true, error: null }); // Set loading state to true and clear errors
    try {
      // Query the 'students' table with joined 'student_courses' and 'courses' relationships
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
        .eq('cohort', year) // Filter students by cohort (year)
        .order('student_name'); // Sort students by name

      if (error) throw error; // If an error occurs, throw it

      set({ students: data, loading: false }); // Update students in state and stop loading
    } catch (error) {
      set({ error: error.message, loading: false }); // Handle errors and stop loading
      console.error('Error fetching students:', error);
    }
  },

  // 3. addStudent: Function to add a new student and their course relationships
  addStudent: async (studentData) => {
    const { filters } = get(); // Access the current filters
    set({ loading: true, error: null }); // Set loading state and clear errors
    try {
      // Step 1: Insert student data into 'students' table with current filter year
      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert([
          {
            student_name: studentData.student_name,
            cohort: filters.year, // Add student to the current selected year
            status: studentData.status,
            date_joined: new Date().toISOString(), // Add join date
            last_login: new Date().toISOString(), // Add current time as last login
          },
        ])
        .select();

      if (studentError) throw studentError; // Throw if insertion fails

      // Step 2: If courses are provided, handle relationships in 'student_courses'
      if (studentData.courses?.length > 0) {
        const coursePromises = studentData.courses.map(async (course) => {
          let courseId;

          // Check if the course already exists
          let { data: existingCourse } = await supabase
            .from('courses')
            .select('*')
            .eq('course_name', course.course_name)
            .single();

          if (!existingCourse) {
            // Insert the course if it doesn't exist
            const { data: newCourse, error: courseError } = await supabase
              .from('courses')
              .insert([
                {
                  course_name: course.course_name,
                  course_code: course.course_code,
                },
              ])
              .select()
              .single();

            if (courseError) throw courseError;
            courseId = newCourse.id; // Get new course ID
          } else {
            courseId = existingCourse.id; // Use existing course ID
          }

          // Insert a relationship in 'student_courses' linking student and course
          const { error: relationError } = await supabase
            .from('student_courses')
            .insert([
              {
                student_id: student[0].id,
                course_id: courseId,
              },
            ]);

          if (relationError) throw relationError;
        });

        await Promise.all(coursePromises); // Wait for all course relationships to be added
      }

      await get().fetchStudents(); // Refresh student list after adding
      return student[0]; // Return newly added student
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 4. updateStudent: Function to update student details and course relationships
  updateStudent: async (id, updates) => {
    const { filters } = get();
    set({ loading: true, error: null });
    try {
      // Step 1: Update student details
      const { data, error: studentError } = await supabase
        .from('students')
        .update({
          student_name: updates.student_name,
          cohort: filters.year, // Update cohort to current year
          status: updates.status,
          last_login: new Date().toISOString(),
        })
        .eq('id', id)
        .select();

      if (studentError) throw studentError;

      // Step 2: Update course relationships
      if (updates.courses) {
        // Delete existing relationships
        const { error: deleteError } = await supabase
          .from('student_courses')
          .delete()
          .eq('student_id', id);

        if (deleteError) throw deleteError;

        // Add updated course relationships
        for (const course of updates.courses) {
          let courseId;

          // Check if course exists
          let { data: existingCourse } = await supabase
            .from('courses')
            .select('*')
            .eq('course_name', course.course_name)
            .single();

          if (!existingCourse) {
            // Insert new course
            const { data: newCourse, error: courseError } = await supabase
              .from('courses')
              .insert([
                {
                  course_name: course.course_name,
                  course_code: course.course_code,
                },
              ])
              .select()
              .single();

            if (courseError) throw courseError;
            courseId = newCourse.id;
          } else {
            courseId = existingCourse.id;
          }

          // Insert new student-course relationship
          const { error: relationError } = await supabase
            .from('student_courses')
            .insert([
              {
                student_id: id,
                course_id: courseId,
              },
            ]);

          if (relationError) throw relationError;
        }
      }

      await get().fetchStudents(); // Refresh list
      return data[0];
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 5. deleteStudent: Function to delete a student and their course relationships
  deleteStudent: async (id) => {
    set({ loading: true, error: null });
    try {
      // Delete student from 'students' table
      const { error: deleteError } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Delete relationships in 'student_courses' table
      const { error: relationError } = await supabase
        .from('student_courses')
        .delete()
        .eq('student_id', id);

      if (relationError) throw relationError;

      await get().fetchStudents(); // Refresh list
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error deleting student:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

// Export the Zustand store
export default useStore;
