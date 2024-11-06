import { FC, SVGProps } from 'react';

import { ReactComponent as AvaxIcon } from '../../assets/tokens/avax.svg';
import { ReactComponent as DaiIcon } from '../../assets/tokens/dai.svg';
import { ReactComponent as FacebookIcon } from '../../assets/socials/facebook.svg';
import { ReactComponent as TwitterIcon } from '../../assets/socials/twitter.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/socials/youtube.svg';
import { ReactComponent as InstagramIcon } from '../../assets/socials/instagram.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';

export type TokenIconName = 'avax' | 'dai';

export type SocialIconName = 'facebook' | 'twitter' | 'youtube' | 'instagram';

export type IconName = TokenIconName | SocialIconName | 'logout';

const Icons: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  avax: AvaxIcon,
  dai: DaiIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  logout: LogoutIcon
};

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = Icons[name];

  return <IconComponent />;
};
