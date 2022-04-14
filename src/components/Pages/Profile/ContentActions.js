import ProfilePostArea from "./ProfilePostArea";
import ProfileEventArea from "./ProfileEventArea";
import GroupArea from "./GroupArea"
export const getContent = (index) => {
  switch (index) {
    case 0:
      return <ProfilePostArea />;

    case 1:
      return "CONTACTS";

    case 2:
      return <ProfileEventArea />;

    case 3:
      return "SURVEYS";

    case 4:
      return "LIKES";
    case 5:
      return <GroupArea/>;

    default:
      break;
  }
};
