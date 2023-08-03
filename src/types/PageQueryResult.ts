import { ApolloError } from "@apollo/client";
import Media from "./Media";
import PageInfo from "./PageInfo";

type PageQueryResult = {
    loading: boolean;
    error?: ApolloError | undefined;
    data: {
        Page: {
            media: Array<Media>;
            pageInfo: PageInfo;
        }
    } | undefined;
}

export default PageQueryResult