import * as React from "react";
const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 10h4.5M8.25 1.75a1.06 1.06 0 0 1 1.5 1.5L3.5 9.5l-2 .5.5-2 6.25-6.25Z"
    />
  </svg>
);
export default EditIcon;
