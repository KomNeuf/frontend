export default function TableLoader({ cols }) {
  return Array.from({ length: 12 }).map((_, index) => (
    <tr
      key={index}
      style={{ animationDelay: `${index / 8}s` }}
      className={`odd:bg-neutral-200 h-4 w-full  rounded-xl animate-pulse`}
    >
      {Array.from({ length: cols }).map((_, innerIndex) => (
        <td key={innerIndex} className="">
          <span className="invisible"></span>
        </td>
      ))}
    </tr>
  ));
}
