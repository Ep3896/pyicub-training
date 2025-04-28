FROM pyicub_backend_image

USER root

ARG USERNAME=icub
ARG UID
ARG GID
ARG GROUPS="sudo,audio,video,input,dialout"

# --- Change 'icub' UID/GID to match host ---
RUN groupmod -g ${GID} ${USERNAME} \
 && usermod -u ${UID} -g ${GID} ${USERNAME} \
 && for grp in $(echo ${GROUPS} | tr ',' ' '); do \
      groupadd -f $grp; usermod -aG $grp ${USERNAME}; \
    done \
 && echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
 && chmod 0440 /etc/sudoers.d/${USERNAME} \
 && chown -R ${USERNAME}:${GID} /home/${USERNAME}

RUN chown -R ${USERNAME}:${GID} /home/${USERNAME}

USER ${USERNAME}
WORKDIR /home/${USERNAME}

# (Optional) Set env for graphical apps/X11 if needed
ENV QT_X11_NO_MITSHM=1 \
    DISPLAY=:0

SHELL ["/bin/bash", "-c"]
