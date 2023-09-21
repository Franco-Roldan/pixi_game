
import { Manager } from './game/Manager';
import { KeyBoard } from './game/Keyboard';
import { LoaderScene } from './Scenes/Loader';


export const screen_app = {width: 1280, height: 720};

Manager.app_init(screen_app.width, screen_app.height, 0x212F3C);
KeyBoard.initialize();

// We no longer need to tell the scene the size because we can ask Manager!
const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);