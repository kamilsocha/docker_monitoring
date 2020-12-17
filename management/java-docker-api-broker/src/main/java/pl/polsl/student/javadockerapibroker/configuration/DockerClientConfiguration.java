package pl.polsl.student.javadockerapibroker.configuration;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.core.RemoteApiVersion;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Configuration
@PropertySource("classpath:application.yml")
public class DockerClientConfiguration {

    @Value("${dockerclient.host.protocol}")
    private String protocol;

    @Value("${dockerclient.host.address}")
    private String hostAddress;

    @Value("${dockerclient.host.port}")
    private String hostPort;

    @Value("${dockerclient.cert.verify}")
    private Boolean certVerify;

    @Value("${dockerclient.cert.path}")
    private String certPath;

    @Value("${dockerclient.api.version}")
    private String apiVersion;

    @Value("${dockerclient.registry.uri}")
    private String registryURI;

    @Value("${dockerclient.registry.username}")
    private String registryUsername;

    @Value("${dockerclient.registry.password}")
    private String registryPassword;

    @Value("${dockerclient.registry.email}")
    private String registryEmail;

    @Bean
    public DockerClient dockerClient() throws IOException {
        log.warn("path: " + certPath);
//        Path path = Path.of(certPath);
//        if(!Files.exists(path)) {
//            certPath="";
//        }

        DefaultDockerClientConfig.Builder config = DefaultDockerClientConfig.createDefaultConfigBuilder();
        if(!protocol.equals("") && !hostAddress.equals("") && !hostPort.equals("")) {
            config.withDockerHost(protocol + hostAddress + ":" + hostPort);
        }
        if(certVerify) {
            config.withDockerTlsVerify(true);
            config.withDockerCertPath(certPath);
        }
        if(!apiVersion.equals("")) {
            config.withApiVersion(RemoteApiVersion.parseConfig(apiVersion));
        }
        if(!registryURI.equals("")) {
            config.withRegistryUrl(registryURI)
                    .withRegistryUsername(registryUsername)
                    .withRegistryPassword(registryPassword)
                    .withRegistryEmail(registryEmail);
        }

        return DockerClientBuilder.getInstance(config.build()).build();
    }
}
