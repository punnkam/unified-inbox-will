import * as React from "react";
const TreesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.627 6.667V6.8a2 2 0 0 1-.733 3.867h-2.6A2 2 0 0 1 3.627 6.8v-.133a2 2 0 0 1 4 0ZM5.626 10.667v4M9.626 12.667v2"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.96 12.667h5.533a.668.668 0 0 0 .467-1.134l-2-2.2h.2a.667.667 0 0 0 .467-1.133l-2-2.2h.133a.667.667 0 0 0 .533-1.133L9.627 2l-.934 1"
    />
  </svg>
);
export default TreesIcon;
