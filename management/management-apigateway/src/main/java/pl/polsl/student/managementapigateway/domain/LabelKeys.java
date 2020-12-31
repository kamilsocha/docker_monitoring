package pl.polsl.student.managementapigateway.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LabelKeys {

    private String serviceNameLabelKey;
    private String systemNameLabelKey;
    private String systemNameLabelFullKey;
    private String serviceTypeLabelKey;
    private String infraServiceTypeLabelKey;
    private String domServiceTypeLabelKey;
    private String serviceSubtypeLabelKey;
}
