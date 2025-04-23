from pyicub.helper import iCub, JointPose, ICUB_HEAD, iCubFullbodyAction, iCubFullbodyStep

import os

class Step(iCubFullbodyStep):

    def prepare(self):

        pose_up = JointPose(target_joints=[20.0, 0.0, 0.0, 0.0, 0.0, 5.0])
        pose_down = JointPose(target_joints=[-20.0, 0.0, 0.0, 0.0, 0.0, 5.0])
        pose_home = JointPose(target_joints=[0.0, 0.0, 0.0, 0.0, 0.0, 5.0])

        motion = self.createLimbMotion(ICUB_HEAD)
        motion.createJointsTrajectory(pose_up, duration=3.0)
        motion.createJointsTrajectory(pose_down, duration=3.0)
        motion.createJointsTrajectory(pose_home, duration=3.0)

class HeadAction(iCubFullbodyAction):

    def prepare(self):
        step = Step()
        self.addStep(step)