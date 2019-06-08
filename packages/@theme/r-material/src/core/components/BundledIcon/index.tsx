import * as React from 'react';

import { ChevronLeft, ExpandLess, ExpandMore, Menu, StarBorder } from '@material-ui/icons';

interface BundleIconProps {
  type: string;
  fallback?: string;
}

const FALLBACK_TYPE = 'menu';

/**
 * Provides a component with bundled icon types and fallback options
 */
const BundledIcon: React.ComponentType<BundleIconProps> = (props: BundleIconProps): JSX.Element => {
  const bundledMap = {
    menu: <Menu />,
    chevronLeft: <ChevronLeft />,
    starBorder: <StarBorder />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />
  };

  const detectIconType = (): string => {
    if (Object.keys(bundledMap).includes(props.type)) {
      return props.type;
    }
    return props.fallback || FALLBACK_TYPE;
  };

  return bundledMap[detectIconType()];
};

export default BundledIcon;
