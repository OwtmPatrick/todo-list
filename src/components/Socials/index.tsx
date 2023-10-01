import { List, ListItem, Link } from '@chakra-ui/react';
import { socials } from '../../constants/socials';
import { Icon } from '../Icon';

export const Socials = () => (
  <List display="flex" gap="30px" mt={{ base: '30px', lg: 0 }}>
    {socials.map(({ href, icon }) => (
      <ListItem key={href}>
        <Link href={href} target="_blank" _hover={{ opacity: '0.7' }} transition="opacity .2s">
          <Icon name={icon} />
        </Link>
      </ListItem>
    ))}
  </List>
);
