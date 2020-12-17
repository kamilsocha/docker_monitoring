package pl.polsl.student.managementapigateway.domain;

import lombok.Getter;
import lombok.Setter;
import pl.polsl.student.managementapigateway.enums.BootstrapLabel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "bootstrapentries")
public class BootStrapEntry extends BaseEntity {

    @Column(name = "label", nullable = false)
    private BootstrapLabel label;
}
