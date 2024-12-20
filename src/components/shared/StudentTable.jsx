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
import { Badge } from '../ui/badge'
import LoadingSpinner from './LoadingSpinner'
export function StudentTable() {
  const { toast } = useToast(); // Use pop-up messages to tell the user what happened (success/error)

  // Fetch the data and functions to show, add, edit, and delete students
  const {
    students, loading, error, addStudent, updateStudent, deleteStudent, filters, setFilters
  } = useStore();

  // These are for the "Add/Edit" form
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Pop-up box: Is it open or closed?
  const [selectedStudent, setSelectedStudent] = useState(null); // Who are we editing? If empty, we are adding a new one
  const [formData, setFormData] = useState({
    student_name: '',       // Start with empty student name
    cohort: 'AY 2024-25',   // Default year is 'AY 2024-25'
    status: 'active',       // Default status is 'active'
    courses: []             // No courses selected initially
  });

  // Function to get all the courses (like Math, Science) based on the selected class
  const getAvailableCourses = () => {
    const classPrefix = filters.class; // Example: "CBSE 9"
    return [
      { name: `${classPrefix} Science`, icon: Book },
      { name: `${classPrefix} Math`, icon: GraduationCap }
    ];
  };

  // Function to handle when we click the "Add" or "Save" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading when clicking the button
    try {
      if (selectedStudent) {
        // If editing, update the student
        await updateStudent(selectedStudent.id, formData);
        toast({ title: "Success", description: "Student updated successfully" });
      } else {
        // If adding a new student
        await addStudent(formData);
        toast({ title: "Success", description: "Student added successfully" });
      }

      // Close the form and reset it
      setIsDialogOpen(false);
      setSelectedStudent(null);
      setFormData({ student_name: '', cohort: filters.year, status: 'active', courses: [] });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  // If the app is still loading, show a spinner (circle animation)
  if (loading) return <div><LoadingSpinner /></div>;

  // If there's an error, show it
  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Get available courses for the dropdown
  const availableCourses = getAvailableCourses();

  return (
    <div className="space-y-4 bg-slate-50 shadow-2xl rounded-lg p-1">
      {/* Container for the filters and "Add New Student" button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Filters Section */}
        <div className="flex flex-col ml-1 pt-5 sm:flex-row sm:items-center gap-2">
          {/* Year Selection Dropdown */}
          <Select
            value={filters.year}
            onValueChange={(value) => setFilters({ year: value })}
          >
            <SelectTrigger className="w-full sm:w-[140px] bg-[#E9EDF1] text-slate-600 font-semibold">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
              <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
            </SelectContent>
          </Select>

          {/* Class Selection Dropdown */}
          <Select
            value={filters.class}
            onValueChange={(value) => setFilters({ class: value })}
          >
            <SelectTrigger className="w-full sm:w-[140px] bg-[#E9EDF1] text-slate-600 font-semibold">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE 9">CBSE 9</SelectItem>
              <SelectItem value="CBSE 10">CBSE 10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Button to Add a New Student */}
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-full sm:w-auto bg-[#E9EDF1] mr-2 mt-5 hover:bg-none text-slate-600 font-semibold"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new Student
        </Button>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-[#000000]">Student Name</TableHead>
                <TableHead className="font-semibold text-black">Cohort</TableHead>
                <TableHead className="font-semibold text-black">Courses</TableHead>
                <TableHead className="font-semibold text-black">Date Joined</TableHead>
                <TableHead className="font-semibold text-black">Last Login</TableHead>
                <TableHead className="font-semibold text-black w-[80px]">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  {/* Student Name */}
                  <TableCell className="text-sm whitespace-nowrap">
                    {student.student_name}
                  </TableCell>

                  {/* Cohort Information */}
                  <TableCell className="whitespace-nowrap text-sm">
                    {student.cohort}
                  </TableCell>

                  {/* List of Courses with Icons */}
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {student.student_courses?.map((sc) => {
                        // Dynamically select an icon based on the course name
                        const Icon = sc.courses.course_name.includes('Science') ? Book : GraduationCap;
                        return (
                          <div
                            key={sc.id}
                            className="inline-flex items-center gap-1 text-sm whitespace-nowrap"
                          >
                            <Icon className="h-4 w-4" />
                            <Badge className="rounded-sm text-sm text-[#000000] bg-gray-100">
                              {sc.courses.course_name}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </TableCell>

                  {/* Date Joined */}
                  <TableCell className="whitespace-nowrap text-sm">
                    {student.date_joined
                      ? new Date(student.date_joined).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                      : 'N/A'}
                  </TableCell>

                  {/* Last Login */}
                  <TableCell className="whitespace-nowrap text-sm">
                    {student.last_login
                      ? new Date(student.last_login).toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                      : 'Never'}
                  </TableCell>

                  {/* Status Indicator */}
                  <TableCell>
                    <span
                      className={`inline-flex h-3 w-3 ml-[20px] rounded-full ${student.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    />
                  </TableCell>

                  {/* Actions Dropdown */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* Edit Action */}
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedStudent(student);
                            setFormData({
                              student_name: student.student_name,
                              cohort: student.cohort,
                              status: student.status,
                              courses: student.student_courses.map((sc) => ({
                                id: sc.course_id,
                                course_name: sc.courses.course_name,
                                course_code: sc.courses.course_code,
                              })),
                            });
                            setIsDialogOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        {/* Delete Action */}
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            toast({
                              title: 'Success',
                              description: 'Student deleted successfully',
                            });
                            deleteStudent(student.id);
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

      {/* Add/Edit Student Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedStudent ? 'Edit Student' : 'Add New Student'}
            </DialogTitle>
          </DialogHeader>
          {/* Student Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student Name Input */}
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

            {/* Status Dropdown */}
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

            {/* Courses Selection */}
            <div className="space-y-4">
              <Label>Courses</Label>
              <div className="space-y-2">
                {availableCourses.map((course) => (
                  <Button
                    key={course.name}
                    type="button"
                    variant={
                      formData.courses.some((c) => c.course_name === course.name)
                        ? 'default'
                        : 'outline'
                    }
                    className="w-full justify-start"
                    onClick={() => {
                      const hasCourse = formData.courses.some(
                        (c) => c.course_name === course.name
                      );
                      setFormData({
                        ...formData,
                        courses: hasCourse
                          ? formData.courses.filter(
                            (c) => c.course_name !== course.name
                          )
                          : [
                            ...formData.courses,
                            {
                              course_name: course.name,
                              course_code: course.name.split(' ').pop(),
                            },
                          ],
                      });
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

