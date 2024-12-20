import { useState, } from 'react'
import { Book, GraduationCap, MoreVertical, Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import useStore from '../../store/useStore'

export function StudentTable() {
  const { toast } = useToast()
  const {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,

    filters,
    setFilters
  } = useStore()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [formData, setFormData] = useState({
    student_name: '',
    cohort: 'AY 2024-25',
    status: 'active',
    courses: []
  })

  // Get available courses based on selected class
  const getAvailableCourses = () => {
    const classPrefix = filters.class
    return [
      { name: `${classPrefix} Science`, icon: Book },
      { name: `${classPrefix} Math`, icon: GraduationCap }
    ]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, formData)
        toast({
          title: "Success",
          description: "Student updated successfully",
        })
      } else {
        await addStudent(formData)
        toast({
          title: "Success",
          description: "Student added successfully",
        })
      }
      setIsDialogOpen(false)
      setSelectedStudent(null)
      setFormData({
        student_name: '',
        cohort: filters.year,
        status: 'active',
        courses: []
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-64 text-red-500">Error: {error}</div>

  const availableCourses = getAvailableCourses()

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Select
            value={filters.year}
            onValueChange={(value) => setFilters({ year: value })}
          >
            <SelectTrigger className="w-full sm:w-[140px] bg-gray-50">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
              <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.class}
            onValueChange={(value) => setFilters({ class: value })}
          >
            <SelectTrigger className="w-full sm:w-[140px] bg-gray-50">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE 9">CBSE 9</SelectItem>
              <SelectItem value="CBSE 10">CBSE 10</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto bg-[#18181B] hover:bg-[#18181B]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new Student
        </Button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium">Student Name</TableHead>
                <TableHead className="font-medium">Cohort</TableHead>
                <TableHead className="font-medium">Courses</TableHead>
                <TableHead className="font-medium">Date Joined</TableHead>
                <TableHead className="font-medium">Last Login</TableHead>
                <TableHead className="font-medium w-[80px]">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {student.student_name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {student.cohort}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {student.student_courses?.map((sc) => {
                        const Icon = sc.courses.course_name.includes('Science') ? Book : GraduationCap
                        return (
                          <div
                            key={sc.id}
                            className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{sc.courses.course_name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-gray-500">
                    {student.date_joined ?
                      new Date(student.date_joined).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      }) :
                      'N/A'
                    }
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-gray-500">
                    {student.last_login ?
                      new Date(student.last_login).toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      }) :
                      'Never'
                    }
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex h-2 w-2 rounded-full ${student.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedStudent(student)
                            setFormData({
                              student_name: student.student_name,
                              cohort: student.cohort,
                              status: student.status,
                              courses: student.student_courses.map(sc => ({
                                id: sc.course_id,
                                course_name: sc.courses.course_name,
                                course_code: sc.courses.course_code
                              }))
                            })
                            setIsDialogOpen(true)
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this student?')) {
                              deleteStudent(student.id)
                            }
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedStudent ? 'Edit Student' : 'Add New Student'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                value={formData.student_name}
                onChange={(e) =>
                  setFormData({ ...formData, student_name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Courses</Label>
              <div className="space-y-2">
                {availableCourses.map((course) => (
                  <Button
                    key={course.name}
                    type="button"
                    variant={formData.courses.some(c => c.course_name === course.name) ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => {
                      const hasCourse = formData.courses.some(c => c.course_name === course.name)
                      setFormData({
                        ...formData,
                        courses: hasCourse
                          ? formData.courses.filter(c => c.course_name !== course.name)
                          : [...formData.courses, {
                            course_name: course.name,
                            course_code: course.name.split(' ').pop()
                          }]
                      })
                    }}
                  >
                    <course.icon className="h-4 w-4 mr-2" />
                    {course.name}
                  </Button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              {selectedStudent ? 'Save Changes' : 'Add Student'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

