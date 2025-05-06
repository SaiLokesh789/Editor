FROM openjdk:17-slim-buster
RUN apt-get update && apt-get install -y time
WORKDIR /app
CMD ["bash"]
