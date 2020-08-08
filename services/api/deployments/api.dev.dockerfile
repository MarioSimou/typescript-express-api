FROM alpine:3.12

ARG VERSION=${VERSION}

RUN apk update \
    && apk upgrade \
    && touch ~/.profile \
    && apk add --no-cache libstdc++ coreutils curl bash \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash \
    && echo "export NVM_NODEJS_ORG_MIRROR=https://unofficial-builds.nodejs.org/download/release" >> ~/.profile \
    && echo "nvm_get_arch() { nvm_echo \"x64-musl\"; }" >> ~/.profile \
    && source ~/.profile \
    && nvm install $VERSION \
    && nvm alias default $VERSION

COPY ./deployments/entrypoint.sh /root/entrypoint.sh
RUN ls -al ~
WORKDIR /app

EXPOSE 4000
ENTRYPOINT [ "/bin/bash", "/root/entrypoint.sh" ]
CMD [ "npm", "run", "dev" ]