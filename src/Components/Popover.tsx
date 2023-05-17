import { FC, useEffect, useState } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

type PopoverProps = BoxProps & {
  isTriggered: boolean;
};

const Popover: FC<PopoverProps> = ({ isTriggered, ...rest }) => {
  const [isContentHovered, setIsContentHovered] = useState(false);

  const [displayContent, setDisplayContent] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      setDisplayContent(true);
    }

    if (!isTriggered && !isContentHovered) {
      setDisplayContent(false);
    }
  }, [isTriggered, isContentHovered]);

  return (
    <Box
      visibility={displayContent ? "visible" : "hidden"}
      opacity={displayContent ? "1" : "0"}
      transform={displayContent ? "translateY(0)" : "translateY(-0.75rem)"}
      transition="opacity 0.1s, visibility 0.2s, transform 0.2s"
      {...rest}
      onMouseEnter={(e) => {
        rest.onMouseEnter?.(e);
        setIsContentHovered(true);
      }}
      onMouseLeave={(e) => {
        rest.onMouseLeave?.(e);
        setIsContentHovered(false);
      }}
    />
  );
};

export default Popover;
