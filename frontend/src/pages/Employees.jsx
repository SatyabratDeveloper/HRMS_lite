import { useState, useEffect } from "react";
import { employeeAPI } from "../services/api";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Loader from "../components/Loader";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch employees");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmployee = async (formData) => {
    setIsSubmitting(true);
    try {
      await employeeAPI.create(formData);
      setShowForm(false);
      await fetchEmployees();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await employeeAPI.delete(id);
      await fetchEmployees();
    } catch (err) {
      throw new Error(err.message || "Failed to delete employee");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Employees
            </h1>
            <p className="mt-2 text-sm text-gray-600">Manage your employee database</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="group bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Employee</span>
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {showForm && (
          <div className="mb-8 flex justify-center animate-fade-in">
            <EmployeeForm
              onSubmit={handleAddEmployee}
              onCancel={() => setShowForm(false)}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <EmployeeTable
            employees={employees}
            onDelete={handleDeleteEmployee}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default Employees;

