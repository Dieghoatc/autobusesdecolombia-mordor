Restore database:
docker compose down

1. First, verify ports

Listening ports:
netstat -ano | findstr 5432

Process ID:
tasklist /FI "PID eq 11964"
tasklist /FI "PID eq 23676"

2. docker compose up -d

3. Then, copy the backup file to the container

docker cp .\abc-backup-9-15-2025 morialocal_db:/backup.dump

docker exec -it morialocal_db pg_restore --clean --no-acl --no-owner -U postgres -d postgres /backup.dump

Listen Logs:

docker logs mordor_api