package pl.polsl.student.managementapigateway.configuration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.polsl.student.managementapigateway.domain.LabelKeys;
import pl.polsl.student.managementapigateway.domain.LabelValues;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemsConfig {

    private LabelKeys labelKeys;

    private LabelValues labelValues;

    private List<String> infraServicesSubtypes;

    private List<String> actuatorServiceSubtypes;

    private List<String> allowedActuatorLinks;

    private List<String> swaggerRoutes;
}
