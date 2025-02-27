//import * as HoverCard from "@radix-ui/react-hover-card";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Arrow,
} from "@radix-ui/react-hover-card";
import React, { ReactNode } from "react";

// const HoverCardDemo = ({
//   children,
//   message,
// }: {
//   children: ReactNode;
//   message: string;
// }) => (
//   <HoverCard.Root>
//     <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
//     <HoverCard.Portal>
//       <HoverCard.Content className="HoverCardContent" sideOffset={5}>
//         <div className="bg-dark2 w-auto max-w-full p-3 rounded-[1rem]">
//           {message}
//         </div>

//         <HoverCard.Arrow className="HoverCardArrow" />
//       </HoverCard.Content>
//     </HoverCard.Portal>
//   </HoverCard.Root>

// );

const HoverCardDemo = ({
  children,
  message,
  body,
  zIndex = 0,
}: {
  children: ReactNode;
  message: string;
  body?: ReactNode;
  zIndex?: number;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      style={{ position: "relative", zIndex }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <HoverCard open={isOpen}>
        <HoverCardTrigger>{children}</HoverCardTrigger>
        <HoverCardContent>
          <div className="bg-dark2 w-auto max-w-full p-3 rounded-[1rem]">
            {body ? body : message}
          </div>
          <Arrow className="HoverCardArrow" />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default HoverCardDemo;
