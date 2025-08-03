package com.yousefalfoqaha.gjuplans.publishrequest.domain;

import com.yousefalfoqaha.gjuplans.program.domain.Program;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table("publish_request_program")
public class PublishRequestProgram {

    AggregateReference<Program, Long> program;
}
