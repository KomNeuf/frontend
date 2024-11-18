
export default function LoadingButton({
  children,
  loading,
  successText,
  sucess,
  type,
  className,
  onClick,
  style,
}) {
  return (
    <button
      type={type}
      style={style}
      onClick={onClick}
      className={`flex align-center h-max max-h-m relative  justify-center btn ${className} ${
        sucess && "!bg-green-500"
      }`}
    >
      <div
        className={`${
          !loading && "!hidden"
        } absolute left-[50%] translate-x-[-20px] h-[18px] w-[40px] top-0 bottom-0 my-auto`}
      >
        <div
          className={`animate-oscillate h-full w-[20px] !bg-[#070911] absolute translate-y-[-50%]`}
        />
      </div>
      <span className={`${loading && "invisible"}`}>
        {sucess && successText ? successText : children}
      </span>
    </button>
  );
}
