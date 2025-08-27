import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();
    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _baseOffset = '0';
    const _baseLimit = '8';


    const getAllCharacters = async (offset = _baseOffset, limit = _baseLimit) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseOffset, limit = _baseLimit) => {
        const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            pageCount: comics.pageCount,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || 'en',
            price: comics.prices[0].price ? `${comics.prices[0].price} ` : "not available",
        };

    };



    return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic }
}



export default useMarvelService;