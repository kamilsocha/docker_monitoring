package pl.polsl.student.managementapigateway.services;

import org.springframework.cloud.netflix.zuul.filters.ZuulProperties;
import org.springframework.cloud.netflix.zuul.web.ZuulHandlerMapping;
import org.springframework.stereotype.Service;


@Service
public class ZuulDynamicRoutingService {

    private final ZuulProperties zuulProperties;

    private final ZuulHandlerMapping zuulHandlerMapping;


    public ZuulDynamicRoutingService(ZuulProperties zuulProperties, ZuulHandlerMapping zuulHandlerMapping) {
        this.zuulProperties = zuulProperties;
        this.zuulHandlerMapping = zuulHandlerMapping;
    }

    public void prepareRoute(String name, String url) {
        createOrUpdateRoute(name, url);
    }

    public void removeRoute(String name) {
        name = "/systems/" + name;
        if(hasRoute(name)) {
            zuulProperties.getRoutes().remove(name);
            zuulHandlerMapping.setDirty(true);
        }
    }

    private void createOrUpdateRoute(String name, String url) {

        ZuulProperties.ZuulRoute zuulRoute = new ZuulProperties.ZuulRoute("/systems/" + name + "/**", url);
        if(hasRoute(name)) {
            zuulProperties.getRoutes().replace(name, zuulRoute);
        } else {
            zuulProperties.getRoutes().put(name, zuulRoute);
        }
        zuulHandlerMapping.setDirty(true);

    }
    
    private boolean hasRoute(String name) {
        var zuulRoutes = zuulProperties.getRoutes();
        return zuulRoutes.containsKey(name);

    }
}
