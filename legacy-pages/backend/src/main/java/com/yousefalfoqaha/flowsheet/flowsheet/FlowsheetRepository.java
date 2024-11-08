package com.yousefalfoqaha.flowsheet.flowsheet;

import com.yousefalfoqaha.flowsheet.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FlowsheetRepository extends JpaRepository<Flowsheet, UUID> {

    @Query(
            "SELECT c " +
            "FROM CourseMapping c " +
            "WHERE c.courseId = :courseId " +
            "AND c.flowsheetUuid = :flowsheetUuid"
    )
    public Course findCourseInFlowsheet(@Param("courseId") long courseId, @Param("flowsheetUuid") UUID flowsheetUuid);

}
