package es.codemotion.rte.data.endpoint;

import com.vaadin.flow.server.connect.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;

import es.codemotion.rte.data.CrudEndpoint;
import es.codemotion.rte.data.entity.Command;
import es.codemotion.rte.data.service.CommandService;

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
