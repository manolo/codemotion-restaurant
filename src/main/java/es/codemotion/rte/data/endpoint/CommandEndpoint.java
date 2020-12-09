package es.codemotion.rte.data.endpoint;

import es.codemotion.rte.data.CrudEndpoint;
import es.codemotion.rte.data.entity.Command;
import es.codemotion.rte.data.service.CommandService;
import com.vaadin.flow.server.connect.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import javax.annotation.Nullable;

@Endpoint
public class CommandEndpoint extends CrudEndpoint<Command, Integer> {

    private CommandService service;

    public CommandEndpoint(@Autowired CommandService service) {
        this.service = service;
    }

    @Override
    protected CommandService getService() {
        return service;
    }

}
