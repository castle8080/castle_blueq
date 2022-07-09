import { ServerRunner } from "./castle/blueq/api/server";
import { Container } from "./castle/myopic";

async function main() {
    let container = new Container();
    let modules = [
        "./castle/blueq/api/config/configure_express",
        "./castle/blueq/api/config/configure_controllers",
        "./castle/blueq/api/config/configure_repositories",
    ];
    for (let m_name of modules) {
        require(m_name).configure(container);
    }
    (await container.get<ServerRunner>("ServerRunner")).run();
}

main();