import ForumIcon from '@mui/icons-material/Forum';
import SubjectIcon from '@mui/icons-material/Subject';

export const getPrimaryNavList = () => {
  return [
    {
      title: 'Dashboard',
      route: '/dashboard',
      Icon: SubjectIcon,
      description: 'View the course outline to get an overview of the course',
    },
    {
      title: 'Forum',
      route: 'https://edstem.org/au/join/cP8yUr',
      Icon: ForumIcon,
      description: 'Post questions and get answers about course or content queries',
    }
  ];
};
