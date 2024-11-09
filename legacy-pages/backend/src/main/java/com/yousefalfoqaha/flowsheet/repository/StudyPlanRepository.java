package com.yousefalfoqaha.flowsheet.repository;

import com.yousefalfoqaha.flowsheet.model.Course;
import com.yousefalfoqaha.flowsheet.model.StudyPlan;
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
                    "WHERE s.studyPlan.id = :studyPlanId " +
                    "AND c.id IN :courseIds"
    )
    List<Course> findCoursesInStudyPlan(
            @Param("studyPlanId") long studyPlanId,
            @Param("courseIds") List<Long> courseIds
    );
}
