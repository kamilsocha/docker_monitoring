package pl.polsl.student.movieservice.domain;

import lombok.Getter;
import lombok.Setter;
import pl.polsl.student.movieservice.enums.BootstrapLabel;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "bootstrapentries")
public class BootStrapEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "label", nullable = false)
    private BootstrapLabel label;
}
