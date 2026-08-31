FROM mongo:7

# Optional local development credentials for MongoDB
ENV MONGO_INITDB_ROOT_USERNAME="admin" \
    MONGO_INITDB_ROOT_PASSWORD="pass"

EXPOSE 27017

VOLUME ["/data/db"]

CMD ["mongod", "--bind_ip_all"]
