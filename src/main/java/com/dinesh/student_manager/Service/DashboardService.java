package com.dinesh.student_manager.Service;

import java.util.List;

import com.dinesh.student_manager.dto.CourseDistributionDTO;
import com.dinesh.student_manager.dto.DashboardStatsDTO;
import com.dinesh.student_manager.dto.EnrollmentTrendDTO;
import com.dinesh.student_manager.dto.RecentEnrollmentDTO;
import com.dinesh.student_manager.dto.RecentStudentDTO;

public interface DashboardService {
    DashboardStatsDTO getDashboardStats();
    List<EnrollmentTrendDTO> getEnrollmentTrend();
    List<CourseDistributionDTO> getCourseDistribution();
    List<RecentStudentDTO> getRecentStudents();
    List<RecentEnrollmentDTO> getRecentEnrollments();
    
}
