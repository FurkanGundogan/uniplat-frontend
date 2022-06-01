import ClubPostArea from './ClubPostArea'
import ClubEventArea from './EventsTab/ClubEventArea'
import Members from './MembersTab/Members';
export const getContent = (index,isAdmin) => {
   
console.log("ia getconent",isAdmin)
  switch (index) {
    case 0:
      return <ClubPostArea isAdmin={isAdmin}/>;
      
    case 1:
      return <ClubEventArea isAdmin={isAdmin}/>;
      
    case 2:
      return <Members isAdmin={isAdmin}/>;
      
    default:
      break;
  }
};
