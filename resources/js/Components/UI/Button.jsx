import classNames from "classnames"

export default function Button({ type, children }) {
  const classes = classNames('btn', `btn-${type}`);
  return (
    <button className={classes}>{children}</button>
  )
}