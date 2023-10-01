import type { IconName } from '../components/Icon';

export type Route = {
  title: string;
  href: string;
};

export type Social = {
  href: string;
  icon: IconName;
};

export type ConnectionOption = {
  title: string;
};
