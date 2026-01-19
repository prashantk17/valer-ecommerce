const Title = ({ text1, text2, size = "normal" }) => {
  const sizeClasses =
    size === "large"
      ? "text-4xl md:text-5xl"
      : "text-4xl md:text-5xl";

  return (
    <h2
      className={`
        font-prata
        ${sizeClasses}
        tracking-tight
        text-neutral-900
        drop-shadow-sm
      `}
    >
      {text1} {text2}
    </h2>
  );
};

export default Title;
