import GroupPostArea from './GroupPostArea'
import GroupEventArea from './GroupEventArea'
import Members from './Members';

export const getContent = (index) => {
  
  
  switch (index) {
    case 0:
      return <GroupPostArea/>;
      
    case 1:
      return <GroupEventArea/>;
      
    case 2:
      return "SURVEYS"
      
    case 3:
      return <Members/>;
      
    default:
      break;
  }
};
