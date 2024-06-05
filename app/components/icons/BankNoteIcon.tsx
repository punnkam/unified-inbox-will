import * as React from "react";
const BankNoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width={23}
    // height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.48 5h-2.5a1.5 1.5 0 1 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2-7v1m0 6v1m6-4h.01M5.48 8h.01M1.48 4.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C3 15 3.56 15 4.68 15h13.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108V4.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.873-.874C19.96 1 19.4 1 18.28 1H4.68C3.56 1 3 1 2.571 1.218a2 2 0 0 0-.874.874C1.48 2.52 1.48 3.08 1.48 4.2ZM17.98 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-12 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
    />
  </svg>
);
export default BankNoteIcon;
