package es.codemotion.rte.data.service;

import es.codemotion.rte.data.entity.Command;

import org.springframework.data.jpa.repository.JpaRepository;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import javax.annotation.Nullable;

public interface PersonRepository extends JpaRepository<Command, Integer> {

}