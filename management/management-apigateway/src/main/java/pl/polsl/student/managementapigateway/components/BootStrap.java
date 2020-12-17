package pl.polsl.student.managementapigateway.components;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import pl.polsl.student.managementapigateway.services.bootstrapservices.BootStrapService;

@Slf4j
@RequiredArgsConstructor
@Component
public class BootStrap {

    private final BootStrapService bootStrapService;

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        try {
            log.info("BootStrap start...");
            bootStrapService.boot();
            log.info("BootStrap success...");
        } catch (Exception e) {
            log.error("Bootstrap failed due to: " + e);
            e.printStackTrace();
            throw e;
        }
    }
}
