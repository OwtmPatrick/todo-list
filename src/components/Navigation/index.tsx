import { List, ListItem, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { navigation } from '../../navigation/navigation';

export const Navigation = () => (
  <List
    display="flex"
    flexDirection="column"
    alignItems={{ base: 'center', lg: 'flex-start' }}
    gap="12px"
    mt={{ base: '60px', lg: 0 }}
  >
    {navigation.map(({ title, href }) => (
      <ListItem key={title} textAlign="center">
        <Link to={href}>
          <Text transition="0.2s" color="gray.100" _hover={{ opacity: '0.7' }}>
            {title}
          </Text>
        </Link>
      </ListItem>
    ))}
  </List>
);
