FROM ubuntu:22.04

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install basic tools + gnupg for APT keys
RUN apt-get update && apt-get install -y \
    curl \
    git \
    bash \
    unzip \
    wget \
    ca-certificates \
    vim \
    htop \
    tree \
    software-properties-common \
    gnupg \
  && rm -rf /var/lib/apt/lists/*

# Add Adoptium (Eclipse Temurin) repo for jammy → install JDK 23
RUN curl -fsSL https://packages.adoptium.net/artifactory/api/gpg/key/public | apt-key add - && \
    add-apt-repository --yes "deb https://packages.adoptium.net/artifactory/deb/ jammy main" && \
    apt-get update && apt-get install -y temurin-23-jdk \
  && rm -rf /var/lib/apt/lists/*

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Point JAVA_HOME at Temurin 23
ENV JAVA_HOME=/usr/lib/jvm/temurin-23-jdk-amd64

# Working directory
WORKDIR /workspace

# Keep container alive
CMD ["sleep", "infinity"]
