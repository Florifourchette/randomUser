import type { Location } from './LocationInterface';
import type { Name } from './NameInterface';
import type { Picture } from './PictureInterface';
import type { Id } from './IdInterface';

export interface User {
  email: string;
  gender: string;
  location: Location;
  name: Name;
  phone: string;
  picture: Picture;
  id: Id;
}
