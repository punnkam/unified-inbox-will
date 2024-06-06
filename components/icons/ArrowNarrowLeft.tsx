import * as React from "react";
const ArrowNarrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.627 6H1.293m0 0 5 5m-5-5 5-5"
    />
  </svg>
);
export default ArrowNarrowLeft;
