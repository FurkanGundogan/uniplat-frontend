import ProfilePostArea from "./ProfilePostArea";
import ProfileEventArea from "./EventsTab/ProfileEventArea";

import Clubs from "./ClubTab/Clubs";
import Memberships from "./MembershipsTab/Memberships"
import Followers from "./FollowersTab/Followers";

export const alltabs={
  ProfilePostArea:<ProfilePostArea/>,
  Followers:<Followers/>,
  ProfileEventArea:<ProfileEventArea/>,
  Clubs:<Clubs/>,
  Memberships:<Memberships/>
}

export const GetContent = (index,useriid,uniid,isAdmin) => {

  if(useriid){
    switch (index) {
      case 0:
        return <ProfilePostArea />;

      case 1:
        return <ProfileEventArea />;
  
      case 2:
        return <Memberships />;
  
      default:
        break;
    }
  }


  if(uniid){
    switch (index) {
      case 0:
        return <ProfilePostArea isAdmin={isAdmin} />;
  
      case 1:
        return <Followers isAdmin={isAdmin}/>;
  
      case 2:
        return <ProfileEventArea isAdmin={isAdmin}/>;
  
      case 3:
        return (<Clubs isAdmin={isAdmin}/>);
  
      default:
        break;
    }
  }


};
