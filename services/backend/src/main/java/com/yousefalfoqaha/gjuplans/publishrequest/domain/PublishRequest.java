package com.yousefalfoqaha.gjuplans.publishrequest.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("publish_request")
public class PublishRequest {

    @Id
    private Long id;

    private RequestStatus status;

    private String message;

    @MappedCollection(idColumn = "publish_request")
    private Set<PublishRequestProgram> programs;

    @MappedCollection(idColumn = "publish_request")
    private Set<PublishRequestStudyPlan> studyPlans;

    @MappedCollection(idColumn = "publish_request")
    private Set<PublishRequestCourse> courses;

    @CreatedDate
    private Instant requestedAt;

    @CreatedBy
    private Long requestedBy;
}
