import * as React from "react";
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1.96 4 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L21.96 4M6.76 17h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311c.327-.642.327-1.482.327-3.162V5.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.68 1 18.84 1 17.16 1H6.76c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C1.96 3.28 1.96 4.12 1.96 5.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.24 17 5.08 17 6.76 17Z"
    />
  </svg>
);
export default SvgComponent;
