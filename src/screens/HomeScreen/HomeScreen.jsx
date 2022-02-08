import React from "react";
import clsx from "clsx";
import Link from "next/link";
import urls from "../../utils/urls";
import classes from "./HomeScreen.module.scss";

const HomeScreen = () => (
  <div className={clsx(classes.root)}>
    <h1>Welcome to our study</h1>
    <h3>Team Tempo</h3>
    <Link href={urls.intro}>Start Test</Link>
  </div>
);

export default HomeScreen;
