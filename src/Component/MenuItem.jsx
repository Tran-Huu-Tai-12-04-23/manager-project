function MenuItem({ style, children, open, className }) {
  return (
    open && (
      <div
        style={{
          ...style,
          zIndex: "10",
        }}
        className={` bg-light-third dark:bg-dark-third absolute ${className}`}
      >
        {children}
      </div>
    )
  );
}

export default MenuItem;
