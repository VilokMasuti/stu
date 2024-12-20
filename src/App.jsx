import { useEffect } from 'react'
import useStore from './store/useStore'
import { Sidebar } from './components/shared/Sidebar'
import { Header } from './components/shared/Header'
import { StudentTable } from './components/shared/StudentTable'
import { Toaster } from './components/ui/toaster'

export default function App() {
  const { fetchStudents } = useStore()

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <StudentTable />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

