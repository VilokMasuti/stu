import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Students from "@/pages/Students";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import Chapter from "@/pages/Chapter";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:pl-64">
          <Header />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/chapter" element={<Chapter />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
