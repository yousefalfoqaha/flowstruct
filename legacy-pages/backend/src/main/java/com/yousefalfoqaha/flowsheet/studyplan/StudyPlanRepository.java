package com.yousefalfoqaha.flowsheet.studyplan;

import com.yousefalfoqaha.flowsheet.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyPlanRepository extends JpaRepository<StudyPlan, Long> {

    @Query(
            "SELECT c " +
            "FROM Section s " +
            "JOIN s.courses c " +
            "WHERE s.studyPlan.id = :studyPlanId"
    )
    List<Course> findAllCoursesByStudyPlanId(@Param("studyPlanId") long studyPlanId);
}
