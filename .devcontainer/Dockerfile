# Simple development container
FROM mcr.microsoft.com/devcontainers/base:ubuntu

ENV DEBIAN_FRONTEND=noninteractive

# Install basic tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl git zip unzip wget && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && apt-get install -y --no-install-recommends nodejs && \
    rm -rf /var/lib/apt/lists/*

# Install Java 21
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      openjdk-21-jdk-headless && \
    rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME (path may vary slightly depending on the image)
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Set working directory
WORKDIR /workspace

# Expose ports
EXPOSE 8080 5173 4321

# Keep container running
CMD ["sleep", "infinity"]