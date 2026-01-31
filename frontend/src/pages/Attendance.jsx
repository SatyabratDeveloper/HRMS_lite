import { useState, useEffect } from "react";
import { employeeAPI, attendanceAPI } from "../services/api";
import AttendanceForm from "../components/AttendanceForm";
import Loader from "../components/Loader";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployeeId) {
      fetchAttendance(selectedEmployeeId);
    } else {
      setAttendance(null);
    }
  }, [selectedEmployeeId]);

  const fetchEmployees = async () => {
    try {
      setIsLoadingEmployees(true);
      setError("");
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch employees");
    } finally {
      setIsLoadingEmployees(false);
    }
  };

  const fetchAttendance = async (employeeId) => {
    try {
      setIsLoadingAttendance(true);
      setError("");
      const response = await attendanceAPI.getByEmployee(employeeId);
      setAttendance(response.data.data);
    } catch (err) {
      setError(err.message || "Failed to fetch attendance");
      setAttendance(null);
    } finally {
      setIsLoadingAttendance(false);
    }
  };

  const handleMarkAttendance = async (formData) => {
    setIsSubmitting(true);
    try {
      await attendanceAPI.mark(formData);
      if (formData.employeeId) {
        setSelectedEmployeeId(formData.employeeId);
        await fetchAttendance(formData.employeeId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="mt-2 text-sm text-gray-600">Track and manage employee attendance</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <AttendanceForm
              employees={employees}
              onSubmit={handleMarkAttendance}
              isLoading={isSubmitting}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">View Attendance</h2>
            <div className="mb-4">
              <label htmlFor="viewEmployee" className="block text-sm font-medium text-gray-700 mb-1">
                Select Employee
              </label>
              <select
                id="viewEmployee"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee.employeeId}>
                    {employee.employeeId} - {employee.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {selectedEmployeeId && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance History</h2>

            {isLoadingAttendance ? (
              <Loader />
            ) : attendance ? (
              <div>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {attendance.employee.fullName} ({attendance.employee.employeeId})
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Days:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        {attendance.summary.totalDays}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Present:</span>
                      <span className="ml-2 font-semibold text-green-600">
                        {attendance.summary.presentDays}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Absent:</span>
                      <span className="ml-2 font-semibold text-red-600">
                        {attendance.summary.absentDays}
                      </span>
                    </div>
                  </div>
                </div>

                {attendance.attendance.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No attendance records found for this employee.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {attendance.attendance.map((record) => (
                          <tr key={record._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatDate(record.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  record.status === "Present"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No attendance data available.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;

