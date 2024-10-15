import classNames from "classnames"
import { router } from "@inertiajs/react";

export default function Button({ type, children, userId }) {
  const classes = classNames('btn', `btn-${type}`);

  return (
    <button className={classes}>{children}</button>
  )
}