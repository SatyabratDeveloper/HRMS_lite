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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="mt-2 text-sm text-gray-600">Manage your employee database</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add Employee
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-8 flex justify-center">
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

