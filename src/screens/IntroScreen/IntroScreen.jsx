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
      <h3>The following excercise will be testing your memory.</h3>
      <p className={classes.swipeNotif}>Please swipe →</p>
    </div>
    <div className={classes.page}>
      <h3>You will be shown a sequence of numbers.</h3>
      <h4>Please memorize these numbers in order.</h4>
    </div>
    <div className={classes.page}>
      <h3>
        Once all numbers have been shown, you will be asked to recall them in
        their order of presentation.
      </h3>
      <h4>If you cannot remember, press "I Forgot"</h4>
    </div>
    <div className={classes.page}>
      <h3>When you are ready to begin, press the button below:</h3>
      <Link href={urls.test}>Start Test</Link>
    </div>
  </BindKeyboardSwipeableViews>
);

export default IntroScreen;
