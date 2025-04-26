FROM pyicub_backend_image

USER root

ARG USERNAME=icub
ARG UID=1000
ARG GID=1000
ARG GROUPS="sudo,audio,video,input,dialout"

RUN apt-get update && apt-get install -y sudo \
 && if ! id -u ${USERNAME} >/dev/null 2>&1; then \
      groupadd -g ${GID} ${USERNAME} && \
      useradd -m -u ${UID} -g ${GID} -s /bin/bash ${USERNAME}; \
    fi \
 && for grp in $(echo ${GROUPS} | tr ',' ' '); do \
      groupadd -f $grp; usermod -aG $grp ${USERNAME}; \
    done \
 && echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
 && chmod 0440 /etc/sudoers.d/${USERNAME}

RUN chown -R ${USERNAME}:${GID} /home/${USERNAME}

USER ${USERNAME}
WORKDIR /home/${USERNAME}

# (Optional) Set env for graphical apps/X11 if needed
ENV QT_X11_NO_MITSHM=1 \
    DISPLAY=:0

SHELL ["/bin/bash", "-c"]
