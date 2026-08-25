package com.dinesh.student_manager.Controller;

import java.util.List;

// package com.dinesh.student_manager.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dinesh.student_manager.Service.DashboardService;
import com.dinesh.student_manager.dto.CourseDistributionDTO;
import com.dinesh.student_manager.dto.DashboardStatsDTO;
import com.dinesh.student_manager.dto.EnrollmentTrendDTO;
import com.dinesh.student_manager.dto.RecentEnrollmentDTO;
import com.dinesh.student_manager.dto.RecentStudentDTO;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStatsDTO getDashboardStats() {

        return dashboardService.getDashboardStats();
    }

    @GetMapping("/enrollment-trend")
    public List<EnrollmentTrendDTO> getEnrollmentTrend() {
        return dashboardService.getEnrollmentTrend();
    }

    @GetMapping("/course-distribution")
    public List<CourseDistributionDTO> getCourseDistribution() {

        return dashboardService.getCourseDistribution();
    }

    @GetMapping("/recent-students")
    public List<RecentStudentDTO> getRecentStudents() {
        return dashboardService.getRecentStudents();
    }

    @GetMapping("/recent-enrollments")
    public List<RecentEnrollmentDTO> getRecentEnrollments() {

        return dashboardService.getRecentEnrollments();
    }
}
