package es.codemotion.rte.data.service;

import es.codemotion.rte.data.entity.Command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vaadin.artur.helpers.CrudService;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import javax.annotation.Nullable;

@Service
public class CommandService extends CrudService<Command, Integer> {

    private PersonRepository repository;

    public CommandService(@Autowired PersonRepository repository) {
        this.repository = repository;
    }

    @Override
    protected PersonRepository getRepository() {
        return repository;
    }

}
