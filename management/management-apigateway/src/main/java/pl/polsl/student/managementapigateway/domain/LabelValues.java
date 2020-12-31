package pl.polsl.student.managementapigateway.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LabelValues {

    private String infraTypeLabelValue;
    private String domainTypeLabelValue;
    private String microServiceSubtypeLabelValue;
    private String databaseServiceSubtypeLabelValue;
    private String guiServiceSubtypeLabelValue;
}
