import ClubPostArea from './ClubPostArea'
import ClubEventArea from './ClubEventArea'
import Members from './MembersTab/Members';

export const getContent = (index) => {
  
  
  switch (index) {
    case 0:
      return <ClubPostArea/>;
      
    case 1:
      return <ClubEventArea/>;
      
    case 2:
      return "SURVEYS"
      
    case 3:
      return <Members/>;
      
    default:
      break;
  }
};
