import { City } from "../models/common.model";
import { Comment } from "../models/comment.model";
import { environment } from "src/environments/environment";
import { generateRandomId } from "../utils/util-fnc.model";

// Define image
export const AVATAR_IMAGE = "https://www.caspianpolicy.org/no-image.png"
export const BACKGROUND_TEDDY_ONE: string = 'https://www.desktopbackground.org/p/2015/12/26/1063236_teddy-bear-wallpapers-new-hd-images_1600x900_h.jpg';
export const BACKGROUND_SALE_OFF_ONE: string = 'https://afamilycdn.com/2019/5/22/photo-1-1558509891449589673755.jpg';
export const BACKGROUND_SALE_OFF_TWO: string = 'https://images.samsung.com/is/image/samsung/assets/vn/offer/flashsale/20240229/time-slot-MO-V2.jpg?$720_N(540)_JPG$';
export const BACKGROUND_BEAR_ONE: string = 'https://marketplace.canva.com/EAFHu3xC03I/1/0/1600w/canva-beige-bear-desktop-wallpaper-9Vrb-3w_jP8.jpg';
export const BACKGROUND_BEAR_TWO: string = 'https://www.theteddybearshop.com/cdn/shop/files/TeddyBearShop_WebContent_Au23_0021_2500px_10a48632-ec6d-4887-ba7f-b39f301675f4.jpg?v=1706051020&width=2048';

// Define all key local storage
export const KEY_ACCESS_TOKEN = "access_token";
export const KEY_REFRESH_TOKEN = "refreshToken";
export const KEY_NUMBER_TRY_REQUEST = "number_try_request";
export const KEY_ORDER_DATA = "OrderData";
export const KEY_USERNAME = "username";

// Define columns
export const DEFAULT_ACCOUNT_COLUMNS: string[] = 
['id', 'username', 'birthday', 'gender', 'email', 'created', 'updated', 'isActive', 'mfaEnabled', 'mfaRegistered','function'];
export const DEFAULT_CATEGORY_COLUMNS: string[] = 
['id', 'name', 'image', 'created', 'updated', 'function'];
export const DEFAULT_PRODUCT_COLUMNS: string[] = 
['id', 'name', 'image', 'quantity', 'price', 'discount', 'created', 'updated', 'function', 'description'];

// Define api 
export const ACCOUNT_INFO: string = environment.apiUrl + 'accounts/info';
export const PRODUCT_FILTER: string = '/product/filter';
export const PRODUCT_DETAIL: string = '/product/detail';
export const ACCOUNT_TOKEN: string = 'accounts/token';
export const ACCOUNT_REFRESH_TOKEN: string = 'accounts/refreshToken';
export const HOME: string = 'home';
export const LOGIN: string = '/login';
export const ERROR: string = '/error';
export const CART: string = '/cart';
export const REGISTER: string = '/register';
export const CATEGORY: string = '/category';


// Define common value
export const ERROR_VALUE: string = "error";
export const SUCCESS_VALUE: string = "success";
export const MAIN_COLOR: string = 'bg-gray-600';
export const NAME_BRANCH = "Ecommer";
export const DATA_LOREM: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis et lorem sit amet vehicula. Etiam vel nibh nec nisi euismod mollis ultrices condime';
export const IMAGE_DATA_FAKE_ONE: string = 'data:image/png;base64,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';
export const IMAGE_DATA_FAKE_TWO: string = 'https://u6wdnj9wggobj.vcdn.cloud/media/catalog/product/cache/95cb36d3254e0a20b33361b06e7c0ce9/7/1/71790_copy_0.jpg';
export const DATA_LOREM_FAKE: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis et lorem sit amet vehicula. Etiam vel nibh nec nisi euismod mollis ultrices condime';
export const DATA_SIZE_DEVICE: number = 500;

export const CITIES: City[] = [
    {
        code: 'TP Hồ Chí Minh',
        name: 'HCM'
    },
    {
        code: 'TP Hà Nội',
        name: 'HN',
    },
    {
        code: 'TP Cao Bằng',
        name: 'CB'
    }
]

export const LIST_COMMENT: Array<Comment> = [{
    id: generateRandomId(),
    username: 'admin',
    comment: 'this con me',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: [{
      id: generateRandomId(),
      comment: '👍',
      total: 2,
      dateCreated:  new Date(),
    }]
  },
  {
    id: generateRandomId(),
    username: 'admin',
    comment: 'this con me',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: [{
      id: generateRandomId(),
      comment: '👍',
      total: 2,
      dateCreated:  new Date(),
    }]
  },
  {
    id: generateRandomId(),
    username: 'client',
    comment: 'fuck this shit',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: [{
      id: generateRandomId(),
      comment: '👍',
      total: 2,
      dateCreated:  new Date(),
    }]
  },
  {
    id: generateRandomId(),
    username: 'admin',
    comment: 'hehe ewqeqwe ',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: [{
      id: generateRandomId(),
      comment: '👍',
      total: 2,
      dateCreated:  new Date(),
    }]
  },
  {
    id: generateRandomId(),
    username: 'admin',
    comment: 'o o o ',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: []
  },
  {
    id: generateRandomId(),
    username: 'client',
    comment: 'fuck this shit',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: []
  },
  {
    id: generateRandomId(),
    username: 'admin',
    comment: 'hehe ewqeqwe ',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: []
  },
  {
    id: generateRandomId(),
    username: 'admin',
    comment: 'o o o ',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: []
  },
  {
    id: generateRandomId(),
    username: 'client',
    comment: DATA_LOREM_FAKE + DATA_LOREM_FAKE,
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: [{
      id: generateRandomId(),
      comment: '👍',
      total: 1,
      dateCreated:  new Date(),
    }]
  },
  {
    id: generateRandomId(),
    username: 'admin',
    comment: 'hehe ewqeqwe ',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: []
  },
  {
    id: generateRandomId(),
    username: 'admin',
    comment: 'hehe ewqeqwe ',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: []
  },
  {
    id: generateRandomId(),
    username: 'admin',
    comment: 'o o o ',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: []
  },
  {
    id: generateRandomId(),
    username: 'client',
    comment: 'fuck this shit',
    dateCreated: new Date(),
    avatar: IMAGE_DATA_FAKE_ONE,
    emotions: [],
    isElementVisible: true
  }

];
