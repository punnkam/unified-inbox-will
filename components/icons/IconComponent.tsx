// This component is used to render an icon component and pass classNames to it.

import React from "react";

interface IconComponentProps {
  icon: React.ElementType;
  classNames?: string;
}

export const IconComponent = ({
  icon: Icon,
  classNames,
}: IconComponentProps) => {
  return <Icon className={classNames} />;
};
