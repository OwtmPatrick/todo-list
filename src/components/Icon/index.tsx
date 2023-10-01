import { FC, SVGProps } from 'react';

import { ReactComponent as FacebookIcon } from '../../assets/socials/facebook.svg';
import { ReactComponent as TwitterIcon } from '../../assets/socials/twitter.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/socials/youtube.svg';
import { ReactComponent as InstagramIcon } from '../../assets/socials/instagram.svg';

export type IconName = 'facebook' | 'twitter' | 'youtube' | 'instagram';

const Icons: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon
};

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = Icons[name];

  return <IconComponent />;
};
