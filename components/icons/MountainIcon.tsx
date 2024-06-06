import * as React from "react";
const MountainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M6.293 2 8.96 7.333 12.293 4l3.334 10H2.293l4-12Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.96 0h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
);
export default MountainIcon;
