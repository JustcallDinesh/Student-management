import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import api from "../services/api";

const initialFormState = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  status: "ACTIVE",
};

export default function useStudents() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  //   const [error, setError] = useState("");

  //   const [successMessage, setSuccessMessage] = useState("");

  const [editingStudentId, setEditingStudentId] = useState(null);

  const [formData, setFormData] = useState(initialFormState);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  //--------------------------------------------------

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await getStudents();

      setStudents(response.data || []);

      //   setError("");
    } catch (err) {
      console.error(err);

      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  //--------------------------------------------------

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //--------------------------------------------------

  const resetForm = () => {
    setFormData(initialFormState);

    setEditingStudentId(null);
  };

  //--------------------------------------------------

  const handleEdit = (student) => {
    setEditingStudentId(student.id);

    setFormData({
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      status: student.status,
    });

    window.scrollTo({
      top: 900,
      behavior: "smooth",
    });
  };

  //--------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);

    try {
      if (editingStudentId) {
        await updateStudent(editingStudentId, formData);

        toast.success("Student updated successfully");
      } else {
        await createStudent(formData);

        toast.success("Student added successfully");
      }

      resetForm();

      fetchStudents();

      //   setError("");
    } catch (err) {
      console.error(err);

      toast.error("Failed to save students");
    } finally {
      setSubmitLoading(false);
    }
  };

  //--------------------------------------------------

  const confirmDelete = async () => {
    if (!selectedStudent) return;

    try {
      setDeleteLoading(true);
      console.log(selectedStudent)

      await api.delete(`/students/${selectedStudent.id}`);

      toast.success("Student deleted successfully");

      closeDeleteModal();

      await fetchStudents();
    } catch (err) {
        console.log(err)
      toast.error("Failed to delete student");
    } finally {
      setDeleteLoading(false);
    }
  };

  //--------------------------------------------------

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      student.fullName?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.phone?.toLowerCase().includes(search) ||
      student.status?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "ALL" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let valueA = a[sortField];
    let valueB = b[sortField];

    if (valueA === null || valueA === undefined) valueA = "";
    if (valueB === null || valueB === undefined) valueB = "";

    if (typeof valueA === "string") valueA = valueA.toLowerCase();
    if (typeof valueB === "string") valueB = valueB.toLowerCase();

    if (valueA < valueB) {
      return sortDirection === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return sortDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const totalItems = sortedStudents.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedStudents = sortedStudents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };
  //--------------------------------------------------

  return {
    students,
    loading,
    formData,
    // error,
    // successMessage,
    submitLoading,
    editingStudentId,

    sortedStudents,

    sortField,
    sortDirection,

    handleSort,

    searchTerm,
    setSearchTerm,
    filteredStudents,

    statusFilter,
    setStatusFilter,

    paginatedStudents,

    currentPage,

    totalPages,

    previousPage,

    nextPage,

    goToPage,

    fetchStudents,
    handleChange,
    handleSubmit,
    handleEdit,
    resetForm,

    isDeleteModalOpen,
    selectedStudent,
    deleteLoading,

    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
}
