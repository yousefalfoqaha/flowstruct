package com.yousefalfoqaha.flowsheet.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Reference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("flowsheet")
public class Flowsheet {
        @Id
        UUID uuid;
        boolean isSuggested;
        long studyPlanId;
        @MappedCollection(idColumn = "flowsheet_uuid", keyColumn = "course_id")
        Map<Long, CourseMapping> courseMappings;
}
