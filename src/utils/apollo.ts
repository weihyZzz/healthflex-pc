import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import { AUTH_TOKEN } from "./constants";
const httpLink = createHttpLink({
    uri: '//localhost:3000/graphql'
})
// 创建一个 Apollo Link 上下文修改器
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})