package es.codemotion.rte.data.endpoint;

import es.codemotion.rte.data.CrudEndpoint;
import es.codemotion.rte.data.entity.Person;
import es.codemotion.rte.data.service.PersonService;
import com.vaadin.flow.server.connect.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import javax.annotation.Nullable;

@Endpoint
public class PersonEndpoint extends CrudEndpoint<Person, Integer> {

    private PersonService service;

    public PersonEndpoint(@Autowired PersonService service) {
        this.service = service;
    }

    @Override
    protected PersonService getService() {
        return service;
    }

}
