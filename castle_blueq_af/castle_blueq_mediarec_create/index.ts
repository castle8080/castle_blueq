import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Application } from "../castle/blueq/config/application";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const r = Application.instance.getRecommendationRepo();

    r.create({
        id: "1",
        created: new Date(),
        user_id: "bob",
        content: "You should read this book!",
        source: "Takahiro"
    });

    console.log(`have repo: ${r}`);


    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";



    context.res = {
        // status: 200, /* Defaults to 200 */
        body: `Repo: ${r}`
    };

};

export default httpTrigger;