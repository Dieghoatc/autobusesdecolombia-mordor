# docker build -t sqlite-container .
# docker run -d --name sqlite -v ${PWD}/data:/data sqlite-container sh -c "tail -f /dev/null"
# docker exec -it sqlite sqlite3 /data/test.db


FROM alpine:latest
RUN apk add --no-cache sqlite
WORKDIR /data
CMD ["sqlite3"]
