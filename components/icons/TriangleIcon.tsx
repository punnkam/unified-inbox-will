import * as React from "react";
const TriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={10}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="m3.46 9.054 5.833-3.333a.833.833 0 0 0 0-1.45L3.46.937a.833.833 0 0 0-1.25.73v6.666a.833.833 0 0 0 1.25.721Z"
    />
  </svg>
);
export default TriangleIcon;
