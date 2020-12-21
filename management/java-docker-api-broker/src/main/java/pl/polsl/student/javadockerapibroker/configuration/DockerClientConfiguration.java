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

@Slf4j
@Configuration
@PropertySource("classpath:application.yml")
public class DockerClientConfiguration {

    @Value("${dockerclient.dockerhost}")
    private String dockerhost;

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

        DefaultDockerClientConfig.Builder config = DefaultDockerClientConfig.createDefaultConfigBuilder();
        if(!dockerhost.equals("")) {
            config.withDockerHost(dockerhost);
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
