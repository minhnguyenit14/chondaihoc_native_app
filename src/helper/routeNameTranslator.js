import { ROUTES } from '../constants';
const routeValues = Object.values(ROUTES);

export const getHeaderName = (routeName) => {
    let header = "";
    routeValues.map(r => {
        r.route === routeName && (header = r.header)
    })
    return header;
}