Sposób uruchomienia

1. Z poziomu folderu "management"
   docker-compose up

2. Uruchomienie systemów mikroserwisów z folderów "docker-compose-prod", "docker-compose-test"
   docker-compose up
   lub
   docker-compose --compatibility up

Aplikacja monitorująca systemy na localhost:7080
ścieżki: actuator/routes
gui: /app
przykładowy użytkownik systemu monitorowanego:
email: test@test.com
hasło: <nie sprawdzane>
konto administratora użytkownika systemu monitorującego:
email: admin@admin.com
hasło: admin
