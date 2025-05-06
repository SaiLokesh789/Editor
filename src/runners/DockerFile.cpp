FROM gcc:latest
RUN apt-get update && apt-get install -y time
WORKDIR /app
CMD ["bash"]
