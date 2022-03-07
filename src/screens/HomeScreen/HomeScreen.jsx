import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import urls from "../../utils/urls";
import classes from "./HomeScreen.module.scss";

const HomeScreen = () => {
  const router = useRouter();

  return (
    <div className={clsx(classes.root)}>
      <h1>Welcome to our study</h1>
      <h3>Team Tempo</h3>
      <Link
        href={{
          pathname: urls.intro,
          query: router.query || {},
        }}
      >
        Start Test
      </Link>
    </div>
  );
};

export default HomeScreen;
