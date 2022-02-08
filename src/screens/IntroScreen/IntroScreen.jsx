import React from "react";
import clsx from "clsx";
import Link from "next/link";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";
import urls from "../../utils/urls";
import classes from "./IntroScreen.module.scss";

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const IntroScreen = () => (
  <BindKeyboardSwipeableViews className={clsx(classes.root)} enableMouseEvents>
    <div className={classes.page}>
      <h1>Welcome to our study</h1>
      <h3>The following excercise will be testing your memory.</h3>
      <p className={classes.swipeNotif}>Please swipe →</p>
    </div>
    <div className={classes.page}>
      <h3>You will be shown a sequence of numbers.</h3>
      <h3>Please memorize this numbers in order.</h3>
    </div>
    <div className={classes.page}>
      <h3>After a few seconds these numbers will disappear.</h3>
      <h3>Then type these numbers in the order you remember them.</h3>
      <h3>If you cannot remember, press "I Forgot"</h3>
    </div>
    <div className={classes.page}>
      <h3>When you are ready to begin, press the button below</h3>
      <Link href={urls.test}>Start Test</Link>
    </div>
  </BindKeyboardSwipeableViews>
);

export default IntroScreen;
