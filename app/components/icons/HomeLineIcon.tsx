import * as React from "react";
const HomeLineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.48 16h8M9.498 1.764 2.715 7.04c-.453.353-.68.53-.843.75a2 2 0 0 0-.318.65c-.074.265-.074.552-.074 1.126V16.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C3 20 3.56 20 4.68 20h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108V9.565c0-.574 0-.861-.074-1.126a2.002 2.002 0 0 0-.318-.65c-.163-.22-.39-.397-.843-.75l-6.783-5.275c-.351-.273-.527-.41-.72-.462a1 1 0 0 0-.523 0c-.194.052-.37.189-.721.462Z"
    />
  </svg>
);
export default HomeLineIcon;
