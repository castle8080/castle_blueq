import { MainController } from "../controllers/main_controller";
import { MediaReccomendationController } from "../controllers/media_reccomendation_controller"; 
import { MediaReccomendationRepository } from "../repositories/media_reccomendation_repository";
import { Container } from "../../../myopic";

export function configure(c: Container) {
    c.singleton(
        'MainController',
        async (c) => new MainController(),
        "Controller"
    );
    c.singleton(
        'MediaReccomendationController',
        async (c) => new MediaReccomendationController(
            await c.get("MediaReccomendationRepository")
        ),
        "Controller"
    );
}