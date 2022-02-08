import React from "react";
import clsx from "clsx";
import Link from "next/link";
import urls from "../../utils/urls";
import classes from "./DebriefScreen.module.scss";

const DebriefScreen = () => (
  <div className={clsx(classes.root)}>
    <div className={classes.fill} />
    <h1>Debriefing</h1>
    <h2>Congrats!</h2>
    <h4>You have successfully completed this study</h4>
    <h4>The goal of this study was to find the effect of music on memory</h4>
    <h4>
      Specifically, we wanted to see how background music played during
      memorization and recall affected memory performance
    </h4>
    <h4>Thank you for your participation!</h4>
    <div className={classes.fill}>
      <Link href={urls.home}>Restart Test</Link>
    </div>
  </div>
);

export default DebriefScreen;
