import { apiPrefix, BaseApi } from "../../api/BaseApi";
import { Type } from "./movieSlice";

class MovieApi extends BaseApi {
    private static instance: MovieApi;

    private constructor() {
        super({ baseURL: `${apiPrefix}/` });
    }

    public static getInstance(): MovieApi {
        if(!MovieApi.instance)
            MovieApi.instance = new MovieApi();
        
        return MovieApi.instance;
    }

    public getMovies(type: Type, search: string, page: number) {
        return this.instance.get(`${type}?q=${search}&page=${page}`);
    }

    public storeReview(type: Type, rating: number, sessionId: string, id: string) {
        const formData = new FormData();
        formData.set('type', type);
        formData.set('rating', rating.toString());
        formData.set('sessionId', sessionId);
        formData.set('id', id);
        return this.instance.post('/review', formData);
    }
}

export default MovieApi;